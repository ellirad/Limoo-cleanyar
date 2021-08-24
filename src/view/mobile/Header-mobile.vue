<template>
  <div class="header d-flex align-items-center justify-content-between">
    <div class="d-flex align-center" @click="openSidebar">
      <v-icon class="u-cursor-pointer">mdi-menu</v-icon>
      <h4 class="mr-2 title--primary">کیلین یار</h4>
    </div>

    <div class="header__profile d-flex">
      <div class="header__profile profile__icon">
        <v-badge
          :value="messages"
          color="secondary"
          :content="messages"
          overlap
          offset-x="11"
          offset-y="23"
          left
        >
          <v-icon class="mt-3 ml-5">mdi-bell-outline</v-icon>
        </v-badge>
      </div>

      <div class="header__profile profile__img">
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar color="secondary" dark v-bind="attrs" v-on="on">
                <img src="../../assets/img/avatar.png" alt="John" />
              </v-avatar>
            </template>

            <v-list width="150">
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title
                  class="u-cursor-pointer"
                  @click="logoutHandler(item.title)"
                  >{{ item.title }}</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [{ title: "تنظیمات" }, { title: "خروج" }],
    messages: 2,
  }),

  methods: {
    openSidebar() {
      this.$emit("drawerHandler");
    },

    logoutHandler(title) {
      if (title === "خروج") {
        this.$router.push("/login");
      }
      this.$store.dispatch("LOGOUT");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  padding: 10px 20px;
  justify-content: space-between;
  box-shadow: 0 1px 9px 1px rgb(0 0 0 / 20%);
}
</style>
