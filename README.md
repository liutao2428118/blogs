<p align="center">
  <img width="720" src="https://pic3.zhimg.com/80/v2-08daea42db8838ab4762f25b68dc743a_720w.jpg">
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
[blogs](https://github.com/liutao2428118/blogs)服务器端渲染(SSR)博客网站，它基于[vue](https://github.com/vuejs/vue)、[vue-ssr](https://ssr.vuejs.org/zh/)、[element-ui](https://github.com/ElemeFE/element)、[node](https://github.com/nodejs/node)实现。使用了最新的前端技术栈，基本功能（文章分类管理年限划分，文章发布编辑Markdown，图片等资源上传七牛云，无限嵌套评论回复等等)。简洁风格。项目分三个端，客户端、服务端、[admin端](https://github.com/liutao2428118/blogs-admin)。

项目本身也是一次尝试，从需求分析->本地工程化->前后端开发->数据库设计->自动化发布部署（持续集成）->服务器环境搭建（微服务）,从头到尾自己一个人独立完成，也算是完整体系开发项目的一次试水

- [在线预览](http://blogs.xiaoying.love/)

- [在线预览admin端](http://blogs.xiaoying.love/admin)

- [Wiki](https://github.com/liutao2428118/blogs/wiki)


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

一些说明：
- 项目没用到现成服务端渲染框架nuxt，完全从零开始。
- 目前手上有两台腾讯云的服务器，分别测试环境、正式环境。
- 什么是持续集成，持续集成服务（Continuous Integration，简称 CI）。只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器。
- 代码仓库放在github上为啥没用TravisCI，github仓库只做展示，githu仓库与gitlab仓库是联动的，持续集成与持续部署主要还是放在gitlab上，gitlab-CICD实际工作中用的会多一点。
- 下面说下CICD大致步骤，开发人员push代码到gitlab仓库-打tag触发对应的Jobs-代码自动pull测试服务器->构建镜像-上传镜像-构建docker容器-完成测试环境部署-完成单元测试-测试通过-正式服务器拉取镜像-构建容器-完成部署（以上步骤全部是打完tag后连续触发）。这里就简单的讲下CICD的大致步骤，具体就不展开说了。

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
├─ template   html模板文件
├─ gitlab-ci.yml 自动化部署脚本
└─ Dockerfile  Docker镜像构建脚本

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
