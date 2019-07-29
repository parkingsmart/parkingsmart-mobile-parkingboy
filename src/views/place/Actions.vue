<template>
  <div>
    <div class="actions">
      <van-cell-group class="actions">
        <van-cell title="选择停车场" is-link :to="{name: 'parkinglots'}" />
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button type="info" size="large" @click="completeOrder">完成订单</van-button>
    </div>
  </div>
</template>

<script>
import { getParkingLots } from "../../apis/parkingLot";
import { finishOrder } from "../../apis/orders";

export default {
  name: "Actions",
  props: [""],
  data() {
    return {
      existParkingLot: false
    };
  },

  components: {},

  computed: {
    // isSelectParkingLot(){
    //   return this.$store.state.currentOrder!=null
    // }
  },

  created() {
    this.getParkingLot();
  },

  beforeMount() {},

  mounted() {},

  methods: {
    completeOrder() {
      if (this.$store.state.currentOrder !== null) {
        finishOrder(this.$store.state.currentOrder.id);
      }
    },
    async getParkingLot() {
      if (!this.$store.state.employee) {
        this.$router.push({ name: "login" });
      } else {
        let parkingLots = await getParkingLots(this.$store.state.employee.id);
        if (parkingLots.length !== 0) {
          this.$store.state.parkingLots = parkingLots;
          this.existParkingLot = true;
        } else {
          this.existParkingLot = false;
        }
      }
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.actions {
  margin-top: 16%;
}
.btn {
  margin-top: 60%;
  padding: 0 20px;
}
</style>