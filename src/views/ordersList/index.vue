<template>
  <div class="content">
    <p v-show="isShowMess" class="tips">暂无更多订单..</p>
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
        <!-- <template slot="icon">
          <span class="address">{{ order.appointAddress }}</span>
        </template> -->
        <template slot="default">
           <span class="address">{{ order.appointAddress }}</span>
        </template>
        <template slot="right-icon">
          <van-tag round :type="getStatus(order).type" class="cell-icon">{{ getStatus(order).text }}</van-tag>
          <van-icon class="arrow-icon" name="arrow" />
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
      btnType: "danger",
      isShowMess: false
    };
  },

  components: {},

  computed: {},

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      this.ordersOnGoing = await getAllOrdersOnGoing(this.$store.getters.id);
    },
    getStatus(order) {
      let result = {
        type: "danger",
        text: ""
      };
      switch (order.status) {
      case 1:
        result.text = "待取车";
        result.type = "danger";
        break;
      case 2:
        result.text = "已取车";
        result.type = "primary";
        break;
      case 3:
        result.text = "已停车";
        result.type = "primary";
        break;
      case 4:
        result.text = "待交车";
        result.type = "danger";
        break;
      case 5:
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
      return "预约时间: " + moment(value).format("HH:mm");
    }
  },
  watch: {}
};
</script>
<style lang='scss' scoped>
.tips {
  text-align: center;
  color: #9f9fa3;
}
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
/deep/.van-cell__value{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
}
.cell-icon {
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
}
.arrow-icon{
  line-height: 45px;
}
</style>