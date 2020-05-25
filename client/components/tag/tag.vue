<template>
	<div class="tag">
		<el-card class="box-card">
			<div slot="header" class="d-flex align-items-center">
				<img class="card-icon" src="../../assets/image/biaoqian.png" />
				<span>分类</span>
			</div>
			<div class="text item">
                <template v-for="item in categoryArr">
                    <el-row>
                        <el-col :span="24"><el-tag size="mini" class="tag-item" @click="tag(item._id)">{{item.name}}（{{item.essays_arr.length}}）</el-tag></el-col>
                    </el-row>
                </template>
			</div>
		</el-card>
	</div>
</template>

<script>
import { mapState } from "vuex";
	export default {
        name: 'tag',
        computed: {
            ...mapState(["categoryArr"])
        },
		methods: {
			tag(id) {
				this.$router.replace('/archive');
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