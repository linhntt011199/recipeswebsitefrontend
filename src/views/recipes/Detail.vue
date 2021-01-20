<template>
  <div
    class="recipe-detail-page"
    :class="{ 'recipe-detail-page--loading': isLoading }"
  >
    <spinner v-if="isLoading" message="Loading Recipe" :size="50" />
    <p v-else-if="error">{{ error }}</p>
    <div v-else>
      <p v-if="!recipe" class="no-recipe">No such recipe in database</p>
      <template v-else>
        <breadcrumbs :breadcrumb-links="breadcrumbLinks" />
        <h2 class="recipe-name">
          {{ recipe.title }}
          <span v-if="currentUser && currentUser.id === recipe.user_id">
            <router-link :to="`${fullPath}/edit`">
              <i class="far fa-edit recipe-edit" aria-label="Edit recipe"></i>
            </router-link>
            <delete-recipe :recipe-name="recipe.title" />
          </span>
        </h2>
        <!-- <p v-if="recipe.ratedBy.length > 0" class="recipe-rating">
          Rated
          <span class="recipe-rating-value">{{ recipeRating }}</span
          >/5 by {{ recipe.ratedBy.length }}
          {{ recipe.ratedBy.length === 1 ? "person" : "people" }}
        </p> -->
        <p class="recipe-views">
          <em
            >(Viewed {{ recipe.views }} time{{
              recipe.views === 1 ? "" : "s"
            }})</em
          >
        </p>
        <recipe-image
          :current-user="currentUser"
          :image-url="'http://localhost:3000' + recipe.image"
        />

        <recipe-info :recipe="recipe" />

        <rate-recipe v-if="currentUser" :rated-by="recipe.ratedBy" />

        <posted-by :posted-by="recipe.user_id" >
        </posted-by>

        <div class="ingredients-and-instructions">
          <ingredients :ingredients="recipe.ingredients" />
          <instructions :instructions="recipe.instructions" />
        </div>

        <!-- <div class="comments-and-similar"> -->
          <div class="comments">
            <h3 class="comments-title">Comments</h3>
            <comment-form />
            <comment-list :comment-list="recipe.comments" />
          </div>
          <!-- <div class="similar-recipes">
            <similar-recipes />
          </div> -->
        <!-- </div> -->
      </template>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Spinner from "@/components/shared/Spinner";
import RecipeImage from "@/components/recipes/detail/RecipeImage";
import RecipeInfo from "@/components/recipes/detail/RecipeInfo";
import RateRecipe from "@/components/recipes/detail/RateRecipe";
import PostedBy from "@/components/recipes/detail/PostedBy";
import Ingredients from "@/components/recipes/detail/Ingredients";
import Instructions from "@/components/recipes/detail/Instructions";
import CommentList from "@/components/recipes/detail/CommentList";
// import SimilarRecipes from "@/components/recipes/detail/SimilarRecipes";
import CommentForm from "@/components/forms/comment";
import { calculateRecipeRating } from "@/helpers";
export default {
  name: "recipe-detail-page",
  components: {
    Breadcrumbs,
    Spinner,
    RecipeImage,
    RecipeInfo,
    RateRecipe,
    PostedBy,
    Ingredients,
    Instructions,
    CommentForm,
    CommentList,
    // SimilarRecipes
  },
  data() {
    return {
      recipeId: this.$route.params.recipeId,
      fullPath: this.$route.fullPath,
      isLoading: false,
      error: null
    };
  },
  computed: {
    // ...mapGetters({
    //   currentUser: "users/currentUser",
    //   recipe: "recipes/recipe"
    // }),
    recipeRating() {
      return calculateRecipeRating(this.recipe.ratedBy);
    },
    breadcrumbLinks() {
      return [
        {
          name: "Recipes",
          path: "/recipes"
        },
        {
          name: this.recipe.recipeType.replace(/[^a-zA-Z ]/g, '').split(' ')[0],
          path: `/recipes/${this.recipe.recipeType.replace(/[^a-zA-Z ]/g, '').split(' ')[0]}`
        },
        {
          name: this.recipe.title,
          path: ""
        }
      ];
    },
    currentUser() {
      return this.$store.getters.getUser;
    }
  },
  watch: {
    "$route.params.recipeId"(id) {
      this.recipeId = id;
    }
  },
  // methods: {
    // ...mapActions({
    //   getRecipeById: "recipes/getRecipeById",
    //   incrementRecipeViews: "recipes/incrementRecipeViews"
    // })
  // },
  async created() {
    if (!this.recipe || this.recipe.id !== this.recipeId) {
      this.isLoading = true;
      const url = "http://localhost:3000/api/v1/recipes/" + this.recipeId;
      try {
        await axios.get(url)
        .then(response => {
          this.isLoading = false;
          this.recipe = response.data;
          this.recipe.ingredients = this.recipe.ingredients.replace(/["[\]]/g, '').split(',')
          this.recipe.instructions = this.recipe.instructions.replace(/["[\]]/g, '').split(',')
        })
        .catch(e => e);
        await axios.patch(url, {
          views: this.recipe.views + 1
        })
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";
.recipe {
  display: flex;
  flex-direction: column;
  flex: 1;
  &-detail {
    &-page {
      display: flex;
      flex-direction: column;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      min-height: 50vh;
      &--loading {
        justify-content: center;
        align-items: center;
      }
      @include mediumDevices {
        margin: 2rem 3.5rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
      @include largeDevices {
        margin: 2rem 8.5rem;
      }
    }
  }
  &-name {
    text-align: center;
    margin: 0.5rem 0 0.5rem;
    font-size: 1.25rem;
    @include mediumDevices {
      margin: 1.5rem 0 0.75rem;
      font-size: 1.5rem;
    }
  }
  &-edit {
    color: #05a20a;
    font-size: 1.25rem;
    margin-left: 0.5rem;
  }
  &-rating,
  &-views {
    text-align: center;
    font-size: 0.85rem;
  }
  &-rating {
    margin: 0 0 0.5rem;
    &-value {
      color: $app-main-color;
      font-weight: 600;
    }
  }
}
.ingredients-and-instructions {
  margin-top: 1rem;
  @include mediumDevices {
    display: flex;
    justify-content: space-between;
  }
}
.comments-and-similar {
  display: flex;
  flex-direction: column;
  @include mediumDevices {
    justify-content: space-between;
    flex-direction: row;
    margin: 1rem;
  }
}
.comments {
  background-color: #efefef;
  padding: 1rem;
  @include mediumDevices {
    flex-basis: 50%;
  }
  &-title {
    color: $app-secondary-color;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
}
.similar-recipes {
  padding: 1rem;
  @include mediumDevices {
    flex-basis: 45%;
    padding: 0 0 0 2rem;
  }
}
</style>