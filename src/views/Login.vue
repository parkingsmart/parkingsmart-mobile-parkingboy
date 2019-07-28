<template> 
 <div class="loginStyle">
    <div class="loginCenter">
      <van-cell-group style="background-color: rgb(204, 204, 204);">
        <div style="display:flex;justify-content:center;">
        <van-image width="108" height="105" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <van-field
          style="margin-top:15px;"
          v-model="username"
          clearable
          label="用户名"
          placeholder="id/phone/email"
          @click-right-icon="$toast('question')"
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="Please input password"
        />
        <van-button
          round
          type="info"
          size="large"
          style="margin-top:25px;"
          @click="submit"
        >登录</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { login } from "../apis/login";
export default {
  name: "Login",
  props: [""],
  data() {
    return {
      username: "",
      password: ""
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
        const regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        const regNumber = /^[0-9]+$/;
        if (regEmail.test(this.username) || regNumber.test(this.username)) {
          login({
            username: this.username,
            password: this.password
          }).then(res => {
          this.$store.commit('getEmployeeInfo',res);
          this.$router.push('/order');
        })
        .catch(err => {
          console.log(err);
        });
        } else {
          Toast.fail("Input format is wrong, please re-enter");
        }
      }
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.content{
  text-align: center;
}
</style>