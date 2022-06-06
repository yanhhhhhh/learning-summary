/*
 * @Author: your name
 * @Date: 2022-04-18 23:15:28
 * @LastEditTime: 2022-04-18 23:15:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \learning-summary\js\proxy\proxy.js
 */
function createArray(...elements) {
    let handler = {
      get(target, propKey, receiver) {
        let index = Number(propKey);
        if (index < 0) {
          propKey = String(target.length + index);
        }
        return Reflect.get(target, propKey, receiver);
      }
    };
  
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
  }
  
  let arr = createArray('a', 'b', 'c');
  console.log(arr[-1])  