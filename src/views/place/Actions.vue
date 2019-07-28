<template>
  <div>
    <div class="actions">
      <van-cell-group class="actions">
        <van-cell title="选择停车场" is-link :to="{name: 'parkinglots'}" />
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button type="info" size="large">完成订单</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {},

  computed: {},

  created() {},

  beforeMount() {},

  mounted() {},

  methods: {},

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