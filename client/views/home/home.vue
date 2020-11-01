<template>
  <div class="home">
    <el-row id="artList" type="flex" justify="space-around">
      <el-col :span="16">
        <template v-for="item in articleTop">
          <el-row class="art-item" :key="item.name">
            <el-card shadow="hover" v-if="item.issued === 1">
              <h5>
                <a :href="/article/ + item._id" class="art-title">{{
                  item.title
                }}</a>
              </h5>
              <el-row
                class="art-info d-flex align-items-center justify-content-start"
              >
                <div class="art-time">
                  <i class="el-icon-time"></i>
                  {{ item.createdAt | dateFrm }}
                </div>
                <div class="d-flex align-items-center">
                  <img class="tag" src="../../assets/image/tag.png" />&nbsp;
                  <el-tag size="mini">{{
                    item.classify && item.classify.name
                  }}</el-tag>
                </div>
              </el-row>
              <el-row class="art-body">
                <div class="side-img hidden-sm-and-down">
                  <img class="art-banner" :src="item.imageUrl" />
                </div>
                <div class="side-abstract">
                  <div class="art-abstract">
                    {{ item.outline }}
                  </div>
                  <div class="art-more">
                    <a :href="/article/ + item._id">
                      <el-button plain>阅读全文</el-button>
                    </a>
                    <div class="view">
                      <i class="el-icon-view"></i>
                      {{ item.pageview }}
                    </div>
                  </div>
                </div>
              </el-row>
            </el-card>
            <img class="star" src="../../assets/image/star.png" />
          </el-row>
        </template>
      </el-col>
      <el-col :span="6" class="hidden-sm-and-down" id="side">
        <div class="item">
          <tag></tag>
        </div>
        <div class="item">
          <friend></friend>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="stylus" scoped>
#side
    .item
        margin-bottom 30px
.art-item
    margin-bottom 30px
    position relative
    .star
        width 60px
        height 60px
        position absolute
        top 0
        right 0
    .tag
        width 16px
        height 16px
    .art-title
        text-decoration none
        padding-left 5px
        color blue
        cursor pointer
        & :hover
            padding-left 10px
            color #409eff
    .art-time
        margin-right 20px
    .art-body
        display flex
        padding 10px 0
        .side-img
            height 150px
            width 270px
            overflow hidden
            margin-right 10px
            .art-banner
                width 100%
                height 100%
                transition all 0.6s
                & :hover
                    transform scale(1.4)
        .side-abstract
            flex 1
            display flex
            flex-direction column
            .art-abstract
                flex 1
                color #aaa
            .art-more
                height 40px
                display flex
                justify-content space-between
                align-items flex-end
            .art-more .view
                color #aaa
h5
    font-size 18px
    margin 10px 0
.pagination
    background-color #f9f9f9
</style>

<script src="./home"></script>
