var myObj = (function  (){
  var _myName ='ggg'//私有（private）属性
  function getName(){//公开（public）方法
    return _myName
  }
  function setName(name){
    _myName = name
    // return _myName
  }
  return {
    getName,
    setName
  }
})()
console.log(myObj.getName())
console.log(myObj.setName('hhhh'))
console.log(myObj.getName())

console.log(myObj._myName)
