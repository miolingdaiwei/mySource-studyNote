function debounce(fn, dur) {
    // dur时间内,再次触发重新计时
    var timer;
    dur = dur || 100;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, dur)
        // 每次调用都重新生成延时任务
    }
}