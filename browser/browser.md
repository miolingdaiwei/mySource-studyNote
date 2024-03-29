## 浏览器模式

目前浏览器的排版引擎使用三种模式：怪异模式（Quirks mode）、接近标准模式（Almost standards mode）、以及标准模式（Standards mode）。

在**怪异模式**下，排版会模拟 Navigator 4 与 Internet Explorer 5 的非标准行为。

DOCTYPE 决定排版模式

```
<!doctype html>
```

标准模式

## 盒子模型

盒模型包括：content，padding，border，margin。标准盒模型的大小是 content，ie 盒模型的大小包括 content，padding，border。

对于兄弟元素，他们的 margin 会合并，一般就是取相邻边的两个 margin 的最大值。

通过 box-sizing：border-box 可以将盒子设置为 ie 盒模型。

## BFC

一个块格式化上下文（block formatting context）。具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

**触发 BFC：**

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

**注意根元素就创建了个 BFC**

bfc 一个常见用法是解决外边距合并。

## 浏览器渲染优化

两种路径：

> 优化 js，通过给 script 标签添加 async 属性，这样不会影响 html 解析。

> 优化 css，遇到 link 标签时，会向服务器发起请求，这样会暂停 dom 渲染和 js 执行。可以让给 link 放在 head 内尽早加载 css，以及合并 css，避免多次请求 css 资源。

**HTTP 缓存**

浏览器自带了 HTTP 缓存的功能，只需要确保每个服务器响应的头部都包含了以下的属性：

**1）ETag** ： ETag 是一个传递验证令牌，它对资源的更新进行检查，如果资源未发生变化时不会传送任何数据。当浏览器发送一个请求时，会把 ETag 一起发送到服务器，服务器会根据当前资源核对令牌（ETag 通常是对内容进行 Hash 后得出的一个指纹），如果资源未发生变化，服务器将返回 304 Not Modified 响应，这时浏览器不必再次下载资源，而是继续复用缓存。

**2）Cache-Control** ： Cache-Control 定义了缓存的策略，它规定在什么条件下可以缓存响应以及可以缓存多久。

**a、no-cache** ： no-cache 表示必须先与服务器确认返回的响应是否发生了变化，然后才能使用该响应来满足后续对同一网址的请求（每次都会根据 ETag 对服务器发送请求来确认变化，如果未发生变化，浏览器不会下载资源）。no-store 直接禁止浏览器以及所有中间缓存存储任何版本的返回响应。简单的说，该策略会禁止任何缓存，每次发送请求时，都会完整地下载服务器的响应。

**b、public&private** ：
如果响应被标记为 public，则即使它有关联的 HTTP 身份验证，甚至响应状态代码通常无法缓存，浏览器也可以缓存响应。如果响应被标记为 private，那么这个响应通常只为单个用户缓存，因此不允许任何中间缓存（CDN）对其进行缓存，private 一般用在缓存用户私人信息页面。

**c、max-age** ： max-age 定义了从请求时间开始，缓存的最长时间，单位为秒。

## 浏览器渲染进程

![1698126040762](image/browser/1698126040762.png)

浏览器渲染进程的线程有五种，

主要就是 GUI 渲染线程和 js 引擎线程，且 js 引擎线程是单线程。

由于 js 是单线程，因此计时器不能由 js 执行，而是由定时器线程执行，完成后进入 js 的任务队列

GUI 线程和 js 引擎线程是互斥的，可以看作一个 tap 页面同时只有一个线程在运行，也就是一个 tab 页面有一个 GUI 和 js 引擎线程。

然后就是在这样一个 tab 页面里面有 eventLoop，事件循环。

## 僵尸进程与孤儿进程

孤儿:父进程退出了,他的一个或多个进程还在运行的就是孤儿进程.

僵尸进程:子进程比父进程先结束,而父进程没有释放子进程占用的资源,导致子进程的描述符存在资源中.

## tab 页面通信

1. 使用 websocket,.因为 websocket 可以实现服务器推送,所以让服务器当中介,进行转发.
2. shareworker:他可以在页面的生成周期内创建唯一线程,多个页面共享这个线程,这个线程就当作中介.
3. 使用 loaclStorage:可以监听 localstorage 的变化完成同步更新.
4. postMessage,获取对标签的引用,来进行通信.

## 浏览器缓存

![1698135247749](image/browser/1698135247749.png)
