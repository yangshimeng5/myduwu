<template>
  <div class="register">
    <van-nav-bar
      fixed
      title="注册"
      left-text="返回"
      right-text="登录"
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
        placeholder="用户名"
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
      <van-field
        v-model="password1"
        label-align="center"
        type="password"
        name="validator"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ validator}]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" @click="regist"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>


<script>
export default {
  name: "Register",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      password1: "",
      identical: /^\d{5,15}$/,
      pattern: /^\w{5,15}$/,
      zzupwd: /^\d{5,15}$/,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/login");
    },
    onClickRight() {
      this.$router.push("/login");
    },
    validator(val) {
      return this.zzupwd.test(val);
    },
    // onSubmit(values) { console.log("submit",values) },
    regist() {
      if (this.password != this.password1) {
        this.identical = "两次密码输入不一致";
        return;
      } else if (
        this.pattern.test(this.username) == true &&
        this.zzupwd.test(this.password) == true
      ) {
        this.axios
          .post(
            "/user/register",
            `uname=${this.username}&upwd=${this.password}`
          )
          .then((result) => {
            console.log(result.data);
            if (result.data.code === 408) {
              this.$toast({
                message: result.data.msg,
                position: "bottom",
                duration: 2000,
              });
            } else if (result.data.code === 200) {
              this.$toast({
                message: result.data.msg,
                position: "bottom",
                duration: 2000,
              });
              setTimeout(() => {
                this.$router.push("/login");
              }, 2000);
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
.register {
  background-image: url("../../public/bag.jpg");
  background-size: cover;
  height: 670px;
  .loginimg {
    padding-top: 23vw;
    width: 45vw;
    margin: 0 auto;
  }
}
</style>