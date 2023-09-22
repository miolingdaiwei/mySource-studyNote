function throttle(fn, time = 500) {
    // time 时间内只执行一次函数
    let timer;
    return function (...args) {
        if (timer == null) {
            fn.apply(this, args)
            timer = setTimeout(() => { timer = null }, time)
        }
    }
}