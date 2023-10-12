let store = new WeakMap()
const effectStack = []
let sideEffect;
function Ractive(obj) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            track(target, key)
            return Reflect.get(target, key, receiver)
        },
        set(target, key, newVal, receiver) {
            trigger(target, key)
            console.log('trigger');
            Reflect.set(target, key, newVal, receiver)
        }
    })
}

function track(target, key) {
    if (!sideEffect) return;
    let depsMap = store.get(target)
    if (!depsMap) {
        store.set(target, (depsMap = new Map()))
    }
    let deps = depsMap.get(key)
    if (!deps) {
        depsMap.set(key, (deps = new Set()))
    }
    console.log("add effect");
    deps.add(sideEffect)
}

function trigger(target, key) {

    let depsMap = store.get(target);
    if (!depsMap) return
    const effects = depsMap.get(key)
    const effectsDo = new Set()
    console.log('ss');
    effects && effects.forEach((effectFn) => {
        if (effectFn !== sideEffect) {
            effectsDo.add(effectFn)
        }
    })
    effectsDo.forEach(effect => {
        console.log('effect is todo');
        if (effect.options.scheduler) {
            console.log('scheduler');
            // 当有scheduler时给调度器调度
            effect.options.scheduler(effect)
            // 将effect传给调度器调用
        } else {
            console.log('effect()');
            effect()
        }
    })
}
// vue3的computed（计算属性） 有几个特点：能够获取新旧值，变值化时才执行，（不明显的一点，值没有发生改变，返回上次执行结果）
// 做一些改变来实现副作用,首先是想能够控制它不要立即执行，
// 使用computed时，我们会返回一个新的值，所以当立即执行时，需要获取返回值
function effect(fn, options = {}) {
    // options 默认空对象
    let effectFn = () => {
        sideEffect = effectFn;
        effectStack.push(effectFn)
        const res = fn()
        effectStack.pop()
        console.log("effect");
        sideEffect = effectStack[effectStack.length - 1]
        return res;
        // 依赖函数的返回值，也是computed的结果，需要就获取它
        // 立即执行
        // return;
    }
    effectFn.options = options  //挂载options,是挂在副作用函数身上的？

    if (options.doNow) {
        // 如果为true，会先执行一次
        effectFn()
    }
    return effectFn;
    // 不管如何，最后都是将副作用函数返回
}



const computed = (getter) => {
    let isRun = true, res;
    // res 是conputed返回的结果，当读取value时，会执行函数，isrun为true就执行并返回依赖函数执行的结果，然后设置为false
    // 而当
    const effectFn = effect(getter, {
        doNow: false,
        scheduler(func) {
            isRun = true;
            console.log('scheduler');
            const res2 = func()
            console.log(res2);
            trigger(obj, 'value')
        }
    })
    const obj = {
        get value() {
            if (isRun) {
                res = effectFn()
                isRun = false
            }
            track(obj, 'value')
            return res
        }
    }
    return obj;
}

let person1 = Ractive({
    name: "辉仔",
    sex: "男",
    age: 19
})

const res = computed(() => {
    console.log('重新计算');
    return person1.name + person1.sex
})
// console.log(person1.name)
person1.name = "shh"
console.log(res.value);




// 当执行computed或者watcheffect时，computed函数会执行生成依赖

