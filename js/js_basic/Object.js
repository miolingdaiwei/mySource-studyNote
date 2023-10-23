let obj = {
    getters: {
        work() {
            console.log("work");
        },
        getm() {
            console.log("m getted");
        }
    }
}

console.log(Object.keys(obj.getters));