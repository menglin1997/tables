/*
 * @Descripttion: 
 * @version: 
 * @Author: zml
 * @Date: 2020-05-20 11:11:42
 * @LastEditors: zml
 * @LastEditTime: 2020-05-20 11:21:25
 */ 
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
