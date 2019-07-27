<template>
  <div>
    <div class="content">
        <router-view />
    </div>
    <div class="footer">
      <van-tabbar route>
        <van-tabbar-item replace to="/order" icon="description">抢单</van-tabbar-item>
        <van-tabbar-item replace to="/place" icon="logistics">停取</van-tabbar-item>
        <van-tabbar-item replace to="/history" icon="todo-list-o">历史</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
      </van-tabbar> 
    </div>
  </div>
</template>

<script>
export default {
  name: "ParkingBoy",
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
<style lang='' scoped>
</style>