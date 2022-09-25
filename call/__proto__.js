class Father {
  constructor(name) {
    this.name = name;
  }
}

Father.prototype.age = 18;
const person1 = new Father("p1");
const person2 = new Father("p2");
console.log(Father.prototype);
console.log(person1.name);
console.log(person1.age);
let aa = {
  sex: "nan",
};
console.log(person1.__proto__, 22);
console.log(person2.__proto__);
console.log(aa.__proto__);
class Child extends Father {
  constructor() {
    super("papa");
    this.age = "18";
  }
}

function fuu() {}
console.log(fuu.__proto__ == Object.prototype);
console.log(fuu.__proto__ == Function.prototype);
