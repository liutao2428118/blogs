<template>
	<div>
		<el-menu :default-active="activeIndex" class="d-flex" :router="true" mode="horizontal"  type="flex">
			<el-menu-item class="mr-auto">BLOG</el-menu-item>
			<el-menu-item index="/">首页</el-menu-item>
			<el-menu-item index="/archive">归档</el-menu-item>
			<el-menu-item index="/about">关于</el-menu-item>
			<!-- <el-submenu index="1">
				<template slot="title"></template>
				<el-menu-item @click="toggleLang('zh')"></el-menu-item>
				<el-menu-item @click="toggleLang('en')"></el-menu-item>
			</el-submenu> -->
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '/'
			};
		},
		methods: {
			toggleLang(lang) {
				if(lang === 'zh') {
					// localStorage.setItem('locale', 'zh')
					// this.$i18n.locale = localStorage.getItem('locale')
					this.$message({
						message: '切换为中文！',
						type: 'success'
					})
				} else if(lang === 'en') {
					localStorage.setItem('locale', 'en')
					// this.$i18n.locale = localStorage.getItem('locale')
					this.$message({
						message: 'Switch to English!',
						type: 'success'
					})
				}
			}
		}
	}
</script>

<style scoped></style>