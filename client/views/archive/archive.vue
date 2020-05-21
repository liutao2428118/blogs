<template>
    <div class="archive">
        <el-row id="artList" type="flex" justify="space-around">
            <el-col :span="16">
                <div class="count">归档：234篇</div>
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in essayArr"
                        :key="index"
                        :color="activity.color"
                        :timestamp="activity.meta.createdAt"
                        placement="top"
                        @mouseenter="hoverLine(activity)"
                    >
                        <div class="line-item">
                            <router-link to="/article" tag="span">{{activity.title}}</router-link>
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
    created() {},
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
        }
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
    display: inline-block;

    :hover {
        cursor: pointer;
        color: #409eff;
    }
}
</style>