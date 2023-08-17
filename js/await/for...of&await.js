function testPromise(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Processing ${time}`);
      resolve(time);
    }, time);
  });
}

const arr = [1000, 3000, 1000];
//for of 串行
async function test() {
  for (let i of arr) {
    await testPromise(i);
  }
  console.log("end");
}
test();

// for of 并行
// for (let i of arr) {
//   testPromise(i);
// }
