<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import WS from './utils/ws';

export default {
  name: "app",
  created() {
    WS.connect('ws://127.0.0.1:8080/employees/10/orders');
  }
};
</script>
<style lang="scss">
@import "./assets/css/styles.css"

</style>
