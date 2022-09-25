Function.prototype._call = function (param) {
  var args = [...arguments].slice(1);
  //   将除了第一个参数以外的所有参数取出来
  param.fn = this;
  //   改变this指向
  const result = param.fn(...args);
  //   再在这里结构参数
  delete param.fn;
  //   删除fn
  return result;
};

let obj = {
  age: 18,
  sex: "男",
};

function myCall(arg) {
  console.log(this.age + "  " + this.sex + [...arguments]);
}

myCall._call(obj, 2, 3, 4);

Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      throw new TypeError('user was not function');
    }
​
    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        // 空函数
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };
    // 维护原型关系
    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();
​
    return fBound;
};


Function.prototype.myBind = function (param) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }

    // 获取参数
    const args = [...arguments].slice(1),
    fn = this;
    // 获取this

    // 返回一个新的函数
    return function Fn() {
        // 需要判断this是不是已经调用Bind过了,如果是,则传入新的函数,不是则传param执行
        return fn.apply(this instanceof Fn ? new fn(...arguments) : param, args.concat(...arguments)); 
    }
}