import axios from "axios";
import JwtService from "@/common/jwt.service";
import { API_URL } from "@/common/config";
import { SHOW_SPINNER, HIDE_SPINNER } from "../store/mutation-types";
import store from "../store/index";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

const ApiService = {
  setHeader() {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
  },

  // resource: api address
  get(resource, data) {
    return axiosInstance
      .get(resource, {
        data: JSON.stringify(data),
      })
      .catch((error) => {
        throw new Error(`[RWV] ApiService ${error}`);
      });
  },

  post(resource, params) {
    return axiosInstance.post(`${resource}`, params);
  },
};

export default ApiService;

export const GetUserContractsList = {
  get(params) {
    return ApiService.get("GetUserContractsList", params);
  },
};

export const GetContractById = {
  get(params) {
    return ApiService.get(`/GetContractById/?${params}`);
  },
};

export const AddServiceProviderRateByContractId = {
  post(params) {
    return ApiService.post("AddServiceProviderRateByContractId", params);
  },
};

// Add a request and response interceptor to set functions for data response time
axiosInstance.interceptors.request.use(
  function(config) {
    // This function show the spinner on the screen
    store.commit(SHOW_SPINNER);
    return config;
  },
  function(error) {
    // This function show the spinner on the screen
    store.commit(SHOW_SPINNER);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // This function hide the spinner when get response
    store.commit(HIDE_SPINNER);
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // This function hide the spinner when get response
    store.commit(HIDE_SPINNER);
    return Promise.reject(error);
  }
);
