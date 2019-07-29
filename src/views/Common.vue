<template>
  <div>
    <div class="header">
      <span v-show="isShowIcon" class="back">
        <van-icon class="back-icon" name="arrow-left" @click="back" />
      </span>
      <span class="head">{{ title }}</span>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <van-tabbar route v-model="title">
        <van-tabbar-item replace to="/order" icon="description" name="订单">抢单</van-tabbar-item>
        <van-tabbar-item replace to="/list" icon="logistics" name="停车地点">停取</van-tabbar-item>
        <van-tabbar-item replace to="/history" icon="todo-list-o" name="历史">历史</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o" name="我的">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "common",
  props: [""],
  data() {
    return {
      title: "订单",
      isShowIcon: false
    };
  },

  components: {},

  computed: {},

  created() {},

  beforeMount() {},

  mounted() {},

  methods: {
    back() {
      this.$router.go(-1);
    }
  },

  watch: {
    $route(now) {
      if (now.meta && now.meta.isShowBack) {
        this.isShowIcon = true;
      } else {
        this.isShowIcon = false;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.header {
  text-align: center;
}
.back {
  position: absolute;
  left: 10px;
}
.back-icon {
  font-size: 28px;
  line-height: 50px;
  color: white;
}
</style>