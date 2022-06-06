
var s1 = Symbol('foo')
var s2 = Symbol('doo')
console.log(s1)//Symbol(foo)
console.log(s2)//Symbol(doo)

console.log(s1==s2)//false
//如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
const obj = {
    // toString() {
    //   return 'abc';
    // },
    name:'yanhhhhhh'
  };
  const sym = Symbol(obj);
  console.log(sym)//Symbol([object Object])
console.dir(obj.__proto__.toString());//'[object Object]'
let size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

let x = new Collection();
console.log(Collection.sizeOf(x)) // 0

x.add('foo');
console.log(Collection.sizeOf(x)) // 1

console.log(Object.keys(x)) // ['0']
console.log(Object.getOwnPropertyNames(x)) // ['0']
console.log(Object.getOwnPropertySymbols(x))