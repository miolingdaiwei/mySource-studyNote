function A() {
    this.name = 'tom'
    this.color = ['yellow', 'green']
}

function B() {
}

B.prototype = new A()

const b1 = new B()
const b2 = new B()


b1.name = 'jack'
b1.color.push('red')
console.log(b2.name);  // tom
console.log(b2.color);   // [ 'yellow', 'green', 'red' ]
console.log(b1);   // A { name: 'jack' }
console.log(b2);   // A {}

console.log(Object.getPrototypeOf(b1) === Object.getPrototypeOf(b2));  // true


//   简而言之  name更改之后b1实例上有了name属性，不会往原型链上找，而b2.color.push只是对原型对象上的属性的数组进行更改。不影响实例对象。


// 这是因为在JavaScript中，对象属性的访问和修改涉及原型链的概念。

// 在给对象b1添加属性时，JavaScript首先查找b1自身是否具有该属性。如果b1自身没有该属性，则会沿着原型链往上查找，直到找到具有该属性的对象或到达原型链的顶端。一旦找到具有该属性的对象，就会在该对象上进行修改或赋值。

// 对于b1.name = 'jack'这行代码，b1自身没有name属性，因此它会沿着原型链查找，找到A.prototype上的name属性，并将其修改为'jack'。这样，b1就拥有了自己的name属性，它会覆盖原型链上的同名属性。

// 而对于b1.color.push('red')这行代码，b1自身没有color属性，因此它会沿着原型链查找，找到A.prototype上的color属性，然后对该属性进行修改。由于color属性是一个数组，push操作会修改原数组，而不是创建一个新的数组。因此，无论哪个实例对color属性进行修改，都会影响到原型链上的同一个数组。

// 因此，更改name属性会在自己的实例上进行更改，而对于数组等可变对象，修改操作会直接作用在原型对象上，因为它们共享同一个引用。