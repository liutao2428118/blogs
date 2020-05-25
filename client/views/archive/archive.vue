<template>
    <div class="archive">
        <el-row id="artList" type="flex" justify="space-around">
            <el-col :span="16">
                <div class="count">归档：100篇</div>
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in essayArr"
                        :key="index"
                        :timestamp="activity._id.year + '年'"
                        placement="top"
                        @mouseenter="hoverLine(activity)"
                    >
                        <div class="line-item" v-for="c in activity.item">
                            <!-- <router-link :to="'/article/' + c.id + '?tim=' + Date.now()" tag="span">{{c.title}}</router-link> -->
                            <span @click="to(c.id)">{{c.title}}</span>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </el-col>
            <el-col :span="6" class="hidden-sm-and-down" id="side">
                <div class="item">
                    <tag></tag>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Tag from "../../components/tag/tag.vue";
import { mapState, mapActions } from "vuex";
export default {
    name: "archive",
    data() {
        return {
            activities: [
                {
                    content: "springBoot整合Redis",
                    timestamp: "2018-04-15"
                },
                {
                    content: "Activiti工作流",
                    timestamp: "2018-04-13"
                },
                {
                    content: "Vue路由",
                    timestamp: "2018-04-11"
                }
            ]
        };
    },
    created() {
        // console.log(this.essayArr)
    },
    mounted () {
        // if (this.essayArr && this.essayArr.length < 1) {
        //     // this.fetchTodos()
        // }
    },
    asyncData({ app, router, store }) {
        return  Promise.all([
            store.dispatch("fetchAllEssay", app.$route.params.id),
            store.dispatch("fetchCategorys")
        ])
    },
    computed: {
        ...mapState(["essayArr"])
    },
    methods: {
        hoverLine(activity) {
            activity.color = "#409eff";
        },
        to(id) {
            //  + id + '?tim=' + Date.now()
            this.$router.replace('/article')
        },

        ...mapActions([
            'fetchAllEssay',
            
        ])
    },
    components: {
        Tag
    }
};
</script>

<style lang="stylus" scoped>
.count {
    margin-bottom: 20px;
    font-size: 20px;
    color: #e6a23c;
}

.line-item {
    // display: inline-block;
    padding: 5px 0

    :hover {
        cursor: pointer;
        color: #409eff;
    }
}
</style>