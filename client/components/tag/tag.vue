<template>
	<div class="tag">
		<el-card class="box-card">
			<div slot="header" class="d-flex align-items-center">
				<img class="card-icon" src="../../assets/image/biaoqian.png" />
				<span>分类</span>
			</div>
			<div class="text item">
                <template v-for="item in classifyArr">
                    <el-row>
                        <el-col :span="24" class="col"><el-tag size="mini" class="tag-item" @click="handleTag(item._id)">{{item.name}}（{{item.articleArr.length}}）</el-tag></el-col>
                    </el-row>
                </template>
			</div>
		</el-card>
	</div>
</template>
<style lang="stylus" scoped>
.box-card 
    .item
        .col
            margin 2px 0
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

<script src="./tag"></script>