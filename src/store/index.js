import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin:sessionStorage.getItem("islogin",),
    uid:sessionStorage.getItem("uid",),
    uname:sessionStorage.getItem("uname",)
  },
  mutations: {
    setislogin(state,islogin){
      state.islogin=islogin
    },
    setuname(state,uname) {
      state.uname=uname
    },
    setuid(state,uid) {
      state.uid=uid
    }
  },
  actions: {
  },
  modules: {
  }
})
