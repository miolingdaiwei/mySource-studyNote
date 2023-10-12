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

function effect(fn) {
    const effectFn = () => {
        // 将Effect赋值和调用依赖函数写在里面也无所谓，因为set有去重的功能，而且依赖是永久添加的，但是会重复执行依赖
        //函数？为什么要多次执行依赖函数呢？
        sideEffect = effectFn;
        // trigger再次执行封装函数，fn()依赖函数被执行，又添加依赖e2，又添加依赖e1，但是set结构去重
        // 执行封装函数，再将封装函数赋给Effect
        effectStack.push(effectFn)
        // 入栈
        fn()//执行依赖函数 
        // 当依赖函数执行完毕之后，再弹出。此时栈顶是e2，栈底是e1，递归effect的新依赖再栈顶
        effectStack.pop()
        // 出栈栈顶，并将Effect回退
        sideEffect = effectStack[effectStack.length - 1]
    }
    effectFn(); //第一次执行
    // 执行依次依赖函数，即是添加依赖函数！！！！
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
    // 依赖函数1
    // 1 依赖第一次赋值，执行，输出e1 done 
    // 3 trigger执行，再次输出e1 done
    console.log('effect1 done');
    let effectFn = effect(() => {
        // 依赖函数2
        // 2，依赖又被改为effect2，输出e2 done
        console.log('effect2 done');
        // 4. trigger执行依赖，再次输出e2 done
        p2 = p.sex
        // 依赖添加为e2
    })
    p1 = p.name
    // 依赖添加，添加的是e2
    // 而如果是stack结构，依赖添加e1
    effectFn()
})

const watch = (obj, callBack) => {
    obj
}

p.name = "辉仔2"
// 执行trigger


// effect1 done
// effect2 done
// effect1 done
// effect2 done