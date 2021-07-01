import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.config.productionTip = false
Vue.prototype.axios=axios;
Vue.use(Vant);
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
