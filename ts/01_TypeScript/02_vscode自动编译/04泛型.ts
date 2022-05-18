(()=>{
  // 泛型可以理解为占位符
  function sayHi<T>(msg:T):T{
    return msg
  }

  let str= sayHi('123')
  let number= sayHi(123)

  console.log(str)
  console.log(number)
  function swap<T,U>(tuples:[T,U]):[U,T]{
    return [tuples[1],tuples[0]]
  }
  let tuples:[string,number] =swap([1,'hello'])
  console.log('tuples',tuples)
  // 泛型约束
  // 1. 想要读取参数上的length属性，传入泛型，不确定是否能读取length，所以报错
  // 2. 使用extends约束
  interface IWithlength{
    length: number;
  }
  function echoLength<T extends IWithlength>(args:T):T{
    console.log(args.length)
    return args
  }
  echoLength('string')
  echoLength([1,2,3])
  echoLength({length:1})
  // echoLength(1)//此处会报错说number不能赋值给IWithlength类型



}

)()