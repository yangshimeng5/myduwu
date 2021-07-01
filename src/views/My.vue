<template>
  <div class="topbgc">
    <div class="top">
      <van-nav-bar title="我的" fixed @click-left="onClickLeft" />

      <van-row @click="openModal">
        <van-col span="6">
          <img src="../assets/logo.png" width="70px" />
        </van-col>
        <van-col v-if="$store.state.islogin" span="15">{{
          $store.state.uname
        }}</van-col>
        <van-col v-else span="15">{{ nickname }}</van-col>
        <van-col span="3">
          <van-icon name="arrow"></van-icon>
        </van-col>
      </van-row>
    </div>

    <div class="center">
      <van-grid column-num="3" :border="false">
       <van-grid-item icon="label-o" text="我的订单" to="/order"/>
       <van-grid-item icon="location-o" text="地址管理" to="/addlist"/>
       <van-grid-item icon="goods-collect-o" text="我的收藏" />
      </van-grid>
    </div>

    <!-- <div class="body" >
      <van-cell center title="优惠券" is-link/>
      <van-cell center title="账号安全" is-link/>
      <van-cell center title="联系客服" is-link/>
      <van-cell center title="帮助中心" is-link/>
      <van-cell center title="切换账号" is-link/>
      <van-cell center title="退出登录" is-link/>
    </div> -->

    <van-grid class="body" :column-num="3" square border>
      <van-grid-item icon="bill-o" text="优惠券" />
      <van-grid-item icon="warning-o" text="账号安全" />
      <van-grid-item icon="service-o" text="联系客服" />
      <van-grid-item icon="question-o" text="帮助中心" />
      <van-grid-item icon="exchange" text="切换账号" />
      <van-grid-item icon="close" text="退出登录" />
    </van-grid>

    <!-- 底部按钮 -->
    <!-- <img src="../../public/icon/101.png" alt=""> -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item
        replace
        :to="tabbar.to"
        v-for="(tabbar, i) in tabbarList"
        :key="i"
      >
        <span>{{ tabbar.tabbarName }}</span>
        <template #icon="props">
          <img :src="props.active ? tabbar.active : tabbar.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // avatarSrc: require("../assets/avatar.png"),
      active: 5,
      isShowModal: false,
      nickname: "用户登录",
      tabbarList: [
        {
          tabbarName: "首页",
          to: "/",
          active: require("../../public/icon/101.png"),
          inactive: require("../../public/icon/102.png"),
        },
        {
          tabbarName: "分类",
          to: "/category",
          active: require("../../public/icon/103.png"),
          inactive: require("../../public/icon/104.png"),
        },
        // {
        //   tabbarName: "消息",
        //   to: "/",
        //   active: require("../../public/icon/106.png"),
        //   inactive: require("../../public/icon/107.png"),
        // },
        {
          tabbarName: "购物车",
          to: "/shopcar",
          active: require("../../public/icon/1014.png"),
          inactive: require("../../public/icon/1013.png"),
        },
        {
          tabbarName: "我的",
          to: "/my",
          active: require("../../public/icon/109.png"),
          inactive: require("../../public/icon/1010.png"),
        },
      ],
    };
  },
  // created() {
  //   // 组件刚创建的时候需要判断用户是否登录,判断localStorage有没有token值
  //   // 如果有就应该天上用户信息
  //   let token =  localStorage.getItem("token")
  //   if (token) {
  //     // 表示已经有登录状态,就要渲染用户信息
  //     let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  //     this.nickname = userInfo.nickname;
  //     this.avatarSrc = userInfo.avatar;
  //   }
  // },
  methods: {
    onClickLeft() {},
    openModal() {
      // 判断用户是否登录,如果登录就直接return
      // 没有登录就取反
      if (!this.$store.state.islogin) {
        this.$router.push("/login");
      } else {
        this.$notify({ type: "success", message: "您已登录" }); 
      }
    },
  },
};
</script>

<style lang="scss">
.topbgc {
  
  .center {
    width: 90%;
    padding-top: 10px;
    margin: -10% auto 0px auto;
    height: 75px;
    font-size: 15px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    line-height: 300%;
    box-shadow: 0px 0px 8px 1px rgb(161, 161, 161);
    .van-grid-item{
      border: none !important;
    }
  }

  .top {
    background-color: #4fc08d !important;
    height: 165px;
    border-radius: 0px 0px 20% 20%;
    border: none !important;
    .van-nav-bar{
      background-color: #4fc08d00 !important;
    }
    .van-nav-bar__content{
      height: 47px;
    }
    .van-hairline--bottom::after{
      border: none !important;
    }
    .van-col--15{
      padding-left: 30px;
      font-size: 17px !important;
    }
    .van-col--3{
      padding-right: 20px;
    }
    
    .van-row {
      margin-top: 46px;
      padding: 20px;
      color: #fff;
      .van-col {
        line-height: 80px;
        font-size: 15px;
        img {
          width: 80px;
          border-radius: 50%;
          display: block;
        }
        &:last-child {
          text-align: right;
        }
      }
    }
  }

  .body{
    padding: 10% 8px 0px 8px;
    margin-bottom: 50px;
  }
  
  .van-nav-bar__content {
    background-color: #4fc08d;
  }
  
  .van-grid-item__content {
    padding: 0;
  }
}
</style>