let person = {
    name: "stg",
    sex: "女"
}

person.age = 18
// console.log(person.age);


Reflect.set(person, "address", "njit")

console.log(person);   //{ name: 'stg', sex: '女', age: 18, address: 'njit' }
// console.log(person.address);
