## doctype

Doctype 声明文档的解析方式，告诉浏览器如何解析文档。

## async 与 defer

defer 等待 dom 树加载完成之后再执行，而 async 等待 js 加载完之后就执行了，异步加载 js

## 块级元素，行内元素，行内块元素

#### 块级元素

有长宽的块，除了 float 情况下块级元素独占一行，可容纳块级元素和行内元素。宽度默认为父级元素宽度。

```html
 <address>  // 定义地址
 <caption>  // 定义表格标题
 <dd>      // 定义列表中定义条目
 <div>     // 定义文档中的分区或节
 <dl>    // 定义列表
 <dt>     // 定义列表中的项目
 <fieldset>  // 定义一个框架集
 <form>  // 创建 HTML 表单
 <h1>    // 定义最大的标题
 <h2>    // 定义副标题
 <h3>     // 定义标题
 <h4>     // 定义标题
 <h5>     // 定义标题
 <h6>     // 定义最小的标题
 <hr>     // 创建一条水平线
 <legend>    // 元素为 fieldset 元素定义标题
 <li>     // 标签定义列表项目
 <noframes>    // 为那些不支持框架的浏览器显示文本，于 frameset 元素内部
 <noscript>    // 定义在脚本未被执行时的替代内容
 <ol>     // 定义有序列表
 <ul>    // 定义无序列表
 <p>     // 标签定义段落
 <pre>     // 定义预格式化的文本
 <table>     // 标签定义 HTML 表格
 <tbody>     // 标签表格主体（正文）
 <td>    // 表格中的标准单元格
 <tfoot>     // 定义表格的页脚（脚注或表注）
 <th>    // 定义表头单元格
 <thead>    // 标签定义表格的表头
 <tr>     // 定义表格中的行

```

> 常用的几个是：div form h1-h6 ol ul p table td th tr li 简单来说就是：标题，表格，列表的相关标签，以及 div，p

#### 行内元素 inline

与其他行内元素占同一行，行内元素内部不能放块级元素，且 a 里不能套 a 标签。

```html
 <a>     // 标签可定义锚
 <abbr>     // 表示一个缩写形式
 <acronym>     // 定义只取首字母缩写
 <b>     // 字体加粗
 <bdo>     // 可覆盖默认的文本方向
 <big>     // 大号字体加粗
 <br>     // 换行
 <cite>     // 引用进行定义
 <code>    // 定义计算机代码文本
 <dfn>     // 定义一个定义项目
 <em>     // 定义为强调的内容
 <i>     // 斜体文本效果
 <kbd>     // 定义键盘文本
 <label>     // 标签为 input 元素定义标注（标记）
 <q>     // 定义短的引用
 <samp>     // 定义样本文本
 <select> // 创建单选或多选菜单
 <small>     // 呈现小号字体效果
 <span>     // 组合文档中的行内元素
 <strong> // 加粗
 <sub>     // 定义下标文本
 <sup>     // 定义上标文本
 <textarea>     // 多行的文本输入控件
 <tt>     // 打字机或者等宽的文本效果
 <var>    // 定义变量

```

宽高无效，内外边距仅左右方向有效。

常用的是 a，br，span，select，i，textarea

#### 行内块级元素 inline-block

既有块级元素，的特点，又有行内元素的特点，结合起来就是既可以设置宽高，又可以在同一行有多个行内块级元素。同时边距等属性都可以设置。宽度就是自身的宽度，同时行内块级元素之间会有空白，需要设置父级元素 font-size 为 0 才可以消除(只有这种方法)。

```html
<button>
<input>
<textarea>
<select>
<img>

```

基本上就是 btn，img，textarea，input，select 都是很常用的五个。

## 空元素

不能有子元素，且没有结束标签。

常见的有 input，br，hr，link，meta 等。

## `meta`：元数据元素

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) **`<meta>`** 元素表示那些不能由其他 HTML 元相关（meta-related）元素表示的[元数据](https://developer.mozilla.org/zh-CN/docs/Glossary/Metadata)信息。如：[`<base>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/base)、[`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link)、[`<script>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)、[`<style>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/style) 或 [`<title>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/title)。

主要有三种属性，charset，content，http-equiv 规定编码格式，等信息。

## a 标签

可以跳转锚点。同一页面下另一个标签，也可以唤起指定应用。

## ul，ol

ol：orderList，ul：unorderList，他们的子项都是 li

## iframe

iframe 用于嵌入页面到当前页面，

form 的 target 可以实现跳转到 iframe 且直接执行参数的一些操作，例如搜索。

## xmlhttprequest

能够在不刷新页面的前提下获取 url 的数据，ajax 基于它，然后 axios 是异步，执行 sucess 回调，然后 axios 基于 promise 对 ajax 进行封装。

## H5

1. 新增流媒体标签：audio 和 video
2. 新增语义化标签和段落：section，article，nav，header，footer，aside，hgroup
3. 新增 input 属性：color，date，date-local，email
4. mark，meter，date，time，output，progress，main 等元素
5. websocket：允许在页面和服务器之间建立持久连接并通过这种方法来交换非 HTML 数据
6. webRTC：这项技术，其中的 RTC 代表的是即时通信，允许连接到其他人，直接在浏览器中控制视频会议，而不需要一个插件或是外部的应用程序
7. webWorkers：能够把 JavaScript 计算委托给后台线程，通过允许这些活动以防止使交互型事件变得缓慢
8. xmlhttprequest：允许异步读取页面的某些部分，允许其显示动态内容，根据时间和用户行为而有所不同。这是在[Ajax](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/AJAX)背后的技术。
9. history 的相关 api，进行回退，历史记录。
10. SVG
11. CANVAS
12. geolocation
13. IndexDB
