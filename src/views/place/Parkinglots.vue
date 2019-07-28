<template>
  <div>
    <van-radio-group v-model="result" @change="seleceParkingLot">
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
  </div>
</template>

<script>
import { getParkingLots } from "../../apis/parkingLot";
import { updateOrderParkingLot } from "../../apis/orders";
export default {
  name: "parkinglots",
  props: [""],
  data() {
    return {
      parkingLots: [],
      result: ""
    };
  },

  components: {},

  computed: {},

  created() {
    this.initData();
  },

  beforeMount() {},

  mounted() {},

  methods: {
    async initData() {
      console.log(await getParkingLots(this.$store.state.employee.id));
      this.parkingLots = await getParkingLots(this.$store.state.employee.id);
    },
    seleceParkingLot(parkingLot) {
      console.log(parkingLot);
      updateOrderParkingLot(this.$store.state.orderId, parkingLot);
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