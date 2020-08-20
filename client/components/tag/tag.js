import { mapState } from 'vuex'

export default {
  name: 'tag',
  computed: {
    ...mapState(['classifyArr'])
  },
  methods: {
    tag (id) {
      window.location.href = `/archive/${id}`
    }
  }
}
