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
        <van-tabbar-item replace to="/list" icon="logistics" name="停车地点" :dot="dot" @click="dot = false">停取</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import Config from "../config";
import { getToken } from '../utils/token';

export default {
  name: "common",
  props: [""],
  data() {
    return {
      title: "订单",
      isShowIcon: false
    };
  },
  async created() {
    if (getToken()) {
      await this.$store.dispatch("getUserInfo");
    }
    let webSocket = new WebSocket(
      `${Config.wsUrl()}/api/employees/${this.$store.getters.id}/orderChange`
    );

    webSocket.onmessage = res => {
      this.$store.commit('setDot', true);
      this.$store.commit("setWebSocketData", res.data);
      setTimeout(() => {
        this.$store.commit("setWebSocketData", null);
      }, 3000);
    };

    this.$store.commit("setWebSocket", webSocket);
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  computed: {
    dot: {
      get() {
        return this.$store.state.dot;
      },
      set(value) {
        this.$store.commit('setDot', value);
      }
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