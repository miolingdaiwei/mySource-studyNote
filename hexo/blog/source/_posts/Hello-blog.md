---
title: Hello blog
date: 2022-09-13 22:13:40
tags:
---

## Generator与async/await

##### 上一节提到过Async/await是基于Generator对Promise进行封装后的函数，返回一个Promise对象，并await暂停等待Promise执行resolve的结果。也说async/await实际上是Generator的一个语法糖。那么这里的暂停的效果就是通过generator来完成的

## generator

我这里就简单说一下（后面再专门出个Generator的文章）

> generator（生成器函数），假如有一个冰淇淋机，按按钮取一次，就得到一个冰淇淋，但是取掉的就不会再回去的，也就是冰淇淋总量减少，可以说是下标移动了。然后再取下一次，重复的取，而取的过程用户是需要等待，没有取出一个冰淇淋是不能做其他操作的。直到没有冰淇淋了，会提示没有冰淇淋了，再按按钮也没有反应。

这里的冰淇淋机就是生成器,取冰淇淋的操作就是.next()方法，而冰淇淋就是 yield ice。用一个案例展示一下：

```
function* icecreamMaker() {
  // *表示声明一个generator函数
  // 声明机子里面有十个冰淇淋
  for (let i = 1; i <= 10; i++) {
    yield i;
  }
}

const func = icecreamMaker();

while (1) {
  const icecream = func.next();
  console.log(icecream);
  if (icecream.done) {
    break;
  }
}
```

可以看到结果，done=true表示生成器被掏空了！

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ee11bc96f1c436db0f855ebea9e8e98~tplv-k3u1fbpfcp-watermark.image?)

简单的Generator就是这样子，其它诸如传参，跳转另一个生成器，next传参就不细说了。

## generator实现await

先来看async/await下的案例：

```
const getIce = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("ice-cream !!");
    }, 2000);
  });
};

async function iceCreater() {
  const ice1 = await getIce();
  console.log("this is " + ice1); //this is ice-cream!!
}
iceCreater();
```

那么试试将这里的await改为generator的代码吧！

```
const getIce = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("ice-cream !!");
    }, 2000);
  });
};

function* await_generator() {
  yield getIce();
}

const ice = await_generator();
const ice1 = ice.next().value;
//next()返回的结果对象上有两个熟悉，value为值，done是否完成

ice1.then((res) => {
  console.log(" this is " + res);  //延时2秒后输出 this is ice-cream!!
});
```

上面完成了await的等待的一个功能，即在生成器函数内部暂停等待Promise的resolve，然后异步得到结果。那么对于整个async函数，我们还需要做的就是将函数包成Promise对象，并且将结果Resolve了！

## async/await实现

#### 基于上面的代码，我们只需要递归的调用next方法遍历到所有的异步返回值就可以了

```
function asyncToGenerator(generatorFunc) {
  // 返回一个新函数，userFunc作为参数
  return function () {
    const gen = generatorFunc.apply(this, arguments);
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
          //并在成功回调里面继续递归getNext方法，把val(也就是ice.value)作为
          //生成器的下一个yield(也就是下一个ice-cream)
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
```

代码并不复杂，结合使用的案例做分析

```
const iceMaker = asyncToGenerator(function* ice() {
  yield new Promise((resolve) => {
    //在这里做延时，更好的分析
    setTimeout(() => {
      resolve("ice");
      //第一个ice,
    }, 2000);
  });
  const ice2 = yield Promise.resolve("ice-cream!!!");
  return ice2;
  //   return 的是最后resolve的ice2
});

iceMaker().then((res) => {
  console.log("this is " + res);  //结果是延时两秒后输出 this is ice-cream!!
});
```

> async/await的实现就到这啦.难点在于generator实现Await,通过Promise递归获取yield,以及generator的使用.

**读者大大们觉得写的不错的话点个赞再走哦 ♥♥♥  我们一起学习！一起进步!**
