<template>
  <div class="home-page">
    <spinner v-if="isLoading" message="Loading Recipes" :size="50" />
    <p v-else-if="error">{{ error }}</p>
    <div v-else>
      <div v-if="recipeList.length === 0" class="empty-recipe-list">
        Oops! Something went wrong
      </div>
      <div v-else class="home-content"> -->
        <div class="recipe-of-the-day-and-new-additions">
          <recipe-of-the-day :recipe-of-the-day="getRandomRecipe(recipeList)" />
          <newest-additions :recipe-list="recipeList" />
        </div>
        <v-divider class="divider" />
        <recipe-types />
        <v-divider class="divider" />
        <highest-rated-recipes :recipe-list="recipeList" />
        <v-divider class="divider" />
        <most-viewed-recipes :recipe-list="recipeList" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { mapGetters, mapActions} from "vuex";
import Spinner from "@/components/shared/Spinner";
import RecipeOfTheDay from "@/components/home/RecipeOfTheDay";
import NewestAdditions from "@/components/home/NewestAdditions";
import RecipeTypes from "@/components/home/RecipeTypes";
import HighestRatedRecipes from "@/components/home/HighestRatedRecipes";
import MostViewedRecipes from "@/components/home/MostViewedRecipes";
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
      isLoading: false,
      error: null
    };
  },
};
</script>

<style lang="scss">
@import "../scss/style";
.home-page {
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  @include mediumDevices {
    margin: 2rem 5rem;
  }
  @include largeDevices {
    margin: 2rem 8.5rem;
  }
}
</style>