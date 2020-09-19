import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { getToken, getQueryVariable } from "./common/util";
import { TOKEN_STORAGE_KEY, UID_STORAGE_KEY } from "./common/constants";
import { setData } from "./common/storage";
import "./assets/font/iconfont.css";

const token = getToken();
const uid = getQueryVariable("uid");
if (token) {
  setData(TOKEN_STORAGE_KEY, token);
}

if (uid) {
  setData(UID_STORAGE_KEY, uid);
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
