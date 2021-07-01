<template>
  <div class="addlist">
    <van-nav-bar
      fixed
      title="送货地址"
      left-text="返回"
      right-text="添加地址"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    /> -->
  </div>
</template>

<style lang="scss">
.addlist {
  padding-top: 50px;
  .van-nav-bar {
    background-color: rgb(5, 252, 219);
  }
}
</style>

<script>
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [],
      disabledList: [
        {
          id: "36",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号",
        },
      ],
    };
  },
  mounted() {
    if (this.$store.state.islogin) {
      this.axios.get(`/adm/addlist`, { params: { uid: this.$store.state.uid } })
        .then((result) => {
          console.log(result.data);
          for (let str of result.data) {
            console.log(str);
            this.list.push({
              id: str.aid,
              name: str.aname,
              tel: str.tel,
              address: str.province+str.city+str.county+str.address,
              isDefault:str.isDefault===1?true:false,
            });
            if(str.isDefault==1){
              this.chosenAddressId=str.aid
            }
          }
        }).catch((err) => {console.log(err);});
    }else{
      this.$toast({message:'您还未请登录',position:'bottom',duration:3000});
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push(`/my`);
    },
    onClickRight() {
      this.$router.push(`/addedit/0`);
    },
    onAdd() {
      this.$router.push(`/addedit/0`);
    },
    onEdit(item, index) {
      console.log(item);
      this.$router.push(`/addedit/${item.id}`);
    },
  },
};
</script>