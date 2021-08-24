import Vue from "vue";
import Router from "vue-router";

import Profile from "../view/common/Profile.vue";
import Orders from "../view/common/Orders.vue";
import Specialists from "../view/common/Specialists.vue";
import Address from "../view/common/Address.vue";
import Login from "../view/common/Login.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: "/orders",
      name: "orders",
      component: Orders,
      meta: { requiresAuth: true },
    },
    {
      path: "/specialists",
      name: "specialists",
      component: Specialists,
      meta: { requiresAuth: true },
    },
    {
      path: "/address",
      name: "address",
      component: Address,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
