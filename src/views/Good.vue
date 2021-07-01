<template>
  <div class="good">
    <van-search
      show-action
      v-model="SearchValue"
      shape="round"
      placeholder="搜索"
    >
      <template slot="left">
        <div @click="onClickLeft">
          <van-icon name="arrow-left" />
        </div>
      </template>
      <template #action>
        <div @click="onStyle">
          <van-icon name="qr" />
        </div>
      </template>
    </van-search>
    <van-tabs v-model="activeName">
      <van-tab title="综合" name="a">
        <van-grid :border="false" :column-num="3">
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
          </van-grid-item>
        </van-grid>
      </van-tab>
      <van-tab title="销量" name="b">内容 2</van-tab>
      <van-tab title="价格" name="c">内容 3</van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      SearchValue: "",
      activeName: "a",
    };
  },
  mounted() {
    console.log(this.$route.params.count);
  },
  methods: {
    onClickLeft() {
      console.log(1);
      this.$router.go(-1);
    },
    onStyle() {},
  },
};
</script>
<style lang="scss">
.good {
  .van-icon-arrow-left::before {
    line-height: 34px;
    margin-right: 10px;
  }
  .van-tabs--line .van-tabs__wrap {
    height: 20px;
  }
}
</style>