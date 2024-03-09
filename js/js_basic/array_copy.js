//  array  的 拷贝的各种方式

// 浅拷贝 
let a = [1, 2, 3]

// const b = new Array()
// const b = Array.from(a)
const b = [...a]
console.log(b);

let nestedNumbers = [[1], [2]];
let numbersCopy = [...nestedNumbers];

numbersCopy[0].push(300);

// 通过赋值运算符或者解构运算符都是浅拷贝
console.log(nestedNumbers, numbersCopy);
// [[1, 300], [2]]
// [[1, 300], [2]]

let map = nestedNumbers.map(((v) => v))
nestedNumbers[0].push(400)
console.log(map);


// 深拷贝
// 两种方式,JSON和递归遍历  但都有自己的缺点   json需要单独处理null和underfind

const jsonDeepycopy = (obj) => {
    if (obj === null || obj === undefined)
        return obj
    return JSON.parse(JSON.stringify(obj))
}

const RecursionDeepcopy = (obj) => {
    let cloneObj = {}
    if (typeof obj === "object" && obj) {
        for (const i of obj) {
            const val = obj[i]
            if (typeof val === "object") {
                cloneObj[i] = RecursionDeepcopy(val)
            } else {
                cloneObj[i] = val
            }
        }
        return cloneObj
    } else {
        return obj
    }
}

let co1 = jsonDeepycopy(a)
console.log(co1);



// 完美递归克隆
function deepClone(target) {
    // WeakMap作为记录对象Hash表（用于防止循环引用）
    const map = new WeakMap()

    // 判断是否为object类型的辅助函数，减少重复代码
    function isObject(target) {
        return (typeof target === 'object' && target) || typeof target === 'function'
    }

    function clone(data) {

        // 基础类型直接返回值
        if (!isObject(data)) {
            return data
        }

        // 日期或者正则对象则直接构造一个新的对象返回
        if ([Date, RegExp].includes(data.constructor)) {
            return new data.constructor(data)
        }

        // 处理函数对象
        if (typeof data === 'function') {
            return new Function('return ' + data.toString())()
        }

        // 如果该对象已存在，则直接返回该对象
        const exist = map.get(data)
        if (exist) {
            return exist
        }

        // 处理Map对象
        if (data instanceof Map) {
            const result = new Map()
            map.set(data, result)
            data.forEach((val, key) => {
                // 注意：map中的值为object的话也得深拷贝
                if (isObject(val)) {
                    result.set(key, clone(val))
                } else {
                    result.set(key, val)
                }
            })
            return result
        }

        // 处理Set对象
        if (data instanceof Set) {
            const result = new Set()
            map.set(data, result)
            data.forEach(val => {
                // 注意：set中的值为object的话也得深拷贝
                if (isObject(val)) {
                    result.add(clone(val))
                } else {
                    result.add(val)
                }
            })
            return result
        }

        // 收集键名（考虑了以Symbol作为key以及不可枚举的属性）
        const keys = Reflect.ownKeys(data)
        // 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述
        const allDesc = Object.getOwnPropertyDescriptors(data)
        // 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝
        const result = Object.create(Object.getPrototypeOf(data), allDesc)

        // 新对象加入到map中，进行记录
        map.set(data, result)

        // Object.create()是浅拷贝，所以要判断并递归执行深拷贝
        keys.forEach(key => {
            const val = data[key]
            if (isObject(val)) {
                // 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝
                result[key] = clone(val)
            } else {
                result[key] = val
            }
        })
        return result
    }

    return clone(target)
}



// 测试
const clonedObj = deepClone(obj)
clonedObj === obj  // false，返回的是一个新对象
clonedObj.arr === obj.arr  // false，说明拷贝的不是引用
clonedObj.func === obj.func  // false，说明function也复制了一份
clonedObj.proto  // proto，可以取到原型的属性
