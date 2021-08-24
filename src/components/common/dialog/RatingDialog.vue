<template>
  <v-row justify="center">
    <v-dialog
      v-model="ratingDialog"
      persistent
      scrollable
      @click:outside="closeDialog"
      max-width="350px"
    >
      <!--------------------------- Rating ----------------------------->
      <v-card class="d-flex pa-5 scrollable">
        <h5 class="mt-4 mr-4">امتیاز {{ rate }} ثبت شود؟</h5>

        <v-card-text class="py-5 stars">
          <star-rating
            :readOnly="true"
            v-model="rate"
            :star-size="18"
          ></star-rating>
        </v-card-text>

        <v-card-actions class="card-action">
          <v-btn
            color="green"
            class="white--text"
            width="100"
            @click="setRating"
          >
            بله
          </v-btn>
          <v-btn
            color="warning"
            class="white--text"
            width="100"
            @click="ratingDialog = false"
          >
            خیر
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  components: { StarRating },

  data() {
    return {
      ratingDialog: false,
    };
  },

  props: {
    rate: {
      type: Number || String,
      require: true,
    },
  },

  methods: {
    closeDialog() {
      this.ratingDialog = false;
    },

    openDialog() {
      this.ratingDialog = true;
    },

    setRating() {
      this.$store.commit("SHOW_NOTIFICATION", {
        message: `امتیاز ${this.rate} ثبت شد.`,
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

.stars {
  display: flex;
  justify-content: center;
}

::v-deep .vue-star-rating-rating-text {
  display: none !important;
}
</style>
