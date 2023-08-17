function testPromise(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Processing ${time}`);
      resolve(time);
    }, time);
  });
}

const arr = [1000, 3000, 1000];
//forEach 并行
function test() {
  arr.forEach(async (item) => {
    await testPromise(item);
  });
  console.log("end");
}
test();

//forEach 并行
// async function test() {
//   await arr.forEach((item) => {
//     testPromise(item);
//   });
// }
// test();
