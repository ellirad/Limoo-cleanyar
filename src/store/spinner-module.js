import { SHOW_SPINNER, HIDE_SPINNER } from "./mutation-types";

 const state = () => ({
  spinner: false
});

 const mutations = {
  [SHOW_SPINNER](state) {
    state.spinner = true;
  },

  [HIDE_SPINNER](state) {
    state.spinner = false;
  }
};

const getters = {
  overlay(state) {
    return state.spinner;
  }
};

export default {
  state,
  mutations,
  getters
};
