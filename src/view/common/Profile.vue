<template>
  <v-form>
    <v-container class="ma-5">
      <v-row>
        <v-col cols="8">
          <v-text-field
            v-model="userInfo.fullname"
            label="نام و نام خانوادگی"
            required
            outlined
            class="text-input"
            color="primary"
            hide-details="auto"
            :error-messages="fullnameErrors"
            @input="$v.userInfo.fullname.$touch()"
            @blur="$v.userInfo.fullname.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="userInfo.mobile"
            label="شماره موبایل"
            required
            outlined
            class="text-input"
            color="primary"
            :error-messages="mobileErrors"
            @input="$v.userInfo.mobile.$touch()"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="userInfo.email"
            label="ایمیل"
            required
            outlined
            class="text-input"
            color="primary"
            :error-messages="emailErrors"
            @input="$v.userInfo.email.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-btn
          color="primary"
          class="ma-2 white--text btn-big-text"
          width="170"
          large
          @click="updateUserinfo"
        >
          ثبت اطلاعات
          <v-icon right dark>
            mdi-check
          </v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
// Validation
import { email, required } from "vuelidate/lib/validators";
import { iran_mobile, farsi_text } from "../../plugins/vuelidate-custome-rules";

export default {
  data() {
    return {
      userInfo: {
        fullname: "",
        mobile: "09000000000",
        email: "gol@smd.com",
      },
    };
  },

  validations() {
    return {
      userInfo: {
        fullname: {
          required,
          farsi_text,
        },
        mobile: {
          required,
          iran_mobile,
        },
        email: {
          required,
          email,
        },
      },
    };
  },

  computed: {
    fullnameErrors() {
      const errors = [];
      if (!this.$v.userInfo.fullname.$dirty) return errors;

      !this.$v.userInfo.fullname.required &&
        errors.push(`نام و نام خانوادگی اجباری است`);

      !this.$v.userInfo.fullname.farsi_text && errors.push(`حروف وارد کنید.`);

      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.userInfo.email.$dirty) return errors;

      !this.$v.userInfo.email.required && errors.push(`ایمیل اجباری است.`);

      !this.$v.userInfo.email.email && errors.push(`ایمیل نامعتبر است.`);

      return errors;
    },

    mobileErrors() {
      const errors = [];
      if (!this.$v.userInfo.mobile.$dirty) return errors;

      !this.$v.userInfo.mobile.required &&
        errors.push(`شماره موبایل اجباری است.`);

      !this.$v.userInfo.mobile.iran_mobile &&
        errors.push(`شماره موبایل نامعتبر است.`);

      return errors;
    },
  },

  methods: {
    updateUserinfo() {
      this.$v.$touch();

      if (this.$v.$invalid) return;

      console.log(this.$v, "pppppppppp");
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
  color: red;
}
</style>
