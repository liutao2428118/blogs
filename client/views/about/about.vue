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
                    <div class="item">向上的路并不拥挤，而大多数人选择了安逸。</div>
                </div>
                <div class="statement">
                    <div class="item">Email：liutao2428118@163.com</div>
                    <div class="item">QQ：564310762</div>
                    <div class="item">
                        语雀：
                        <a
                            target="_blank"
                            href="https://www.yuque.com/kuangyedeluobu"
                        >https://www.yuque.com/kuangyedeluobu</a>
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
                            <a target="_blank" href="https://github.com/liutao2428118/blogs">项目地址</a>
                        </dd>
                        <dt>涉及技术</dt>
                        <dd>ES6+、Vue、Vue-Router、Element-ui、Vue-ssr、axios、node、koa2、mongodb、</dd>
                        <dt>其他</dt>
                        <dd>ssr渲染，后台Markdown编写文章，无限嵌套评论回复，后台管理员回复评论</dd>
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
                                :autosize="{ minRows: 8, maxRows: 10}"
                                type="textarea"
                                v-model="formLabelAlign.content"
                                @focus="textareaFocus"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('formLabelAlign')">提交留言</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="leave">
                        <div class="leave-item" v-for="(item, index) in leaveData">
                            <div class="head">
                                <el-avatar size="small">{{item.authorId && item.authorId.username.split("")[0]}}</el-avatar>
                            </div>
                            <div class="content">
                                <div class="name">{{item.authorId && item.authorId.username}} <span>{{index+1}}楼•{{item.createdAt | dateStr}}</span> <i @click="handlerReply(item.authorId)">回复</i></div>
                                <div class="content-box" v-html="item.content"></div>
                            </div>
                        </div>
                    </div>
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

<script>
import { mapState, mapActions } from "vuex";
import Cookies from "js-cookie";
export default {
    name: "about",
    data() {
        return {
            author: {},
            dialogVisible: false,
            form: {
                username: "",
                email: "",
            },
            formLabelAlign: {
                content: "",
            },
            rules: {
                username: [
                    { required: true, message: "取个名字吧", trigger: "blur" },
                ],
                email: [
                    {
                        required: true,
                        message: "请填写下邮箱",
                        trigger: "blur",
                    },
                ],
            },
            rulest: {
                content: [
                    {
                        required: true,
                        message: "请填写留言内容",
                        trigger: "change",
                    },
                ],
            },
        };
    },
    directives: {
        focus: {
            // 当被绑定的元素插入到 DOM 中时……
            inserted: function (el) {
                // 聚焦元素
                el.children[0].focus()
            }

        }
    },
    computed: {
        ...mapState(["leaveData"]),
    },
    created() {
        console.log(this.leaveData)
    },
    mounted() {
        this.userKey = Cookies.get("userKey");
        const user = Cookies.get("user");
        if (user) this.user = JSON.parse(user);
    },
    asyncData({ router, store }) {
        return store.dispatch("fetchLeaveList");
    },
    methods: {
        /**
         * 登录
         */
        submitLogin(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await this.login(this.form);

                    this.$message({
                        showClose: true,
                        type: "warning",
                        message: "登录/注册成功",
                    });

                    this.dialogVisible = false;
                    window.location.reload();
                } else {
                    return false;
                }
            });
        },
        handlerReply(author) {
            this.formLabelAlign.content = ` @${author.username}:`

            this.author = author

            this.$refs.textarea.$el.children[0].focus()
        },
        textareaFocus() {
            if (!this.userKey)
                return (this.dialogVisible = !this.dialogVisible);
        },
        submitForm(formName) {
            if (!this.userKey)
                return (this.dialogVisible = !this.dialogVisible);

            this.$refs[formName].validate(async (valid) => {
                if (valid) {

                    const content = this.formLabelAlign.content

                    this.formLabelAlign.content = content.replace('@' + this.author.username + ':', '<a href="javascript:void(0);"> @'+ this.author.username+'</a>')

                    await this.addLeave(this.formLabelAlign)

                    window.location.reload()
                } else {
                    return false;
                }
            });
        },
        ...mapActions(["login", "addLeave"]),
    },
    components: {},
};
</script>

<style lang="stylus" scoped>
.dl-blog dd {
    margin-left: 30px;
}

.dl-blog .icon {
    width: 20px;
    height: 20px;
}

.title {
    margin-top: 40px;
}

.statement {
    border-left: 3px solid #f56c6c;
    padding: 20px;
    background-color: #ebeef5;
    margin-top: 20px;
}

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