## vue 的基本原理

创建 vue 实例的时候，vue 会遍历 data，用 Object.defineProperty(Proxy)将 data 内的属性转为 getter，setter 拦截，并跟踪相关依赖。每个组件都有 watcher 实例，在组件渲染中将属性记录为依赖，然后 setter 中通知 watcher 重新计算，形成更新。

## 双向数据绑定

一是数据发生变化，更新视图，而是视图的数据变化，更新数据。通过数据劫持和发布订阅模式来完成。

原理上简单来说由四个模块组成：

1. observer：监听**所有数据**的变化，当数据变化时，通过 wathcer 是否需要更新。
2. 订阅者 wathcher，拿到新的值和旧的值，可以收到属性变化的通知，执行函数来更新视图。
3. 消息订阅器 Dep：因为由多个 wather，因此需要 Dep 进行管理。
4. compile 解析器：扫描解析节点的相关指令，根据数据初始化数据。

## watch

监听一个或多个数据源，然后做出一些操作。即在响应式数据源更新后，执行一些操作。

## mvvm

mvc：：即 model-数据，view-视图，controller-控制器。controller 控制视图和数据的响应式更新。

mvvm：mvc 的加强版。即 model viewmodel view controller,这是因为 mvc 中 controller 往往变得十分冗杂，因此将 controller 中部分代码抽离，由 viewModel 来进行处理。

## slot 插槽

用于父子传递，是子组件的一个模板标签元素，渲染子组件的时候，若是遇到了 slot，那么就对子组件内的 slot 进行替换，替换的来源是父组件在 slot 中写的标签属性，标签内的 innerhtml。

## nexTick

本质上是 EventLoop 的应用。通过 mutationServer，promise，等异步任务来实现 vue 的异步。

## 响应式

我写了 reactive 到 computed 的代码，具体在 [响应式实现](../vue3-sourceCode/reactive.js)

这里简单梳理一下：

### 数据拦截

首先是数据绑定需要先进行数据拦截，通过 proxy 进行拦截。

```js
function Ractive(obj) {
  return new Proxy(obj, {
    // target是代理对象，key是读取或设置的属性名，receiver是创建出来的代理对象
    get(target, key, receiver) {
      // 收集依赖,可以收集多个依赖 一个数据源可以有多个依赖
      track(target, key);
      // 通过reflect来返回get值
      return Reflect.get(target, key, receiver);
    },
    set(target, key, newVal, receiver) {
      // 执行依赖
      trigger(target, key);
      Reflect.set(target, key, newVal, receiver);
    },
  });
}
```

proxy 将对象的读取通过 get 和 set 拦截到，然后用 reflect 来完成相应的读取操作。那么在 reflect 反射执行之前就可以进行副作用函数的相关处理。即 track 收集和 triggger 执行。

track 和 trigger 其实很简单，就是分别做将依赖存进对应的 set 内，取到对应的存储依赖的 set，执行 set 的每一项。其中 tracker 会判断 activeEffect 有没有值，没有就不需要执行。

```js
function track(target, key) {
  if (!sideEffect) return;
  // 当没有effect加入时不操作
  let depsMap = store.get(target); //返回一个map，这个map存储对象为target的所有依赖
  if (!depsMap) {
    store.set(target, (depsMap = new Map()));
    // weekMap读取到的map为空的话就为store添加，target为key，值为一个map，
  }

  let deps = depsMap.get(key);
  // 此时deps为Set  它存储了target上属性为key的所有依赖

  if (!deps) {
    // mao内添加set
    depsMap.set(key, (deps = new Set()));
  }

  deps.add(sideEffect); //e2 e1
  // 然后将依赖函数添加到set里面
}
```

先有 effect 再有 computed,watch，watchEffect。

### 副作用函数

effect 就是副作用函数，同时一个属性可能有多个副作用。因此需要一个数据结构来存储这些副作用。

