<template>
  <div>
    <router-view/>
  </div>

</template>

<script>
export default {
  name: "place",
  props: [""],
  data() {
    return {
      isShow:true
    };
  },
};
</script>
