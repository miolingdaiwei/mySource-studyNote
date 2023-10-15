function commonFunc() {
  const age = 19;
  console.log(age);
  //   console.log(this);
}

function contructFunc() {
  this.age = 18;
  console.log(this.age);
  //   console.log(this);
}
// 其实可以用es2015类编写，是一样的
// class contructFunc {
//     constructor() {
//         this.age = 18;
//         console.log(this.age);
//         console.log(this);
//     }
// }

commonFunc();
const truc = new contructFunc();

console.log(
  `typeof common is ${typeof commonFunc} and typeof truc is ${typeof contructFunc}`
);
