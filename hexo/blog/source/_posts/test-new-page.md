---
title: test new page
date: 2022-09-16 21:07:39
tags:
---

# node

## 说明

相信永远都会有新入坑的小伙伴入门前端，本文将会带领小伙伴用简单的方式搭建node环境哦！

> 本文作者用的windows，linux和mac也是大差不差的

## 安装方式

可能有小伙伴看过别人安装node，直接下载安装包，然后就自带npm就可以了，但对于我们前端来说，你可能需要更新node版本，或者有时候需要切换到老版本，切换镜像源等等操作，直接安装是比较麻烦的，所以我这里是选用nvm，nrm管理安装。

## nvm，nrm

nvm就是node的版本控制工具，有了它可以随时切换版本，nrm就是镜像源管理工具，可以随时切换镜像源

## 安装nvm

直接下载nvm的安装包：[nvm文档手册(uihtm.com)](http://nvm.uihtm.com/) 下载setup安装包，安装完成就可以了

> 如果之前有小伙伴安装过nvm，node，需要先卸载掉哦

nvm是安装完成之后会**自动配置系统变量，环境变量**，不需要我们手动添加，找路径，是不是很方便呢。

这时打开命令行，输入

`nvm`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0c5c7d8b88b480f9ab5be4de80a5adc~tplv-k3u1fbpfcp-watermark.image?)

就可以看到nvm安装成功了！另外命令行的各种命令也在左边显示了。

## 安装node

输入

`nvm list available`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e38f400a984247a1906d9692d37c1088~tplv-k3u1fbpfcp-watermark.image?)

即可参查看当前可以安装的node，我们选用那个版本呢？我的建议是去[node官网]([Node.js (nodejs.org)](https://nodejs.org/en/))查看当前稳定版本是什么就安装那个版本

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/deeb6fc2fa4e43e3a6a029bdf295d2fc~tplv-k3u1fbpfcp-watermark.image?)

可以看到我当前的稳定版本是16.17.0，那我们就安装16.17.0吧(读者们安装自己看到的稳定版哦)！

> 当然，自信一点就知道在nvm list available界面 LTS栏最上面那个版本就是官方推荐的稳定版，也是16.17.0

输入命令行

`nvm install 16.17.0`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74b50eaf4c22457e9e82982a2debd176~tplv-k3u1fbpfcp-watermark.image?)

就可以看到安装成功，再输入

```
nvm use 16.17.0

nvm list
```

> 有个坑，如果有小伙伴 `nvm use`报错

```
nvm use 16.13.1
exit status 1: ��û���㹻��Ȩ��ִ�д˲�����
```

这是权限不够的问题，可以用管理员打开命令行，再输入 `nvm use`来进行切换,这时再看 `nvm list`可以看到

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a424c80e9235471e89b51b4c75b5ee1d~tplv-k3u1fbpfcp-watermark.image?)

标星的就是当前正在使用的版本。
输入

```
node -v
npm -v
```

查看node和npm版本。

当然，若想使用- g命令全局安装内容的话还需要配置。

找到nvm安装路径，点进去，再点进去自己使用的node版本，在这里新建
    `node_global`，`node_cache`,文件夹,分别复制这两个文件夹，找到环境变量的系统变量的path，新建两条，将路径复制上去就可以了

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f66b9875063c4bc8a90e21b4e42bfc62~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6b756b13d90400bb6ce63e0b39c997b~tplv-k3u1fbpfcp-watermark.image?)
再次使用- g命令就可以将文件下载到global文件夹里面了！！

到这里node安装配置就结束了！

## nrm安装

直接npm安装即可

`npm install nrm -g`

执行命令nrm ls查看可选的源。

> nrm ls                                                                                                                                   
>
> *npm ---- https://registry.npmjs.org/
>
> cnpm --- http://r.cnpmjs.org/
>
> taobao - http://registry.npm.taobao.org/
>
> eu ----- http://registry.npmjs.eu/
>
> au ----- http://registry.npmjs.org.au/
>
> sl ----- http://npm.strongloop.com/
>
> nj ----- https://registry.nodejitsu.com/

其中，带*的是当前使用的源，上面的输出表明当前源是官方源。

如果要切换到taobao源，执行命令nrm use taobao。

> 建议是用taobao镜像，速度快！！

## 结语

> **本次的文章到这里就结束啦！♥♥♥读者大大们认为写的不错的话点个赞再走哦 ♥♥♥ 我们一起学习！一起进步!**
>
