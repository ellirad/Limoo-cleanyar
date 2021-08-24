// This module show notification(vuetify snackbar)

import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "./mutation-types";

const state = () => ({
  showNotification: false,
  message: "test",
  type: "error",
});

const mutations = {
  [SHOW_NOTIFICATION](state, payload) {
    state.showNotification = true;
    state.message = payload.message;
    state.type = payload.type;
  },

  [HIDE_NOTIFICATION](state) {
    state.showNotification = false;
  },
};

const getters = {
  showNotification(state) {
    return state.showNotification;
  },

  message(state) {
    return state.message;
  },

  type(state) {
    return state.type;
  },
};

export default {
  state,
  mutations,
  getters,
};
