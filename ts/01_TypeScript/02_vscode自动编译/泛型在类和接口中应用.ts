(()=>{
//  泛型在类中的应用
class Queue<T>{
  private data=[]
  push(item:T){
    this.data.push(item)
  }
  pop():T{
    return this.data.pop();
  }
}
const queue = new Queue<number>()
// queue.push('hello') //泛型传入number，则队列数据需全部是number类型
queue.push(1)

// 泛型在接口中的应该
interface person<T,U> {
  key:T,
  value:U
}
let Person: person<string,number>={
  key:'hhh',
  value:18
}
let APerson: person<number,string>={
  key:111,
  value:'hhh'
}
})()