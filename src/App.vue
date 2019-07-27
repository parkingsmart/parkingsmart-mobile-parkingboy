<template>
  <div id="app">
    <router-view/>
    <Login/>
  </div>
</template>

<script>
import Login from "./views/Login.vue";
export default {
  name: "app",
  components: { Login }
};
</script>


<style lang="scss">
@import "./assets/css/styles.css"

</style>
