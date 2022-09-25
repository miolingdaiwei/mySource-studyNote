const person = {
  name: "syh",
  age: 18,
}

console.log(Reflect.get(person, 'age'));
Reflect.set(person, 'sex', "nan")
console.log(person);