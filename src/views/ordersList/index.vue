<template>
  <div>
    <van-cell-group>
      <van-cell
        v-for="order in ordersOnGoing"
        :key="order.id"
        :title="order.carNumebr"
        :label="order.appointTime |formatTime"
        icon="logistics"
        size="large"
        is-link
        :to="{ name:'detail',params:{orderId:order.id} }"
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getAllOrdersOnGoing } from "../../apis/orders";
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
      this.ordersOnGoing = (await getAllOrdersOnGoing()).orders;
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>