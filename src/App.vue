<template>
  <v-app>
    <component :is="currentLayout"></component>
    <notification />
    <spinner />
  </v-app>
</template>

<script>
import notification from "./components/common/notification.vue";
import Spinner from "./components/common/Spinner.vue";
import DesktopLayout from "./layouts/DesktopLayout.vue";
import MobileLayout from "./layouts/MobileLayout.vue";

export default {
  components: { notification, Spinner },
  name: "App",

  data: () => ({
    mobileAndTabletSize: "960",
    currentWidth: window.innerWidth,
  }),

  computed: {
    currentLayout() {
      return this.currentWidth <= this.mobileAndTabletSize
        ? MobileLayout
        : DesktopLayout;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

#app {
  font-family: $font-primary !important;
}
</style>
