<template>
    <div class="app">
        <m-header :class="{'navBarFixed': navBarFixed}"></m-header>
        <el-row type="flex" justify="center" id="content">
            <el-col :xs="20" :md="20" :style="{minHeight:'800px'}">
                <router-view></router-view>
            </el-col>
        </el-row>
        <m-footer></m-footer>
    </div>
</template>

<script>
import MHeader from "./components/header/header.vue";
import MFooter from "./components/footer/footer.vue";
export default {
    name: "app",
    data() {
        return {
            navBarFixed: false
        };
    },
    components: {
        MHeader,
        MFooter
    },
    methods: {
        watchScroll() {
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            //  当滚动超过 50 时，实现吸顶效果
            if (scrollTop > 50) {
                this.navBarFixed = true;
            } else {
                this.navBarFixed = false;
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.watchScroll, true);
    }
};
</script>

<style lang="stylus" scoped>
.app 
    font-family: "microsoft yahei"
    .navBarFixed
        position fixed
        top 0
        left 0
        z-index 50
    #content 
        background-color: #f9f9f9
        padding: 30px 0

</style>