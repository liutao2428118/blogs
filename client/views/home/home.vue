<template>
  <div class="table-box">
    客户端-tao.lt
    <div v-for="item in categoryArr">
      <span>{{item._id}}</span>
      <span>{{item.name}}</span>
      <span>{{item.genre}}</span>
    </div>
  </div>
</template>

<script>
// import apiModel from "../../api-model/client-api";
import { mapState, mapActions } from "vuex";
// import moment from "moment";
export default {
  name: "home",
  props: [""],
  data() {
    return {
      tableData: [],
      form: {
        name: "",
        age: "",
        site: ""
      }
    };
  },
  created() {
    if(this.categoryArr && this.categoryArr.length < 1) {
      this.fetchCategorys()
    }
    
  },
  computed: {
    ...mapState([
      'categoryArr'
    ])
  },
  beforeMount() {},
  mounted() {},
  asyncData({ router, store }) {
    return store.dispatch("fetchCategorys");
  },
  filters: {},
  methods: {
    ...mapActions([
      'fetchCategorys'
    ])
  },

  components: {}
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped></style>