function Pro(fn) {
  this.onResolvedBack = [];

  const resolve = (value) => {
    setTimeout(() => {
      this.data = value;
      this.onResolvedBack.forEach((cb) => cb(value));
    });
  };

  fn(resolve);
}

Pro.prototype.then = function (onResolved) {
  return new Promise((resolve) => {
    this.onResolvedBack.push(() => {
      const res = onResolved(this.data);
      if (res instanceof Promise) {
        res.then(resolve);
      } else {
        resolve(res);
      }
    });
  });
};

new Pro((resolve, reject) => {
  setTimeout(() => {
    resolve("sucess");
  }, 2000);
}).then((res) => {
  console.log(res);
});
