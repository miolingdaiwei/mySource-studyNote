document.getElementById("btn").addEventListener("click", function () {
  const i = Math.ceil(Math.random() * 100);
  console.log(i);

  // 注释一下啊：  resolve和reject是提前在Promise函数里面声明好的，然后通过执行器函数执行当前参数的这个，方法，然后resolve由当前这个函数来选择调用。
  const p = new Promise((resolve, reject) => {
    this.promise;
    if (i <= 30) {
      resolve("中奖啦");
    } else {
      reject("很遗憾，没有中奖");
    }
    // Promise状态改变且只能改变一次  resolve，reject，抛出错误
    // 成功或者失败回调有多个也会都调用
  }).then(
    (res) => {
      alert(res);
    },
    (req) => {
      alert(req);
    }
  );
  console.log(p);
  //   p.then(
  //     () => {
  //       alert("中奖啦");
  //     },
  //     () => {
  //       alert("很遗憾，没有中奖");
  //     }
  //   );
  //   alert(i <= 30 ? "中将啦！！" : "很遗憾，没有中奖");
});
