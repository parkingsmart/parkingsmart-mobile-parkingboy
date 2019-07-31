<template>
  <div class="order">
    <van-pull-refresh v-model="isLoading" @refresh="initData" class="borad">
      <span v-show="isShowMess">暂无更多订单..</span>
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
    <van-dialog
      v-model="showDialog"
      show-cancel-button
      @confirm="dialogConfirm"
      @cancel="dialogCancel"
      class="dialogContent"
    >
      <img class="icon" src="../assets/img/successIcon.png" />
      <p class="successMess">抢单成功!</p>
      <p>是否现在为用户选择停车场？</p>
    </van-dialog>
  </div>
</template>

<script>
import moment from "moment";
import Config from "../config";
import { getAllNewOrders, grabOrderById } from "../apis/orders";
import requestHandler from "../utils/requestHandler";
export default {
  name: "Order",
  props: [""],
  data() {
    return {
      ws: null,
      orders: [],
      isLoading: false,
      isShowMess: false,
      showDialog: false,
      currentOrder: {
        id: "",
        index: ""
      }
    };
  },

  created() {
    this.ws = new WebSocket(
      `${Config.wsUrl()}/api/employees/${this.$store.getters.id}/orders`
    );
    this.ws.onmessage = this.wsHandler;
  },

  mounted() {
    this.initData();
  },

  methods: {
    async initData() {
      this.orders = (await requestHandler
        .invoke(getAllNewOrders())
        .msg(null, "获取失败")
        .loading()
        .exec()).orders;
      if (this.orders.length === 0) {
        this.isShowMess = true;
      }
      this.$toast({ message: "刷新成功", duration: 1000 });
      this.isLoading = false;
    },
    async grabOrder(order, index) {
      this.currentOrderId = {};
      await requestHandler
        .invoke(grabOrderById(order.id, this.$store.state.employee))
        .msg(null, "您手慢了")
        .loading()
        .exec();
      this.currentOrder.id = order.id;
      this.currentOrder.index = index;
      this.showDialog = true;
    },
    dialogConfirm() {
      this.$router.push({
        name: "detail",
        params: { orderId: this.currentOrder.id }
      });
    },
    dialogCancel() {
      this.orders.splice(this.currentOrder.index, 1);
    },
    async wsHandler(res) {
      if (res.data === "1") {
        await this.initData();
      }
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
/deep/.van-pull-refresh__track {
  height: 300px;
}
.dialogContent {
  text-align: center;
  padding-top: 30px;
  & .icon{
    height:50px;
  }
  & .successMess{
    color: #5cad5c;
    margin-top: 0px;
  }
}
</style>