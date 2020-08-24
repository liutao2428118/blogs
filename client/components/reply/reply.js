import Cookies from 'js-cookie'
import { mapActions } from 'vuex'
const clickoutside = {
  // 初始化指令
  bind (el, binding, vnode) {
    function documentHandler (e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update () {},
  unbind (el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside)
    delete el.vueClickOutside
  }
}
export default {
  name: 'ArticleComment',
  data () {
    return {
      user: null,
      form: {
        username: '',
        email: ''
      },
      btnShow: false,
      dialogVisible: false,
      toName: '',
      toId: '',
      replyId: '',
      hash: '',
      showId: '',
      rules: {
        username: [
          { required: true, message: '取个名字吧', trigger: 'blur' }
        ],
        email: [
          {
            required: true,
            message: '请填写下邮箱',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  props: {
    articleId: {
      type: String,
      required: true
    },
    reply: {
      type: Array,
      required: true
    }
  },
  directives: { clickoutside },
  created () {},
  mounted () {
    this.hash =
            window.location.hash.length > 0
              ? window.location.hash.substring(1)
              : ''
    this.userKey = Cookies.get('userKey')
    const user = Cookies.get('user')
    if (user) this.user = JSON.parse(user)
  },
  methods: {
    /**
         * 登录
         */
    submit (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.login(this.form)

          this.$message({
            showClose: true,
            type: 'warning',
            message: '登录/注册成功'
          })

          this.dialogVisible = false
          window.location.reload()
        } else {
          return false
        }
      })
    },
    /**
     * 焦点改变样式
     */
    inputFocus () {
      const replyInput = document.getElementById('replyInput')
      replyInput.style.padding = '8px 8px'
      replyInput.style.border = '1px solid #007fff'
      replyInput.focus()
    },
    showReplyBtn () {
      if (!this.userKey) {
        this.dialogVisible = true
      } else {
        this.btnShow = true
      }
    },
    hideReplyBtn () {
      const replyInput = document.getElementById('replyInput')
      this.btnShow = false
      replyInput.style.padding = '10px'
      replyInput.style.border = 'none'
    },
    /**
     * 回复按钮
     */
    showReplyInput (username, toId, replyId, showId) {
      if (!this.userKey) {
        this.dialogVisible = true
        return false
      }
      this.toName = username
      this.toId = toId
      this.replyId = replyId
      this.showId = showId
    },
    /**
     * 评论文章
     */
    async sendComment () {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
        return
      }

      const data = {
        articleId: this.articleId,
        from: this.user._id,
        to: this.articleId,
        replyId: this.articleId,
        content: this.replyComment,
        createdAt: new Date().getTime()
      }

      await this.submitReply(data)

      const input = document.getElementById('replyInput')
      input.innerHTML = ''
      this.replyComment = ''

      data.from = {
        username: this.user.username,
        _id: this.user._id
      }

      this.reply.push(data)

      this.$message({
        message: '评论成功！',
        type: 'success'
      })
    },
    /**
     * 回复评论
     */
    async sendCommentReply (i) {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
        return
      }

      const data = {
        articleId: this.articleId,
        from: this.user._id,
        to: this.toId,
        replyId: this.replyId,
        content: this.replyComment,
        createdAt: new Date().getTime()
      }

      await this.submitReply(data)

      const input = document.getElementsByClassName('reply-comment-input')
      input.innerHTML = ''
      this.replyComment = ''

      data.from = {
        username: this.user.username,
        _id: this.user._id
      }

      data.to = {
        username: this.toName,
        _id: this.toId
      }

      this.reply[i].replyTo.push(data)

      this.$message({
        message: '回复成功！',
        type: 'success'
      })
    },
    onDivInput: function (e) {
      this.replyComment = e.target.innerHTML
    },

    ...mapActions(['login', 'submitReply'])
  }
}
