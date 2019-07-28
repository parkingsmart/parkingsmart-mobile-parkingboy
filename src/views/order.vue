<template>
  <div class="order">
    <van-cell
      v-for="order in orders"
      :key="order.id"
      :title="order.carNumber"
      :label="formatTime(order)"
      icon="logistics"
      size="large"
      @click="grabOrder(order)"
    >
      <template slot="default">
        <van-button round type="danger">抢单</van-button>
      </template>
    </van-cell>
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  name: "order",
  props: [""],
  data() {
    return {
      orders: [
        {
          id: "12312",
          carNumber: "66666",
          parkTime: "10:20",
          type: 1
        },
        {
          id: "12312313",
          carNumber: "77777",
          parkTime: "10:20",
          fetchTime: "19:20",
          type: 0
        }
      ],
    };
  },

  components: {},

  computed: {},

  created() {},

  beforeMount() {},

  mounted() {},

  methods: {
    grabOrder(order) {
      this.$router.push('/place')
    },
    formatTime(order){
      //moment(time).format(YYYY-MM-DD HH-mm)
      return order.type === 1
        ? "停车时间：" + order.parkTime
        : "取车时间：" + order.fetchTime;
    }
  },
 

  watch: {}
};
</script>
<style lang='scss' scoped>
.order {
  text-align: left;
}
</style>