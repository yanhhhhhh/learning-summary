// const { resolve } = require("path");

// const promise1 = new Promise((resolve, reject) => {
//   console.log("promise1");
//   resolve("success");
// });
// console.log("1", promise1);
// promise1.then((value) => {
//   console.log("resolve", value);
// });
// console.log("2", promise1);

// const rejectPromise = new Promise((resolve, reject) => {
//   console.log("rejectPromis");
//   reject("reject");
// });
// rejectPromise.then(
//   (value) => {
//     console.log("rejectPromise-resolve", value);
//   },
//   (error) => {
//     console.log("rejectPromise-reject", error);
//   }
// );
// function timeout(ms, arg) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms, arg);
//   });
// }

// timeout(100, "done").then((value) => {
//   console.log(value);
// });
// timeout(2000, "success").then((value) => {
//   console.log(value);
// });

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("fail");
    var endTime = new Date().getTime();
    console.log("time", endTime - startTime);
  }, 3000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(p1);
  }, 1000);
});
var startTime = new Date().getTime();
p2.then((result) => console.log(result)).catch((error) => {
  console.log("error", error);
});
