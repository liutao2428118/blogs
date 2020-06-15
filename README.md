<p align="center">
  <img width="320" src="https://wpimg.wallstcn.com/ecc53a42-d79b-42e2-8852-5126b810a4c8.svg">
</p>

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
[blogs](https://github.com/liutao2428118/blogs)服务器端渲染(SSR)博客网站，它基于[vue](https://github.com/vuejs/vue)、[vue-ssr](https://ssr.vuejs.org/zh/)、[element-ui](https://github.com/ElemeFE/element)、[node](https://github.com/nodejs/node)实现。使用了最新的前端技术栈，功能较简单（文章分类管理年限划分，文章发布编辑，图片等资源上传七牛云，无限评论回复等等)。也完全够用，简洁风格。项目分三个端，客户端、服务端、admin端。

- [在线预览](https://www.baidu.com/)

- [在线预览admin](https://www.baidu.com/)

- [Wiki](https://www.baidu.com/)


## 前序准备
你需要在本地安装 [git](https://git-scm.com/)。本项目技术栈基于
- [ES6+](http://es6.ruanyifeng.com/)、
- [vue](https://cn.vuejs.org/index.html)、
- [vuex](https://vuex.vuejs.org/zh-cn/)、
- [vue-router](https://router.vuejs.org/zh-cn/) 、
- [vue-ssr](https://ssr.vuejs.org/zh/)、
- [axios](https://github.com/axios/axios)、
- [element-ui](https://element.eleme.cn/#/zh-CN)、
- [node](http://nodejs.org/)、
- [koa2](https://koa.bootcss.com/)、
- [mongodb](https://www.mongodb.com/)、
- [mongoose](http://www.nodeclass.com/api/mongoose.html#quick_start)、
- [webpack4.x](https://www.webpackjs.com/)、
- [babel7.x](https://www.babeljs.cn/) 

持续集成与持续部署基于[gitlab-CICD](https://docs.gitlab.com/ee/README.html)，服务器环境搭建依赖[docker](https://www.docker.com/), 提前了解和学习这些知识会对使用本项目有很大的帮助。

同时配套了系列教程文章，如何从零构建一个完整的ssr博客网站，建议大家可以看看

- [手摸手，带你用 vue-ssr 撸博客网站 系列一(本地工程化篇)](https://www.baidu.com)
- [手摸手，带你用 vue-ssr 撸博客网站 系列二 (实战篇)](https://www.baidu.com)
- [手摸手，带你用合理的姿势使用 webpack4（上）](https://juejin.im/post/5b56909a518825195f499806)
- [手摸手，带你用合理的姿势使用 webpack4（下）](https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc)

一些说明：
- 项目没用到现成服务端渲染框架nuxt，完全从零开始。
- 目前手上有两台腾讯云的服务器，分别测试环境、正式环境。
- 什么是持续集成，持续集成服务（Continuous Integration，简称 CI）。只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器。
- 代码仓库放在github上为啥没用TravisCI，gitlab-CICD实际工作中用的多一点。
- 下面说下CICD大致步骤，开发人员push代码到gitlab，打tag触发对应的Jobs，代码自动抓取到测试服务器->自动构建docker容器部署->完成单元测试->测试通过后，正式服务器拉取容器镜像，构建容器部署（以上步骤全部是打完tag后连续触发）。这里就简单的讲下CICD的大致步骤，具体就不展开说了。

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

## 开发

```bash
# 克隆项目
git clone

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:3000

## 发布

```bash
# 构建客户端
npm run build:client

# 构建生服务端
npm run build:server

# 启动服务
npm run start
```

## 其它

```bash
# 开发环境启动客户端
npm run preview

# 开发环境启动服务端
npm run dev:server

```
