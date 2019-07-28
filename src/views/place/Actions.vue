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
import { finishOrder } from '../../apis/orders';
export default {
  name: "Actions",
  props: [""],
  data() {
    return {
    };
  },

  components: {},

  computed: {
    // isSelectParkingLot(){
    //   return this.$store.state.currentOrder!=null
    // }
  },

  created() {},

  beforeMount() {},

  mounted() {},

  methods: {
    completeOrder(){
      if(this.$store.state.currentOrder !== null){
        finishOrder(this.$store.state.currentOrder.id);
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