function Point (x,y){
  this.x = x
  this.y = y 

}
Point.prototype.toString = function(){
  return `${this.x},${this.y}`
}
const point = new Point (1,3)
console.log(point.toString())