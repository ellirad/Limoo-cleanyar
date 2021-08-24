import {
  SET_CONTRACT,
  SET_CONTRACT_LIST,
  SHOW_NOTIFICATION,
} from "./mutation-types";

import {
  GetUserContractsList,
  GetContractById,
} from "../common/api.service.js";

import { status } from "../constants/status";

const state = {
  contract: null,
  contractList: [],
  contractId: null,
};

const getters = {
  contract(state) {
    return state.contract;
  },

  contractList(state) {
    return state.contractList;
  },

  contractId(state) {
    return state.contractId;
  },
};

const mutations = {
  [SET_CONTRACT_LIST](state, products) {
    state.contractList = products;
  },
};

const actions = {
  async getUserContractsList({ commit }, params) {
    await GetUserContractsList.get(params)
      .then(({ data }) => {
        if (data.status === status.success) {
          commit(SET_CONTRACT_LIST, data.result);
        }
      })
      .catch((error) => {
        commit(SHOW_NOTIFICATION, { message: error, type: "error" });
        throw new Error(error);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
