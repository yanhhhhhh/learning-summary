// 箭头函数和块级作用域没有自己的this，this为所处环境（上级上下文中的）this

{
  console.log(this);
  let a = "a";
  console.log(this.a);
  var b = "b";
  console.log(this.b);
}

const f = () => {
  console.log("箭头函数");
  console.log(this);
};
f();

function Person(age, name) {
  this.age = age;
  this.name = name;
  this.getName = () => {
    console.log(this, this.name);
  };
}
const person = new Person(18, "jae");
person.getName();
