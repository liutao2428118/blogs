<template>
  <div class="about">
    <el-row class="main" type="flex" justify="center">
      <el-col :span="16">
        <h5 class="title">
          <i class="el-icon-star-on"></i>
          关于自己
        </h5>
        <div class="statement">
          <div class="item">遵循自己想要的</div>
          <div class="item">
            向上的路并不拥挤，而大多数人选择了安逸。
          </div>
        </div>
        <div class="statement">
          <div class="item">Email：liutao2428118@163.com</div>
          <div class="item">QQ：564310762</div>
          <div class="item">
            语雀：
            <a target="_blank" href="https://www.yuque.com/kuangyedeluobu"
              >https://www.yuque.com/kuangyedeluobu</a
            >
          </div>
        </div>

        <h5 class="title">
          <i class="el-icon-star-on"></i>
          关于博客
        </h5>
        <el-card shadow="always">
          <dl class="dl-blog">
            <dt>博客开源</dt>
            <dd>
              <a target="_blank" href="https://github.com/liutao2428118/blogs"
                >项目地址</a
              >
            </dd>
            <dt>涉及技术</dt>
            <dd>
              ES6+、Vue、Vue-Router、Element-ui、Vue-ssr、axios、node、koa2、mongodb、
            </dd>
            <dt>其他</dt>
            <dd>
              ssr渲染，后台Markdown编写文章，无限嵌套评论回复，后台管理员回复评论，图片资源上传七牛云
            </dd>
          </dl>
        </el-card>

        <h5 class="title">
          <i class="el-icon-star-on"></i>
          给我留言
        </h5>
        <el-card shadow="always">
          <el-form
            label-position="left"
            :rules="rulest"
            label-width="80px"
            ref="formLabelAlign"
            :model="formLabelAlign"
          >
            <el-form-item label="留言内容" prop="content">
              <el-input
                ref="textarea"
                :autosize="{ minRows: 8, maxRows: 10 }"
                type="textarea"
                v-model="formLabelAlign.content"
                @focus="textareaFocus"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('formLabelAlign')"
                >提交留言</el-button
              >
            </el-form-item>
          </el-form>

          <div class="leave" id="leave">
            <div class="leave-item" v-for="(item, index) in leaveData.list">
              <div class="head">
                <el-avatar size="small">{{
                  item.authorId && item.authorId.username.split("")[0]
                }}</el-avatar>
              </div>
              <div class="content">
                <div class="name" :id="item._id">
                  {{ item.authorId && item.authorId.username }}
                  <span>{{ index + 1 }}楼•{{ item.createdAt | dateStr }}</span>
                  <i @click="handlerReply(item.authorId)">回复</i>
                </div>
                <div class="content-box" v-html="item.content"></div>
              </div>
            </div>
          </div>

          <el-pagination
            style="margin-top: 20px"
            background
            @current-change="currentChange"
            :current-page.sync="page"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="leaveData.total"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      title="注册/登录"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="400px"
      top="20vh"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="取个名字" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitLogin('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="stylus" scoped>
.dl-blog dd
    margin-left 30px
.dl-blog .icon
    width 20px
    height 20px
.title
    margin-top 40px
.statement
    border-left 3px solid #f56c6c
    padding 20px
    background-color #ebeef5
    margin-top 20px
.leave
    font-size 14px
    border-top 1px solid #f0f0f0
    .leave-item
        display flex
        width 100%
        padding 12px 0 20px 0
        border-bottom 1px solid #f0f0f0
        .head
            width 30px
            height 30px
            margin-right 10px
        .content
            flex 1
            .name
                color #666
                text-decoration none
                font-weight 600
                span
                    font-size 11px
                    color #08c
                    font-weight 400
                i
                    font-size 12px
                    color #666
                    float right
                    cursor pointer
                    font-weight 400
            .content-box
                color #333
                margin-top 10px
                font-size 15px
</style>

<script src="./about"></script>
