class _Promise {
  private status: string = "padding";
  private value: any = null;
  private error: any = null;
  //   可以设置不同的类型value
  private onResolveCallback: Function[] = [];
  private onRejectCallback: Function[] = [];
  //   待执行的回调数组
  private extuc: Function;
  private self = this;
  constructor(extuc: Function) {
    this.extuc = extuc;
    try {
      //   this.extuc(this.resolve.bind(this), this.reject.bind(this));
      this.extuc(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }
  //   resolve，reject没什么好说的，异步存入微任务队列，如果有then，执行下一级的then方法
  public resolve = (val?: any) => {
    queueMicrotask(() => {
      if (this.status === "padding") {
        this.status = "resolve";
        this.value = val;
        this.onResolveCallback.forEach((f) => {
          f(this.value);
        });
      }
    });
  };

  public reject = (err?: any) => {
    queueMicrotask(() => {
      if (this.status === "padding") {
        this.status = "reject";
        this.error = err;
        this.onRejectCallback.forEach((f) => {
          f(this.error);
        });
      }
    });
  };

  //   ts的promise的then方法两个参数都是可传课不传的function，我这里也这样实现，并约束必须时传入函数，ts的promise也是一样的
  then = (onResolve?: Function, onReject?: Function) => {
    // 设置保存this
    const s = this.self;

    // 处理没有传参的情况，将它们处理未函数
    if (!onResolve) {
      onResolve = (v?: any): void => {};
    }
    if (!onReject) {
      onReject = (v?: any): void => {};
    }

    // reslove 我不知道它的调用时机，即什么情况下调用then方法时status为resolve，有小伙伴知道吗
    if (this.status === "resolve") {
      console.log("调用resolve");
      return new _Promise((resolve: Function, reject: Function) => {
        //需要异步
        queueMicrotask(() => {
          const res = (<Function>onResolve)(s.value);
          //因为onresolve已经确定是一个函数了，我们直接断言(<Function> 变量) 也可以 （变量 as Funtion）
          if (res === _Promise) {
            res.then(resolve, reject);
            // 处理传入的Promise链式调用，会将新的异步加入微任务队列
          } else {
            resolve(res);
            // resolve即可
          }
        });
      });
    }
    // reject同上
    if (this.status === "reject") {
      return new _Promise((resolve: Function, reject: Function) => {
        queueMicrotask(() => {
          if (onReject) {
            const res = onReject(this.error);
            if (res === _Promise) {
              res.then(resolve, reject);
            } else {
              reject(res);
            }
          } else {
            reject(this.error);
          }
        });
      });
    } else {
      // 剩下可以肯定是padding
      // 这里之所以没有异步执行，是为了先同步走完，然后再去执行微任务队列（resolve添加的）再来执行里面的代码
      return new _Promise((resolve: Function, reject: Function) => {
        // 他push的函数在微任务队列执行，而本身push这只是一个同步的任务，以此达到多级then（注意，不是同一级多个then）只要有一个改变状态，假设是resolve，后面就都是回调数组的执行是，status都是resolve
        this.self.onResolveCallback.push(() => {
          try {
            const res = (<Function>onResolve)(s.value);
            if (res instanceof _Promise) {
              // 如果返回了Promise，那么就让它执行下去
              res.then(resolve, reject);
            } else {
              resolve(res);
              //   不是就直接resolve，继续往下走
            }
          } catch (e) {
            reject(e);
          }
        });

        // 失败回调类似上面成功回调
        this.self.onRejectCallback.push(() => {
          try {
            if (!onReject) throw "wihout reject callback";
            const res = onReject(s.error);
            if (res instanceof _Promise) {
              // 如果返回了Promise，那么就让它执行下去
              //     ****还没有考虑返回的Promise的状态
              res.then(resolve, reject);
            } else {
              resolve(res);
              //   不是就直接resolve，继续往下走
            }
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  };

  static resolve = (val?: any) => {
    return new _Promise((resolve: Function, reject: Function) => {
      resolve(val);
    });
  };

  static reject = (err?: any) => {
    return new _Promise((resolve: Function, reject: Function) => {
      if (err) {
        reject(err);
      } else {
        reject();
      }
    });
  };
}

const s = Promise.resolve(2)
  .then(() => {
    console.log("s");
  })
  .then((res) => {
    setTimeout(() => {
      console.log(2);
    });
    queueMicrotask(() => {
      console.log(3);
    });
  });

const n = new _Promise((resolve: Function, reject: Function) => {
  setTimeout(() => {
    console.log("2秒后");
    resolve();
  }, 200);
})
  .then()
  .then(
    (res: any) => {
      setTimeout(() => {
        console.log("time");
      }, 20);
      console.log(res + "穿透后");
    },
    (err: any) => {
      console.log(err);
    }
  )
  .then(() => {
    console.log("resolve");
  });
n.then(
  () => {
    console.log("another then is resolve");
  },
  () => {
    console.log("another then is reject");
  }
);
