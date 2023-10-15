let store = new WeakMap()
// weakMap是只能用对象作为键的Map，能够为多个对象添加绑定
const effectStack = []   //依赖数组
let sideEffect;
// 也叫activeEffect，指的是被添加的effect   没有依赖时是null
// 副作用函数
function Ractive(obj) {
    return new Proxy(obj, {
        // target是代理对象，key是读取或设置的属性名，receiver是创建出来的代理对象
        get(target, key, receiver) {
            // 收集依赖,可以收集多个依赖 一个数据源可以有多个依赖
            track(target, key)
            // 通过reflect来返回get值
            return Reflect.get(target, key, receiver)
        },
        set(target, key, newVal, receiver) {
            // 执行依赖
            trigger(target, key)
            Reflect.set(target, key, newVal, receiver)
        }
    })
}

function track(target, key) {
    if (!sideEffect) return;
    // 当没有effect加入时不操作
    let depsMap = store.get(target)    //返回一个map，这个map存储对象为target的所有依赖
    if (!depsMap) {
        store.set(target, (depsMap = new Map()))
        // weekMap读取到的map为空的话就为store添加，target为key，值为一个map，
    }

    let deps = depsMap.get(key)
    // 此时deps为Set  它存储了target上属性为key的所有依赖

    if (!deps) {
        // mao内添加set
        depsMap.set(key, (deps = new Set()))
    }

    deps.add(sideEffect)  //e2 e1
    // 然后将依赖函数添加到set里面
}

function trigger(target, key) {
    let depsMap = store.get(target);
    if (!depsMap) return
    const effects = depsMap.get(key)
    // 这是set
    const effectsDo = new Set()
    effects && effects.forEach((effectFn) => {
        if (effectFn !== sideEffect) {
            // 判断是否是当前正在执行的副作用函数，避免出现递归栈溢出
            effectsDo.add(effectFn)
        }
    })
    effectsDo.forEach(effect => effect())
    // 将set里面的依赖函数依次执行
}

// 原理就是外层依赖添加，然后执行回调，内层依赖添加，再执行回调，再pop内层依赖，再pop外层
function effect(fn) {

    const effectFn = () => {
        // 将Effect赋值和调用依赖函数写在里面也无所谓，因为set有去重的功能，而且依赖是永久添加的，但是会重复执行依赖
        sideEffect = effectFn;
        // 依赖赋值
        effectStack.push(effectFn)
        // 依赖数组push
        fn()
        //执行回调函数 
        // 当依赖函数执行完毕之后，再弹出。此时栈顶是e2，栈底是e1，递归effect的新依赖再栈顶
        effectStack.pop()
        // 出栈栈顶，并将Effect回退
        sideEffect = effectStack[effectStack.length - 1]
    }

    effectFn();
    // return effectFn   返回，用于computed和watch进行调用执行
}

let person = {
    name: "辉仔",
    sex: "nan",
    age: 28
}
let p = Ractive(person)
let p1, p2;
effect(() => {
    console.log('effect1 done');
    effect(() => {
        console.log('effect2 done');
        p2 = p.sex
        // 触发track
    })
    p1 = p.name
    // 触发track
})

p.name = "辉仔2"
// 执行trigger