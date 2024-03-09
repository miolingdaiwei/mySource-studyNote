let a = [1, 2, 3]

// const b = new Array()
// const b = Array.from(a)
const b = [...a]
console.log(b);


nestedNumbers = [[1], [2]];
numbersCopy = [...nestedNumbers];

numbersCopy[0].push(300);

// 通过赋值运算符或者展开运算符都是浅拷贝
console.log(nestedNumbers, numbersCopy);
// [[1, 300], [2]]
// [[1, 300], [2]]