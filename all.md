## call 与 apply

call 性能比 apply 好，因为 apply 需要解构数组

## 数据埋点

统计

- UV：不同的账户访问网站的数量，0-24 点内重复账户访问只算一次。
- IP：不同 IP 访问网站的数量，时间同上。
- 网页访问量，进入任何界面都+1，重复页面也加。
- 单人访问网站的次数，需关闭所有页面+1。

通过监听事件，将数据传给后台统计，以及可能的返回结果给前端可视化。

## 为什么通常发送数据埋点请求时使用 1x1 像素的透明 gif

能够完成整个 http 请求+响应。跨域友好，执行无阻塞。get 请求后无需获取和处理数据，服务端也不需要发送数据。比 ajax 性能好。gif 最低合法体积最小。

## (5).add(3).minus(2)

```js
Number.prototype.add = function (n) {
  return this + n;
};
Number.prototype.minus = function (n) {
  return this - n;
};
```

## 转[222,null,123,null,null....]长度为 12

```js
function work(obj) {
  // array.from对象的特殊写法，length定义长度
  return Array.from({ length: 12 }).map((v, i) => obj[i + 1] || null);
}
```

## baber

1. 先将 es6 代码字符串通过解析生成 AST 语法树
2. 对 AST 进行处理，将 ES6 的 AST 转为 ES5 的 AST。
3. 再将 AST 转为代码字符串。

## 父子组件生命周期

1. beformount 和 unmounted 之后和之钱是子组件的生命周期。
2. updated 父组件不引起子组件更新，子组件 updated 会先执行父组件的 beforeUndate。

## v-for 事件代理

在 v-for 上使事件代理会使监听器数量和内存占有率减少，但 vue 不会真的做事件代理，因此可以做事件代理来提高性能。

## 内存泄漏

意外的全局变量，未销毁的事件监听器，Dom 引用。定时器未清空，闭包。

## 跨域

- JSONP：需要后端配合，传函数给后端，后端调用函数，通过字符串拼接给 JSON.strify 转过的参数。`${callback}(${JSON.stringify(data.x)})`,前端收到会自动执行这个 callback 函数，自动执行也是 xss 的攻击手段之一。因此不安全，切只有 get。
- nginx 反向代理：ning 代理服务器和服务器同源，在 nginx 代理服务器上配置 cors 允许跨域，然后将请求转给服务器。
- node 正向代理：前端本地启同源代理服务器，像服务器发请求，devserver 同理。
- ifame：同样是利用 iframe 请求不跨域，在 ifame 请求，返回结果。
- webScoker：可以启一个 secker 服务。由 socker 发起请求不跨域。
- cors：服务端配置允许跨域的策略，Access-Control-Allow-Origin：\*； 星号也可以是单独的域。
- postMessage：它是 H5 引入的 api，可以跨文档，跨窗口，跨域传递消息。也是 tab 之间通信的方式。
- domain：由于主域下相同域的跨域访问。设置相同主域完成。
- window.name：没什么太大意义。

## vue 组件通信

父子：prop+emit，provider/inject，props 的作用域可以子组件传信息给父组件。$emit 实现子组件向父组件传递消息、 全局：eventBus，store，localstorage/sessionstorage/cookie, router 路由跳转携带信息。

## PWA

渐进式网络应用（Progressive Web App），可以像 app 一样留桌面图标，离线应用，service worker 缓存，消息推送。

## Performance

Performance 接口可以获取当前页面中与性能有关的信息。

## WebAssembly

新的编码方式，可以在现代的网络浏览器运行，使各族语言的代码在 web 中以接近原生的速度运行。

## click 双击

300ms 判断是否是双击缩放（放大）。实现方案：

- 禁用缩放：user-acalable=no
- 更默认视口宽度
- CSS touch-action

以及会有点击触发多次时间，可以只用 touch 或者只用 click

## CSP 解决 XSS

通过 http 首部设置，或者 meta 标签。

## git-rebase

可以合并多次提交记录，减少无用的提交信息。

合并分支且减少 commit 记录。

## this

函数的同名属性（this 和 Fun，Fun.prototype 上），通过函数实例 obj 来调用是读取 this。FOO.是读取 Fun 上的。

## async 与 await 与线程

对于执行顺序需要注意几个点，async 整个函数内是没有添加异步的，只有当有返回值时，会将返回值包在 promise.resolve（returnVal）进行返回。

其次 await 会暂停线程等待 await 后面的任务执行（不论同步异步），执行完成后立即让出线程，之后 await 外的代码。相当于 await 后面的代码在 await 后面的任务执行完成后添加到了微任务队列。

## 对象与 length

对象有 length 属性会做类型抓换转换过程丢失其他属性，例如 Array.from({lenght:12}), obj.push()等。

## 随机数协商

过程中，每次传过来随机数 hash 加密后的数据，通过相同 hash 算法算出 hash 值比对，其中 1，2 随机数是需要传递的，随机数三则都是自己算且作为预祝秘钥的。

## JWT

token 加密同样是随机数，后端根据随机数算出 tokne，前端请求是带上 token，后端验证。

## HTTP 状态码

1 信息提示 2 成功 3 重定向 4 客户端错误 5 服务端错误

200 成功，204 无内容，301 永久移动，304 协商缓存，404 未找到服务器，400bad request，401 未授权，403 服务器拒绝请求（跨域？），409 发生冲突，500 服务器内部错误，502 错误网关，503 服务不可用。

## URL 到页面加载

1. 浏览器获取用户输入，enter 事件。
2. 解析 url，分析协议头
3. 若是域名，DNS 解析 浏览器->本地->路由器->顶级域名
4. tcp 建立连接
5. http/https 发包，加上端口信息
6. 等待响应
7. 将响应结果 html 经过浏览器引擎解析得到 renderer tree，渲染

## 扁平化且排序且去重

```js
arr=[1,2,[3,[5,6],[4]],7]

// API风格:
return Array.from(new Set(arr.flat(Infinity).sort()))

// 算法风格
resultArr=[]
work(arr){
	for(const i of arr){
		if(Array.isArray(arr)){
			work(arr)
		}else{
			if(!resultArr.findIndex(i)) resultArr.push(i)
		}
	}
}

return arr.sort((a,b)=>a-b)
```
