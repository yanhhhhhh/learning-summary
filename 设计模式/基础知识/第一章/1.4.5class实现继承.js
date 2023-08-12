class Animal{
  constructor(name){
    this.name = name
  }
  getName(){
    return this.name
  }
}
class Dog extends Animal{
  constructor(name){
    super(name)

  }
  speak(){
    console.log('speak')
  }
}
const dog = new Dog('gggg')
console.log(dog.getName())
console.log(dog.name)
dog.speak()