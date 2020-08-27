import { mapState } from 'vuex'

export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    ...mapState(['classifyArr'])
  },
  methods: {
    to (path) {
      window.location.href = path
    }
  }
}
