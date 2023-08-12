var makeSound = function(animale){
 animale.sound()
}
var Duck = function(){}
Duck.prototype.sound = function(){
  console.log('嘎嘎嘎')
}
var Chicken = function(){}
Chicken.prototype.sound=function(){
 console.log('咯咯咯')
}
makeSound(new Duck())
makeSound(new Chicken())