> 副作用的存储结构： weekMap-存储组件内所有依赖，key 是对象，value 是这个对象的所有依赖，他是一个 map。
>
> map 存储单个对象的所有依赖，key 是属性名，value 是这个属性的所有依赖，值是 Set。
>
> set 存储单个属性的所有依赖，执行副作用的时候就遍历 Set 执行就可以了。

effect 代码则是较为复杂，绕一点的。我对代码进行了逐行分析注解

```js
function effect(fn) {
  const effectFn = () => {
    // 将Effect赋值和调用依赖函数写在里面也无所谓，因为set有去重的功能，而且依赖是永久添加的，但是会重复执行依赖
    //函数？为什么要多次执行依赖函数呢？
    sideEffect = effectFn;
    // trigger再次执行封装函数，fn()依赖函数被执行，又添加依赖e2，又添加依赖e1，但是set结构去重
    // 执行封装函数，再将封装函数赋给Effect
    effectStack.push(effectFn);
    // 入栈
    fn(); //执行依赖函数
    // 当依赖函数执行完毕之后，再弹出。此时栈顶是e2，栈底是e1，递归effect的新依赖再栈顶
    effectStack.pop();
    // 出栈栈顶，并将Effect回退
    sideEffect = effectStack[effectStack.length - 1];
  };
  effectFn();
  // 执行依次依赖函数，即是添加依赖函数！！！！
}

let p = Ractive(person);

let p1, p2;
effect(() => {
  // 依赖函数1
  // 1 依赖第一次赋值，执行，输出e1 done
  // 3 trigger执行，再次输出e1 done
  console.log("effect1 done");
  let effectFn = effect(() => {
    // 依赖函数2
    // 2，依赖又被改为effect2，输出e2 done
    console.log("effect2 done");
    // 4. trigger执行依赖，再次输出e2 done
    p2 = p.sex;
    // 依赖添加为e2
  });
  p1 = p.name;
  // 依赖添加，添加的是e2
  // 而如果是stack结构，依赖添加e1
  // effectFn()
});

p.name = "辉仔2";
// 执行trigger
```

总结来说其实 effect 其实很简单，只需要创建一个 effectFn 函数，函数里面对 activeEffect 进行赋值然后执行一次 effectFn 即可。当然对于 computed 这种需要延时的，需要将 effectFn 函数返回而不是立即执行。

## computed

计算属性，当数据更改时重新计算。当然是基于 effect 副作用去完成。

```js
// vue3的computed（计算属性） 有几个特点：能够获取新旧值，变值化时才执行，（不明显的一点，值没有发生改变，返回上次执行结果）
// 做一些改变来实现副作用,首先是想能够控制它不要立即执行，
// 使用computed时，我们会返回一个新的值，所以当立即执行时，需要获取返回值
function effect(fn, options = {}) {
  let effectFn = () => {
    sideEffect = effectFn;
    effectStack.push(effectFn);
    const res = fn();
    // 将回调函数的执行放在依赖函数里面。
    effectStack.pop();
    console.log("effect");
    sideEffect = effectStack[effectStack.length - 1];
    return res;
  };
  effectFn.options = options; //挂载options,是挂在副作用函数身上的？

  if (options.doNow) {
    // 如果为true，会先执行一次
    effectFn();
  }
  return effectFn;
  // 不管如何，最后都是将副作用函数返回
}
```

既然是延时的执行，那么就需要将 effectFn 返回，而不是立即执行。因为 eccectFn 本质就是执行回调函数。

```js
const computed = (getter) => {
  let res;
  const effectFn = effect(getter, {
    doNow: false,
  });
  const obj = {
    get value() {
      res = effectFn();
      return res;
    },
  };
  return obj;
};
```

然后将返回值保存在属性 value 中即可，调用时读取返回值的 value 属性。就可以读取到发生数据变化后新的计算属性的值。

## 生命周期

1. beforcreate
2. created
3. beforeMount
4. mounted
5. beforeUnmount
6. unmounted
7. 其中，mounted 之后，beforeUnmount 之间可以触发 beforeUpdate 和 updated。

