import { mapState } from 'vuex'
import MarkdownIt from 'markdown-it'
import moment from 'moment'
import Reply from '../../components/reply/reply.vue'

const md = MarkdownIt()

export default {
  name: 'artile',
  data () {
    return {
      content: ''
    }
  },
  created () {},
  beforeMount () {},
  mounted () {
    this.content = md.render(this.articleOne.content)
  },
  asyncData ({ app, router, store }) {
    return Promise.all([
      store.dispatch('fetchArticleDetails', app.$route.params.id)
    ])
  },
  computed: {
    ...mapState(['articleOne'])
  },
  filters: {
    dateFrm (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  },
  methods: {},

  components: {
    Reply
  }
}
