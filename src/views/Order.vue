<template>
  <div class="order">
    <van-pull-refresh v-model="isLoading" @refresh="initData" class="borad">
      <van-cell
        v-for="order in orders"
        :key="order.id"
        :title="order.carNumber"
        :label="order.appointTime |formatTime"
        icon="logistics"
        size="large"
        @click="grabOrder(order)"
      >
        <template slot="default">
          <van-button round type="info">抢单</van-button>
        </template>
      </van-cell>
    </van-pull-refresh>
  </div>
</template>

<script>
import moment from "moment";
import { getAllNewOrders, grabOrderById } from "../apis/orders";
import requestHandler from "../utils/requestHandler";
export default {
  name: "Order",
  props: [""],
  data() {
    return {
      orders: [],
      isLoading: false
    };
  },

  created() {
    this.checkExistUser();
  },

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
      this.orders = (await requestHandler
        .invoke(getAllNewOrders())
        .msg("获取订单列表", "获取失败")
        .loading()
        .exec()).orders;
      this.isLoading = false;
    },
    async grabOrder(order) {
      await requestHandler
        .invoke(grabOrderById(order.id, this.$store.state.employee))
        .msg("抢单成功", "您手慢了")
        .loading()
        .exec();

      this.$dialog
        .confirm({
          message: "是否现在选择停车位？"
        })
        .then(() => {
          this.$router.push({ name: "detail", params: { orderId: order.id } });
        })
        .catch(() => {});
    }
  },
  filters: {
    formatTime: function(time) {
      if (!time) return "";
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang='scss' scoped>
.borad {
  height: 580px;
}
.order {
  text-align: left;
}
</style>