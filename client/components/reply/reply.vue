<template>
    <div class="reply-content">
        <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
            <el-avatar class="icon" size="medium" icon="el-icon-user-solid"></el-avatar>
            <!-- <span class="username">{{user && user.username}}</span> -->
            <div class="reply-info">
                <div
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
                <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">评论</el-button>
            </div>
        </div>
        <!-- 评论列表 -->
        <div v-for="(one,index) in reply" :key="one._id" class="author-title to-title reply-father">
            <el-avatar class="icon" size="medium" icon="el-icon-user-solid"></el-avatar>
            <div class="author-info">
                <span class="author-name">{{one.from && one.from.username}}</span>
            </div>
            <div class="talk-box">
                <p>
                    <span class="reply">{{one.content}}</span>
                </p>
            </div>
            <div class="icon-btn">
                <span class="author-time">{{one.createdAt | dateStr}}</span>
                <span
                    class="comment"
                    :class="{active: hash === one._id}"
                    :id="one._id"
                    @click="showReplyInput(one.from.username, one.from._id, one._id, one._id)"
                >
                    <i class="iconfont el-icon-s-comment"></i>
                    回复
                </span>
            </div>
            <!-- 回复input -->
            <div v-show="showId === one._id" class="my-reply" style="margin: 10px 50px;">
                <div class="reply-info">
                    <div
                        contenteditable="true"
                        spellcheck="false"
                        :placeholder="'回复' + toName + '...'"
                        @input="onDivInput($event)"
                        class="reply-input reply-comment-input"
                    ></div>
                </div>
                <div class="reply-btn-box">
                    <el-button
                        class="reply-btn"
                        size="medium"
                        @click="sendCommentReply(index)"
                        type="primary"
                    >评论</el-button>
                </div>
            </div>
            <!-- 评论-to -->
            <div class="reply-box" style="margin: 0 50px;">
                <div v-for="two in one.replyTo && one.replyTo" :key="two._id" class="author-title">
                    <el-avatar class="icon" size="medium" icon="el-icon-user-solid"></el-avatar>
                    <div class="author-info">
                        <span class="author-name">{{two.from.username}}</span>
                    </div>
                    <div class="talk-box">
                        <p>
                            <span v-show="one.from._id !== two.to._id">
                                回复
                                <span class="to-name">{{two.to.username}}</span> :
                            </span>
                            <span class="reply">{{two.content}}</span>
                        </p>
                    </div>
                    <div class="icon-btn">
                        <span class="author-time">{{two.createdAt | dateStr}}</span>
                        <span
                            class="comment"
                            :class="{active: hash === two._id}"
                            :id="two._id"
                            @click="showReplyInput(two.from.username, two.from._id, one._id, two._id)"
                        >
                            <i class="iconfont el-icon-s-comment"></i>
                            回复
                        </span>
                    </div>
                    <!-- 回复input -->
                    <div v-show="showId === two._id" class="my-reply my-comment-reply">
                        <div class="reply-info">
                            <div
                                contenteditable="true"
                                spellcheck="false"
                                :placeholder="'回复' + toName+ '...'"
                                @input="onDivInput($event)"
                                class="reply-input reply-comment-input"
                            ></div>
                        </div>
                        <div class="reply-btn-box">
                            <el-button
                                class="reply-btn"
                                size="medium"
                                @click="sendCommentReply(index)"
                                type="primary"
                            >评论</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                <el-button type="primary" @click="submit('form')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style lang="stylus" scoped>
.reply-content
    margin-top: 20px
.my-reply
    padding: 10px
    background-color: #fafbfc
    .username
        color: #576b95
        font-size: 18px
        padding: 10px 0
    .header-img
        display: inline-block
        vertical-align: top
    .reply-info
        display: inline-block
        margin-left: 5px
        border: 1px solid #f1f1f1
        width: 90%
        background-color: #fff
        border-radius: 4px
        @media screen and (max-width: 1200px)
            width: 80%
        .reply-input
            min-height: 20px
            line-height: 22px
            padding: 10px 10px
            color: #ccc
            background-color: #fff
            border-radius: 5px
            &:empty:before
                content: attr(placeholder)
            &:focus:before
                content: none
            &:focus
                padding: 8px 8px
                border: 1px solid #007fff
                box-shadow: none
                outline: none
    .reply-btn-box
        height: 25px
        margin: 10px 0
        margin-right: 40px
        .reply-btn
            position: relative
            float: right
            margin-right: 15px
.my-comment-reply
    margin-left: 50px
    margin-top: 20px
    background-color: #fff
    border: 1px solid #f1f1f2
.author-title:not(:last-child)
    border-bottom: 1px solid rgba(178, 186, 194, 0.3)
.to-title
    margin-left: 40px
.author-title
    padding: 10px
    .header-img
        display: inline-block
        vertical-align: top
    .author-info
        display: inline-block
        margin-left: 5px
        width: 60%
        height: 40px
        line-height: 20px
        >span
            display: block
            cursor: pointer
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
        .author-name
            color: #333
            font-size: 14px
            padding: 10px 0
    .icon-btn
        padding: 0 !important
        margin: 0 50px
        color: #8a93a0
        font-size: 14px
        margin-top: 10px
        margin-bottom: 10px
        .author-time
            font-size: 14px
        .comment
            float: right
        @media screen and (max-width: 1200px)
            // width: 20%;
            padding: 7px
        .active
            color: #67c23a
        >span
            cursor: pointer
        .iconfont
            margin: 0 5px
    .talk-box
        margin: 0 50px
        font-size: 14px
        .to-name
            color: #406599
            font-size: 14px
            padding: 10px 0
        >p
            margin: 0
        .reply
            font-size: 14px
            color: #505050
    .reply-box
        margin: 10px 0 0 50px
        background-color: #fafbfc
.icon
    font-size: 20px
    vertical-align: top
</style>
<script src="./reply"></script>
