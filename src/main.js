import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";

import store from "./store/index";
import vuetify from "./plugins/vuetify";
import vuelidate from "./plugins/vuelidate";

import axios from "axios";
import VueAxios from "vue-axios";

import { IS_AUTHENICATED } from "./store/mutation-types";

import VueOtp2 from "vue-otp-2";

Vue.use(VueOtp2);

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) => {
  // store.dispatch(types.AUTO_LOGIN, "open");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters[IS_AUTHENICATED]) {
      // store.dispatch(types.AUTO_LOGIN, "open");
      next({
        path: "/login",
      });
    } else {
      // store.dispatch(types.HIDE_LOGIN_MODAL, "close");
      next();
    }
  } else {
    // store.dispatch(types.HIDE_LOGIN_MODAL, "close");
    next();
  }
});

new Vue({
  store,
  vuetify,
  router,
  vuelidate,
  render: (h) => h(App),
}).$mount("#app");
