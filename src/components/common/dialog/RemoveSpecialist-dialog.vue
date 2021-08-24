<template>
  <v-row justify="center">
    <v-dialog
      v-model="removeSpecialistDialog"
      persistent
      scrollable
      @click:outside="closeDialog"
      max-width="350px"
    >
      <!---------------------------Remove Specialist ----------------------------->
      <v-card class="d-flex pa-5 scrollable" v-if="specialistInfo">
        <h5 class="mt-4 mr-4">
          {{ specialistInfo.fullname }} از لیست حذف شود؟
        </h5>

        <v-card-text class="py-5 info-text">
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای
        </v-card-text>

        <v-card-actions class="card-action">
          <v-btn
            color="error"
            class="white--text"
            width="100"
            @click="removeSpecialist"
          >
            بله
          </v-btn>
          <v-btn
            color="warning"
            class="white--text"
            width="100"
            @click="removeSpecialistDialog = false"
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
      removeSpecialistDialog: false,
      specialistInfo: null,
    };
  },

  methods: {
    closeDialog() {
      this.removeSpecialistDialog = false;
    },

    openDialog(specialistInfo) {
      this.removeSpecialistDialog = true;
      this.specialistInfo = specialistInfo;
    },

    removeSpecialist() {
      this.$store.commit("SHOW_NOTIFICATION", {
        message: "از لیست مورد علاقه ها حذف شد.",
        type: "info",
      });
      this.closeDialog();
    },
  },
};
</script>

<style lang="scss" scoped>
.scrollable {
  overflow-y: auto !important;
  background-color: #fff;
}

.info-text {
  font-size: 1.1rem;
}

.card-action {
  justify-content: space-between !important;
}
</style>
