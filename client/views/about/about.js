import { mapState, mapActions } from 'vuex'
import Cookies from 'js-cookie'
export default {
  name: 'about',
  data () {
    return {
      page: 1,
      author: {},
      dialogVisible: false,
      form: {
        username: '',
        email: ''
      },
      formLabelAlign: {
        content: ''
      },
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
      },
      rulest: {
        content: [
          {
            required: true,
            message: '请填写留言内容',
            trigger: 'change'
          }
        ]
      }
    }
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
    ...mapState(['leaveData'])
  },
  created () {},
  mounted () {
    this.userKey = Cookies.get('userKey')
    const user = Cookies.get('user')
    if (user) this.user = JSON.parse(user)

    this.page = parseInt(this.$route.params.page)
  },
  asyncData ({ app, router, store }) {
    return Promise.all([
      store.dispatch('fetchLeaveList', {
        page: app.$route.params.page,
        page_size: 10
      }),
      store.dispatch('fetchClassify')
    ])
  },
  methods: {
    currentChange (page) {
      window.location.href = `/about/${page}#leave`
    },
    /**
         * 登录
         */
    submitLogin (formName) {
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
    handlerReply (author) {
      this.formLabelAlign.content = ` @${author.username}:`

      this.author = author

      this.$refs.textarea.$el.children[0].focus()
    },
    textareaFocus () {
      if (!this.userKey) { return (this.dialogVisible = !this.dialogVisible) }
    },
    submitForm (formName) {
      if (!this.userKey) { return (this.dialogVisible = !this.dialogVisible) }

      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const content = this.formLabelAlign.content

          this.formLabelAlign.content = content.replace(
            '@' + this.author.username + ':',
            '<a href="javascript:void(0);">@' +
                            this.author.username +
                            '</a>&nbsp;'
          )

          await this.addLeave(this.formLabelAlign)

          window.location.reload()
        } else {
          return false
        }
      })
    },
    ...mapActions(['login', 'addLeave'])
  },
  components: {}
}
