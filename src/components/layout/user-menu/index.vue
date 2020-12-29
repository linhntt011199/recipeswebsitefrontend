<template>
  <v-list class="user-menu-list">
    <div v-if="isAuthenticated">
      <v-subheader class="menu-subheader">Recipes</v-subheader>
      <v-list-item-group>
        <v-list-item class="menu-item">
          <router-link
            :to="{
              name: 'profile',
              params: {
                userId: userId,
                name: userName,
              },
              hash: '#uploaded-recipes'
            }"
            class="menu-link"
            >My Recipes</router-link
          >
        </v-list-item>
        <v-list-item class="menu-item">
          <router-link
            :to="{
              name: 'profile',
              params: {
                userId: userId,
                name: userName,
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
                userId: userId,
                name: userName,
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
        v-show="!isAuthenticated"
        class="menu-item"
        @click="navigateTo('/auth/register')"
      >
        <router-link to="/auth/register" class="menu-link"
          >Register</router-link
        >
      </v-list-item>
      <v-list-item
        v-show="!isAuthenticated"
        class="menu-item"
        @click="navigateTo('/auth/login')"
      >
        <router-link to="/auth/login" class="menu-link">Login</router-link>
      </v-list-item>
      <v-list-item
        v-show="isAuthenticated"
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
  props: {
    // isAuthenticated: {
    //   type: Boolean,
    //   required: true
    // },
    currentUser: {
      type: Object
    }
  },
  methods: {
    // navigateTo() {
      // this.$router.push({
      //   name: "profile",
      //   params: {
      //     userId: this.userId,
      //     name: this.userName,
      //     // recipes
      //   }
      // });
    // },
    logout() {
      this.$store.commit('logout');
      this.$router.push('/');
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
    color: $app-color;
  }
}
.menu-link {
  color: #333333;
  text-decoration: none;
  &:hover {
    color: $app-color;
  }
}
</style>