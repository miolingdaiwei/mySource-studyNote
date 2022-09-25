// Object.defineProperty，该方法接收三个参数
// obj：添加新属性的对象
// property：要添加的属性
// descriptor：新属性的描述
var person = {
    name: "syh"
};
Object.defineProperty(person, "age", {
    value: 3,
    writable: true,
    configurable: true,
    enumerable: true
});
Object.defineProperty(person, "sex", {
    get: function () {
        return "男";
        console.log("get");
    },
    set: function (v) {
        console.log("set " + v);
    }
});
console.log(person, person.sex);
