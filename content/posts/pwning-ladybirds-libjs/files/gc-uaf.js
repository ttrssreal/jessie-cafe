try {
    try {
        const t2 = this;
        t2();
    } catch(e3) {
    }
    async function f5(a6, ...a7) {
        return a6;
    }
    try {
    } catch(e8) {
    }
    const o9 = {
        "maxByteLength": 9007199254740991,
        "a": this,
        ...this,
        ...ArrayBuffer,
        ...ArrayBuffer,
        "h": ArrayBuffer,
    };
    Math.min();
    const v13 = this[this];
    try {
        v13();
    } catch(e15) {
    }
    try {
        const t27 = this;
        t27();
    } catch(e18) {
    }
    try {
        const o21 = {
            "maxByteLength": 3,
        };
        const v22 = new ArrayBuffer(o21, o21);
        v22.resize(3);
    } catch(e24) {
    }
    const v26 = Symbol.species;
    const t39 = 2.2250738585072014e-308;
    t39[Symbol] = v26;
    try {
        const o29 = {
            "maxByteLength": 3,
        };
        try {
            const v32 = Symbol.species;
            const t47 = 2.2250738585072014e-308;
            t47[Symbol] = v32;
        } finally {
        }
        const v33 = new ArrayBuffer(o29, o29);
        v33.resize(3);
    } catch(e35) {
    }
    try {
    } finally {
    }
    v13.apply();
    gc.apply(gc, gc, gc);
    3.0 % Math;
    Reflect.apply(("c").matchAll, "c", Symbol);
    const v47 = new ArrayBuffer(1374, o9);
} catch(e48) {
    for (const v50 in "4") {
    }
    function* f52(a53, ...a54) {
        return this;
    }
    f52.prototype = this;
}
// CRASH INFO
// ==========
// TERMSIG: 6
// STDERR:
// /home/jess/code/ladybird/Meta/Lagom/../../Libraries/LibGC/Root.h:81:16: runtime error: downcast of address 0x7fbe01a638b0 which does not point to an object of type 'JS::Symbol'
// 0x7fbe01a638b0: note: object is of type 'GC::HeapBlock::FreelistEntry'
//  00 00 00 00  28 84 39 05 be 7f 00 00  00 00 00 00 00 00 00 00  04 00 00 00 00 00 00 00  88 38 a6 01
//               ^~~~~~~~~~~~~~~~~~~~~~~
//               vptr for 'GC::HeapBlock::FreelistEntry'
// SUMMARY: UndefinedBehaviorSanitizer: undefined-behavior /home/jess/code/ladybird/Meta/Lagom/../../Libraries/LibGC/Root.h:81:16 
// =================================================================
// ==1866940==ERROR: AddressSanitizer: use-after-poison on address 0x7fbe007fe000 at pc 0x7fbe0535ecae bp 0x7ffdaab577b0 sp 0x7ffdaab577a8
// READ of size 8 at 0x7fbe007fe000 thread T0
//     #0 0x7fbe0535ecad  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-gc.so.0+0x32cad)
//     #1 0x7fbe036ee985  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xcee985)
//     #2 0x7fbe036ec3b1  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xcec3b1)
//     #3 0x7fbe0416150f  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x176150f)
//     #4 0x7fbe038c880d  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xec880d)
//     #5 0x7fbe038b8fa0  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xeb8fa0)
//     #6 0x7fbe038b6b9a  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xeb6b9a)
//     #7 0x55cc3db0d0fd  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/FuzzilliJs+0x17d0fd)
//     #8 0x7fbe0182a1fd  (/nix/store/6q2mknq81cyscjmkv72fpcsvan56qhmg-glibc-2.40-66/lib/libc.so.6+0x2a1fd) (BuildId: d9765725d929c713f4481765fa13ed815149985f)
//     #9 0x7fbe0182a2b8  (/nix/store/6q2mknq81cyscjmkv72fpcsvan56qhmg-glibc-2.40-66/lib/libc.so.6+0x2a2b8) (BuildId: d9765725d929c713f4481765fa13ed815149985f)
//     #10 0x55cc3d9c95c4  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/FuzzilliJs+0x395c4)
// 
// Address 0x7fbe007fe000 is a wild pointer inside of access range of size 0x000000000008.
// SUMMARY: AddressSanitizer: use-after-poison (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-gc.so.0+0x32cad) 
// Shadow bytes around the buggy address:
//   0x7fbe007fdd80: f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7
//   0x7fbe007fde00: f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7
//   0x7fbe007fde80: f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7
//   0x7fbe007fdf00: f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7
//   0x7fbe007fdf80: f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7
// =>0x7fbe007fe000:[f7]f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7
//   0x7fbe007fe080: f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7
//   0x7fbe007fe100: f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7
//   0x7fbe007fe180: f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7
//   0x7fbe007fe200: f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7
//   0x7fbe007fe280: f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7 f7
// Shadow byte legend (one shadow byte represents 8 application bytes):
//   Addressable:           00
//   Partially addressable: 01 02 03 04 05 06 07 
//   Heap left redzone:       fa
//   Freed heap region:       fd
//   Stack left redzone:      f1
//   Stack mid redzone:       f2
//   Stack right redzone:     f3
//   Stack after return:      f5
//   Stack use after scope:   f8
//   Global redzone:          f9
//   Global init order:       f6
//   Poisoned by user:        f7
//   Container overflow:      fc
//   Array cookie:            ac
//   Intra object redzone:    bb
//   ASan internal:           fe
//   Left alloca redzone:     ca
//   Right alloca redzone:    cb
// ==1866940==ABORTING
// STDOUT:
// 
// ARGS: Meta/Lagom/Build/lagom-fuzzers/bin/FuzzilliJs 
// EXECUTION TIME: 35ms
