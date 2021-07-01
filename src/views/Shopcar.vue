<template>
  <div class="about">
    <van-nav-bar v-if="dele" fixed title="购物车" right-text="完成" @click-left="onClickLeft" @click-right="onClickRight"/>
    <van-nav-bar v-else fixed title="购物车" right-text="管理" @click-left="onClickLeft" @click-right="onClickRight"/>
    
    <van-checkbox-group v-model="result" ref="checkboxGroup">
        
      <van-checkbox :name="i" v-for="(str,i) of rows" :key="i" label-disabled>
      <template #default>
        <van-swipe-cell>
        <van-card :price="str.price+'.00'" :desc="str.details" :title="str.title" class="goods-card" thumb="https://img01.yzcdn.cn/vant/cat.jpeg">
        <template #num>
          <van-stepper v-model="rows[i].count" input-width="20px" button-size="20px" @change="change(rows[i].count,str.sid)" integer/>
        </template>
        </van-card>
      </van-swipe-cell>
      </template>  
      </van-checkbox>  
      
    </van-checkbox-group>
    
    <van-submit-bar v-if="dele" button-text="删除订单" @submit="onSubmit">
      <template #default>
       <van-button type="primary" @click="checkAll">全选</van-button>
       <van-button type="info" @click="toggleAll">反选</van-button>
       <div class="subleft"></div>
      </template>
    </van-submit-bar>

    <van-submit-bar v-else :price="sum" button-text="提交订单" @submit="onSubmit">
      <van-button type="primary" @click="checkAll">全选</van-button>
      <van-button type="info" @click="toggleAll">反选</van-button>
    </van-submit-bar>

    <!-- <img src="../../public/小图标/101.png" alt=""> -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace :to="tabbar.to" v-for="(tabbar, i) in tabbarList" :key="i">
        <span>{{ tabbar.tabbarName }}</span>
        <template #icon="props">
          <img :src="props.active ? tabbar.active : tabbar.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss">
.about {
  .van-checkbox{
    color: white;
    padding: 0px 10px 0px 10px;
    &:last-child{
      margin-bottom: 150px;
    }
     .van-swipe-cell{
      .van-card {
        margin: 10px auto 0 auto;
        padding-left: 10px;
        border-radius: 10px;
        width: 100%;
        text-align: center;
      }
    }
    .van-checkbox__label{
      width: 100%;
    }
  }
  .van-checkbox-group{
    padding-top: 50px;
  }
  .van-card__title{
    padding: 5px;
    font-size: 20px;
  }
  .van-swipe-cell__left{
    padding-top: 40px;
  }
  
  .goods-card {
    margin: 0;
    background-color: white;
  }
  .delete-button {
    height: 100%;
  }
  
  .van-submit-bar {
    margin-bottom: 50px;
    .van-button {
      height: 40px !important;
      margin: 0;
      padding: 10px 10px 10px 10px;
      border: 0;
    }
    .subleft{
      width: 130px;
    }
    .van-button--primary {
      border-radius: 50% 0px 0px 50%;
      background-color: rgb(207, 66, 0);
    }
    .van-button--info {
      border-radius: 0px 50% 50% 0px;
      background-color: rgb(202, 0, 0);
    }
  }
}
</style>

<script>
export default {
  components: {},
  data() {
    return {
      active: 0,
      result: [],
      sum:0,
      dele:false,
      rows:[],
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
  mounted() {
    this.dele=false
    if(this.$store.state.islogin){
      this.axios.get(`/adm/shopcar`,{ params: { uid: this.$store.state.uid}})
                .then((result)=>{console.log(result.data);this.rows=result.data})
                .catch((err)=>{console.log(err);});
    } 
  },
  methods: {
    onClickLeft(e) {
      console.log(e)
    },
    onClickRight() {
      this.dele=!this.dele
    },
    change(e,sid){
      console.log(e,sid);
      this.axios.put(`/adm/carcount`,`sid=${sid}&count=${e}`)
                .then((result)=>{})
                .catch((err)=>{console.log(err);});
                // this.$router.go(0);
    },
    onSubmit() {
      if(this.$store.state.islogin){
        if (this.dele) {
          console.log(this.dele);
          if (this.result.length==0) {
            this.$toast({message:'您还未选择商品',position:'bottom',duration:2000});
          }else{
            for (let i of this.result) {
            console.log(this.rows[i]) 

            this.axios.delete(`/adm/delshopcar/${this.rows[i].sid}`,)
                 .then((result)=>{
                    if (result.data.code===200) {
                        this.$toast({message:result.data.msg,position:'bottom',duration:3000});
                        setTimeout(()=>{this.$router.go(0);},1000);
                    };})
                  .catch((err)=>{console.log(err);});
            }
          }
        }else{
          if (this.result.length==0) {
            this.$toast({message:'您还未选择商品',position:'bottom',duration:2000});
          }else{
          for (let i of this.result) {
            console.log(this.rows[i]) 
            this.axios.post(`/adm/shopsubmit`,`uid=${this.rows[i].uid}&lid=${this.rows[i].lid}&title=${this.rows[i].title}&details=${this.rows[i].details}&price=${this.rows[i].price}&count=${this.rows[i].count}`)
                 .then((result)=>{console.log(result.data);
                    if (result.data.code === 200) {
                    this.$toast({message:result.data.msg,position:'bottom',duration:3000});}
                 }).catch((err)=>{console.log(err);});

            this.axios.delete(`/adm/delshopcar/${this.rows[i].sid}`,)
                 .then((result)=>{
                    if (result.data.code===200) {
                        this.$toast({message:result.data.msg,position:'bottom',duration:3000});
                    }
                  }).catch((err)=>{console.log(err);});
          }
          //强制刷新页面[1.重新显示页面2.再次发送请求]
          setTimeout(()=>{this.$router.go(0);},1000);
        }
        }
      } 
    },
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
  },
  
  watch: {
    sum(){
      console.log(this.sum)
    },
    rows(e){
      console.log(e)
    },
    result() {
      console.log(this.result);
      this.sum=0;
      for (let i of this.result) {
          this.sum=this.sum+((this.rows[i].price*this.rows[i].count)*100)
      }
    },
  },
};
</script>