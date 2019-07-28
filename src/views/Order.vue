<template>
  <div class="order">
    <van-cell
      v-for="order in orders"
      :key="order.id"
      :title="order.carNumebr"
      :label="formatTime(order)"
      icon="logistics"
      size="large"
      @click="grabOrder(order)"
    >
      <template slot="default">
        <van-button round type="danger">抢单</van-button>
      </template>
    </van-cell>
  </div>
</template>

<script>
import moment from "moment";
import { getAllNewOrders, grabOrderById } from "../apis/orders";
export default {
  name: "Order",
  props: [""],
  data() {
    return {
      orders: [
        {
          id: "12312",
          carNumber: "66666",
          parkTime: "10:20",
          type: 1
        },
        {
          id: "12312313",
          carNumber: "77777",
          parkTime: "10:20",
          fetchTime: "19:20",
          type: 0
        }
      ]
    };
  },

  components: {},

  computed: {},

  created() {
    this.checkExistUser();
  },

  beforeMount() {},

  mounted() {
    this.initData();
  },

  methods: {
    checkExistUser() {
      if (!this.$store.state.employee) {
        this.$router.push({ name: "login" });
      }
    },
    async initData() {
      this.orders = (await getAllNewOrders()).newOrders;
    },
    grabOrder(order) {
      console.log(order);
      grabOrderById(order.id,this.$store.state.employee)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.$router.push({ name: "place" });
    },
    formatTime(order) {
      let time = moment(time).format("HH:mm");
      return order.type === 0 ? "停车时间：" + time : "取车时间：" + time;
    }
  },
  watch: {}
};
</script>
<style lang='scss' scoped>
.order {
  text-align: left;
}
</style>