<template>
	<div>
		<el-row class="main" type="flex" justify="center">
			<el-col :span="16">
				<div class="artcle-info" :style="{backgroundImage: `url('${articleOne.imageUrl}')`}">
					<h2 class="text-center"><strong>{{articleOne.title}}</strong></h2>
					<!-- 描述：文章信息 -->
					<div class="text-center timeAndView">
						<span class="article-time">
							<i class="el-icon-time"></i>
							发表于：<span>{{articleOne.createdAt | dateFrm}}</span>
						</span>
						&nbsp;|&nbsp;
						<span class="article-views">
							<i class="el-icon-view"></i>
							阅读量：<span>{{articleOne.pageview}}</span>万
						</span>
					</div>
					<p class="abstract">
						{{articleOne.outline}}
					</p>
				</div>
				<hr />

                <!-- 内容 -->
				<div id="artcle-content" v-html="articleOne.content" ></div>

				<div id="statement">
					<div class="item"></div>
					<div class="item">
						<a href="https://www.xiaoying.love">https://www.xiaoying.love</a>
					</div>
					<div class="item">本博客所有文章除特别声明外,转载请注明出处!</div>
				</div>
                <div class="comments">
                    <div class="title">评论区</div>
                    <comments :articleId="$route.params.id" :reply="articleOne.reply"></comments>
                </div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment"
import Comments from "../../components/comments/comments.vue"
export default {
    name: "artile",
    data() {
        return {};
    },
    created() {},
    beforeMount() {},
    mounted() {},
    asyncData({ app, router, store }) {
        return Promise.all([
            store.dispatch("fetchArticleDetails", app.$route.params.id)
        ])
    },
    computed: {
       ...mapState([
           "articleOne"
       ])
    },
    filters: {
        dateFrm(date) {
            return moment(date).format("YYYY-MM-DD")
        }
    },
    methods: {
        
    },

    components: {
       Comments
    }
};
</script>

<style lang="stylus" scoped>
.artcle-info 
    padding: 20px
    margin-bottom: 40px
    background-repeat: no-repeat
    background-size: 100% 100%
    .article-time,.article-views
        color #eee
    .abstract 
        color: #ffffff
        border-left: 3px solid #F56C6C
        padding: 10px
        background-color: rgba(126, 129, 135, 0.3)

    .timeAndView 
        padding: 20px
        line-height: 30px
        font-size: 16px
        color: #000
#artcle-content
    .blockquote
        background-color: #f5f2f0
        padding: 1em
        margin: 2em 2em
        font-family: Consolas,Monaco,"Andale Mono",monospace
        border-radius: 1em
        border-width: .2em
        border-color: #e0dfcc
        border-style: solid
        text-shadow: 0 1px white
        .has 
            background: #f5f2f0
            color: black
            text-shadow: 0 1px white
            font-family: monospace,Consolas,Monaco,"Andale Mono"
            direction: ltr
            text-align: left
            white-space: pre
            word-spacing: normal
            font-size: 1.2em
            tab-size: 4
            hyphens: none
            padding: 0em 0em .5em 0em
            // overflow: auto
            font-size: 14px

    img
        width: 100%

#statement 
    border-left: 3px solid #F56C6C
    padding: 20px
    background-color: #EBEEF5
.comments
    padding 40px 0
    .title
        font-size 18px
        font-weight 800
        border-bottom 1px solid #ddd
        padding-bottom: 10px 
</style>