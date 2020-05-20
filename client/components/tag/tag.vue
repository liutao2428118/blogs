<template>
	<div class="tag">
		<el-card class="box-card">
			<div slot="header" class="d-flex align-items-center">
				<img class="card-icon" src="../../assets/image/biaoqian.png" />
				<span>分类</span>
			</div>
			<div class="text item">
                <el-row>
                    <el-col :span="24"><el-tag size="mini" class="tag-item" @click="tag('Java')">计算机基础（10）</el-tag></el-col>
                    <el-col :span="24"><el-tag size="mini" class="tag-item" @click="tag('Java')">JavaScript（12）</el-tag></el-col>
                    <el-col :span="24"><el-tag size="mini" class="tag-item" type="info" @click="tag('HTML')">Html（8）</el-tag></el-col>
                    <el-col :span="24"><el-tag size="mini" class="tag-item" type="warning" @click="tag('Mysql')">Mysql（5）</el-tag></el-col>
                    <el-col :span="24"><el-tag size="mini" class="tag-item" type="danger" @click="tag('Vue')">Vue（3）</el-tag></el-col>
                    <el-col :span="24"><el-tag size="mini" class="tag-item" type="info" @click="tag('jQuery')">JQuery（6）</el-tag></el-col>
                </el-row>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'tag',
		methods: {
			tag(name) {
				this.$router.push({
					name: 'tag',
					params: {
						'name': name
					}
				});
			}
		}
	}
</script>

<style lang="stylus" scoped>
.box-card 
    .item
        .tag-item 
            margin-right: 10px
        &:hover 
            color: #409EFF
            cursor: pointer
    span 
        font-weight: bold
    .card-icon 
        width: 20px
        height: 20px
        margin-right: 10px
</style>