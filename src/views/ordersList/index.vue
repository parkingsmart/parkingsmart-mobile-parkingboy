<template>
  <div class="content">
    <van-cell-group>
      <van-cell
        v-for="order in ordersOnGoing"
        :key="order.id"
        :title="order.carNumber"
        :label="order.appointTime |formatTime"
        size="large"
        is-link
        :to="{ name:'detail',params:{orderId:order.id} }"
      >
        <template slot="icon">
          <span class="address">{{ order.appointAddress }}</span>
        </template>
        <template slot="default">
          <van-tag round :type="getStatus(order).type" class="cell-icon">{{ getStatus(order).text }}</van-tag>
        </template>
      </van-cell>
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
      ordersOnGoing: [],
      btnType: "danger"
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
    },
    getStatus(order) {
      let result = {
        type: "danger",
        text: ""
      };
      switch (order.status) {
      case 1:
        result.text = "待停车";
        result.type = "danger";
        break;
      case 2:
        result.text = "已停车";
        result.type = "success";
        break;
      case 3:
        result.text = "待取车";
        result.type = "danger";
        break;
      case 4:
        result.text = "待支付";
        result.type = "primary";
        break;
      }
      return result;
    }
  },
  filters: {
    formatTime: function(value) {
      if (!value) return "";
      return '预约时间: ' + moment(value).format("HH:mm");
    }
  },
  watch: {}
};
</script>
<style lang='scss' scoped>
.address {
  font-weight: 600;
  display: inline-block;
  padding-right: 20px;
  min-width: 100px;
  color: #4595e6;
}
.content {
  background-color: #f8f8f8;
}
/deep/.van-cell__right-icon {
  line-height: 45px;
}
.cell-icon {
  margin-top: 12px;
}
</style>