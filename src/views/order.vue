<template>
  <div class="order">
    <van-cell
      v-for="order in orders"
      :key="order.id"
      :title="order.carNumber"
      :label="order.parkStartTime|formatTime"
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
export default {
  name: "order",
  props: [""],
  data() {
    return {
      orders: [
        {
          id: "12312",
          carNumber: "66666",
          parkStartTime: "10:20"
        },
        {
          id: "12312313",
          carNumber: "77777",
          parkStartTime: "19:20"
        }
      ],
      parkingTime: "10:00",
      loading: ""
    };
  },

  components: {},

  computed: {},

  created() {},

  beforeMount() {},

  mounted() {},

  methods: {
    grabOrder(order){
      console.log('1111:',order)
    }
  },
  filters: {
    formatTime: function(value) {
      return "停车时间：" + value;
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