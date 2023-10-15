const obj = {
    name: "syh"
}

let val = ""
Object.defineProperty(obj, "sex", {
    get() {
        return newVal
        // return document.getElementbyid....
    },
    set(newVal) {
        // ...
        val = newVal
        // 将input的值改为newval
    }
})