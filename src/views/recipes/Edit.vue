<template>
  <div class="edit-recipe-page">
    <h2 class="edit-recipe-title edit-recipe-title--large">
      Update Your Recipe
    </h2>
    <v-card class="mx-auto edit-recipe-card">
      <!-- <h2 class="edit-recipe-title edit-recipe-title--mobile">
        Update Your Recipe
      </h2> -->
      <recipe-form action-type="edit-recipe" :recipe-to-edit="recipe" />
    </v-card>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import axios from "axios";
// import Breadcrumbs from "@/components/shared/Breadcrumbs";
import RecipeForm from "@/components/forms/recipe";
export default {
  name: "edit-recipe-page",
  components: {
    RecipeForm,
    // Breadcrumbs
  },
  data() {
    return {
      recipeId: this.$route.params.recipeId
    };
  },
  computed: {
    // ...mapGetters({ recipe: "recipes/recipe" }),
    breadcrumbLinks() {
      return [
        {
          name: "Recipes",
          path: "/recipes"
        },
        {
          name: this.recipe.recipeType.replace(/["[\] ]/g, '').split(',')[0],
          path: `/recipes/${this.recipe.recipeType.replace(/["[\] ]/g, '').split(',')[0]}`
        },
        {
          name: this.recipe.title,
          path: `/recipes/${this.recipe.recipeType.replace(/["[\] ]/g, '').split(',')[0]}/${this.recipe.id}`
        },
        {
          name: "Edit Recipe",
          path: ""
        }
      ];
    }
  },
  watch: {
    "$route.params.recipeId"(id) {
      this.recipeId = id;
    }
  },
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
.edit-recipe {
  &-page {
    min-height: 100vh;
    background: linear-gradient(rgba(13, 41, 60, 0.95), rgba(13, 41, 60, 0.95)),
      url("../../assets/images/register-background.jpg");
    background-size: cover;
    background-position: center;
    @include mediumDevices {
      padding: 2rem 3.5rem;
    }
    @include largeDevices {
      padding: 2rem 8.5rem;
    }
  }
  &-title {
    color: $app-main-color;
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
    &--mobile {
      @include mediumDevices {
        display: none;
      }
    }
    &--large {
      display: none;
      @include mediumDevices {
        display: block;
      }
    }
  }
  &-card {
    max-width: 40rem;
    border-radius: 0 !important;
    padding: 2rem;
  }
}
</style>