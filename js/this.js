let outThis = {
    sex: "syh",
    age: 18,
    inThis: function () {
        this.name = "tt"
        console.log(this.age, this.sex);
        console.log(this.name);
    },
    logName: function () {
        console.log("outThis - name is :" + this.name);
    }
}

outThis.inThis()
outThis.logName()
console.log(outThis);

// 输出
// 18 syh
// tt
// outThis - name is :tt
// {
//   sex: 'syh',
//   age: 18,
//   inThis: [Function: inThis],
//   logName: [Function: logName],
//   name: 'tt'
// }

let obj = {
    name: "syh",
    outNmae: () => {
        this.sex = 18;
        console.log(this.name);
        console.log(this.sex);
    }
}
obj.outNmae()
// undefined
// 18