<template>
  <v-card class="recipe-info">
    <div class="info">
      <p class="info-label">Difficulty</p>
      <p class="info-value">{{ difficulty }}</p>
    </div>
    <div class="info">
      <p class="info-label">Yield</p>
      <p class="info-value">{{ recipe.serving }}</p>
    </div>
    <div class="info">
      <p class="info-label">Prep Time</p>
      <p class="info-value">{{ convertMinToHrs(recipe.preparation_time) }}</p>
    </div>
    <div class="info">
      <p class="info-label">Cooking Time</p>
      <p class="info-value">{{ convertMinToHrs(recipe.cooking_time) }}</p>
    </div>
    <div class="info">
      <p class="info-label">Total Time</p>
      <p class="info-value">{{ totalTime }}</p>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "recipe-info",
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  computed: {
    totalTime() {
      const totalMinutes =
        Number(this.recipe.preparation_time) + Number(this.recipe.cooking_time);
      return this.convertMinToHrs(totalMinutes);
    },
    difficulty() {
      const firstLetter = this.recipe.difficulty[0].toUpperCase();
      return `${firstLetter}${this.recipe.difficulty.slice(1)}`;
    }
  },
  methods: {
    convertMinToHrs(time) {
      let totalTimeMsg = "";
      if (time < 60) {
        totalTimeMsg = `${time} min`;
      } else {
        const hrs = Math.floor(time / 60);
        const min = time % 60;
        totalTimeMsg = `${hrs} hr${hrs > 1 ? "s" : ""} ${min} min`;
      }
      return totalTimeMsg;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";
.recipe-info {
  padding: 1rem;
  border-bottom: 1px solid lighten($black, 90%);
  border-radius: 0 !important;
  @include mediumDevices {
    display: flex;
    justify-content: space-between;
    width: 40rem;
    margin: auto;
    border-bottom: none;
  }
}
.info {
  text-align: center;
  font-size: 0.85rem;
  background-color: transparent !important;
  border-color: transparent !important;
  display: flex;
  @include mediumDevices {
    flex-direction: column;
    font-size: 0.75rem;
  }
  &-label,
  &-value {
    margin-bottom: 0;
  }
  &-label {
    font-weight: 700;
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
    color: $app-secondary-color;
    @include mediumDevices {
      margin-right: 0;
    }
  }
  &-value {
    color: lighten($black, 40%);
  }
}
</style>