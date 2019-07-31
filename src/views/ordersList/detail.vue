<template>
  <div>
    <van-dropdown-menu>
      <span class="select-cell">选择停车场：</span>
      <van-dropdown-item :title="defaultTitle" ref="item" :disabled="isDropdown">
        <van-radio-group v-model="parkingLotName">
          <van-cell-group>
            <van-cell
              v-for="parkingLot in parkingLots"
              :key="parkingLot.id"
              :title="`${parkingLot.name}(${fomatCapacity(parkingLot)})`"
              clickable
              @click="parkingLotName=parkingLot.name"
            >
              <van-radio slot="right-icon" :name="parkingLot.name" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <van-button block type="info" @click="seleceParkingLot">确认</van-button>
      </van-dropdown-item>
    </van-dropdown-menu>
    <van-cell title="订单号：" :value="orderDetail.id"></van-cell>
    <van-cell title="订单状态：">
      <template slot="default">
        <van-tag round :type="getStatusText().type" class="cell-icon">{{ getStatusText().text }}</van-tag>
      </template>
    </van-cell>

    <van-cell title="车牌号：" :value="orderDetail.carNumber"></van-cell>
    <van-cell title="预约时间：" :value="orderDetail.appointTime|formatTime"></van-cell>
    <van-cell title="预约地点：" :value="orderDetail.appointAddress"></van-cell>
    <div class="btn">
      <van-button
        size="large"
        type="info"
        v-show="btnIsShow"
        @click="updateStatus"
        :disabled="isdisable"
      >
        <template>
          <span>{{ getBtnText() }}</span>
        </template>
      </van-button>
    </div>
  </div>
</template>

<script>
import { getParkingLots } from "../../apis/employee";
import moment from "moment";
import {
  updateOrderParkingLot,
  updateOrderStatus,
  getOrderById
} from "../../apis/orders";
import requestHandler from "../../utils/requestHandler";
export default {
  name: "Detali",
  props: ["orderId"],
  data() {
    return {
      parkingLots: [],
      parkingLotKf: null,
      parkingLotName: "",
      defaultTitle: "请选择停车场",
      isdisable: false,
      btnIsShow: false,
      isDropdown: true,
      orderDetail: {}
    };
  },

  components: {},

  computed: {},

  async created() {
    this.parkingLots = await getParkingLots(this.$store.getters.id);
    this.orderDetail = await getOrderById(this.orderId);
    this.formatDiaplay();
  },
  mounted() {},

  methods: {
    async seleceParkingLot() {
      let parkingLotName = this.parkingLotName;
      this.parkingLotKf = this.parkingLots.find(
        item => item.name === parkingLotName
      );
      await requestHandler
        .invoke(updateOrderParkingLot(this.orderId, this.parkingLotKf))
        .msg("修改成功", "修改失败")
        .loading()
        .exec();
      this.$refs.item.toggle();
      this.defaultTitle = this.parkingLotKf.name;
    },
    fomatCapacity(parkingLot) {
      return parkingLot.size - parkingLot.parkedNum;
    },
    getStatusText() {
      let result = {
        text: "",
        type: ""
      };
      switch (this.orderDetail.status) {
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
        result.text = "订单待支付";
        result.type = "primary";
        break;
      }
      return result;
    },
    getBtnText() {
      let btnText = "";
      switch (this.orderDetail.status) {
      case 2:
        btnText = "完成停车";
        this.btnIsShow = true;
        this.isdisable = false;
        break;
      case 3:
        btnText = "";
        this.btnIsShow = false;
        this.isdisable = true;
        break;
      case 4:
        btnText = "已归还车辆";
        this.btnIsShow = true;
        this.isdisable = false;
        break;
      case 5:
        btnText = "";
        this.btnIsShow = false;
        this.isdisable = true;
        break;
      }
      return btnText;
    },
    async updateStatus() {
      await requestHandler
        .invoke(updateOrderStatus(this.orderId, this.orderDetail.status + 1))
        .msg("操作成功", "操作失败")
        .loading()
        .exec();
      this.isdisable = true;
      this.parkingLots = await getParkingLots(this.$store.getters.id);
      this.orderDetail = await getOrderById(this.orderId);
      this.formatDiaplay();
    },

    formatDiaplay() {
      let parkingLotId = this.orderDetail.parkingLotId;
      if (this.parkingLots.length > 0 && this.orderDetail.parkingLotId) {
        this.parkingLotKf = this.parkingLots.find(item => {
          return item.id === parkingLotId;
        });
        this.defaultTitle = this.parkingLotKf.name;
        this.parkingLotName = this.defaultTitle;
      }
      if (this.orderDetail.status < 2) {
        this.isDropdown = false;
      }
    }
  },
  filters: {
    formatTime: function(time) {
      if (!time) return "";
      return moment(time).format("YYYY年MM月DD日 HH:mm:ss");
    }
  }
};
</script>
<style lang='scss' scoped>
.select-cell {
  position: absolute;
  top: 15px;
  left: 15px;
  color: #323233;
  font-size: 14px;
}
/deep/.van-ellipsis {
  font-weight: 600;
}

.btn {
  margin-top: 100px;
  padding: 0 20px;
}
</style>