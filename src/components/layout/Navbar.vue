<template>
  <header class="header">
    <router-link to="/">
      <img
        :src="require('@/assets/logo.jpg')"
        alt="RecipesWebsite"
        class="app-logo"
      />
    </router-link>

    <v-spacer></v-spacer>

    <div class="header-right">
      <v-btn icon class="btn btn--icon btn--icon-magnify">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu left bottom class="dropdown-menu">
        <template v-slot:activator="{ on }">
          <div v-on="on" class="user-menu">
            <img
              v-if="userName"
              :src="require('@/assets/images/user.png')"
              alt="userName"
              class="user-menu-image"
            />
            <span class="user-menu-name">{{
              isAuthenticated ? userName : "Profile"
            }}</span>
            <v-icon color="#04b4d4" class="user-menu-icon">
              mdi-chevron-down
            </v-icon>
          </div>
        </template>
        <user-menu
          :is-authenticated="isAuthenticated"
          :current-user="currentUser"
        />
      </v-menu>
    </div>
  </header>
</template>

<script>
//import { mapGetters } from "vuex";
import UserMenu from "./user-menu";
export default {
  name: "app-navbar",
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    userId() {
      return this.$store.getters.getUserId;
    },
    userName() {
      return this.$store.getters.getUserName;
    },
    getErrors() {
      return this.$store.getters.getErrors;
    }
  },
  components: {
    UserMenu
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";
.header {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background-color: $white;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  @include mediumDevices {
    padding: 0 3.5rem;
  }
  @include largeDevices {
<<<<<<< HEAD
    padding: 0 4rem;
=======
    padding: 0 8.5rem;
>>>>>>> 0dd727106a6c907e350a68998da966a815be4cf6
  }
}
.app-logo {
  width: 5rem;
  margin-top: 1.5rem;
}
.header-right {
  display: flex;
  align-items: center;
}
.user-menu {
  @extend .header-right;
  cursor: pointer;
  @include mediumDevices {
    border-left: 1px solid #dcdcdc;
    padding-left: 1rem;
  }
  &-image {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
    border-radius: 50%;
  }
  &-name {
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-right: 0.35rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: $app-main-color;
  }
  &-icon {
    font-size: 1.25rem;
  }
  &-list {
    border-radius: 0;
  }
}
.v-menu__content {
  border-radius: 0;
  top: 4.85rem !important;
}
.btn {
  color: $app-color !important;
  &--icon {
    &-magnify {
      margin-right: 0.5rem;
      display: none;
      @include mediumDevices {
        display: block;
      }
    }
  }
}
</style>