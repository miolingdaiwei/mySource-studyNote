console.log(1);

setTimeout(() => {
    console.log(2);
});

let p = new Promise((resolve) => {
    console.log("resolve 前");
    resolve(3);
    console.log("resolve 后");
});
p.then((res) => console.log(res))

process.nextTick(() => {
    console.log(4);
});

setTimeout(() => {
    console.log(5);
});

Promise.resolve(6).then((res) => console.log(res));

process.nextTick(() => {
    console.log(7);
});

console.log(8);
