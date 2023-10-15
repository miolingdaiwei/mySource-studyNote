function Func() {
  this.age = 18;
  console.log(this.age);
}

Func();
const funcObj = new Func();
console.log(`func is ${typeof func} but funcObj is ${typeof funcObj}`);

// 结果
// 18
// 18
// func is function but funcObj is object
// console.log(func.__proto__);
console.log(Func.prototype);
console.log(Func.__proto__);
console.log(funcObj.__proto__);
