function fun(params) {
    this.fname = "f"
    console.log("this is fun");
    return this.fname
}
fun.prototype.sex = "nan"

Function.prototype.age = 18

let f = new fun()   //this is fun
// constructor指向构造函数
console.log(f.constructor());  //this is fun   f
console.log(f.constructor.constructor);   //[Function: Function]  意思是是一个Function  且原型是Function
console.log(fun.prototype);    //{ sex: 'nan' }

// __proto__ 是指向原型的属性   函数就指向函数的原型  而对象就指向构造这个对象的函数的原型

console.log(Object.getPrototypeOf(fun));   //{ age: 18 }
console.log(fun.__proto__);                //{ age: 18 }


console.log(Object.getPrototypeOf(f));   //{ sex: 'nan' }
console.log(f.__proto__);                //{ sex: 'nan' }


console.log(Function.constructor);             //[Function: Function]
console.log(Function.prototype.constructor);   //[Function: Function]
console.log(Object.getPrototypeOf(f).constructor);   //[Function: fun]
//  也就是说原型也是对象，也有内存，也有constructor 

// 函数的原型链一律指向Object.prototype