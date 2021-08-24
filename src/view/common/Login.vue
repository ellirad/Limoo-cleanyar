<template>
  <div class="background">
    <div class="login col-xs-6 col-sm-8 col-md-6 col-lg-4 text-center">
      <h4 class="title--primary pt-3">ورود</h4>

      <v-form class="pa-5">
        <v-container>
          <v-row class="align-center d-flex flex-column" v-if="step === 0">
            <v-col cols="10">
              <v-text-field
                v-model="user.mobile"
                label="شماره موبایل"
                outlined
                class="text-input"
                color="primary"
                :error-messages="mobileErrors"
                @input="$v.user.mobile.$touch()"
                @blur="$v.user.mobile.$touch()"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-btn
                color="primary"
                class="ma-2 white--text btn-big-text"
                width="170"
                large
                @click="submitMobile"
              >
                بعدی
                <v-icon right dark>
                  mdi-arrow-left
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-row class="align-center d-flex flex-column" v-else>
            <v-col cols="12">
              <vue-otp-2
                length="6"
                join-character=""
                @onChange="handleOnChange"
                @onComplete="handleOnComplete"
              />
            </v-col>

            <v-col cols="12" v-if="showError === true">
              <span class="show-error">عدد وارد کنید.</span>
            </v-col>

            <v-col cols="12">
              <v-btn
                color="primary"
                class="ma-2 white--text btn-big-text"
                width="170"
                large
                @click="handleOnComplete"
              >
                تایید
                <v-icon right dark>
                  mdi-check
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
// Validation
import { required } from "vuelidate/lib/validators";
import { iran_mobile } from "../../plugins/vuelidate-custome-rules";

export default {
  data() {
    return {
      step: 0,
      // disabled:
      showError: false,
      otp: null,
      user: {
        mobile: null,
      },
    };
  },

  validations() {
    return {
      user: {
        mobile: {
          required,
          iran_mobile,
        },
      },
    };
  },

  computed: {
    mobileErrors() {
      const errors = [];
      if (!this.$v.user.mobile.$dirty) return errors;

      !this.$v.user.mobile.required && errors.push(`شماره موبایل اجباری است.`);

      !this.$v.user.mobile.iran_mobile && errors.push(`موبایل نامعتبر است.`);

      return errors;
    },
  },

  methods: {
    submitMobile() {
      this.$v.$touch();

      if (this.$v.$invalid) return;
      this.step = 1;
      console.log("test");
    },

    handleOnChange(value) {
      // En, Fa number validation
      const rule = /^([0-9]|[\u06F0-\u06F9])+$/;

      if (rule.test(Number(value.value)) === false) this.showError = true;
      else this.showError = false;
    },

    handleClearInput() {
      this.$refs.otpInput.clearInput();
    },

    handleOnComplete(value) {
      if (!this.isValidNumber(value)) {
        this.showError = true;
        return;
      }

      this.otp = Number(value.join(""));
      this.disabled = false;
      this.loginHandler();
    },

    isValidNumber(array) {
      const rule = /^([0-9]|[\u06F0-\u06F9])+$/;
      const found = array.every((input) => rule.test(Number(input)));
      return found;
    },

    loginHandler() {
      this.$store.commit("SHOW_NOTIFICATION", {
        message: "عملیات با موفقیت انجام شد.",
        type: "success",
      });

      this.$router.push("/orders");
      this.$router.go("");
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  background-image: linear-gradient(
    to right,
    var(--v-secondary-base),
    var(--v-primary-base)
  );
  width: 100vw;
  height: 100vh;
}
.login {
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.vue-otp-2 {
  display: flex;
  justify-content: space-between;
  direction: ltr !important;
}
.show-error {
  color: var(--v-error-base);
  font-size: 1.1rem;
}
</style>
