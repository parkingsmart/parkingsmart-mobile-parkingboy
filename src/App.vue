<template>
  <div id="app">
    <Common></Common>
    <Login/>
  </div>
</template>

<script>
import Common from "./views/Common.vue";
import Login from "./views/Login.vue";
export default {
  name: "app",
  components: { Common,Login }
};
</script>


<style lang="scss">
@import "./assets/css/styles.css"

</style>
