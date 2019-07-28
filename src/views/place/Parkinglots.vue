<template>
  <div>
    <van-radio-group v-model="result" @change="seleceParkingLot">
      <van-cell-group>
        <van-cell
          v-for="parkingLot in parkingLots"
          :key="parkingLot.id"
          :title="`${parkingLot.name}(${parkingLot.nowCapacity})`"
          clickable 
          @click="result = parkingLot"
        >
          <van-radio slot="right-icon" :name="parkingLot" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  name: "parkinglots",
  props: [""],
  data() {
    return {
      parkingLots: [
        {
          id: "1",
          name: "停车场1",
          nowCapacity: 7
        },
        {
          id: "2",
          name: "停车场2",
          nowCapacity: 12
        },
        {
          id: "3",
          name: "停车场3",
          nowCapacity: 5
        }
      ],
      result:'',
    };
  },

  components: {},

  computed: {},

  created() {},

  beforeMount() {},

  mounted() {},

  methods: {
    seleceParkingLot(parkingLot) {
        console.log(parkingLot)
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>