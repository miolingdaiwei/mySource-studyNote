// console.log(1);

// setTimeout(() => {
//   Promise.resolve("time_resolve").then((Res) => {
//     console.log(Res);
//   });
//   console.log(2);
// });

// new Promise((resolve) => {
//   console.log("resolve 前");
//   resolve(3);
//   console.log("resolve 后");
// });

// Promise.resolve(3).then((res) => {
//   console.log(res);
//   setTimeout(() => {
//     console.log("time");
//   });
// });

// process.nextTick(() => {
//   console.log(4);
// });

// setTimeout(() => {
//   console.log(5);
//   Promise.resolve("time_Resolve2").then((res) => {
//     console.log(res);
//   });
// });

// Promise.resolve(6).then((res) => console.log(res));

// process.nextTick(() => {
//   console.log(7);
// });
// setInterval;
// console.log(8);

Promise.resolve("1").then((res) => {
  console.log(res);
  Promise.resolve("2").then((res) => console.log(res));
  console.log(3);
});
