<template>
  <div class="desk-layout" style="position: relative;">
    <!-------------------------------- Navigation drawer ---------------------------------->
    <v-navigation-drawer
      v-if="isAuthenticated && currentRoute !== 'login'"
      v-model="drawer"
      absolute
      temporary
      :right="$vuetify.rtl"
      color="primary"
    >
      <v-list-item color="primary" class="white-text">
        <v-list-item-avatar>
          <v-img src="../assets/img/logo-white.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="title">الهام کیانی</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          class="white-text"
        >
          <v-list-item-icon class="mt-3">
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="link-title">
              <router-link :to="item.href" @click="drawer = !drawer">
                {{ item.title }}
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-------------------------------- Header ---------------------------------->
    <header-desk
      v-if="isAuthenticated && currentRoute !== 'login'"
      @drawerHandler="drawer = !drawer"
    />

    <!-------------------------------- Main content ---------------------------------->

    <transition name="slide-fade">
      <div
        :class="
          isAuthenticated && currentRoute !== 'login' ? 'main-content' : ''
        "
      >
        <div
          :class="isAuthenticated && currentRoute !== 'login' ? 'row' : ''"
          align="center"
        >
          <router-view></router-view>
        </div>
      </div>
    </transition>

    <!-------------------------------- Footer ---------------------------------->
    <footer-desk v-if="isAuthenticated && currentRoute !== 'login'" />
  </div>
</template>

<script>
import FooterDesk from "../view/desktop/Footer-desk.vue";
import HeaderDesk from "../view/desktop/Header-desk.vue";
import { mapGetters } from "vuex";

export default {
  components: { HeaderDesk, FooterDesk },

  data() {
    return {
      drawer: null,
      currentRoute: this.$route.name,
      items: [
        { title: "پروفایل من", icon: "mdi-account-outline", href: "/" },
        { title: "سفارشات", icon: "mdi-bookmark-outline", href: "/orders" },
        {
          title: "متخصصین من",
          icon: "mdi-heart-outline",
          href: "/specialists",
        },
        {
          title: "آدرس های من",
          icon: "mdi-map-marker-check-outline",
          href: "/address",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      isAuthenticated: "IS_AUTHENICATED",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.desk-layout {
  height: 100%;
  background-color: var(--v-bgColor-base);
}

.white-text {
  color: #fff !important;
}

.title {
  font-family: inherit !important;
  font-size: 1.7rem !important;
  font-weight: 100 !important;
}

.link-title {
  font-family: inherit !important;
  font-size: 1.3rem !important;
  font-weight: 100 !important;
}

.main-content {
  margin: 40px;
  min-height: 80vh;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 9px 1px rgb(0 0 0 / 8%);
}

.link-title a {
  color: #fff !important;
  text-decoration: none !important;
}
</style>
