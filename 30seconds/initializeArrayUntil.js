/* 
1. 创建一个空数组，arr，一个索引变量i和一个元素el。
2 .使用do...while循环向数组添加元素，使用mapFn函数，直到conditionFn函数对给定的索引i和元素el返回true。
3.条件函数conditionFn需要三个参数：当前索引、前一个元素和数组本身。
4.映射函数mapFn需要三个参数：当前索引、当前元素和数组本身。 
*/

const initializeArrayUntil = (conditionFn, mapFn) => {
  const arr = [];
  let i = 0;
  let el = undefined;
  do {
    el = mapFn(i, el, arr);
    arr.push(el);
    i++;
  } while (!conditionFn(i, el, arr));
  return arr;
};
// test
const arr = initializeArrayUntil(
  (i, val) => val > 10,
  (i, val, arr) => (i <= 1 ? 1 : val + arr[i - 2])
);
console.log(arr);


