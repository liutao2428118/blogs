<template>
	<div class="header">
		<el-menu :default-active="$route.path" class="d-flex" mode="horizontal" type="flex">
            <!-- BLOG -->
			<el-menu-item class="mr-auto">
                <img src="http://qiniu.xiaoying.love/logo.png" alt="" class="logo">
                <span class="title">TAO的网络日志</span>
            </el-menu-item>
			<el-menu-item index="/" @click="to('/')">首页</el-menu-item>
			<el-menu-item :index="'/archive/' + classifyArr[0]._id" @click="to('/archive/'+ classifyArr[0]._id)">归档</el-menu-item>
			<el-menu-item index="/about/1" @click="to('/about/1')">关于</el-menu-item>
		</el-menu>
	</div>
</template>
<style lang="stylus" scoped>
.header 
    width 100%
    height 60px
.logo
    width 32px
    height 32px
    vertical-align middle
.title
    vertical-align middle
</style>
<script src="./header"></script>
