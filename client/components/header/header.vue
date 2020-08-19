<template>
	<div>
		<el-menu :default-active="$route.path" class="d-flex" mode="horizontal" type="flex">
            <!-- BLOG -->
			<el-menu-item class="mr-auto">
                <img src="http://qiniu.xiaoying.love/logo.png" alt="" class="logo">
                <span class="title">TAO的网络日志</span>
            </el-menu-item>
			<el-menu-item index="/" @click="to('/')">首页</el-menu-item>
			<el-menu-item index="/archive/5f39e504ea650b2e700e1def" @click="to('/archive/5f39e504ea650b2e700e1def')">归档</el-menu-item>
			<el-menu-item index="/about/1" @click="to('/about/1')">关于</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1'
			};
        },
        computed: {},
		methods: {
            to(path) {
                window.location.href = path
            }
		}
	}
</script>

<style lang="stylus" scoped>
.logo
    width 32px
    height 32px
    vertical-align middle
.title
    vertical-align middle
</style>