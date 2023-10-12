// let p1 = Promise.resolve('aaa')
// let p2 = Promise.resolve('bbb')
// // let p3 = Promise.reject('ccc')  //ccc
// let p3 = Promise.resolve('ccc')    //[ 'aaa', 'bbb', 'ccc', 'ddd' ]
// let p4 = Promise.resolve('ddd')
// Promise.all([p1, p2, p3, p4]).then(res => {
//     console.log(res); //返回数组
// }).catch(err => {
//     console.log(err);
// })

// // 若有rejected 则返回失败，否则返回成功数组

let p1 = Promise.resolve("aaa2")   //成功 aaa2
// let p1 = Promise.reject('aaa')  //失败 aaa
let p2 = Promise.resolve('bbb')
let p3 = Promise.reject('ccc')
let p4 = Promise.resolve('ddd')
Promise.race([p1, p2, p3, p4]).then(res => {
    console.log('成功', res); //返回数组
}).catch(err => {
    console.log('失败', err);
})

// race  赛跑，那个先执行完成返回那个