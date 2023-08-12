function A(){

}
A.prototype = {
  name:'hhhh'
}
function B(){

}
B.prototype = new A()
var b = new B()
console.log(b.name)


1. b 中查找属性name,b中不存在name 属性
2. 沿着原型链，查找b原型prototype 上是否有name，B.prototype 为A创建的对象
3. 该对象上不存在属性name，查找a的构造函数的原型A.prototype
