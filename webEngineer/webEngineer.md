## webpack 与 grunt，gulp

grunt 呵呵 gulp 是基于任务运行的工具，它们会自动执行指定的任务，就像流水线，将资源放上去，然后就通过不同的插件加工。

webpack 是基于模块化打包的工具，自动化处理模块。webpack 把一切都当做模块，当处理应用时，会递归构建一个依赖关系图（dependency graph），其中包含了应用程序需要的每个模块，然后将所有模块打包成一个或多个 bundle。

bundle 是浏览器所认识的，拿来即可直接运行的.js 文件。

现在主流直接用 npm script 代替 grunt，gulp 打造任务流。

## webpack，roolup，parcel

webpack 适合大型复杂的前端站点构建，有强大的 loader 和插件生态，打包后的 bundle 是一个立即执行函数，它接收一个参数，这个参数是模块对象，键为各个模块的路径，值是模块内容。

bundle 内部则处理模块之间的应用，执行模块等，比较适合复杂应用的开发。

roolup 适合基础库的打包，如 vue3，d3 等，

parcel 适用于简单的实验性项目，可以满足低门槛看到项目效果，但生态，报错等不好。

## 常见 loader

1. file-loader：把文件输出到一个文件夹中，在代码中通过相对 url 引用输出的文件。
2. url--loader：类似 file-loader，但能在文件很小的情况下亿 base64 的放肆将文件内容注入到代码中。
3. img-loader：加载并压缩图片文件。
4. babel-loader：es6 转 es5
5. css-loader：加载 css，支持模块化，压缩，文件导入等
6. styleloader：css 代码注入到 js 中，通过 dom 操作加载 css
7. eslint-loader：通过 eslint 检查代码。

## 常见 plugin

1. define-plugin:定义环境变量，一般用于 api 和区分生产环境和开发环境。
2. html-webpack-plugin：简化 htnl 创建。
3. mini-css-extract-plugin：css 提取到单独文件总，支持按需加载。

## bundle，chunk，module

chunk：代码块，是由多个模块组成，用于代码的合并于分割

module：开发中的单个模块，一个模块对应一个文件，webpack 会从配置的 entry 中递归找出所有依赖的模块。

## webppack 热更新

一个比较复杂的监听处理过程

## babel 原理

babel 编译三步

1. parse：将代码解析成 AST 抽象语法树，
2. transform：对 AST 进行变换，babel 接受得到 AST，通过 babel-traverse 进行遍历，在此过程中进行添加，更新，移除等操作。
3. 生成：genegrate：将变换后的 AST 转化为 js 代码，通过 babel-generator 模块完成。

## git/svn

git 是分布式的，而 svn 式集中式的。

git 分支处理项目的一部分代码，而 svn 式项目的副本。

## git 命令

### pull 和 fetch：

featch 将远程的变化下载下来，没有合并

而 pul 将远程的变化与当前分支合并。

### merge 和 rebase

都用于分支合并，但 commit 记录不同

merge 黑会新建一个新的 commit 对象，然后两个分支以前的 commit 记录都指向这个 commit，保留了以前每个分支的 commit 历史

而 rebase 会找到两个分支的第一个共同的 commit 祖先记录， 然后提取当前分支之后的所有 commit 记录，然后将这个 commit 记录添加到目标分支的最新提交后面。经过合并后，两个分支合并后的commit记录变成了线性额记录。
