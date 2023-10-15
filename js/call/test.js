// "use strict";
// (function test() {
//   console.log(this);
// })();
// function test1() {
//   console.log(this);
// }
// test1();
// new操作会将this指向保存在当前实例身上。
// const arrow = () => {
//   console.log(this);

//   var vm = () => {
//     console.log("2" + this);
//   };
//   vm();
//   //   箭头函数内部的this指向这个外层函数
// };

// arrow();

function t() {
  const inIt = () => console.log(this);
  inIt();
}
t();

// call方法使用一个指定的this值和单独给出的一个或多个参数来调用一个函数。
// function.call(thisArg, arg1, arg2, ...)

// const aa = Promise((resolve, reject) => {
//   resolve(2);
// });

// aa.then((Res) => {
//   console.log(Res);
// });

// aa.Promise
const bb = new Promise((resolve, reject) => {
  resolve(2);
});
bb.then((res) => {
  console.log(res);
});
