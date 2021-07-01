<template>
  <div class="detailst">
    <!-- 顶部导航 -->
    <van-nav-bar>
      <template #left>
        <div @click="onClickLeft">
          <van-icon name="arrow-left" size="25" />
        </div>
      </template>
      <template #right>
        <div @click="onClickRight">
          <van-icon name="cart-o" color="#1989fa" size="25" />
        </div>
      </template>
    </van-nav-bar>
    <!-- <van-tabs v-model="active" scrollspy sticky >
      <template #nav-left>
        <div>
          <van-icon name="arrow-left" size="20" />
        </div>
      </template> -->
    <!-- <van-tab title="商品"> -->
    <!-- 商品轮播图 -->

    <van-swipe class="swipe1" @change="onChange">
      <van-swipe-item
        ><img style="width: 100%; height: 100%" src="../assets/11.jpg"
      /></van-swipe-item>
      <van-swipe-item
        ><img style="width: 100%; height: 100%" src="../assets/22.jpg"
      /></van-swipe-item>
      <van-swipe-item
        ><img style="width: 100%; height: 100%" src="../assets/33.jpg"
      /></van-swipe-item>
      <van-swipe-item
        ><img style="width: 100%; height: 100%" src="../assets/44.jpg"
      /></van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          <span> {{ current + 1 }}/4 </span>
        </div>
      </template>
    </van-swipe>
    <!-- 端午小横幅图片宣传 -->
    <img style="height: 80px; width: 100%" src="../assets/duanwu.webp" alt="" />
    <!-- 商品价格及介绍 -->
    <van-divider />
    <div class="shop_price">
      <span>
        ¥<em id="jiage">{{ rows.price }}</em
        ><span>.00</span>
      </span>
      <a>
        <van-icon class="star" name="star-o"></van-icon>
        <a style="color: black; font-size: 16px">关注</a>
      </a>
    </div>
    <div class="shop_jieshao">
      <img style="width: 32px; hight: 32px" src="../assets/new-product.png" />
      {{ rows.title }}
    </div>
    <!-- 小字 -->
    <div class="word1">
      {{ rows.details }}
      <a class="lianjie1" href="javascript:;">查看></a>
    </div>
    <van-divider />
    <!-- 优惠字体区 -->
    <div class="shop_discount">
      <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
      <van-popup
        v-model="showList"
        round
        position="bottom"
        style="height: 90%; padding-top: 4px"
      >
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChose"
          @exchange="onExchange"
          editable="false"
      /></van-popup>
      <div class="xuanze1" @click="onSelectClicked">
        <span class="ziti1">已选</span>&nbsp;
        <span class="sname1">{{rows.title}}，{{ count }}个 </span>
        <img class="shenglue1" src="../assets/more.svg" />
      </div>
    </div>
    <van-divider />
    <!-- </van-tab>
      <van-tab title="详情"> -->
    <!-- 商品图片详情介绍 -->
    <div class="spjieshao">商品介绍</div>
    <div>
      <div><img class="img4" src="../assets/55.jpg" /></div>
    </div>
    <!-- 添加购物 -->
    <template>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="onSelectClicked"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="onSelectClicked"
        />
      </van-goods-action>
    </template>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
      @stepper-change="onChange"
    >
      <!-- <template slot="sku-stepper">
        <div>
          <van-stepper theme="round" button-size="22"  @change="onChange"/>
        </div>
      </template> -->
    </van-sku>
    <!-- </van-tab>
    </van-tabs> -->
  </div>
</template>

<script>
// import shopsku from "../components/shopsku.vue";

const coupon = {
  available: 0,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元",
};
export default {
  props: ["lid"],
  // components: {
  //   shopsku,
  // },
  data() {
    return {
      active: 0,
      rows: { },
      count: 1,
      current: 0,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false,
      show: false,
      sku: {},
      goods: {},
      goodsId: "",
    };
  },
  mounted() {
    this.axios
      .get(`/adm/details`, { params: { lid: this.lid } })
      .then((result) => {
        console.log(result.data[0]);
        this.rows = result.data[0];
        this.sku = {
          tree: [
            {
              k: "商品",

              v: [
                {
                  id: "1",
                  name: this.rows.title,
                  imgUrl:
                    "https://imgservice.suning.cn/uimg1/b2c/image/IoZpKivvFUHMY13DSFdM6Q.jpg",
                },
              ],
              k_s: "s1",
              count: 2,
            },
            {
              k: "规格",

              v: [
                {
                  id: "1",
                  name: "礼盒装",
                },
              ],
              k_s: "s2",
              count: 3,
            },
          ],
          list: [
            {
              id: this.rows.lid,
              price: this.rows.price*100,
              discount: 100,
              code: "",
              s1: "1",
              s2: "1",
              extend: null,
              kdt_id: 55,
              discount_price: 0,
              stock_num: 110,
              stock_mode: 0,
              is_sell: null,
              combin_sku: false,
              goods_id: 946755,
            },
          ],
        };
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/shopcar");
    },
    onChange(index) {
      this.current = index;
    },
    onChose(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    onSelectClicked() {
      this.show = true;
    },
    onChange(value) {
      console.log(value);
      this.count = value;
    },
    peisong() {},
    onBuyClicked() {
      this.$router.push({name:'Good',params:{lid:1,count:2}})
    },
    onAddCartClicked(ty) {
      console.log(ty);
      if (this.$store.state.islogin) {
        this.axios
          .post(
            `/adm/addshopcar`,
            `uid=${this.$store.state.uid}&lid=${this.lid}&title=${this.rows.title}&price=${this.rows.price}&count=${this.count}&details=${this.rows.details}`
          )
          .then((result) => {
            if (result.data.code === 200) {
              this.$toast({
                message: result.data.msg,
                position: "bottom",
                duration: 3000,
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

<style lang="scss" scoped>
.van-icon-arrow-left::before {
  margin-top: 12px;
  margin-left: 10px;
}
.spjieshao {
  width: 100%;
  height: 40px;
  text-align: center;
  padding: 15px 0 5px 0;
  font-weight: 600;
}
.img4 > div {
  height: 495px;
}
.shenglue1 {
  margin: 0 0 0 125px;
}
.shenglue2 {
  margin: 0 0 0 92px;
}
.sname1 {
  font-size: 14px;
}
.ziti1 {
  font-weight: 600;
  font-size: 15px;
}
.lianjie1 {
  color: red;
  text-decoration: underline;
}
.word1 {
  font-size: 10px;
  margin: 4px 0 0 20px;
  color: #666;
}
.shop_jieshao {
  margin: 1px 18px;
  font-family: "黑体";
  font-size: 19px;
}
.star {
  margin: 0 0 0 220px;
  color: black;
}
.van-nav-bar {
  background-color: rgba(0, 0, 0, 0) !important;
}
[class*="van-hairline"]::after {
  border: none !important;
}
.swipe1 {
  margin-top: -46px;
  text-align: center;
  z-index: 0;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.shop_price {
  font-size: 16px;
  line-height: 30px;
  color: #f2270c;
  display: inline-block;
  margin: 0 20px 10px 20px;
}
#jiage {
  font-style: normal;
  font-size: 30px;
}
.shop_discount {
  margin-top: 15px;
  padding: 0 18px;
  background-color: #fff;
  overflow: hidden;
}
.xuanze1 {
  margin: 0px 0 8px 15px;
}
.dizhi1 {
  margin: 20px 0 15px 15px;
}
.img4 {
  width: 100vw;
}
</style>