在 created 之后可以访问 data 和函数，mounted 可以访问 dom 节点。

vue2 还有 destory 的两个周期函数，

那 vue3 就不太一样了，setup 替代了 create 的两个周期函数，mount 和 unmount的四个周期函数 一致，也有update的两个周期函数，没有 destory 的周期函数。但是有activted的两个周期函数，负责管理keep-alive组件。同时还有onrendertrack和onrendertrjgger的debug函数。

update本质上和watch一样通过发布订阅，依赖搜集实现，执行回调。

## keep-aive

用于缓存组件，返回页面，内容不变。


## SPA

simple page application单页面应用，相对的是多页面应用（MPA）。

>  只有一个主页面的应用，只需要加载一次css和js资源，后续单页面应用的跳转只需要刷新局部资源。SPA内模块组件化。

特点：

1. 可以使用hash模式，也可以使用history模式。他们的区别是history是h5的新API，hash的url有#号，且histroy二级路由刷新会404.
2. SPA比MPA进行页面切时会更块，加载资源更少，但当资源较多时需要优化。
3. 公用资源只需要加载一次。
4. SPA不利于SEO，但可以通过服务端渲染优化。
5. 可以实现全局变量，仓库，pinia，vuex
6. 前期开发成本高，后期易于维护。

## 视图更新

当数据绑定的数据更新后，vue并不会立即更新视图，而是会将依赖收集，存入数组，并去重，由于vue的异步更新，会在下一个nenxtick将回调函数一一取出并执行。


## minxin和extends

mixins提取公共代码，使用时直接将代码提取到当前组件内。

## 子组件能改变父组件的数据吗？

不能，vue提倡单向数据流，因为若更改了父组件的数据，可能prop的数据也会发生变化，导致错误，因此只能通过emit派发事件来更新父组件的数据。


## 渐进式框架

意思是使用框架时不强调必须完整使用框架或完全了解框架，而是可以一步一步递增的使用框架。

vue对比aguler和react。

## React和Vue

相同之处：

1. 都将注意力放在核心逻辑上，然后像状态管理，路由都交由相关库来完成。
2. 都有代码模板，自己的构建工具解析模板
3. 都有VitualDom，映射真实dom树。
4. 都有props
5. 都提倡组件化应用，将应用都拆分成一个一个的模块，且提高复用性

不同：

1. vue可以双向数据绑定，而react提倡单向数据绑定
2. vue可以更快计算vdom的差异，因为跟踪了每个组件的依赖，react默认不开启这个功能
3. react更贴近jsx、tsx
4. vue通过proxy进行数据劫持来更新数据，不需要过多操作就有很高的性能，而react通过比较引用的方式，需要优化，否则大量回流？
5. react可以通过HOC高阶组件进行扩展，而vue使用mixins。这是因为react组件本质就是函数，而vue是html模板解析。
6. react有reactNATIVE 原生跨平台。

## assets和static

assets下的资源文件会打包压缩后上传到static下，而static直接上传，文件体积较大


一般是template需要的资源文件放assets，第三方资源文件放入static


## delete和vue.delete

delete是删除变量，值变为空或underfined，而vue.delete直接删除数组 ，改变数组的键值。

## 模板编译原理

三步：解析，优化，生成

1. 首先通过大量正则，将模板内的标签，属性，指令，解析成抽象语法树AST
2. 优化：遍历AST，标记静态节点，方便diff算法跳过节点
3. 生成render函数

## mvvm的优缺点

有viewmodel层，让view和model隔离，可以独自进行更改而不互相影响，而是将改变收集起来，在下一个时间点依次执行。


能自动更新dom，依据双向数据绑定。


缺点：

1. bug难以调试，因为数据绑定，所以难以定位bug位置，不清楚是model层的错误还是view层的错误。
2. 当model(data)较大时,不释放可能会有较大的心智负担，以及不方便维护。

## v-for和v-if

for的优先级高于if  也就是当for和if同时出现时，会先执行for，再执行if。

想让for不执行就在外层套template，让if在这里执行。
