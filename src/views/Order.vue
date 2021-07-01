<template>
  <div class="order">
    <van-nav-bar fixed title="订单中心" left-text="返回" right-text="购物车" left-arrow @click-left="onClickLeft" @click-right="onClickRight"/>

    <van-card v-for="(str,i) of rows" :key="i" :num="str.count" :price="str.price+'.00'" desc="商品详情" :title="str.title" thumb="https://img01.yzcdn.cn/vant/cat.jpeg">
      <template #footer>
        <van-button size="small" color="linear-gradient(to right, rgb(71, 126, 17), rgb(128, 255, 0))">
            查看物流
        </van-button>
        <van-button size="small" color="linear-gradient(to right, rgb(128, 255, 0), rgb(71, 126, 17))">
            退货换货
        </van-button>
      </template>
    </van-card>
  </div>
</template>

<style lang="scss">
.order {
  padding-top: 50px;
  .van-card {
    .van-card__title {
        padding: 5px;
        font-size: 20px;
    }
    .van-card__desc{
        max-height: 40px;
        padding: 2px 10px 2px 10px;
        font-size: 15px;
        word-wrap: break-word;
        white-space:normal;
    }
    .van-card__footer {
      .van-button {
        border-radius: 60px;
        width: 100px;
      }
    }
    .van-swipe-cell__left {
      padding-top: 40px;
    }
  }

}
</style>

<script>
export default {
  components: {},
  data() {
    return {
      rows:[],
    };
  },
  mounted() {
    if(this.$store.state.islogin){
      this.axios.get(`/adm/order`,{ params: { uid: this.$store.state.uid}})
                 .then((result)=>{console.log(result.data);this.rows=result.data})
                 .catch((err)=>{console.log(err);});
    } 
  },
  methods: {
    onClickLeft() {
      this.$router.push("/my");
    },
    onClickRight() {
      this.$router.push("/shopcar");
    },
  },
  watch: {},
};
</script>