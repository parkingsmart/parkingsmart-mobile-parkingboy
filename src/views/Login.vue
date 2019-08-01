<template>
  <div>
    <div class="main-pane">
      <IconBox class="icon-box" />
      <div class="input-group">
        <van-field v-model="username" label="用户名" placeholder="id/phone/email" autocomplete="off" />
        <van-field v-model="password" type="password" label="密码" autocomplete="off" />
      </div>
      <van-button class="login" @click="submit">登录</van-button>
    </div>
  </div>
</template>

<script>
import IconBox from "../components/IconBox";

export default {
  name: "Login",
  components: {
    IconBox
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async submit() {
      if (this.username === "") {
        this.$notify("请输入账户");
      } else if (this.password === "") {
        this.$notify("请输入账户");
      } else {
        const regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        const regNumber = /^[0-9]+$/;
        if (regEmail.test(this.username) || regNumber.test(this.username)) {
          try {
            await this.$store.dispatch('login', {
              username: this.username,
              password: this.password
            });
            this.$router.push("/order");
          } catch (error) {
            this.$notify("账户密码错误");
          }
        } else {
          this.$notify("账户密码错误");
        }
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.main-pane {
  height: 55vh;
  text-align: center;

  /deep/ .van-cell {
    width: 80%;
    margin: 0 auto;
    padding-right: 0;
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(18, 150, 219);
  }

  /deep/ .van-button {
    color: white;
    border-radius: 10vw;
    border-color: rgb(18, 150, 219);
    background-color: rgb(18, 150, 219);
  }
}
.main-pane {
  margin-top: 40%;
}
.input-group {
  margin-top: 30px;
}
.login {
  width: 60vw;
  color: white;
  margin-top: 10vh;
  border-radius: 10vw;
  background: linear-gradient(to right, #0079c1, rgb(18, 150, 219));
}
</style>