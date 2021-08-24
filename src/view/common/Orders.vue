<template>
  <div class="orders-list col-12 pa-10">
    <!--------------------------- Order details dialog ----------------------------->
    <div class="table">
      <v-data-table
        calculate-widths
        :headers="headers"
        :items="desserts"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
        @click:row="openDialogHandler"
      >
        <template v-slot:item.price="{ item }">
          <div>
            <div class="py-4">
              {{ Math.floor(item.price).toLocaleString("fa-EG") }}
            </div>
          </div>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon medium @click="openDialogHandler(item)" color="secondary">
            mdi-eye
          </v-icon>
        </template>
      </v-data-table>
    </div>

    <!--------------------------- Pagination ----------------------------->
    <div class="text-center pt-2 mt-8">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>

    <!--------------------------- Order details dialog ----------------------------->
    <order-details-dialog-mobile ref="orderDetailsDialog" />
  </div>
</template>

<script>
import orderDetailsDialogMobile from "../../components/mobile/order/orderDetailsDialog-mobile.vue";

export default {
  components: { orderDetailsDialogMobile },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      contractParams: {
        parameters: {
          UserName: "moharrami",
        },
      },
      headers: [
        {
          text: "شماره سفارش",
          align: "center",
          sortable: false,
          value: "name",
        },
        { text: "قیمت", value: "price", align: "center", sortable: false },

        { text: "وضعیت", value: "calories", align: "center", sortable: false },

        { text: "مدیریت", value: "actions", align: "center", sortable: false },
      ],

      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          price: 100000,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          price: 100000,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          price: 100000,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          price: 100000,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          price: 100000,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          price: 100000,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          price: 100000,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          price: 100000,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          price: 100000,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          price: 100000,
        },
      ],
    };
  },

  mounted() {
    // this.getUserContractsList();
  },

  methods: {
    getUserContractsList() {
      this.$store.dispatch("getUserContractsList", this.contractParams);
    },

    openDialogHandler(item) {
      console.log(item, "item");
      this.$refs["orderDetailsDialog"].openDialog();
    },
  },
};
</script>

<style lang="scss" scoped>
.orders-list {
  text-align: center;
}

.v-data-table::v-deep th {
  font-size: 13px !important;
}

.v-data-table::v-deep td {
  font-size: 14px !important;
}
</style>
