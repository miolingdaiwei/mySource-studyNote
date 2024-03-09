function dispatch() {
    class work {
        constructor() {
            // 任务队列
            this.arr = []
            this.timer = true
        }

        println(p) {
            this.arr.push(() => { console.log(p) })
            // 添加输出任务到队列
            return this
        }

        wait(time) {
            this.arr.forEach(v => v())
            this.arr = []
            this.timer = false
            setTimeout(() => {
                console.log("三秒后");
                this.arr.forEach(v => v())
            }, time * 1000)
            return this
        }

        waitFirst(time) {
            this.timer = false
            setTimeout(() => {
                console.log("三秒后");
                this.arr.forEach(v => v())
            }, 3000)
            return this
        }
        exec() {
            if (this.timer) {
                this.arr.forEach((v) => {
                    v()
                })
            }
            return new work()
        }
    }
    return new work()
}

dispatch().println('a').exec()
dispatch().println('a').wait(3).println('b').exec()
dispatch().println('a').waitFirst(3).println('b').exec()
dispatch().println('a').println('b').exec()