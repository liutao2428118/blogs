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
  <a href="https://travis-ci.org/PanJiaChen/vue-element-admin" rel="nofollow">
    <img src="https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/PanJiaChen/vue-element-admin/releases">
    <img src="https://img.shields.io/github/release/PanJiaChen/vue-element-admin.svg" alt="GitHub release">
  </a>
  <a href="https://gitter.im/vue-element-admin/discuss">
    <img src="https://badges.gitter.im/Join%20Chat.svg" alt="gitter">
  </a>
  <a href="https://panjiachen.gitee.io/vue-element-admin-site/zh/donate">
    <img src="https://img.shields.io/badge/%24-donate-ff69b4.svg" alt="donate">
  </a>
</p>




## 简介
先来说下我做这个项目的初衷吧，初衷很简单用一个项目把前面自己学到的一些技术栈串起来，更好的巩固知识面，在一个就是搭建这个博客网站也方便以后自己写写网络日志，记录下自己的成长。整体项目分三个端，客户端，服务端，admin端，客户端[vue-ssr](https://ssr.vuejs.org/zh/)(服务端渲染)，服务端node([koa](https://github.com/koajs/koa))，admin端[vue](https://github.com/vuejs/vue)+[element-ui](https://github.com/ElemeFE/element)(前端渲染)。

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
- 4.如何更好的一键部署，那就要用到gitlab-CICD,开发人员push代码到gitlab，在到gitlab打个tag触发对应的脚本，代码自动上传到测试服务器->自动构建docker容器部署->跑单元测试->测试通过后，正式服务器拉取容器镜像，构建容器部署（以上步骤全部是打完tag后连续触发）。这里就简单的讲下CICD的大致步骤，具体就不展开说了。
