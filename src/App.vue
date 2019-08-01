<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { getToken } from './utils/token';

export default {
  name: "app",
  created() {
    if (getToken()) {
      this.$store.dispatch("getUserInfo");
    }
  }
};
</script>
<style lang="scss">
@import "./assets/css/styles.css"

</style>
