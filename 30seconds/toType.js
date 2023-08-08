
  var class2Type = {

  };
  var toString = class2Type.toString;
  ['Array','Regex','Date','Number','String','Boolean','Symbol','Object','Error','Function'].forEach(element => {
    class2Type[`[object ${element}]`]= element.toLowerCase()
  })
  function toType(object){
    if(object==null){
      //判断null和undefined

      return object+''
    }
   return typeof object ==='object'||typeof object ==='function'?
   class2Type[toString.call(object)]||'object':typeof object

  }
console.log(toType(null))
console.log(toType(undefined))
console.log(toType(1))
console.log(toType('1'))
console.log(toType(true))
console.log(toType(Symbol()))
console.log(toType({}))
console.log(toType([]))
console.log(toType(new Date()))
console.log(toType(new RegExp()))
console.log(toType(new Error()))
console.log(toType(function(){}))
console.log(toType(new Map()))
console.log(toType(new Set()))
console.log(toType(new WeakMap()))
console.log(toType(new WeakSet()))
console.log(toType(new Promise(() => {})))
console.log(toType(new Int8Array()))

 console.log('------------------')

//write a function can check the type of the value
function checkType(value){
  return Object.prototype.toString.call(value).slice(8,-1)

}
console.log(checkType(null))
console.log(checkType(undefined))
console.log(checkType(1))
console.log(checkType('1'))
console.log(checkType(true))
console.log(checkType(Symbol()))
console.log(checkType({}))
console.log(checkType([]))
console.log(checkType(new Date()))
console.log(checkType(new RegExp()))
console.log(checkType(new Error()))
console.log(checkType(function(){}))
console.log(checkType(new Map()))
console.log(checkType(new Set()))
console.log(checkType(new WeakMap()))
console.log(checkType(new WeakSet()))




