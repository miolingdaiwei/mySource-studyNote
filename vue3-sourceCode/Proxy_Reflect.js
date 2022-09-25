const origin = {
    name: '鲨鱼辣椒',
    age: 25,
    gender: '男'
}
const handler = {
    // 相当于 get(o, p, p){return Reflect.get(o, p, p)}
    // 也可以简写为 get(){return Reflect.get(...arguments)}
    get: Reflect.get,
    set: Reflect.set,
    has: Reflect.has,
}

const proxy = new Proxy(origin, handler)

console.log(proxy.name) // 鲨鱼辣椒
console.log(proxy.age) // 25
proxy.age = 26
console.log(proxy.age) // 26
console.log('gender' in proxy) // true