## vue的基本原理

创建vue实例的时候，vue会遍历data，用Object.defineProperty(Proxy)将data内的属性转为getter，setter拦截，并跟踪相关依赖。每个组件都有watcher实例，在组件渲染中将属性记录为依赖，然后setter中通知watcher重新计算，形成更新。

## 双向数据绑定

一是数据发生变化，更新视图，而是视图的数据变化，更新数据。通过数据劫持和发布订阅模式来完成。

原理上简单来说由四个模块组成：

1. observer：监听**所有数据**的变化，当数据变化时，通过wathcer是否需要更新。
2. 订阅者wathcher，拿到新的值和旧的值，可以收到属性变化的通知，执行函数来更新视图。
3. 消息订阅器Dep：因为由多个wather，因此需要Dep进行管理。
4. compile解析器：扫描解析节点的相关指令，根据数据初始化数据。

## watch

监听一个或多个数据源，然后做出一些操作。即在响应式数据源更新后，执行一些操作。

## mvvm

mvc：：即model-数据，view-视图，controller-控制器。controller控制视图和数据的响应式更新。

mvvm：mvc的加强版。即model viewmodel view controller,这是因为mvc中controller往往变得十分冗杂，因此将controller中部分代码抽离，由viewModel来进行处理。

## slot插槽

用于父子传递，是子组件的一个模板标签元素，渲染子组件的时候，若是遇到了slot，那么就对子组件内的slot进行替换，替换的来源是父组件在slot中写的标签属性，标签内的innerhtml。

## nexTick

本质上是EventLoop的应用。通过mutationServer，promise，等异步任务来实现vue的异步。


## 响应式

我写了reactive到computed的代码，具体在 [响应式实现](../vue3-sourceCode/reactive.js)

这里简单梳理一下：

### 数据拦截

首先是数据绑定需要先进行数据拦截，通过proxy进行拦截。


```js
function Ractive(obj) {
    return new Proxy(obj, {
        // target是代理对象，key是读取或设置的属性名，receiver是创建出来的代理对象
        get(target, key, receiver) {
            // 收集依赖,可以收集多个依赖 一个数据源可以有多个依赖
            track(target, key)
            // 通过reflect来返回get值
            return Reflect.get(target, key, receiver)
        },
        set(target, key, newVal, receiver) {
            // 执行依赖
            trigger(target, key)
            Reflect.set(target, key, newVal, receiver)
        }
    })
}
```

proxy将对象的读取通过get和set拦截到，然后用reflect来完成相应的读取操作。那么在reflect反射执行之前就可以进行副作用函数的相关处理。即track收集和triggger执行。


track和trigger其实很简单，就是分别做将依赖存进对应的set内，取到对应的存储依赖的set，执行set的每一项。其中tracker会判断activeEffect有没有值，没有就不需要执行。

```js
function track(target, key) {
    if (!sideEffect) return;
    // 当没有effect加入时不操作
    let depsMap = store.get(target)    //返回一个map，这个map存储对象为target的所有依赖
    if (!depsMap) {
        store.set(target, (depsMap = new Map()))
        // weekMap读取到的map为空的话就为store添加，target为key，值为一个map，
    }

    let deps = depsMap.get(key)
    // 此时deps为Set  它存储了target上属性为key的所有依赖

    if (!deps) {
        // mao内添加set
        depsMap.set(key, (deps = new Set()))
    }

    deps.add(sideEffect)  //e2 e1
    // 然后将依赖函数添加到set里面
}
```

先有effect再有computed,watch，watchEffect。

### 副作用函数

effect就是副作用函数，同时一个属性可能有多个副作用。因此需要一个数据结构来存储这些副作用。

> 副作用的存储结构：  weekMap-存储组件内所有依赖，key是对象，value是这个对象的所有依赖，他是一个map。
>
> map存储单个对象的所有依赖，key是属性名，value是这个属性的所有依赖，值是Set。
>
> set存储单个属性的所有依赖，执行副作用的时候就遍历Set执行就可以了。

effect代码则是较为复杂，绕一点的。我对代码进行了逐行分析注解

```js
function effect(fn) {
    const effectFn = () => {
        // 将Effect赋值和调用依赖函数写在里面也无所谓，因为set有去重的功能，而且依赖是永久添加的，但是会重复执行依赖
        //函数？为什么要多次执行依赖函数呢？
        sideEffect = effectFn;
        // trigger再次执行封装函数，fn()依赖函数被执行，又添加依赖e2，又添加依赖e1，但是set结构去重
        // 执行封装函数，再将封装函数赋给Effect
        effectStack.push(effectFn)
        // 入栈
        fn()//执行依赖函数 
        // 当依赖函数执行完毕之后，再弹出。此时栈顶是e2，栈底是e1，递归effect的新依赖再栈顶
        effectStack.pop()
        // 出栈栈顶，并将Effect回退
        sideEffect = effectStack[effectStack.length - 1]
    }
    effectFn();
    // 执行依次依赖函数，即是添加依赖函数！！！！
}
```
