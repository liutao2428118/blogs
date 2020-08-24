import Tag from '../../components/tag/tag.vue'
import { mapState } from 'vuex'
export default {
  name: 'archive',
  data () {
    return {

    }
  },
  created () {},
  mounted () {},
  asyncData ({ app, router, store }) {
    return Promise.all([
      store.dispatch('fetchArticleYearData', app.$route.params.id),
      store.dispatch('fetchClassify')
    ])
  },
  computed: {
    ...mapState(['articleYearData'])
  },
  methods: {
    hoverLine (activity) {
      activity.color = '#409eff'
    },
    to (id) {
      window.location.href = `/article/${id}`
    }
  },
  components: {
    Tag
  }
}
