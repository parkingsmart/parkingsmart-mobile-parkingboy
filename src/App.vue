<template>
  <div id="app">
    <ParkingBoy></ParkingBoy>
  </div>
</template>

<script>
import ParkingBoy from "./views/ParkingBoy";
export default {
  name: "app",
  components: { ParkingBoy }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
