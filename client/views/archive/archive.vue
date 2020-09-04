<template>
    <div class="archive">
        <el-row id="artList" type="flex" justify="space-around">
            <el-col :span="16">
                <div class="count">归档：{{ articleYearData.count }}篇</div>
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in articleYearData.list"
                        :key="index"
                        :timestamp="activity._id + '年'"
                        placement="top"
                        @mouseenter="hoverLine(activity)"
                    >
                        <div class="line-item" v-for="c in activity.item">
                            <span @click="to(c.id)">{{ c.title }}</span>
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

<script src="./archive"></script>
