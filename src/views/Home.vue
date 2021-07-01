<template>
  <div class="home">
    <!-- 头部搜索框 -->
    <van-sticky>
      <van-search
        v-model="SearchValue"
        background="#4fc08d"
        shape="round"
        placeholder="搜索"
      />
    </van-sticky>

    <div class="topbacc">
      <div class="banner">
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="darkred">
          <van-swipe-item v-for="(image, index) in imageList" :key="index">
            <img :src="image" width="100%" style="display: block" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 分类栏 -->
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-for="(icon, i) in iconList" :key="i">
          <van-image :src="icon.icon" class="img" />
          {{icon.title}}
        </van-grid-item>
      </van-grid>
    </div>

    <van-grid>
      <img width="100%" src="../assets/henglan/7.png" />
    </van-grid>
    <div class="recommend">
      <van-grid :column-num="2" :gutter="10">
        <van-grid-item v-for="(str,i) of homegoods" :key="i" :to="`/details/${str.lid}`">
          <van-image src="http://img12.360buyimg.com/n2/s240x240_jfs/t1/180354/39/4479/170027/60a0e8e1E2a1ef798/51edaa1e06100a03.jpg!q70.jpg" />
          <p>{{str.title}}</p>
          <div>
            <span class="pric">￥</span>
            <span class="pric">{{str.price}}</span>
            <span></span>
          </div>
        </van-grid-item>
      </van-grid>

      <van-grid>
        <img width="100%" src="../assets/henglan/3.png" />
      </van-grid>

      <van-grid :column-num="2" :gutter="10">
        <van-grid-item v-for="(str,i) of homegoods" :key="i" :to="`/details/${str.lid}`">
          <van-image src="http://img12.360buyimg.com/n2/s240x240_jfs/t1/180354/39/4479/170027/60a0e8e1E2a1ef798/51edaa1e06100a03.jpg!q70.jpg" />
          <p>{{str.title}}</p>
          <div>
            <span class="pric">￥</span>
            <span class="pric">{{str.price}}</span>
            <span></span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

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
  name: "Home",
  data() {
    return {
      active: 1,
      homegoods:[],
      SearchValue: "",
      //轮播图数组
      // banner: [],
      imageList: [
        require("../../public/banner/1-0.jpg"),
        require("../../public/banner/1-1.jpg"),
        require("../../public/banner/1-2.jpg"),
      ],
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
      iconList: [
        {icon:"https://image2.suning.cn/uimg/cms/img/161293951076282456.png", title:"节日特供"},
        {icon:"https://image3.suning.cn/uimg/cms/img/161294178174781132.png", title:"限时秒杀"},
        {icon:"https://image2.suning.cn/uimg/cms/img/161293959950045622.png", title:"节日水果"}
      ],
      // goodsList:["http://img12.360buyimg.com/n2/s240x240_jfs/t1/180354/39/4479/170027/60a0e8e1E2a1ef798/51edaa1e06100a03.jpg!q70.jpg"],
    };
  },
  mounted() {
    // if (this.$store.state.islogin) {
          this.axios.get(`/adm/laptop`)
            .then((result) => {
            console.log(result.data);
           this.homegoods=result.data;
        }).catch((err) => {console.log(err);});
    // }
  },
  methods: {
    chosegoods(lid){
      
    }
  },
};
</script>
<style lang="scss">
.topbacc {
  background-color: #4fc08d;
  border-radius: 0 0 50px 50px;
  .banner {
    margin: 0 auto;
    width: 90%;
    border-radius: 20px;
    overflow: hidden;
  }
  .van-grid-item__content {
    background-color: #4fc08d;
  }
  .img{
    width: 50px;
  }
}
.recommend {
  margin-bottom: 50px;
  .van-grid-item__content--center {
    align-items: baseline;
    .pric{
      color: red;
    }
  }
}
</style>