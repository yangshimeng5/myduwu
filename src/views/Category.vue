<template>
  <div>
    <!-- 顶部搜索框 -->
    <van-sticky>
      <van-search
        v-model="SearchValue"
        shape="round"
        placeholder="搜索"
        disabled
      />
    </van-sticky>
    <van-tree-select
      height="150vw"
      :items="items"
      :main-active-index.sync="treeactive"
    >
      <template slot="content">
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="(item, i) in categoryList"
            :key="i"
            :icon="item.icon"
            :text="item.text"
            to="/good"
          />
        </van-grid>
      </template>
    </van-tree-select>
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
      active: 2,
      SearchValue: "",
      treeactive: 0,
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
      items: [],
      categoryList: [],
    };
  },
  mounted() {
      this.axios.get(`/adm/classification`)
        .then((result) => {
          console.log(result.data);
          for (let str of result.data) {
            this.items.push({
              text: str.classification
            });}
        }).catch((err) => {console.log(err);});

    this.axios.get(`/adm/category`,{ params: { cfid: this.treeactive}})
        .then((result) => {
          console.log(result.data);
          for (let str of result.data) {
            this.categoryList.push({
              text: str.text,
              icon: str.icon
            });}
        }).catch((err) => {console.log(err);});
    
      },
  methods: {},
  watch:{
    treeactive(){
      console.log(this.treeactive+1);
      this.categoryList=[]
      this.axios.get(`/adm/category`,{ params: { cfid: this.treeactive}})
        .then((result) => {
          console.log(result.data);
          for (let str of result.data) {
            this.categoryList.push({
              text: str.text,
              icon: str.icon
            });}
        }).catch((err) => {console.log(err);});
    }
  }
};
</script>

<style lang="scss">
.van-tree-select {
  .van-tree-select__nav {
    flex: 0.6;
    background-color: #fff;
    .van-sidebar-item {
      background-color: #fff;
    }
  }
  .van-grid-item__icon{
    font-size: 50px;
  }
  .van-sidebar-item--select,
  .van-sidebar-item--select:active {
    color: red;
  }
}
</style>