<template>
	<div>
		<el-menu :default-active="$route.path" class="d-flex" mode="horizontal" type="flex">
			<el-menu-item class="mr-auto">BLOG</el-menu-item>
			<el-menu-item index="/" @click="to('/')">首页</el-menu-item>
			<el-menu-item index="/archive/5ec3506989f9411decf0220d" @click="to('/archive/5f369eeb71a0a34244fec977')">归档</el-menu-item>
			<el-menu-item index="/about" @click="to('/about')">关于</el-menu-item>
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

<style scoped></style>