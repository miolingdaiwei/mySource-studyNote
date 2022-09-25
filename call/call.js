Function.prototype.myCallOne = function (ctx) {
  // 参数是什么?
  var args = [...arguments].slice(1); // 这里使用es6的方法，取出了this外的所有参数
  //   解构之后取出第一个参数,也就是传进来的this指向
  console.log(ctx);
  console.log(ctx.fn + " ctx.fn");
  ctx.fn = this; // 改变this指向
  var result = ctx.fn(...args); // 执行函数，因为args为数组，所以解构出来
  console.log(result);
  delete ctx.fn;
  return result;
};

var obj = {
  name: "syh",
};

//
function son(age) {
  console.log("name:" + this.name + " this.age: " + age);
  return "doit";
}
const result = son.myCallOne(obj, 24);
console.log(result);
