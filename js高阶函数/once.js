function once(fn) {
    return function (...args) {
        // fn=null后不执行
        if (fn) {
            const ret = fn.apply(this, args)
            fn = null
            // 将执行的fn设为null
            return ret
        }
    }
}

// once(() => {
//     console.log("log");
// })()
// once(() => {
//     console.log("log");
// })()

// 上面这种执行，每次once执行时都是定义乐一个新的fn

const myLog = once(() => {
    console.log("log");
})

myLog();
myLog();
myLog();

const myLog2 = once((a, b) => console.log(a + b))
myLog2("a", "b")
myLog2("a", "c")
myLog2("a", "b")
// 而这种执行方式，由于闭包，fn是同一个fn。