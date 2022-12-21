function isPromise(target) {
  return Object.prototype.toString.call(target) === '[object Promise]'
}

function isPromise1(target) {
  return typeof target?.then === 'function'
}
console.log(isPromise({ then: () => { } }));


console.log(
  isPromise(new Promise((resolve, reject) => {

  })))
console.log(isPromise1({ then: () => { } }));
console.log(
  isPromise1(new Promise((resolve, reject) => {

  })))
