<template>
  <div>
    <van-cell-group>
      <van-cell
        v-for="order in ordersOnGoing"
        :key="order.id"
        :title="order.carNumber"
        :label="order.appointTime |formatTime"
        size="large"
        is-link
        :to="{ name:'detail',params:{orderId:order.id} }"
        icon="location-o"
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import moment from "moment";
import { getAllOrdersOnGoing } from "../../apis/employee";
export default {
  name: "List",
  data() {
    return {
      ordersOnGoing: []
    };
  },

  components: {},

  computed: {},

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      this.ordersOnGoing = await getAllOrdersOnGoing(
        this.$store.state.employee.id
      );
    }
  },
  filters: {
    formatTime: function(value) {
      if (!value) return "";
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  watch: {}
};
</script>
<style lang='' scoped>
</style>