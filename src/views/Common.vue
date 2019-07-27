<template>
  <div>
    <div class="header">
        <span class="head">{{ title }}</span>
    </div>
    <div class="content">
        <router-view />
        
    </div>
    <div class="footer">
      <van-tabbar route v-model="title">
        <van-tabbar-item replace to="/order" icon="description" name="抢单">抢单</van-tabbar-item>
        <van-tabbar-item replace to="/place" icon="logistics" name="停取">停取</van-tabbar-item>
        <van-tabbar-item replace to="/history" icon="todo-list-o" name="历史">历史</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o" name="我的">我的</van-tabbar-item>
      </van-tabbar> 
    </div>
  </div>
</template>

<script>
export default {
  name: "Common",
  props: [""],
  data() {
    return {
      title:'抢单',
    };
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