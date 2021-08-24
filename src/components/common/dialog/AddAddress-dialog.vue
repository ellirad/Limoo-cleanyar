<template>
  <v-row justify="center">
    <v-dialog
      v-model="addAddressDialog"
      persistent
      scrollable
      @click:outside="closeDialog"
      max-width="550px"
    >
      <v-card class="d-flex pa-5 scrollable">
        <!--------------------------- Title ----------------------------->
        <h5 class="mt-4 mr-4">اضافه کردن آدرس</h5>

        <!--------------------------- Edit or Add Form ----------------------------->
        <v-form class="pa-5">
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="address.town"
                  label="استان"
                  required
                  outlined
                  class="text-input"
                  color="primary"
                  disabled
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="address.city"
                  label="شهر"
                  required
                  outlined
                  class="text-input"
                  color="primary"
                  disabled
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="address.neighborhood"
                  label="محله"
                  required
                  outlined
                  class="text-input"
                  color="primary"
                  :error-messages="neighborhoodErrors"
                  @input="$v.address.neighborhood.$touch()"
                  @blur="$v.address.neighborhood.$touch()"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="address.houseArea"
                  label="متراژ"
                  required
                  outlined
                  class="text-input"
                  color="primary"
                  :error-messages="houseAreaErrors"
                  @input="$v.address.houseArea.$touch()"
                  @blur="$v.address.houseArea.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="address.number"
                  label="پلاک"
                  required
                  outlined
                  class="text-input"
                  color="primary"
                  :error-messages="numberErrors"
                  @input="$v.address.number.$touch()"
                  @blur="$v.address.number.$touch()"
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="address.unit"
                  label="واحد"
                  required
                  outlined
                  class="text-input"
                  color="primary"
                  :error-messages="unitErrors"
                  @input="$v.address.unit.$touch()"
                  @blur="$v.address.unit.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-radio-group
                  v-model="address.houseStatus"
                  row
                  label="نوع فضا"
                  :error-messages="houseStatusErrors"
                >
                  <v-radio label="واحد تخلیه" :value="1"></v-radio>
                  <v-radio label="واحد مسکونی" :value="0"></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="12">
                <v-radio-group
                  v-model="address.animalStatus"
                  row
                  label="حیوان خانگی"
                  :error-messages="animalStatusErrors"
                >
                  <v-radio label="دارم" :value="1"></v-radio>
                  <v-radio label="ندارم" :value="0"></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="12">
                <v-radio-group
                  v-model="address.isDefault"
                  row
                  label="آدرس پیش فرض"
                  :error-messages="isDefaultErrors"
                >
                  <v-radio label="باشد" :value="1"></v-radio>
                  <v-radio label="نباشد" :value="0"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-btn
              color="primary"
              class="ma-2 white--text btn-big-text"
              width="170"
              large
              @click="submitAddress"
            >
              ثبت اطلاعات
              <v-icon right dark>
                mdi-check
              </v-icon>
            </v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
// Validation
import { required } from "vuelidate/lib/validators";
import {
  fa_en_num,
  farsi_text,
} from "../../../plugins/vuelidate-custome-rules";

export default {
  data() {
    return {
      addAddressDialog: false,
      address: {
        town: "تهران",
        city: "تهران",
      },
    };
  },

  validations() {
    return {
      address: {
        neighborhood: {
          required,
          farsi_text,
        },
        houseArea: {
          required,
          fa_en_num,
        },
        unit: {
          required,
          fa_en_num,
        },
        number: {
          required,
          fa_en_num,
        },
        isDefault: { required },
        houseStatus: { required },
        animalStatus: { required },
      },
    };
  },

  computed: {
    neighborhoodErrors() {
      const errors = [];
      if (!this.$v.address.neighborhood.$dirty) return errors;

      !this.$v.address.neighborhood.required && errors.push(`محله اجباری است.`);

      !this.$v.address.neighborhood.farsi_text &&
        errors.push(`فارسی تایپ کنید.`);

      return errors;
    },

    houseAreaErrors() {
      const errors = [];
      if (!this.$v.address.houseArea.$dirty) return errors;

      !this.$v.address.houseArea.required && errors.push(`متراژ اجباری است.`);
      !this.$v.address.houseArea.fa_en_num && errors.push(`عدد وارد کنید.`);

      return errors;
    },

    unitErrors() {
      const errors = [];
      if (!this.$v.address.unit.$dirty) return errors;

      !this.$v.address.unit.required && errors.push(` واحد اجباری است.`);

      !this.$v.address.unit.fa_en_num && errors.push(`عدد وارد کنید.`);

      return errors;
    },

    numberErrors() {
      const errors = [];
      if (!this.$v.address.number.$dirty) return errors;

      !this.$v.address.number.required && errors.push(` پلاک اجباری است.`);

      !this.$v.address.number.fa_en_num && errors.push(`عدد وارد کنید.`);

      return errors;
    },

    isDefaultErrors() {
      const errors = [];
      if (!this.$v.address.isDefault.$dirty) return errors;

      !this.$v.address.isDefault.required && errors.push(` اجباری است.`);

      return errors;
    },

    houseStatusErrors() {
      const errors = [];
      if (!this.$v.address.houseStatus.$dirty) return errors;

      !this.$v.address.houseStatus.required && errors.push(` اجباری است.`);

      return errors;
    },

    animalStatusErrors() {
      const errors = [];
      if (!this.$v.address.animalStatus.$dirty) return errors;

      !this.$v.address.animalStatus.required && errors.push(` اجباری است.`);

      return errors;
    },
  },

  methods: {
    closeDialog() {
      this.addAddressDialog = false;
    },

    openDialog() {
      this.address = {
        town: "تهران",
        city: "تهران",
      };
      this.addAddressDialog = true;
    },

    submitAddress() {
      this.$v.$touch();
      console.log(this.address, "aa");

      if (this.$v.$invalid) return;

      this.$store.commit("SHOW_NOTIFICATION", {
        message: "آدرس  با موفقیت ثبت شد",
        type: "success",
      });
      this.closeDialog();
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-big-text {
  font-size: 1.1rem !important;
}
::v-deep .v-label {
  font-size: 14px;
}
</style>
