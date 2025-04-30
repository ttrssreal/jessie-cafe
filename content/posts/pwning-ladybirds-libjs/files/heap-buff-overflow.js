[Symbol.species];
for (const v5 in this) {
    const v6 = this[v5];
    try {
        v6();
    } catch(e8) {
    }
}
async function f11(a12, ...a13) {
    await Proxy;
    return a12;
}
const v19 = [];
Reflect.apply(("c").matchAll, "c", v19);
const v22 = new Float64Array(ArrayBuffer, 1374, 2.2250738585072014e-308);
const o24 = {
    "maxByteLength": 3,
};
try {
    const o27 = {
        "maxByteLength": 62044,
    };
    const v29 = new ArrayBuffer(1374, o27);
    v29.resize(62044);
} catch(e31) {
}
// CRASH INFO
// ==========
// TERMSIG: 6
// STDERR:
// =================================================================
// ==1303447==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x50b0000279f0 at pc 0x7f2bf7d292de bp 0x7ffce8d92350 sp 0x7ffce8d92348
// WRITE of size 8 at 0x50b0000279f0 thread T0
//     #0 0x7f2bf7d292dd  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xf292dd)
//     #1 0x7f2bf7cb8fa0  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xeb8fa0)
//     #2 0x7f2bf8251658  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x1451658)
//     #3 0x7f2bf824dcfc  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x144dcfc)
//     #4 0x7f2bf7ab5b63  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xcb5b63)
//     #5 0x7f2bf7db44d9  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xfb44d9)
//     #6 0x7f2bf7cd01ff  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xed01ff)
//     #7 0x7f2bf7cb8fa0  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xeb8fa0)
//     #8 0x7f2bf82bf136  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x14bf136)
//     #9 0x7f2bf82c0606  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x14c0606)
//     #10 0x7f2bf81290d8  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x13290d8)
//     #11 0x7f2bf812d200  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x132d200)
//     #12 0x7f2bf854397a  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x174397a)
//     #13 0x7f2bf8541edf  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x1741edf)
//     #14 0x7f2bf829f22f  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x149f22f)
//     #15 0x7f2bf85f1ae6  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x17f1ae6)
//     #16 0x7f2bf8a6b5ea  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x1c6b5ea)
//     #17 0x7f2bf8a6b362  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x1c6b362)
//     #18 0x7f2bf7cb9202  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xeb9202)
//     #19 0x7f2bf7cb6b9a  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xeb6b9a)
//     #20 0x55bd5bf6c0fd  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/FuzzilliJs+0x17d0fd)
//     #21 0x7f2bf5c2a1fd  (/nix/store/6q2mknq81cyscjmkv72fpcsvan56qhmg-glibc-2.40-66/lib/libc.so.6+0x2a1fd) (BuildId: d9765725d929c713f4481765fa13ed815149985f)
//     #22 0x7f2bf5c2a2b8  (/nix/store/6q2mknq81cyscjmkv72fpcsvan56qhmg-glibc-2.40-66/lib/libc.so.6+0x2a2b8) (BuildId: d9765725d929c713f4481765fa13ed815149985f)
//     #23 0x55bd5be285c4  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/FuzzilliJs+0x395c4)
// 
// 0x50b0000279f0 is located 24 bytes after 104-byte region [0x50b000027970,0x50b0000279d8)
// allocated by thread T0 here:
//     #0 0x55bd5bf1b487  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/FuzzilliJs+0x12c487)
//     #1 0x7f2bf7c1c6c7  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xe1c6c7)
//     #2 0x7f2bf7c1bf35  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xe1bf35)
//     #3 0x7f2bf7b7391b  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xd7391b)
//     #4 0x7f2bf8251557  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x1451557)
//     #5 0x7f2bf824dcfc  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x144dcfc)
//     #6 0x7f2bf7ab5b63  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xcb5b63)
//     #7 0x7f2bf7db44d9  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xfb44d9)
//     #8 0x7f2bf7cd01ff  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xed01ff)
//     #9 0x7f2bf7cb8fa0  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xeb8fa0)
//     #10 0x7f2bf82bf136  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x14bf136)
//     #11 0x7f2bf82c0606  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x14c0606)
//     #12 0x7f2bf81290d8  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x13290d8)
//     #13 0x7f2bf812d200  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x132d200)
//     #14 0x7f2bf854397a  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x174397a)
//     #15 0x7f2bf8541edf  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x1741edf)
//     #16 0x7f2bf829f22f  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x149f22f)
//     #17 0x7f2bf85f1ae6  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x17f1ae6)
//     #18 0x7f2bf8a6b5ea  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x1c6b5ea)
//     #19 0x7f2bf8a6b362  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0x1c6b362)
//     #20 0x7f2bf7cb9202  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xeb9202)
//     #21 0x7f2bf7cb6b9a  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xeb6b9a)
//     #22 0x55bd5bf6c0fd  (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/FuzzilliJs+0x17d0fd)
//     #23 0x7f2bf5c2a1fd  (/nix/store/6q2mknq81cyscjmkv72fpcsvan56qhmg-glibc-2.40-66/lib/libc.so.6+0x2a1fd) (BuildId: d9765725d929c713f4481765fa13ed815149985f)
// 
// SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/jess/code/ladybird/Meta/Lagom/Build/lagom-fuzzers/bin/../lib64/liblagom-js.so.0+0xf292dd) 
// Shadow bytes around the buggy address:
//   0x50b000027700: fd fd fd fa fa fa fa fa fa fa fa fa fd fd fd fd
//   0x50b000027780: fd fd fd fd fd fd fd fd fd fa fa fa fa fa fa fa
//   0x50b000027800: fa fa fd fd fd fd fd fd fd fd fd fd fd fd fd fa
//   0x50b000027880: fa fa fa fa fa fa fa fa 00 00 00 00 00 00 00 00
//   0x50b000027900: 00 00 00 00 00 00 fa fa fa fa fa fa fa fa 00 00
// =>0x50b000027980: 00 00 00 00 00 00 00 00 00 00 00 fa fa fa[fa]fa
//   0x50b000027a00: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
//   0x50b000027a80: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
//   0x50b000027b00: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
//   0x50b000027b80: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
//   0x50b000027c00: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
// ==1303447==ABORTING
// STDOUT:
// 
// ARGS: Meta/Lagom/Build/lagom-fuzzers/bin/FuzzilliJs 
// EXECUTION TIME: 32ms
