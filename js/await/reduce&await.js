function testPromise(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Processing ${time}`);
      resolve(time);
    }, time);
  });
}
// reduce 是串行的
const result = [1000, 3000, 2000, 1000].reduce((pre, curTimeId) => {
  return pre.then(() => {
    return testPromise(curTimeId);
  });
}, Promise.resolve());

result.then(() => {
  console.log("done");
});
