<template>
  <section class="recipe-of-the-day">
    <img
      :src="'http://localhost:3000' + recipeOfTheDay.image"
      :alt="recipeOfTheDay.title"
      class="image"
    />
    <p class="recipe-title">Recipe of the day</p>
    <p class="recipe-name">
      <router-link
        :to="`/recipes/${recipeOfTheDay.recipeType.replace(/[^a-zA-Z ]/g, '').split(' ')[0]}/${recipeOfTheDay.id}`"
        class="recipe-link"
        >{{ recipeOfTheDay.title }}</router-link
      ></p>
    <div class="recipe-added-by">
      <span>by</span>
      <router-link
        :to="{
          name: 'profile',
          params: {
            userId: recipeOfTheDay.user_id,
            fullname: recipeOfTheDay.user_name
          }
        }"
        class="recipe-added-by-link"
      >
        <img
          :src="
            this.user.avatar || require('@/assets/images/user.png')
          "
          :alt="recipeOfTheDay.user_name"
          class="recipe-added-by-image"
        />
        <span class="recipe-added-by-name">{{
          recipeOfTheDay.user_name
        }}</span>
      </router-link>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "recipe-of-the-day",
  data() {
    return {
      user: {},
      error: null,
    };
  },
  props: {
    recipeOfTheDay: {
      type: Object,
      required: true
    }
  },
  async created() {
    const url = "http://localhost:3000/api/v1/users/" + this.recipeOfTheDay.user_id;
    try {
      await axios.get(url)
      .then((response) => {
        this.user = response.data;
        if (response.data.avatar) this.user.avatar = 'http://localhost:3000' + response.data.avatar;
      })
      .catch(error => {
        this.error = error;
      });
    } catch (error) {
      this.error = error;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/style";
.recipe-of-the-day {
  flex-basis: 100%;
  @include largeDevices {
    flex-basis: 70%;
    margin-right: 2rem;
  }
}
.image {
  width: 100%;
  height: 17.5rem;
  @include mediumDevices {
    height: 27.5rem;
  }
  @include largeDevices {
    height: auto;
  }
}
.recipe {
  &-title,
  &-name,
  &-type {
    margin: 0;
    font-weight: 600;
  }
  &-title,
  &-type {
    text-transform: uppercase;
  }
  &-title {
    font-size: 1rem;
    margin-top: 0.5rem;
    color: $app-secondary-color;
    @include mediumDevices {
      font-size: 1.25rem;
      margin-top: 1rem;
    }
  }
  &-name {
    display: flex;
    font-size: 1.5rem;
    color: #333333;
    @include mediumDevices {
      font-size: 2rem;
    }
  }
  &-added-by {
    display: flex;
    align-items: center;
    &-link {
      text-decoration: none;
      display: flex;
      align-items: center;
      color: #333333;
      margin-left: 0.5rem;
      &:hover {
        color: $app-main-color;
      }
    }
    &-image {
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 50%;
    }
    &-name {
      margin-left: 0.5rem;
    }
  }
}
</style>