import { mapState } from 'vuex'
import Friend from '../../components/friend/friend.vue'
import Tag from '../../components/tag/tag.vue'
import moment from 'moment'
export default {
  name: 'home',
  props: {},
  data () {
    return {

    }
  },
  created () { },
  beforeMount () { },
  mounted () { },
  asyncData ({ router, store }) {
    return Promise.all([
      store.dispatch('fetchClassify'),
      store.dispatch('fetchTopArticle')
    ])
  },
  computed: {
    ...mapState(['articleTop'])
  },
  filters: {
    dateFrm (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  },
  methods: {},
  components: {
    Friend,
    Tag
  }
}
