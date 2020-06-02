<template>
    <div class="archive">
        <el-row id="artList" type="flex" justify="space-around">
            <el-col :span="16">
                <div class="count">归档：{{essayList.count}}篇</div>
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in essayList.data"
                        :key="index"
                        :timestamp="activity._id + '年'"
                        placement="top"
                        @mouseenter="hoverLine(activity)"
                    >
                        <div class="line-item" v-for="c in activity.item">
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
    
        };
    },
    created() {},
    mounted () {},
    asyncData({ app, router, store }) {
        return  Promise.all([
            store.dispatch("fetchEssayList", app.$route.params.id),
            store.dispatch("fetchCategorys")
        ])
    },
    computed: {
        ...mapState(["essayList"])
    },
    methods: {
        hoverLine(activity) {
            activity.color = "#409eff";
        },
        to(id) {
            window.location.href = `/article/${id}`
        },

        // ...mapActions([
        //     'fetchAllEssay',
        // ])
    },
    components: {
        Tag
    }
};
</script>

<style lang="stylus" scoped>
.count 
    margin-bottom: 20px
    font-size: 20px
    color: #e6a23c


.line-item 
    padding: 5px 0

    :hover 
        cursor: pointer
        color: #409eff
</style>