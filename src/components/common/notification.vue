<template>
  <v-snackbar
    v-model="showNotification"
    :color="color"
    right
    :timeout="timeout"
  >
    {{ message }}
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      color: "error",
      timeout: 2500,
    };
  },

  computed: {
    ...mapGetters({
      message: "message",
      showNotification: "showNotification",
      type: "type",
    }),
  },

  watch: {
    type: function() {
      this.setBackgroundcolor(this.type);
    },
    showNotification: function() {
      let vm = this;
      setTimeout(function() {
        vm.$store.commit("HIDE_NOTIFICATION");
      }, vm.timeout);
    },
  },

  methods: {
    setBackgroundcolor(type) {
      if (type === "success") this.color = "success";
      if (type === "error") this.color = "error";
      if (type === "info") this.color = "info";
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .v-snack__content {
  font-size: 1.2rem !important;
  text-align: center;
}
</style>
