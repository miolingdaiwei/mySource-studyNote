let arr = [1, 3, "4"]

arr.push("5")
console.log(arr);  //[ 1, 3, '4', '5' ]
// push压入，往数组末尾添加元素

arr.shift()
console.log(arr);  //[ 3, '4', '5' ]
// shift 移除数组第一个元素

arr.unshift("7")
console.log(arr);   //[ '7', 3, '4', '5' ]
// 与shift相反，则是往数组首部添加元素

arr.pop()
console.log(arr);  //[ '7', 3, '4' ]
// 弹出数组的最后一个元素，和push相反