import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  rtl: true,
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: "#1e90ff",
        primaryLight: "#73baff",
        primaryDark: "#0054a6",
        secondary: "#ff7f50",
        bgColor: "#ebedef",
        accent: "#82B1FF",
        error: "#ff4757",
        info: "#70a1ff",
        success: "#2ed573",
        warning: "#f9b115",
        greyDark1: "#95a5a6",
      },
    },
  },
});
