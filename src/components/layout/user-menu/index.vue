<template>
  <v-list class="user-menu-list">
    <div v-if="this.isAuthenticated">
      <v-subheader class="menu-subheader">Recipes</v-subheader>
      <v-list-item-group>
        <v-list-item class="menu-item">
          <router-link
            :to="{name: 'profile',
              params: {
                userId: this.currentUser.id,
                name: this.currentUser.name,
              },
              hash: '#update-recipes'
            }"
            class="menu-link"
            >My Profile</router-link
          >
        </v-list-item>
        
        <v-list-item class="menu-item">
          <router-link
            :to="{
              name: 'profile',
              params: {
                userId: this.currentUser.id,
                name: this.currentUser.name,
              },
              hash: '#favorited-recipes'
            }"
            class="menu-link"
            >Favorite Recipes</router-link
          >
        </v-list-item>
        <v-list-item class="menu-item">
          <router-link
            :to="{
              name: 'profile',
              params: {
                userId: this.currentUser.id,
                name: this.currentUser.name,
              },
              hash: '#saved-recipes'
            }"
            class="menu-link"
            >Saved Recipes</router-link
          >
        </v-list-item>
      </v-list-item-group>
      <v-divider></v-divider>
    </div>
    <!-- <v-subheader class="menu-subheader">Account</v-subheader> -->
    <v-list-item-group>
      <v-list-item
        v-show="!this.isAuthenticated"
        class="menu-item"
        @click="navigateTo('/auth/register')"
      >
        <router-link to="/auth/register" class="menu-link"
          >Register</router-link
        >
      </v-list-item>
      <v-list-item
        v-show="!this.isAuthenticated"
        class="menu-item"
        @click="navigateTo('/auth/login')"
      >
        <router-link to="/auth/login" class="menu-link">Login</router-link>
      </v-list-item>
      <v-list-item
        v-show="this.isAuthenticated"
        class="menu-item"
        @click="logout"
      >
        <span class="menu-link">Logout</span>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
// import { mapActions } from "vuex";

export default {
  name: "profile-menu",
  // data() {
  //   return {
  //     isAuthenticated: false,
  //     currentUser: null
  //   };
  // },
  props: {
    currentUser: {
      type: Object,
      required: true
    },
    isAuthenticated: {
      type: Function,
      required: true,
    }
  },
  methods: {
    // navigateTo() {
    //   this.$router.push({
    //     name: 'profile',
    //     params: {
    //       userId: this.currentUser.id,
    //       fullname: this.currentUser.full_name,
    //       // recipes
    //     }
    //   });
    // },
    logout() {
      this.$store.commit('logout');
      location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";
.menu-subheader {
  padding: 0.25rem 0.5rem;
}
.menu-item {
  padding: 0.25rem 1rem;
  &:hover * {
    color: $app-main-color;
  }
}
.menu-link {
  color: #333333;
  text-decoration: none;
  &:hover {
    color: $app-main-color;
  }
}
</style>