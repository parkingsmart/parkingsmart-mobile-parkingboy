<template>
  <div class="order">
    <van-pull-refresh v-model="isLoading" @refresh="initData" class="borad">
      <van-cell
        v-for="(order,index) in orders"
        :key="order.id"
        :label="order.appointTime | formatTime"
        size="large"
        @click="grabOrder(order,index)"
      >
        <template slot="title">
          <span class="carNo">{{ order.carNumber }}</span>
        </template>
        <template slot="icon">
          <img class="cell-icon" src="../assets/img/smallcar.png" />
          <span class="address">{{ order.appointAddress }}</span>
        </template>
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
    async grabOrder(order,index) {
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
        .catch(() => {
          this.orders.splice(index,1);
        });
    }
  },
  filters: {
    formatTime: function(time) {
      if (!time) return "";
      return moment(time).format("MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang='scss' scoped>
.address {
  font-weight: 600;
  display: inline-block;
  padding-right: 20px;
  max-width: 100px;
  color: #4595e6;
}

.cell-icon {
  height: 50px;
  margin-right: 10px;
}
.borad {
  height: 580px;
}
.order {
  text-align: left;
}
</style>