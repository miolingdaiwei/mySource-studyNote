## scope

通过data的唯一性让所有css加上data标识，父子不影响，可以穿透。

## 异步加载js

script标签的defer和async的属性。区别是async在脚本加载完毕执行，而defer在dom加载完毕执行，

以及动态创建script，和juqery方式。

## js和css动画

js动画：复杂，逐帧执行，可以进行复杂的控制，开始，暂停，同时由于js是异步的，可能阻塞丢帧。占用资源大。

可以制作复杂的动画，且兼容性好。

css3（[补间动画](https://www.zhihu.com/search?q=%E8%A1%A5%E9%97%B4%E5%8A%A8%E7%94%BB&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1627856428%7D)）:确定起始和结束状态，比较简单。两个关键帧之间帧的内容由[Composite线程](https://www.zhihu.com/search?q=Composite%E7%BA%BF%E7%A8%8B&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1627856428%7D)自动生成

## 为什么--浏览器会单独开一个线程跑css的动画图层

防止css完成后js操作导致回流与重绘

## 跨域与解决方案

跨域：跨域是是因为浏览器的[同源策略](https://so.csdn.net/so/search?q=%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5&spm=1001.2101.3001.7020)限制，是浏览器的一种安全机制，服务端之间是不存在跨域的。协议，主机，端口。

1. cor解决，通过acess control allow origin等地段，发一个options看是否允许，允许的话就可以建立连接。
2. node正向代理   让站点同域，vite，webpac的proxy
3. nginx反向代理
4. jsonp：利用script标签没有跨域限制，在script标签内传入回调函数执行，将结果作为作用域的变量，
5. websocket，没有http，不跨域
6. iframe，二级域名可以使用。

## 节流防抖

> 防抖：合并操作，一定时间内只执行最后一次操作，搜索框输入，只需要最后一次输入进行搜索，窗口调整完后计算窗口。

> 节流：短时间内只触发一次操作，滚动加载，底部，多拉只加载一个，搜索框联想，停了一段时间才联想。

> 节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而防抖只是在最后一次事件后才触发一次函数。

区别就是节流会在t内执行，而防抖会超过t，只要一直触发。

## xss和csrf

> xss跨站脚本攻击，嵌入脚本获取cookei等隐私。

> csrf跨站请求模拟：利用登录状态，模拟发起请求，更改数据。

## xss类型

反射型XSS、存储型XSS、DOM-based 型、基于字符集的 XSS、基于 Flash 的跨站 XSS、未经验证的跳转 XSS

> 强缓存>协商缓存>服务器
