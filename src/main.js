/*
 * @Descripttion:
 * @version:
 * @Author: zml
 * @Date: 2020-05-20 11:11:42
 * @LastEditors: zml
 * @LastEditTime: 2020-05-29 14:57:52
 */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import mock from "./mock";
Vue.use(ElementUI);
import axios from "axios";
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  mock,
  render: h => h(App)
}).$mount("#app");
