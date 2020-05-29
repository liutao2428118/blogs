<template>
    <div>
        <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
            <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
            <div class="reply-info">
                <div
                    tabindex="0"
                    contenteditable="true"
                    id="replyInput"
                    spellcheck="false"
                    placeholder="输入评论..."
                    class="reply-input"
                    @focus="showReplyBtn"
                    @input="onDivInput($event)"
                ></div>
            </div>
            <div class="reply-btn-box" v-show="btnShow">
                <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">发表评论</el-button>
            </div>
        </div>
        <div v-for="(item,i) in reply" :key="i" class="author-title reply-father">
            <el-avatar class="header-img" :size="40" src="https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg"></el-avatar>
            <div class="author-info">
                <span class="author-name">{{item.from.username}}</span>
                <span class="author-time">{{item.time | dateStr}}</span>
            </div>
            <div class="icon-btn">
                <span @click="showReplyInput(i, item.from.username, item.from._id, item._id)">
                    <i class="iconfont el-icon-s-comment"></i>
                    回复
                </span>
                <i class="iconfont el-icon-caret-top"></i>
            </div>
            <div class="talk-box">
                <p>
                    <span class="reply">{{item.content}}</span>
                </p>
            </div>
            <div class="reply-box">
                <div v-for="(reply,j) in item.replyTo" :key="j" class="author-title">
                    <el-avatar class="header-img" :size="40" :src="reply.fromHeadImg"></el-avatar>
                    <div class="author-info">
                        <span class="author-name">{{reply.from.username}}</span>
                        <span class="author-time">{{reply.time | dateStr}}</span>
                    </div>
                    <div class="icon-btn">
                        <span @click="showReplyInput(i,reply.from.username, reply.from._id, item._id)">
                            <i class="iconfont el-icon-s-comment"></i>
                            回复
                        </span>
                        <i class="iconfont el-icon-caret-top"></i>
                    </div>
                    <div class="talk-box">
                        <p>
                            <span>回复 {{reply.to.username}}:</span>
                            <span class="reply">{{reply.content}}</span>
                        </p>
                    </div>
                    <div class="reply-box"></div>
                </div>
            </div>
            <!-- v-show="_inputShow(i)" -->
            <div class="my-reply my-comment-reply">
                <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
                <div class="reply-info">
                    <div
                        tabindex="0"
                        contenteditable="true"
                        spellcheck="false"
                        placeholder="输入评论..."
                        @input="onDivInput($event)"
                        class="reply-input reply-comment-input"
                    ></div>
                </div>
                <div class="reply-btn-box">
                    <el-button
                        class="reply-btn"
                        size="medium"
                        @click="sendCommentReply()"
                        type="primary"
                    >发表评论</el-button>
                </div>
            </div>
        </div>
        <el-dialog title="注册/登录" :visible.sync="dialogVisible" width="30%">
            <el-form ref="form" :model="form"  :rules="rules" label-width="80px">
                <el-form-item label="取个名字" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit('form')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.vueClickOutside = documentHandler;
        document.addEventListener("click", documentHandler);
    },
    update() {},
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener("click", el.vueClickOutside);
        delete el.vueClickOutside;
    }
};
export default {
    name: "ArticleComment",
    data() {
        return {
            dialogVisible: false,
            form:{
                username: "",
                email: ""
            },
            rules: {
                username: [
                    { required: true, message: '取个名字吧', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请填写下邮箱', trigger: 'blur' }
                ]
            },
            btnShow: false,
            index: "0",
            replyComment: "",
            myName: "Lana Del Rey",
            myHeader:
                "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
            myId: 19870621,
            toName: "",
            toId: "",
            superiorId: "",
            comments: [
                {
                    name: "Lana Del Rey",
                    id: 19870621,
                    headImg:
                        "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
                    comment:
                        "我发布一张新专辑Norman Fucking Rockwell,大家快来听啊",
                    time: "2019年9月16日 18:43",
                    commentNum: 2,
                    like: 15,
                    inputShow: false,
                    reply: [
                        {
                            from: "Taylor Swift",
                            fromId: 19891221,
                            fromHeadImg:
                                "https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg",
                            to: "Lana Del Rey",
                            toId: 19870621,
                            comment: "我很喜欢你的新专辑！！",
                            time: "2019年9月16日 18:43",
                            commentNum: 1,
                            like: 15,
                            inputShow: false
                        },
                        {
                            from: "Ariana Grande",
                            fromId: 1123,
                            fromHeadImg:
                                "https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg",
                            to: "Lana Del Rey",
                            toId: 19870621,
                            comment: "别忘记宣传我们的合作单曲啊",
                            time: "2019年9月16日 18:43",
                            commentNum: 0,
                            like: 5,
                            inputShow: false
                        }
                    ]
                },
                {
                    name: "Taylor Swift",
                    id: 19891221,
                    headImg:
                        "https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg",
                    comment: "我发行了我的新专辑Lover",
                    time: "2019年9月16日 18:43",
                    commentNum: 1,
                    like: 5,
                    inputShow: false,
                    reply: [
                        {
                            from: "Lana Del Rey",
                            fromId: 19870621,
                            fromHeadImg:
                                "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
                            to: "Taylor Swift",
                            toId: 19891221,
                            comment: "新专辑和speak now 一样棒！",
                            time: "2019年9月16日 18:43",
                            commentNum: 25,
                            like: 5,
                            inputShow: false
                        }
                    ]
                },
                {
                    name: "Norman Fucking Rockwell",
                    id: 20190830,
                    headImg:
                        "https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg",
                    comment: "Plz buy Norman Fucking Rockwell on everywhere",
                    time: "2019年9月16日 18:43",
                    commentNum: 0,
                    like: 5,
                    inputShow: false,
                    reply: []
                }
            ]
        };
    },
    props: {
        essayId: {
            type: String,
            required: true
        },
        reply: {
            type: Array,
            required: true
        }
    },
    directives: { clickoutside },
    created() {},
    mounted() {
        this.user = JSON.parse(window.localStorage.getItem('user')) 
    },
    filters: {
         dateStr(date) {
             date = new Date(date).getTime()
            //获取js 时间戳
            var time = new Date().getTime();
            //去掉 js 时间戳后三位，与php 时间戳保持一致
            time = parseInt((time - date) / 1000);
            //存储转换值
            var s;
            if (time < 60 * 10) {
                //十分钟内
                return "刚刚";
            } else if (time < 60 * 60 && time >= 60 * 10) {
                //超过十分钟少于1小时
                s = Math.floor(time / 60);
                return s + "分钟前";
            } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
                //超过1小时少于24小时
                s = Math.floor(time / 60 / 60);
                return s + "小时前";
            } else if (time < 60 * 60 * 24 * 30 && time >= 60 * 60 * 24) {
                //超过1天少于30天内
                s = Math.floor(time / 60 / 60 / 24);
                return s + "天前";
            } else {
                //超过30天ddd
                var date = new Date(parseInt(date));
                return (
                    date.getFullYear() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getDate()
                );
            }
        }
    },
    methods: {
        submit(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                   await this.visitorLogin(this.form)
                   this.$message({
                        showClose: true,
                        type: "warning",
                        message: "登录/注册成功"
                    });
                    this.dialogVisible = false
                } else {
                    return false;
                }
            });
            
        },
        inputFocus() {
            var replyInput = document.getElementById("replyInput");
            replyInput.style.padding = "8px 8px";
            replyInput.style.border = "2px solid blue";
            replyInput.focus();
        },
        showReplyBtn() {
            if(!this.user) {
                this.dialogVisible = true
            } else {
                this.btnShow = true;
            }
        },
        hideReplyBtn() {
            this.btnShow = false;
            replyInput.style.padding = "10px";
            replyInput.style.border = "none";
        },
        showReplyInput(i, name, toId, id) {
            // this.comments[this.index].inputShow = false;
            // this.index = i;
            // this.comments[i].inputShow = true;
            console.log("toName:"+name, "toId:"+toId, "superiorId:"+ id)
            this.toName = name;
            this.toId = toId;
            this.superiorId = id
        },
        _inputShow(i) {
            return this.comments[i].inputShow;
        },
        sendComment() {
            if (!this.replyComment) {
                this.$message({
                    showClose: true,
                    type: "warning",
                    message: "评论不能为空"
                });
                return
            }
                let data = {
                    essayId: this.essayId,
                    from: this.user._id,
                    to: this.essayId,
                    superiorId: "",
                    content: this.replyComment
                }
                this.submitComments(data)
               
                let input = document.getElementById("replyInput");
                input.innerHTML = "";
                this.replyComment = "";

                // let a = {};
                // let timeNow = new Date().getTime();
                // let time = this.dateStr(timeNow);
                // a.name = this.myName;
                // a.comment = this.replyComment;
                // a.headImg = this.myHeader;
                // a.time = time;
                // a.commentNum = 0;
                // a.like = 0;
                // this.comments.push(a);
                
                
            
        },
        sendCommentReply() {
            if (!this.replyComment) {
                this.$message({
                    showClose: true,
                    type: "warning",
                    message: "评论不能为空"
                });
                return
            } 

            let data = {
                essayId: this.essayId,
                from: this.user._id,
                to: this.toId,
                superiorId: this.superiorId,
                content: this.replyComment
            }
            this.submitComments(data)

            let input = document.getElementsByClassName("reply-comment-input")
            input.innerHTML = "";
            this.replyComment = "";
           

            // let a = {};
            // let timeNow = new Date().getTime();
            // let time = this.dateStr(timeNow);
            // a.from = this.myName;
            // a.to = this.to;
            // a.fromHeadImg = this.myHeader;
            // a.comment = this.replyComment;
            // a.time = time;
            // a.commentNum = 0;
            // a.like = 0;
            // this.comments[i].reply.push(a);
            
            
        },
        onDivInput: function(e) {
            this.replyComment = e.target.innerHTML;
        },

        ...mapActions([
            'visitorLogin',
            'submitComments'
            ]),
    }
};
</script>
<style lang="stylus" scoped>
.my-reply
    padding 10px
    background-color #fafbfc
    .header-img
        display inline-block
        vertical-align top
    .reply-info    
        display inline-block
        margin-left 5px
        width 90%
        @media screen and (max-width:1200px) {
            width 80%
        }
        .reply-input
            min-height 20px
            line-height 22px
            padding 10px 10px
            color #ccc
            background-color #fff
            border-radius 5px
            &:empty:before
                content attr(placeholder)
            &:focus:before
                content none
            &:focus
                padding 8px 8px
                border 2px solid blue
                box-shadow none
                outline none
    .reply-btn-box
        height 25px
        margin 10px 0
        .reply-btn
            position relative
            float right
            margin-right 15px
.my-comment-reply
    margin-left 50px
    .reply-input
        width flex
.author-title:not(:last-child)
    border-bottom: 1px solid rgba(178,186,194,.3)
.author-title
    padding 10px
    .header-img
        display inline-block
        vertical-align top
    .author-info
        display inline-block
        margin-left 5px
        width 60%
        height 40px
        line-height 20px
        >span 
            display block
            cursor pointer
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
        .author-name
            color #000
            font-size 18px
            font-weight bold
        .author-time
            font-size 14px
    .icon-btn
        width 30%
        padding 0 !important 
        float right
        @media screen and (max-width : 1200px){
            width 20%
            padding 7px
        }
        >span 
            cursor pointer
        .iconfont 
            margin 0 5px
    .talk-box
        margin 0 50px
        >p
           margin 0
        .reply
            font-size 16px
            color #000
    .reply-box
        margin 10px 0 0 50px
        background-color #efefef
</style>
