const handle = {
  get: (target, propKey, receiver) => {
    console.log('get', { target, propKey, receiver });

    return Reflect.get(target, propKey, receiver)
  },
  set: function (target, propKey, value, receiver) {
    console.log('set', { target, propKey, value, receiver });
    // 注 箭头函数拿不到arguments
    return Reflect.set(...arguments);
    // return Reflect.set(target, propKey, value, receiver)
  }
}
const p = new Proxy({}, handle)
p.name = 'Tom'
console.log(p);