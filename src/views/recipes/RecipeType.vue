<template>
  <div class="recipe-type-page">
    <recipe-type-header :recipe-type-info="recipeTypeInfo[0]" />
    <div class="recipe-type-main">
      <breadcrumbs :breadcrumb-links="breadcrumbLinks" />
      <div class="recipe-type-separator"></div>
      <div v-if="isLoading" class="spinner">
        <spinner
          :message="`Loading ${recipeTypeInfo[0].name} Recipes`"
          :size="50"
        />
      </div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-if="recipeListByType.length === 0" class="empty-recipe-list">
          There are currently no {{ recipeType }} recipes in the database
        </div>
        <recipe-list
          v-else
          :recipe-list="recipeListByType"
          :recipe-type="recipeType"
        />
        <!-- <div v-if="recipeList.length === 0" class="empty-recipe-list">
          There are currently no {{ recipeType }} recipes in the database
        </div>
        <recipe-list
          v-else
          :recipe-list="recipeList"
          :recipe-type="recipeType"
        />  -->
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Spinner from "@/components/shared/Spinner";
import RecipeList from "@/components/recipes/shared/RecipeList";
import RecipeTypeHeader from "@/components/recipes/type/Header";
import { recipeTypeList } from "@/helpers";
import axios from "axios";
export default {
  name: "recipe-type-page",
  components: {
    RecipeTypeHeader,
    Breadcrumbs,
    Spinner,
    RecipeList
  },
  data() {
    return {
      recipeType: this.$route.params.recipeType,
      isLoading: false,
      error: null,
      recipeList: [],
    };
  },
  computed: {
    // ...mapGetters({ recipeListByType: "recipes/recipeListByType" }),
    recipeListByType() {
      return this.recipeList;
    },
    recipeTypeInfo() {
      return recipeTypeList.filter(
        recipeType => recipeType.path === this.recipeType
      );
    },
    breadcrumbLinks() {
      return [
        {
          name: "Recipes",
          path: "/recipes"
        },
        {
          name: this.recipeType + "(" + this.recipeList.length + ")",
          path: ""
        }
      ];
    }
  },
  // methods: {
  //   ...mapActions({ getRecipesByType: "recipes/getRecipesByType" })
  // },
  // async created() {
  //   this.isLoading = true;
  //   try {
  //     await this.getRecipesByType({ recipeType: this.recipeType });
  //     this.isLoading = false;
  //   } catch (error) {
  //     this.error = error;
  //     this.isLoading = false;
  //   }
  // }
  async created() {
    // if (this.recipeList.length === 0) {
      this.isLoading = true;

      try {
          await axios.get("http://localhost:3000/api/v1/recipes/sortByType?recipeType=" + this.recipeType)
          .then(response => this.recipeList = response.data) 
          .catch(e => e);
          this.isLoading = false;
      } catch (error) {
          this.error = error;
          this.isLoading = false;
      }
    // }
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";
.recipe-type {
  &-separator {
    margin-bottom: 2rem;
  }
  &-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 1rem;
    margin: 1rem;

    &--loading {
      justify-content: center;
      align-items: center;
    }

    @include mediumDevices {
      margin: 0 5rem 2rem;
    }
    @include largeDevices {
      margin: 0 8.5rem 2rem;
    }
  }
}
.spinner {
  margin-top: 10.5rem;
}
</style>