<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item :title="defaultTitle" ref="item">
        <van-radio-group v-model="parkingLotKf">
          <van-cell-group>
            <van-cell
              v-for="parkingLot in parkingLots"
              :key="parkingLot.id"
              :title="`${parkingLot.name}(${fomatCapacity(parkingLot)})`"
              clickable
              @click="parkingLotKf.name=parkingLot.name"
            >
              <van-radio slot="right-icon" :name="parkingLot.name" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <van-button block type="info" @click="seleceParkingLot">确认</van-button>
      </van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script>
import { getParkingLots } from "../../apis/employee";
import { updateOrderParkingLot } from "../../apis/orders";
import requestHandler from "../../utils/requestHandler";
export default {
  name: "Detali",
  props: ["orderId"],
  data() {
    return {
      parkingLots: [],
      parkingLotKf: {},
      parkingLotName:'',
      defaultTitle: "请选择停车场"
    };
  },

  components: {},

  computed: {},

  async created() {
    this.parkingLots = await getParkingLots(this.$store.state.employee.id);
    console.log("1111", this.parkingLots);
  },
  mounted() {},

  methods: {
    async seleceParkingLot() {
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
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>