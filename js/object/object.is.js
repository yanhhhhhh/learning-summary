


console.log(Object.is(NaN,NaN))//true
console.log(Object.is(+0,-0))//false
console.log(Object.is(-0,0))//false
console.log(Object.is(-0,-0))//true
const obj = {}
const tempObje = obj
console.log(Object.is(obj,tempObje))//true
console.log(Object.is(obj,{}))//false