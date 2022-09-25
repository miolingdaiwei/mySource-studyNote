function asyncToGenerator(generatorFunc) {
  // 返回一个新函数，userFunc作为参数
  return function () {
    const gen = generatorFunc.apply(this, arguments);
    // 意思是把generator放到this环境里面执行，并且将参数传进去
    // 生成器函数的构造 等价于 const gen=generatorFunc(arguments);
    return new Promise((resolve, reject) => {
      // 返回的Promise对象
      function getNext(key, arg) {
        let ice;
        // 得到的generator执行后的结果
        // 套try/catch防止出错,出错reject也可以提高Promise的catch捕获错误
        try {
          ice = gen[key](arg);
          //  这是一种函数的调用方式 gen[函数名](参数)  等价于gen.next(arg)
        } catch (error) {
          return reject(error);
        }
        if (ice.done) {
          return resolve(ice.value);
          //   如果done是true,直接将最后的结果resolve
        } else {
          // 否则继续递归,调用then方法继续异步getNext
          // 使用then方法将实现await一个一个执行的效果
          return Promise.resolve(ice.value).then(
            (val) => {
              getNext("next", val);
            },
            (err) => getNext("throw", err)
          );
        }
      }
      // ***  主要实现操作都在step函数上  ***
      getNext("next");
    });
  };
}

const iceMaker = asyncToGenerator(function* ice() {
  yield new Promise((resolve) => {
    setTimeout(() => {
      resolve("ice");
    }, 2000);
  });
  const ice2 = yield Promise.resolve("ice-cream!!!");
  return ice2;
  //   return 是最后resolve的value
});

iceMaker().then((res) => {
  console.log("this is " + res);
});
