// create object by function
function Fun(name) {
    this.name = name
    // 构造函数写法
    // class Fun {
    // constructor(name) {
    //     this.name = name;
    //     // 构造函数写法
    //    }
    // }
}

Fun.prototype.age = "12"

let fun = new Fun("syh")
// 生成实例,这是函数的一种特使的使用方法，用作构造函数，可以转换为es6的constructor写法
console.log(fun);  //  Fun { name: 'syh' }

console.log(fun.__proto__);   //{ age: '12' }
// 他是指向构造它的原型对象，也就是Fun.prototype
console.log(Fun.prototype);   //{ age: '12' }
// 获得函数的原型对象
console.log(Fun.__proto__);   //{}

// 往prototype上添加属性
Fun.prototype.sex = "男"
console.log(fun);                           //Fun { name: 'syh' }
console.log(`fun.sex can get ${fun.sex}`);  //fun.sex can get 男

// 各个对象的constructor
console.log(Fun.constructor);              //[Function: Function]
console.log(fun.constructor);              //[Function: Fun]
console.log(fun.constructor.constructor);  //[Function: Function]
console.log(fun.__proto__.constructor);    //[Function: Fun]
console.log(fun.__proto__.__proto__.constructor);    //[Function: Object]

// 如果更改constructor的话，对象上有constructor属性
fun.constructor = "cons"
console.log(fun);  //Fun { name: 'syh', constructor: 'cons' }
console.log(fun.constructor);    //cons
console.log(fun.__proto__.constructor);  //[Function: Fun]