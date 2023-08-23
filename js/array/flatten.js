//@ts-check
/**
 *
 * @param {Array<any>} array
 * @return {Array<any>}
 */
function flatten(array) {
  return array.reduce((pre, cur) => {
    if (Array.isArray(cur)) {
      pre.push(...flatten(cur));
    } else {
      pre.push(cur);
    }
    return pre;
  }, []);
}
console.log(flatten([1, [2, 3], [[[[5]]]]]));

function flatten(arr) {
  let reslut = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      reslut.push(...flatten(arr[i]));
    } else {
      reslut.push(arr[i]);
    }
  }
  return reslut;
}
const array = [1, [2, [3, 5]]];
console.log(flatten(array));
