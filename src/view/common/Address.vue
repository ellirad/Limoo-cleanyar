<template>
  <div class="address col-12 pa-10">
    <!--------------------------- Add Address ----------------------------->
    <v-row class="align-center justify mb-6">
      <h4>آدرس های من</h4>

      <v-btn
        color="primary"
        class="ma-2 white--text btn-big-text"
        width="170"
        large
        @click="openDialogHandler({}, 'addAddressDialog')"
      >
        آدرس جدید
        <v-icon right>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-row>

    <!--------------------------- Address Table ----------------------------->
    <div class="table">
      <v-data-table
        calculate-widths
        :headers="headers"
        :items="address"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            medium
            @click="openDialogHandler(item, 'editAddressDialog')"
            color="secondary"
          >
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </div>

    <!--------------------------- Pagination ----------------------------->
    <div class="pagination-center pt-2 mt-8">
      <v-pagination
        v-model="page"
        :length="pageCount"
        class="elevation-0"
      ></v-pagination>
    </div>

    <!--------------------------- Edit Address Dialog ----------------------------->
    <edit-address-dialog ref="editAddressDialog" />

    <add-address-dialog ref="addAddressDialog" />
  </div>
</template>

<script>
import EditAddressDialog from "../../components/common/dialog/EditAddress-dialog.vue";
import AddAddressDialog from "../../components/common/dialog/AddAddress-dialog.vue";

export default {
  components: { EditAddressDialog, AddAddressDialog },

  data() {
    return {
      dialog: false,
      specialistInfo: {},
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "آدرس",
          align: "center",
          value: "title",
          sortable: false,
        },

        { text: "ویرایش", value: "actions", align: "center", sortable: false },
      ],
      address: [
        {
          title:
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
        },
        {
          title:
            "چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ",
        },
        {
          title:
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
        },
        {
          title:
            "چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است ",
        },
        {
          title:
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
        },
      ],
    };
  },

  methods: {
    openDialogHandler(item, name) {
      if (item && Object.keys(item).length === 0 && item.constructor === Object)
        this.$refs[name].openDialog();
      else this.$refs[name].openDialog(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.address {
  text-align: center;
}
.justify {
  justify-content: space-between !important;
}

.v-data-table::v-deep th {
  font-size: 13px !important;
}

.v-data-table::v-deep td {
  font-size: 14px !important;
}
</style>
