(()=>{
  // 格式let 变量名:变量类型 = 值
  let bool: boolean=true;
  console.log(bool);
  console.log('==========')
  let num1:number = 100
  let num2:number = 0b111;//二进制
  let num3:number = 0o76;//二进制
  let num4:number = 0xFcc;//十六进制
  console.log(num1);
  console.log(num2);
  console.log(num3);
  console.log(num4);
  console.log('==========')
  let str1:string = 'hello'
  //字符串和数字可进行拼接
  console.log(str1+num1)
  console.log('==========')
  let u: undefined = undefined
  let n: null = null
  let a:number = u
  console.log(u)
  console.log(n)
  console.log(a)//可将undefined和null赋值给其他类型
  console.log('==========')
  //数组类型
  // 数组定义方式1:let 变量名:数据类型[] = [value1，...]
  let arr1: number[] = [0,1,2,3]
  console.log(arr1)
  // 数组定义方式2:let 变量名:Array<数据类型> = [value1，...]
  let arr2: Array<number> = [3,5,7]
  console.log(arr2)
  console.log('==========')
  // 元组类型:定义数组中各元素类型，元素类型和个数赋值是需一致
  let arr3:[string,number]=['helllo',3.13333]
  console.log(arr3[0].split(''))
  console.log(arr3[1].toFixed(2))
  console.log('==========')
//枚举类型
  enum Color{
    red,
    blue,
    green
  }
 let myColor: Color =Color.red
 console.log(myColor)
 console.log(Color.red,Color.blue,Color.green)
 console.log(Color[0],Color[1],Color[2])
 console.log('==========')

//  可对枚举类型修改索引初始值
 enum Color1{
  red=10,
  blue,
  green
}
let myColor1: Color1 =Color1.red
console.log(myColor1)
console.log(Color1.red,Color1.blue,Color1.green)
console.log(Color1[10],Color1[11],Color1[12])
console.log('==========')
//any类型
let string: any='hhhh'
string =12
let arr: any[]=['xxxx',1,true]
console.log(arr)
// void 类型表示函数没有返回值
function show():void{
  console.log('jjjjjj')
}
console.log(show())
console.log('==========')
//对象类型
let obj:object={
  name:'jae',
  age:29
}
function getObj(obj:object): object{
  return obj
}
console.log(getObj(obj))



}
)()