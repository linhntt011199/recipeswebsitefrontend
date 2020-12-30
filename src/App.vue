<template>
  <v-app>
    <v-card
      v-scroll.self="onScroll"
      class="overflow-y-auto"
      max-height="650"
    >
    <app-navbar v-show="!displayNavAndFooter" />
    <app-main />
    <app-footer v-show="!displayNavAndFooter" />
    <v-tooltip left>
      <template v-slot:activator="{on }">
      
      <v-btn
        color="#04b4d4"
        dark
        fab
        fixed
        right
        v-show="!displayNavAndFooter"
        class="add-recipe"
        @click="addRecipe"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      </template>
      <span>Add Recipe</span>
    </v-tooltip>
    <!-- </div>
  </div> -->
    </v-card>
  </v-app>
</template>

<script>
import AppNavbar from "./components/layout/Navbar";
import AppMain from "./components/layout/Main";
import AppFooter from "./components/layout/Footer";
export default {
  name: "RecipesWebsite",
  components: {
    AppNavbar,
    AppMain,
    AppFooter
  },
  data() {
    return {
      routeName: this.$route.name,
      isAuthenticated: false
    };
  },
  watch: {
    "$route.name": {
      handler(routeName) {
        this.routeName = routeName;
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    displayNavAndFooter() {
      return this.routeName === "register" || this.routeName === "login";
    }
  },
  methods: {
    addRecipe() {
      if (!this.isAuthenticated) {
        this.$router.push("/auth/login");
      } else {
        this.$router.push("/recipes/new");
      }
    }
  }
};
</script>
<style lang="scss">
@import "./scss/style";
#app {
  font-family: $primary-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $body-color;
  letter-spacing: 1px;
}
html {
  overflow: hidden;
}

a {
  text-decoration: none;
}
p {
  margin: 0;
}
.add-recipe {
  top: 89vh;
}
</style>