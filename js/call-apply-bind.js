Function.prototype._call = function (param) {
    var args = [...arguments].slice(1);
    //   将除了第一个参数以外的所有参数取出来
    param.fn = this;
    // 将传入的param定义一个属性fn保存this，
    // 根据this永远指向最后一次调用它的对象，可以知道这个this就是执行call方法的函数
    // 也就是下面的myCall

    console.log(param.age + param.sex);
    // 直接输出param.age和param.sex可以的得到18男

    const result = param.fn(...args);
    // 再执行mycall函数，并将参数传给mycall，那么fn函数体内的this九指向的param，也就可以读到age和sex

    delete param.fn;
    //   删除fn
    return result;
    // 将结果返回
};

let obj = {
    age: 18,
    sex: "男",
};

function myCall(arg) {
    console.log(this.age + "  " + this.sex + [...arguments]);
}

myCall._call(obj, 2, 3, 4);
