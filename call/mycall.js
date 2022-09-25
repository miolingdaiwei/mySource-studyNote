let obj = {
  name: "p2",
  age: 20,
};

function Person1() {
  this.name = "p1";
  this.age = 18;
}
const person1 = new Person1();

function useCall(args) {
  console.log(
    `person name is ${this.name} and person age is ${this.age} and he/she is ${args}`
  );
}

useCall.call(person1, "taeacher");
useCall.call(obj, "taeacher");
