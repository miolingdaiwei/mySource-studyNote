// const baseUser:User={
//     name
// }

// 原型模式，通过object.create()来创建对象

// class Fun {
//     constructor(name) {
//         this.name = name;
//     }
// }

function Fun(name) {
    this.name = name
}

console.log(Fun.prototype);
let fun = new Fun("bili")
console.log(fun.constructor);
console.log(Fun.constructor);