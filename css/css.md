## css 选择器

什么类选择器，id，元素等等都不说了，说一些难记的

1. 后代选择器: div span 选择所有 div 下的所有子 span
2. 直接子代选择器：ul > li 选择 ul 下的直接子代 li，也就是说 ul 下 li 下的 li 不匹配
3. 一般兄弟组合器:A~B,指的是在**同一父元素下,A 后所有的 B 元素**
4. 紧邻兄弟组合器:A+B 则是一般兄弟组合器里紧邻 A 元素的 B 元素
5. 交集选择器，p.claname,意思是 p 标签且类名是 calname 可以且很多个
6. 并集选择器：：p，.claname,#dd,意思是符合一个即可。

## float

开启 float 后，行内元素，块级元素等特点丢失，即脱离文档流。紧贴着，可以完美设置 margin 和 padding。允许文字环绕

> 脱离文档流可以理解为独立到另一个层里面

float 导致父元素高度塌陷

## transform

动效,做位移

transform:translate()

## css3

1. 阴影：box-shaw 给容器框添加阴影，text-shaw 文字阴影
2. 圆角：border-radius
3. css 动画：transition
4. flex
5. grid
6. 线性渐变：gradient
7. border-image 图片 边框

## scope

通过 data 的唯一性让所有 css 加上 data 标识，父子不影响，可以穿透。

## 水平垂直居中

块极元素有四种：

1. flex 的 jus，ali
2. grid 也有自己的居中，改为 self
3. 绝对定位下，有好几种方法：通过 float50%transform，和 float 0 margin：auto
4.

## BFC

bloc fomat context 块级格式化上下文：也就是盒子内的 元素不影响盒子外的元素。

有以下几种方式生成：

1. display：不为 visible：这很容易想到，也就是只要是盒子外部不显示就可以
2. html 根元素
3. inile-block 的绝对定位元素
4. flex 布局或网格布局
5. float 下

用于清除外边距合并
