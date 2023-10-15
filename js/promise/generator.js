// function asyncToGenerator(generatorFunc) {
//   return function () {
//     const gen = generatorFunc.apply(this, arguments);
//     return new Promise((resolve, reject) => {
//       function step(key, arg) {
//         let generatorResult;
//         try {
//           generatorResult = gen[key](arg);
//         } catch (error) {
//           return reject(error);
//         }
//         const { value, done } = generatorResult;
//         if (done) {
//           return resolve(value);
//         } else {
//           return Promise.resolve(value).then(
//             (val) => step("next", val),
//             (err) => step("throw", err)
//           );
//         }
//       }
//       step("next");
//     });
//   };
// }

function* icecreamMaker() {
  // *表示声明一个generator函数
  // 声明机子里面有十个冰淇淋
  for (let i = 1; i <= 10; i++) {
    yield i;
  }
}

const func = icecreamMaker();

let val = func["next"]();
// 这是一种函数调用方式func[方法名]
val.value;

while (1) {
  const icecream = func.next();
  console.log(icecream);
  if (icecream.done) {
    break;
  }
}
