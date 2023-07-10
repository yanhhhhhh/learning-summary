// const a = 3
// console.log(a << 1);
// console.log(a >> 1);
const a = 5;          //  00000000000000000000000000000101
const b = 2;          //  00000000000000000000000000000010
const c = -5;         //  11111111111111111111111111111011

console.log(a >> b);
console.log(c >> b);
console.log(~a + 1 === c);