export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  computed: {},
  methods: {
    to (path) {
      window.location.href = path
    }
  }
}
