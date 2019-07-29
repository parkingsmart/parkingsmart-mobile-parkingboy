<template>
  <div class="order">
    <van-pull-refresh v-model="isLoading" @refresh="initData" class="borad">
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
          <van-button round type="info">抢单</van-button>
        </template>
      </van-cell>
    </van-pull-refresh>
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
      orders: [],
      isLoading: false
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
      this.isLoading = false;
    },
    grabOrder(order) {
      grabOrderById(order.id, this.$store.state.employee)
        .then(() => {
          order.employeeId = this.$store.state.employee.id;
          this.$store.commit("saveCurrentOrder", order);
          this.$toast({message:"抢单成功",type:"success",forbidClick:true,onClose:this.$router.push({ name: "place" })});
          console.log(
            "this.$store.state.currentOrder:",
            this.$store.state.currentOrder
          );
        })
        .catch(err => {
          console.log(err);
        });
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
.borad{
  height:580px;
}
.order {
  text-align: left;
}
</style>