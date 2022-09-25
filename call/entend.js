class Father {
  constructor(work) {
    this.work = work;
  }
  toString() {
    console.log(this.work);
  }
}

class Child extends Father {
  constructor(work) {
    super(work);
  }
}

function Sub() {}
// Sub继承了Super
Sub.prototype = new Father();
Sub.prototype.constructor = Sub;

const sub = new Sub();
const son = new Child("earn money", "ultraman");

console.log(Father.prototype === Child.__proto__);
console.log(son.__proto__ === Father.prototype);
console.log(Father.__proto__ === Function.prototype);
console.log(Sub.__proto__ === Father.prototype);
console.log(sub.__proto__.__proto__ === Father.prototype);
