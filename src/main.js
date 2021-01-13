import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;

// import { App as nwApp } from 'nw.gui'
// console.log(nwApp)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
