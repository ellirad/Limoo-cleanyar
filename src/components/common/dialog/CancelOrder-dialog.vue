<template>
  <v-row justify="center">
    <v-dialog
      v-model="cancelOrderDialog"
      persistent
      scrollable
      @click:outside="closeDialog"
      max-width="350px"
    >
      <!--------------------------- Cancel Order ----------------------------->
      <v-card class="d-flex pa-5 scrollable">
        <h5 class="mt-4 mr-4">
          سفارش لغو شود؟
        </h5>

        <v-card-text class="py-5 cancel-text">
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای
        </v-card-text>

        <v-card-actions class="card-action">
          <v-btn
            color="error"
            class="white--text"
            width="100"
            @click="cancelOrder"
          >
            بله
          </v-btn>
          <v-btn
            color="warning"
            class="white--text"
            width="100"
            @click="cancelOrderDialog = false"
          >
            خیر
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      cancelOrderDialog: false,
    };
  },

  props: {
    orderId: {
      type: Number || String,
      require: true,
    },
  },

  methods: {
    closeDialog() {
      this.cancelOrderDialog = false;
    },

    openDialog() {
      this.cancelOrderDialog = true;
    },

    cancelOrder() {
      this.$store.commit("SHOW_NOTIFICATION", {
        message: "سفارش مورد نظر لغو گردید.",
        type: "info",
      });
      this.closeDialog();
    },
  },
};
</script>

<style lang="scss" scoped>
.cancel-text {
  font-size: 1.1rem;
}

.card-action {
  justify-content: space-between !important;
}
</style>
