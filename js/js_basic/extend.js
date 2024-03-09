// 原型链继承

function Fun() {
    this.sex = "男"
}
Fun.prototype.fname = "ss"


function SonFun() {
    this.age = 18
}

SonFun.prototype = new Fun()

console.log(Object.getPrototypeOf(SonFun));

// son函数的原型等于Fun的实例对象
// 就是说son的原型对象是Fun的实例对象

console.log(SonFun.prototype.constructor);   //[Function: Fun]
// 那么子函数的原型的构造函数也就是父函数
let son = new SonFun()
console.log(son.sex);   //男



//  -------------------------------
function Son2() {
    Fun.call(this)
    // 相对于java的super（）  执行父函数这个构造函数
    this.age = 17
}
// 通过构造函数来继承
let s2 = new Son2()
console.log(s2.sex);   //男

//  ----------------------------------
// 完美继承 --  寄生组合式继承

function extend(supFun, sonFun) {
    let prototype = Object(supFun.prototype)   //创建对象  以父函数的原型对象创建一个对象，他能够拥有父原型上的所有属性
    prototype.constructor = supFun;              // 再将这个对象的构造函数指向父函数
    sonFun.prototype = prototype               // 最后将子函数的原型等于创建的对象
    // 总的来说就是等价于sonFun的原型是通过new supFun得到的一个对象
}

function Son3() {
    Fun.call(this)
    console.log("s3 son constructoe");
}
extend(Fun, Son3)
let s3 = new Son3()
console.log(s3.fname);   //  可以读取父函数原型上的值   s3对象上没找到，然后找原型链上，即Son3.prototype  然后找到了
console.log(s3.sex);     //  通过构造函数继承，可以读取公有变量

console.log(Object.getPrototypeOf(s3));   // 原型链拿到的也是父函数的原型对象
