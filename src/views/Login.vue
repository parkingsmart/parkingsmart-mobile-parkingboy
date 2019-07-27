<template>
  <van-cell-group>
    <van-image width="108" height="105" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <van-field
      v-model="username"
      required
      clearable
      label="用户名"
      class="loginfontStyle"
      right-icon="question-o"
      placeholder="id/phone/email"
      @click-right-icon="$toast('question')"
    />

    <van-field
      v-model="password"
      type="password"
      label="密码"
      class="loginfontStyle"
      placeholder="Please input password"
      required
    />
    <van-button round type="info" size="large" style="width:90%;margin-top:25px;" @click="submit">登录</van-button>
  </van-cell-group>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "Login",
  props: [""],
  data() {
    return {
      username: "",
      password: "",
    };
  },

  components: {},

  computed: {},

  created() {},

  beforeMount() {},

  mounted() {},

  methods: {
    submit() {
      if (this.username === "") {
        Toast.fail("please enter user name");
      } else if (this.password === "") {
         Toast.fail("please enter password");
      } else {
        const emailStyle = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        const isNumber = /^[0-9]+$/;
        if (emailStyle.test(this.username) || isNumber.test(this.username)) {
           this.$store.dispatch("login", {username:this.username,password:this.password});
        } else {
           Toast.fail("Input format is wrong, please re-enter");
        }
      }
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>