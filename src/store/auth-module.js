import { ApiService } from "../common/api.service";
import JwtService from "../common/jwt.service";
import router from "../router/index";

import {
  CURRENT_USER,
  IS_AUTHENICATED,
  CHECK_ACTIVATION_SMS,
  LOGIN,
  LOGOUT,
  LOGOUT_MUTATION,
  CHECK_AUTH,
  SET_AUTH,
} from "./mutation-types";

const state = {
  errors: null,
  user: {},
  isAuthenticated: true,
};

const getters = {
  [CURRENT_USER](state) {
    return state.user;
  },

  [IS_AUTHENICATED](state) {
    return state.isAuthenticated;
  },
};

const actions = {
  [CHECK_ACTIVATION_SMS](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("/activation_sms_check", credentials)
        .then((res) => {
          if (res.status === 200 && res.data.is_successful) {
            context.commit(SET_AUTH, res.data.data);
            resolve(res);
          } else {
            errorMessage.methods.errorMessage(res.data.message);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  [LOGIN](context, credentials) {
    context.commit(SET_AUTH, { fullname: "الهام کیانی" });
    // return new Promise((resolve, reject) => {
    //   ApiService.post("/login", credentials)
    //     .then((res) => {
    //       if (res.data.is_successful === true) {
    //         resolve(res);
    //       } else {
    //         errorMessage.methods.errorMessage(res.data.message);
    //       }
    //     })
    //     .catch((err) => {
    //       reject(err);
    //     });
    // });
  },

  [LOGOUT](context) {
    context.commit(LOGOUT_MUTATION);
  },

  [CHECK_AUTH](context) {
    if (context.state.isAuthenticated === true) {
      // ApiService.setHeader();
    }
  },
};

const mutations = {
  [SET_AUTH](state, data) {
    state.isAuthenticated = true;
    state.user = data.user;
    // Save private token
    // JwtService.saveToken(data.token);

    // ApiService.setHeader();
  },

  [LOGOUT_MUTATION](state) {
    state.isAuthenticated = false;
    state.user = null;
    JwtService.destroyToken();
    router.push("/login");
    location.reload();
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
