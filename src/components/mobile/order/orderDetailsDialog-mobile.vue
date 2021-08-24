<template>
  <v-row justify="center" class="order-details">
    <v-dialog
      v-model="orderDetailsDialog"
      persistent
      scrollable
      @click:outside="closeDialog"
      max-width="550"
      min-width="425"
    >
      <v-card class="d-flex px-5 scrollable">
        <!--------------------------- Specialist Info ----------------------------->
        <div class="d-flex align-center">
          <v-col cols="8" class="specialist-info d-flex align-center">
            <v-avatar class="profile ml-4" color="secondary" size="90">
              <v-img :src="orderDetails.specialist.image"></v-img>
            </v-avatar>

            <div class="specialist-info__info text-center">
              <div
                class="specialist-info__info specialist-info__info--fullname pb-2"
              >
                {{ orderDetails.specialist.fullname }}
              </div>

              <div class="specialist-info__info specialist-info__info pb-2">
                {{ orderDetails.specialist.mobile }}
              </div>

              <div>میانگین امتیازات: {{ orderDetails.specialist.average }}</div>
            </div>
          </v-col>

          <!--------------------------- rating ----------------------------->
          <v-col cols="4" class="d-flex rating">
            <div>
              <star-rating
                @rating-selected="setRating"
                :show-rating="false"
                :rating="orderDetails.specialist.rate.average"
                :star-size="18"
              ></star-rating>

              <div class="pl-2 font-size-small text-center pt-2">
                {{ orderDetails.specialist.rate.count }} نظر
              </div>
            </div>
          </v-col>
        </div>

        <!--------------------------- favorite ----------------------------->
        <div class="favorite">
          <v-col cols="12">
            <div v-if="!isFavorite">
              به لیست متخصصین منتخب من اضافه کن
              <v-icon class="u-cursor-pointer" @click="addToFavorite"
                >mdi-heart-outline</v-icon
              >
            </div>

            <div v-else>
              متخصص مورد علاقه من
              <v-icon
                color="error"
                class="u-cursor-pointer"
                @click="removeFromFavorite"
                >mdi-cards-heart</v-icon
              >
            </div>
          </v-col>
        </div>

        <v-divider class="my-3"></v-divider>

        <!--------------------------- Description ----------------------------->
        <div class="description ma-3">
          <h6>توضیحات سفارش :</h6>
          <v-col cols="12">
            <p class="mb-0 text-justify">
              {{ orderDetails.description }}
            </p>
          </v-col>
        </div>

        <!--------------------------- Cancellation ----------------------------->
        <div class="text-left">
          <v-col cols="12">
            <v-btn
              color="warning"
              class="ma-2 white--text"
              width="100"
              large
              @click="cancellation"
              :disabled="orderDetails.isOrderDone"
            >
              لغو سفارش
              <v-icon right dark>
                mdi-close
              </v-icon>
            </v-btn>
          </v-col>
        </div>
      </v-card>
    </v-dialog>

    <!--------------------------- Cancellation Dialog ----------------------------->
    <cancel-order-dialog ref="cancelOrderDialog" />

    <!--------------------------- Rating Dialog ----------------------------->
    <rating-dialog ref="ratingDialog" :rate="currentRate" />
  </v-row>
</template>

<script>
import CancelOrderDialog from "../../common/dialog/CancelOrder-dialog.vue";
import StarRating from "vue-star-rating";
import RatingDialog from "../../common/dialog/RatingDialog.vue";

export default {
  components: { CancelOrderDialog, StarRating, RatingDialog },
  data() {
    return {
      orderDetailsDialog: false,
      cancelOrderDialog: false,
      currentRate: 0,
      isFavorite: null,
      orderDetails: {
        specialist: {
          fullname: "لایت شینیگامی",
          image: require("../../../assets/img/avatar.png"),
          mobile: "09125551774",
          isFavorite: false,
          average: 4.5,
          rate: {
            count: 4,
            average: 3.5,
          },
        },
        isOrderDone: false,

        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. ",
      },
    };
  },

  mounted() {
    this.isFavorite = this.orderDetails.specialist.isFavorite;
  },

  methods: {
    closeDialog() {
      this.orderDetailsDialog = false;
    },

    openDialog() {
      this.orderDetailsDialog = true;
    },

    cancellation() {
      this.$refs["cancelOrderDialog"].openDialog();
    },

    setRating(value) {
      this.currentRate = value;
      this.orderDetails.specialist.rate.count = value;
      this.$refs["ratingDialog"].openDialog();
    },

    addToFavorite() {
      this.isFavorite = true;

      this.$store.commit("SHOW_NOTIFICATION", {
        message: "به متخصصین مورد علاقه شما اضافه شد.",
        type: "info",
      });
    },

    removeFromFavorite() {
      this.isFavorite = false;

      this.$store.commit("SHOW_NOTIFICATION", {
        message: "از متخصصین مورد علاقه شما حذف شد.",
        type: "info",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.order-details {
  font-size: 1.2rem;
  background-color: #fff !important;
}

.favorite {
  text-align: center !important;
}

.description {
  padding: 5px 3px;
  font-size: 1.1rem;
}

.specialist-info {
  text-align: center;
  &__info {
    font-size: 1.2rem;
  }
}

.rating {
  justify-content: flex-end !important;
}
</style>
