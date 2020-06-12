
<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.7.0-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://github.com/nodejs/node">
    <img src="https://img.shields.io/badge/node-10.6.10-brightgreen.svg" alt="node">
  </a>
  <a href="https://github.com/liutao2428118/blogs/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
</p>




## 简介
先来说下我做这个项目的初衷吧，初衷很简单用一个项目把前面自己学到的一些技术栈串起来，更好的巩固知识面，在一个就是搭建这个博客网站也方便以后自己写写网络日志，记录下自己的成长。整体项目分三个端，客户端，服务端，admin端，客户端[vue-ssr](https://ssr.vuejs.org/zh/)(服务端渲染)，服务端node([koa](https://github.com/koajs/koa))，admin端[vue](https://github.com/vuejs/vue)+[element-ui](https://github.com/ElemeFE/element)(前端渲染)。

ps:项目整体虽然不大，也算不上特别复杂，不过一个人做，从零到有再到发布流程，工作量和代码量也不算小了，全部是碎片时间在撸。

下面在介绍用到了那些技术
- 本地工程化 webpack babel
- 代码层面 vue vue-ssr node koa es6 es7
- 数据库 mongodb mongoose
- 持续集成与持续部署 gitlab-CICD
- 服务器环境 docker

说明：
- 1.因为此项目没用到现成服务端渲染框架nuxt，所以本地工程化构建完完全全从0开始，vue普通项目与vue服务端渲染项目本地构建区别还是挺大的，具体实现可以看代码！既然是学习的项目肯定是不能拿现成的框架来用咯，更好理解学习vue-ssr那就是从0开始做起。
- 2.项目本身不大，服务端开发用koa也完全可以应付，后端路由通过es7装饰器语法封装具体实现可以看代码。
- 3.目前手上有两台腾讯云的服务器，分别模拟测试环境、正式环境。
- 4.什么是持续集成，持续集成服务（Continuous Integration，简称 CI）。只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器。
- 5.有人可能会问我，代码仓库放在github上为啥没用TravisCI，其实吧，我对gitlab-CICD这套东西比较熟悉点，现在大部分公司里面也都是用gitlab这套东西，github仓库主要做展示，CICD我还是放在gitlab上完成
- 6.下面说下CICD大致步骤，开发人员push代码到gitlab，在到gitlab打个tag触发对应的脚本，代码自动上传到测试服务器->自动构建docker容器部署->跑完单元测试->测试通过后，正式服务器拉取容器镜像，构建容器部署（以上步骤全部是打完tag后连续触发）。这里就简单的讲下CICD的大致步骤，具体就不展开说了。[gitlab文档](https://docs.gitlab.com/ee/README.html)

## 目录结构

```
.
├─build  本地构建文件，webpack配置
├─client 客户端
│  ├─api-model  区分服务端和客户端api
│  ├─assets  静态资源
│  │  ├─image
│  │  ├─js
│  │  └─styles
│  ├─components 公用组件
│  │  ├─comments
│  │  ├─footer
│  │  ├─friend
│  │  ├─header
│  │  └─tag
│  ├─router  客户端路由
│  ├─store  客户端store
│  │  ├─actions
│  │  ├─mutations
│  │  └─state
│  ├─views  页面组件
│      ├─about
│      ├─archive
│      ├─article
│      └─home
|  ├─client-entry.js  客户端打包入口
|  └─server-entry.js  服务端打包入口
├─public  客户端打包后的文件夹
├─server  服务端
│  ├─api  数据库操作
│  ├─config  配置文件
│  ├─controllers  控制器
│  ├─database  数据库配置
│  │  └─schema
│  ├─decorator  装饰器封装
│  ├─middlewares  中间件
│  ├─routers   后端路由
│  ├─static  静态文件
|  └─server.js  服务端启动文件
├─server-build  服务端打包后文件夹
└─template   html模板文件

```
