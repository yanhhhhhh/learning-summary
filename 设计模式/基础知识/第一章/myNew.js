//模拟new 操作
var Person = function(name){
  this.name = name

}
Person.prototype.getName = function(){
  return this.name
}

function myNew(){
  const obj = new Object()
  console.log(arguments)
  const Constructor = Array.prototype.shift.apply(arguments)
  console.log(arguments)

  obj.__proto__  = Constructor.prototype  //指向正确的原型
  var ret = Constructor.apply(obj,arguments)//
  return typeof ret =='object'?ret:obj//确保构造器返回的是对象
  
}
var person = myNew(Person,'hhhhh')
var person1 = new Person('hhhhh')
console.log(person)

console.log(person1)
console.log(Object.getPrototypeOf(person1)===Person.prototype)
console.log(Object.getPrototypeOf(person)===Person.prototype)
console.log(Object.getPrototypeOf(person)===Object.getPrototypeOf(person1))

console.log(person1.getName())

// console.log(myNew.toString())