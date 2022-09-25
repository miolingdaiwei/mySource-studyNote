'use strict'

function quePromise(extuc) {
    var self = this;
    // 保存this的引用
    this.data = "null";
    this.status = "padding";
    // dat为resolve传入的值，
    self.ResolveBack = [];

    // resolve的执行函数
    const resolve = (value) => {
        queueMicrotask(() => {
            // 延时后改变值
            //   将函数集都调用就可以了
            this.data = value;
            this.status = "resolve";
            self.ResolveBack.forEach((back) => {
                back(value);
            });
        });
    };

    // 将resolve函数传回去，由new promise的userPromise来调用
    extuc(resolve);
}

// then方法,在原型上添加
quePromise.prototype.then = function (onResolveBack) {
    var self = this;
    // 返回一个新的Promise
    return new quePromise((resolve) => {
        console.log(self.status + " status");
        // 往函数集力压入函数
        self.ResolveBack.push(() => {
            // 获取res

            console.log(self.status + " status");
            const res = onResolveBack(self.data);
            if (res instanceof quePromise) {
                // 依旧时将执行交给userPromise的then方法
                // 当userPromise执行resolve之后后面的链式调用才会执行
                res.then(resolve);
            } else {
                // 一个值的话就resolve，依次执行onResolveBack里面的函数
                resolve(res);
            }
        });
    });
};

Promise.resolve('2').then((res) => {
    console.log(res);
})

new quePromise((resolve) => {
    setTimeout(() => {
        resolve("sucess with myPro");
    }, 2000);
}).then((res) => {
    console.log(res + " ending");
    // 在这里输出最后的结果
    return new quePromise((resolve) => {
        resolve(res);
    });
});

const fn = new quePromise((resolve) => {
    setTimeout(() => {
        resolve("sucess with myPro");
    }, 2000);
}).then((res) => {
    return res + "ending";
});
console.log(fn.status, fn.data, "log");
