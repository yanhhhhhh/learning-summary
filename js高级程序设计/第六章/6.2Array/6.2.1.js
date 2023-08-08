


let values = [1,3,]
console.log(values.length,values)
/**
 * Array.from  将类数组结构转化为数组实例
 */
const map = new Map()
map.set(1,'a')
map.set(2,'b')
console.log(map)
const mapArray = Array.from(map)
console.log(mapArray)
const map2 = new Map([['a',1],['b',2]])
console.log(map2,map2.get('a'))


const iter ={
  *[Symbol.iterator](){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  }
}
const iterArray = Array.from(iter)
console.log(iterArray)
//concat返回新数组，原数组未被修改
console.log(iterArray.concat([5,6,7]))

const a1 = [1,2,3,4]
const a2 = Array.from(a1)
a1[0] = 1000
console.log(a1,a2,a1 === a2)


const a3 = [[5,6,7],2,3,4]
const a4 = Array.from(a3)
a3[0][0] = 1000
a3[1] = 200
console.log(a3,a4,a3 === a4)


const objectLikeArray = {
  0:0,
  1:1,
  2:2,
  3:3,
  length:4
}
const array1 = Array.from(objectLikeArray)
console.log(objectLikeArray,objectLikeArray instanceof Array,array1,array1 instanceof Array)

function getArguments(){
  console.log(arguments)
  console.log(Array.from(arguments))
  console.log(Array.of(...arguments))
}
console.log('getArguments')
getArguments(1,2,3,4,5)



const a5 = [1,2,3]
const a6 = Array.from(a5,(value,key)=>{
  console.log({key,value})
  return value**2
})
console.log(a6)
const a7 = [1,2,3]
//第二个参数function 不要使用箭头函数，否则无法访问this
const a8 = Array.from(a7,function(value,key){
  console.log({key,value})
  console.log(this.exponent)
  return value**this.exponent
},{
  exponent:3
})
console.log(a8)