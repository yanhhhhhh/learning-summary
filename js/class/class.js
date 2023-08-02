class Point{
  constructor(x,y){
    this.x = x
    this.y = y
  }
  toString(){
    return `${this.x},${this.y}`
  }
}
const point = new Point(1,4)
console.log(point.toString())
