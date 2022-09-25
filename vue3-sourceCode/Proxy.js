// Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

// Proxy用于给源对象增设一层代理对象,任何对**代理对象**的操作为都会被Proxy拦截。

const person = {
    name: "syh",
    age: 18
}
// []、.、Object.create获取代理对象

// 源对象
// 本次访问的属性
// 代理对象

const proxy = new Proxy(person, {
    get(target, handler, receiver) {
        console.log("get");
        return target[handler];
    },
    set(target, handler, newVal, receiver) {
        console.log("set");
        target[handler] = newVal
    }
})

console.log(proxy.age);
proxy.sex = "男"
console.log(proxy);