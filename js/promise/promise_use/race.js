const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("p1");
        resolve("111")
    }, 1000)
})

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("p2");
        resolve("222")
    }, 3000)
})



const res = Promise.race([p1, p2])
res.then((r) => {
    console.log(r);
})