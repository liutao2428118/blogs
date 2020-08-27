<template>
    <div class="f-footer">
        <el-main class="main">
            <el-row>
                <el-col :span="8" class="item-col">
                    <div class="title">快速通道</div>
                    <div class>
                        <a href="https://gitee.com/tommy-tao" class="out-link" target="_Blank">码云</a>
                    </div>
                    <div class>
                        <a
                            href="https://juejin.im/user/1943592290229719/posts"
                            class="out-link"
                            target="_Blank"
                        >掘金</a>
                    </div>
                    <div class>
                        <a href="/admin" class="out-link" target="_Blank">后台管理</a>
                    </div>
                </el-col>
                <el-col :span="8" class="item-col weside">
                    <div class="item">
                        <i class="el-icon-caret-right"></i>
                        寻寻觅觅
                    </div>
                    <div class="item">
                        <i class="el-icon-caret-right"></i>
                        邮箱 liutao2428118@163.com
                    </div>
                    <div class="item">
                        <i class="el-icon-caret-right"></i>
                        © 个人网络日志站 | 粤ICP备18035899号-1
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>
export default {
    name: 'mfooter',
}
</script>

<style lang="stylus" scoped>
.f-footer
    padding: 20px
    text-align: center
    color: #fff
    background-color: #555
.main
    width: 70%
    margin: 0 auto
    color: #ccc
.out-link
    text-decoration: none
    color: #ccc
.out-link:hover
    color: #ffffff
.item-col
    text-align: left
.item-col.weside
    font-size: 14px
.item-col .title
    color: #ddd
    margin-bottom: 10px
.item span
    margin-right: 5px
</style>