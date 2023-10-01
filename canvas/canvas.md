## canvas 创建与获取

创建 canvas 使用 canvas 标签，并指定宽和高。通过 dom 操作，使用 getContext 拿到 canvas 画布，有些旧版本浏览器不支持。

## canvas 代码提示

```
/** @type {HTMLCanvasElement} */
        const canvas = document.getElementById("canvas")
```

通过上述方式，后续对 canvas 的操作都将获得代码提示

## canvas 常用 api

见[canvasAPI](./rtx.html)

具体api属性等查看文档即可：[canvas文档](https://www.canvasapi.cn/)
