<template>
  <div>
    <van-dropdown-item :title="parkingLotKf.name" ref="item">
      <van-radio-group v-model="parkingLotKf">
        <van-cell-group>
          <van-cell
            v-for="parkingLot in parkingLots"
            :key="parkingLot.id"
            :title="`${parkingLot.name}(${fomatCapacity(parkingLot)})`"
            clickable
            @click="result = parkingLot"
          >
            <van-radio slot="right-icon" :name="parkingLot" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-button block type="info" @click="seleceParkingLot">确认</van-button>
    </van-dropdown-item>
  </div>
</template>

<script>
import { getParkingLots } from "../../apis/parkingLot";
import { updateOrderParkingLot } from "../../apis/orders";
import requestHandler from "../../utils/requestHandler";
export default {
  name: "Detali",
  props: ["orderId"],
  data() {
    return {
      parkingLots: [],
      parkingLotKf: {}
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
      await requestHandler
        .invoke(updateOrderParkingLot(this.orderId, this.parkingLotKf))
        .msg("修改成功", "修改失败")
        .loading()
        .exec();
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>