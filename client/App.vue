<template>
    <div class="app">
        <m-header></m-header>
        <el-row type="flex" justify="center" id="content">
            <el-col :xs="20" :md="20" :style="{'minHeight':minHeight+'px'}">
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
            minHeight: 0,
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
        let that = this;
        that.minHeight = document.documentElement.clientHeight;
        window.addEventListener("scroll", that.watchScroll);
        window.onresize = function() {
            that.minHeight = document.documentElement.clientHeight;
        };
    }
};
</script>

<style lang="stylus" scoped>
.app 
    font-family: "microsoft yahei"

    #content 
        background-color: #f9f9f9
        padding: 30px 0

</style>