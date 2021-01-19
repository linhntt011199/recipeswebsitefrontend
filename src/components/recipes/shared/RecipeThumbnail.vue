<template>
  <article class="recipe">
    <router-link
      :to="generateRecipeLink(recipe.recipeType.replace(' & ', '-').toLowerCase(), recipe.id)"
      class="recipe-link"
    >
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        aspect-ratio="1"
        height="225"
        max-height="275"
        :src="'http://localhost:3000' + recipe.image"
        :alt="recipe.title"
        class="recipe-image"
      />
      <div class="recipe-info">
        <p class="recipe-name">{{ recipe.title }}</p>
        <p class="recipe-desc">{{ truncatedDescription }}</p>
        <!-- <p class="recipe-type">{{ recipe.recipeType.replace(/[^a-zA-Z ]/g, '').toUpperCase() }}</p> -->
        <p class="recipe-added-at">
          by
          <router-link
            :to="{
              name: 'profile',
              params: {
                userId: recipe.userId,
                fullname: recipe.user_name
              }
            }"
            class="recipe-by"
            >{{ recipe.user_name }}</router-link
          >
          <!-- {{ timeSinceRecipeAddition }} -->
        </p>
      </div>
    </router-link>
  </article>
</template>

<script>
import moment from "moment";

export default {
  name: "recipe-thumbnail",

  props: {
    recipe: {
      type: Object,
      required: true
    }
  },

  computed: {
    truncatedDescription() {
      const limit = 120;

      return this.recipe.description.slice(0, limit) + "...";
    },

    timeSinceRecipeAddition() {
      const formattedDate = date => new Date(date).toLocaleDateString();

      return moment(formattedDate(this.recipe.created_at), "MM/DD/YYYY").fromNow();
    }
  },

  methods: {
    generateRecipeLink(recipeTypes, recipeId) {
      // const index = Math.floor(Math.random() * recipeTypes.length);

      // const recipeType = encodeURI(recipeTypes[index]);
      const recipeType = encodeURI(recipeTypes);

      return `/recipes/${recipeType}/${recipeId}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";

.recipe {
  border-bottom: 1px solid #cdcdcd;
  padding-bottom: 0.75rem;

  @include mediumDevices {
    border-bottom: none;
  }

  &-link {
    text-decoration: none;
    color: $black;
  }

  &-info {
    margin-top: 0.5rem;
  }

  &-name {
    color: $app-main-color;
    font-weight: 700;
    text-transform: uppercase;
  }

  &-desc {
    color: lighten($black, 55%);
    font-size: 0.85rem;
    margin: 0.5rem 0;
  }

  &-added-at {
    font-size: 0.75rem;
  }

  &-by {
    color: $app-main-color;
    text-decoration: none;
    font-weight: 700;
  }
}
</style>
