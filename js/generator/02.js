function* gen() {
  yield 1; yield 2; yield 3;
}
let g = gen();
console.dir(g);