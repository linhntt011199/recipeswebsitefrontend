<template>
  <div class="home-page">
    <spinner v-if="isLoading" message="Loading Recipes" :size="50" />
    <p v-else-if="error">{{ error }}</p>
    <div v-else>
      <!-- <div v-if="!authenticate"> -->
        <div v-if="recipeList.length === 0" class="empty-recipe-list">
            Oops! Something went wrong
        </div>
        <div v-else class="home-content">
          <!-- Edit from here -->
          <!-- <div class="columns" v-for="recipe in recipeList" :key="recipe.id">
              <div class="title is-4 has-text-centered">
                <div class="has-text-weight-semibold">
                  {{ recipe.title }}
                </div>
                <div class="has-text-weight-semibold"> Added by
                  {{ recipe.user_name }} || {{ recipe.created_at | moment("from") }}.
                </div>
                <br>
              </div>
          </div> -->
          <div class="recipe-of-the-day-and-new-additions">
            <recipe-of-the-day :recipe-of-the-day="getRandomRecipe(recipeList)" />
            <newest-additions/>
          </div>
          <v-divider class="divider" />
          <recipe-types />
          <v-divider class="divider" />
          <highest-rated-recipes />
          <v-divider class="divider" />
          <most-viewed-recipes /> 
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { mapGetters, mapActions} from "vuex";
import Spinner from "@/components/shared/Spinner";
import axios from "axios";
import RecipeOfTheDay from '../components/home/RecipeOfTheDay.vue';
import NewestAdditions from '../components/home/NewestAdditions.vue';
import RecipeTypes from '../components/home/RecipeTypes.vue';
import HighestRatedRecipes from '../components/home/HighestRatedRecipes.vue';
import MostViewedRecipes from '../components/home/MostViewedRecipes.vue';
export default {
  name: "home-page",

  components: {
    Spinner,
    RecipeOfTheDay,
    NewestAdditions,
    RecipeTypes,
    HighestRatedRecipes,
    MostViewedRecipes
  },

  data() {
    return {
      recipeList: [],
      isLoading: false,
      error: null,
    };
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },

  // filters: {
  //   moment: function (date) {
  //     return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  //   }
  // },

  methods: {
    // ...mapActions({
    //   getRecipes: "recipes/getRecipes"
    // }),
    getRandomRecipe(recipeList) {
      const randomIndex = Math.floor(Math.random() * recipeList.length);

      return recipeList[randomIndex];
    },
  },

  async created() {
    if (this.recipeList.length === 0) {
      this.isLoading = true;

      try {
        await axios.get("http://localhost:3000/api/v1/recipes", {
          headers: { Authorization: this.$store.getters.getToken }
        })
        .then(response => {
          this.recipeList = response.data
          this.$store.commit('setRecipeList', response.data);
        }) 
        .catch(e => e);

        this.isLoading = false;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss">
//@import "../assets/styles/custom/style";
@import "../scss/style";

.home-page {
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;

  @include mediumDevices {
    margin: 2rem 3.5rem;
  }

  @include largeDevices {
    margin: 2rem 8.5rem;
  }
}
.recipe-of-the-day-and-new-additions {
  display: flex;
  margin-bottom: 2rem;
}
</style>
