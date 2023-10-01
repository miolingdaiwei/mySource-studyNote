// 
let map = new Map()

map.set("s", 22)

map.set("t", 22)
for (const i of map) {
    console.log(i);
}

let map2 = new Map()
map2.set("s", 33)

map2.set("t", 242)
console.log(map.keys());
console.log(map2.size);
console.log(map.keys() == map2.keys.length);

// for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = i + 1; j < arr.length; i++) {
//         let t = true
//         for (const item of arr[i]) {
//             if (!arr[j].get(item[0]) === item[1]) {
//                 console.log(item)
//                 t = false;
//                 break;
//             }
//         }
//         num = t ? ++num : num;
//     }
// }