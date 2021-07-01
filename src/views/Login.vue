<template>
  <div class="login">
    <van-nav-bar
      fixed
      title="登录"
      left-text="返回"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="loginimg">
      <img src="../../public/22.png" alt="" width="100%" />
    </div>
    <van-form validate-first>
      <van-field
        v-model="username"
        label-align="center"
        name="pattern"
        label="用户名"
        placeholder= "用户名"
        :rules="[{ pattern}]"
      />
      <van-field
        v-model="password"
        label-align="center"
        type="password"
        name="validator"
        label="密码"
        placeholder="密码"
        :rules="[{ validator }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" @click="logn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      pattern: /^\w{5,15}$/,
      zzupwd: /^\d{5,15}$/,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/my");
    },
    onClickRight() {
      this.$router.push("/register");
    },
    validator(val) {
      return this.zzupwd.test(val);
    },
    // onSubmit(values) { console.log("submit",values) },
    logn() {
      if (
        this.pattern.test(this.username) == true &&
        this.zzupwd.test(this.password) == true
      ) {
        this.axios
          .get("/user/dlgetq", {
            params: { uname: this.username, upwd: this.password },
          })
          .then((result) => {
            console.log(result.data);
            if (result.data.code === 200) {
              this.$toast({
                message: "登录成功",
                position: "bottom",
                duration: 2000,
              });
              this.$store.commit("setuname", this.username);
              this.$store.commit("setuid", result.data.uid);
              this.$store.commit("setislogin", true);
              sessionStorage.setItem("uname", this.username);
              sessionStorage.setItem("islogin", true);
              sessionStorage.setItem("uid", result.data.uid);
              setTimeout(() => {
                this.$router.push("/");
                console.log(this.$store.state);
              }, 2000);
            } else if (result.data.code === 408) {
              this.$toast({
                message: "登录失败，账号密码不匹配",
                position: "bottom",
                duration: 2000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss">
.login {
  background-image: url("../../public/bag.jpg");
  background-size: cover;
  height: 670px;
  .loginimg {
    padding-top: 23vw;
    width: 45vw;
    margin: 0 auto;
  }
  // .van-cell {
  //   height: 70px;
  // }
}
</style>