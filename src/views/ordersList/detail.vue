<template>
  <div>
    <van-dropdown-menu>
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
    <div>
      <van-cell
        :key="orderDetail.id"
        :title="orderDetail.status"
        :label="orderDetail.carNumber">
      </van-cell>
      <div class="btn">
        <van-button size="large" type="info" @click="updateStatus" :disabled="isdisable">
          <template>
            <span>{{ getStatus() }}</span>
          </template>
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getParkingLots } from "../../apis/employee";
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
      isDropdown:true,
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
    getStatus() {
      let result;
      switch (this.orderDetail.status) {
      case 1:
        result = "完成停车";
        this.isdisable = this.parkingLotKf ? false : true;
        break;
      case 2:
        result = "完成取车";
        this.isdisable = true;
        break;
      case 3:
        result = "完成取车";
        this.isdisable = false;
        break;
      default:
        result = "订单待支付";
        this.isdisable = true;
        break;
      }
      return result;
    },
    async updateStatus() {
      await requestHandler
        .invoke(updateOrderStatus(this.orderId, ++this.orderDetail.status))
        .msg("完成停车", "操作失败")
        .loading()
        .exec();
      this.isdisable = true;
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
      if(this.orderDetail.status < 2){
        this.isDropdown = false;
      }
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.btn {
  margin-top: 50%;
  padding: 0 20px;
}
</style>