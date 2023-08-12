Object.create = Object.create || function(obj){
  var F = function(){}
  F.prototype = obj
  return new F()
}
var Plane =function(){
  this.blood = 100
  this.attackLevel = 1
  this.defenseLevel=1
}
var plane = new Plane()
console.log(plane,Plane)
var clonePlane = Object.create(plane)
console.log(clonePlane == plane)
