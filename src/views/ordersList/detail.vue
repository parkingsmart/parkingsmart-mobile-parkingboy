<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item :title="defaultTitle" ref="item">
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
    <div class="btn">
      <van-button size="large" type="info" @click="updateStatus" :isdisable="isdisable">完成停车</van-button>
    </div>
  </div>
</template>

<script>
import { getParkingLots } from "../../apis/employee";
import { updateOrderParkingLot, updateOrderStatus } from "../../apis/orders";
import requestHandler from "../../utils/requestHandler";
export default {
  name: "Detali",
  props: ["orderId"],
  data() {
    return {
      parkingLots: [],
      parkingLotKf: {},
      parkingLotName: "",
      defaultTitle: "请选择停车场",
      isdisable:false,
    };
  },

  components: {},

  computed: {},

  async created() {
    this.parkingLots = await getParkingLots(this.$store.state.employee.id);
  },
  mounted() {},

  methods: {
    async seleceParkingLot() {
      let parkingLotName = this.parkingLotName;
      this.parkingLotKf = this.parkingLots.find(
        item => item.name === parkingLotName
      );
      console.log("this.parkingLotKf", this.parkingLotKf);
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
    async updateStatus() {
      await requestHandler
        .invoke(updateOrderStatus(this.orderId, 2))
        .msg("完成停车", "失败")
        .loading()
        .exec();
      this.isdisable = false;
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