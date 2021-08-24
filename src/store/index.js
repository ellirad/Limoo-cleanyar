import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Modules
import notification from "./notification-module";
import spinner from "./spinner-module";
import auth from "./auth-module";
import contracts from "./contracts-module";

const store = new Vuex.Store({
  modules: {
    notification,
    spinner,
    auth,
    contracts,
  },
});

export default store;
