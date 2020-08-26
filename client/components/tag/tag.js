import { mapState } from 'vuex'

export default {
  name: 'mytag',
  computed: {
    ...mapState(['classifyArr'])
  },
  methods: {
    handleTag (id) {
      window.location.href = '/archive/' + id + ''
    }
  }
}
