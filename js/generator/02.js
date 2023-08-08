function* gen() {
  yield 1; yield 2; yield 3;
  return 4;
}
let g = gen();
console.dir(g);
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
for (let v of gen()) console.log(v);

