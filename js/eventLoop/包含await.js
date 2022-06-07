/* 1. 宏任务：script 脚本、setTimeout、setInterval
2. 微任务:await promise.then() 
3.await 是语法糖，之后的代码相当于放在promise.then() 

首先，在执行script脚本的时候，将同步任务推入调用栈中，宏任务和微任务推入任务队列中
其中，宏任务进入宏任务队列，微任务进入微任务队列
先清空调用栈之后，清空微任务队列，再清空宏任务队列
*/
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})

console.log('script end')

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout