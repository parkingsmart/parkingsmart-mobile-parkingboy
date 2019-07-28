<template>
  <div class="loginStyle">
    <div class="header">
      <span class="head">Parking Smart</span>
    </div>
    <div class="loginCenter">
      <van-cell-group>
        <van-field
          class="input-box"
          style="margin-top:15px;"
          v-model="username"
          clearable
          label="用户名"
          placeholder="id/phone/email"
          @click-right-icon="$toast('question')"
        />

        <van-field
          class="input-box"
          v-model="password"
          type="password"
          label="密码"
          placeholder="Please input password"
        />
        <van-button round type="info" size="large" class="login-btn" @click="submit">登录</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
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
  methods: {
    submit() {
      if (this.username === "") {
        this.$notify("请输入账户");
      } else if (this.password === "") {
        this.$notify("请输入账户");
      } else {
        const regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        const regNumber = /^[0-9]+$/;
        if (regEmail.test(this.username) || regNumber.test(this.username)) {
          login({
            username: this.username,
            password: this.password
          })
            .then(res => {
              this.$store.commit("getEmployeeInfo", res);
              this.$router.push("/order");
            })
            .catch(() => {
              this.$notify("账户密码错误");
            });
        } else {
          this.$notify("账户密码错误");
        }
      }
    }
  },

  watch: {}
};
</script>
<style lang='scss' scoped>
.loginStyle {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('../assets/bg.jpg');
}

.loginCenter {
  /deep/ .van-cell-group {
    background-color: transparent;
  }

  /deep/ .van-field__label {
    width: 20vw;
  }
}

.header {
  width: 100vw;
  position: absolute;
  text-align: center;
  background-color: rgba(0,0,0,0.2);
}

.content {
  text-align: center;
}

[class*="van-hairline"]::after {
  border: none;
}

.input-box {
  width: 80vw;
  margin: 15px 0;
  background-color: rgba(0,0,0,0.2);

  /deep/ span, /deep/ input, /deep/ ::-webkit-input-placeholder {
    color: white;
  }
}

.icon {
  width: 25vw;
  height: 25vw;
}

.login-btn {
  margin-top: 30px;
  background-color: rgb(69, 149, 230);
}
</style>