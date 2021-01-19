<template>
  <form @submit.prevent="submitForm" novalidate="true">
    <v-text-field
      v-model.trim="title"
      :error-messages="titleErrors"
      label="Recipe Title"
      required
      filled
      @input="$v.title.$touch()"
      @blur="$v.title.$touch()"
    ></v-text-field>

    <recipe-photo-field :recipe-name="title" @recipeImage="selectRecipeImage" />

    <div class="recipe-description">
      <p class="recipe-description-label">Recipe Description</p>
      <v-textarea
        background-color="grey lighten-3"
        solo
        v-model.trim="description"
        :error-messages="descriptionErrors"
        label="Please enter a brief description of recipe"
        required
        @input="$v.description.$touch()"
        @blur="$v.description.$touch()"
      ></v-textarea>
    </div>

    <recipe-type-field
      :action-type="actionType"
      :current-recipe-type="recipeToEdit ? recipeToEdit.recipeType : []"
      @recipeType="selectRecipeType"
    />

    <recipe-difficulty-field
      :action-type="actionType"
      :recipe-difficulty="recipeToEdit ? recipeToEdit.difficulty : ''"
      @recipeDifficulty="selectRecipeDifficulty"
    />

    <recipe-ingredients-field
      :action-type="actionType"
      :recipe-ingredients="recipeToEdit ? recipeToEdit.ingredients : []"
      @recipeIngredients="selectRecipeIngredients"
    />

    <recipe-instructions-field
      :action-type="actionType"
      :recipe-instructions="recipeToEdit ? recipeToEdit.instructions : []"
      @recipeInstructions="selectRecipeInstructions"
    />

    <v-text-field
      v-model="servings"
      :error-messages="servingsErrors"
      label="Servings"
      type="number"
      required
      filled
      @input="$v.servings.$touch()"
      @blur="$v.servings.$touch()"
    ></v-text-field>

    <fieldset class="fieldset">
      <legend class="legend">Recipe Time</legend>
      <div class="recipe-time">
        <v-text-field
          v-model="prepTime"
          type="number"
          :error-messages="prepTimeErrors"
          label="Preparation"
          required
          filled
          @input="$v.prepTime.$touch()"
          @blur="$v.prepTime.$touch()"
          class="recipe-time-prep"
        ></v-text-field>

        <v-text-field
          v-model="cookingTime"
          type="number"
          :error-messages="cookingTimeErrors"
          label="Cooking"
          required
          filled
          @input="$v.cookingTime.$touch()"
          @blur="$v.cookingTime.$touch()"
          class="recipe-time-cooking"
        ></v-text-field>
      </div>
      <span class="help-text">Please enter time in minutes</span>
    </fieldset>

    <v-checkbox
      v-model="isVegetarian"
      label="Vegetarian"
      required
      @input="$v.isVegetarian.$touch()"
      @blur="$v.isVegetarian.$touch()"
    ></v-checkbox>

    <p v-show="error" class="error">{{ error }}</p>

    <v-btn
      type="submit"
      class="mr-4 button"
      color="#04b4d4"
      :disabled="isLoading"
      :loading="isLoading"
      >{{ submitBtnLabel }}</v-btn
    >
  </form>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import axios from 'axios'
import RecipePhotoField from "./Photo";
import RecipeTypeField from "./Type";
import RecipeDifficultyField from "./Difficulty";
import RecipeIngredientsField from "./Ingredients";
import RecipeInstructionsField from "./Instructions";

const greaterThanZero = value => value > 0;
export default {
  name: "recipe-form",
  mixins: [validationMixin],
  components: {
    RecipePhotoField,
    RecipeTypeField,
    RecipeDifficultyField,
    RecipeIngredientsField,
    RecipeInstructionsField
  },
  props: {
    // Either add new recipe or update existing
    // recipe depending on this
    actionType: {
      type: String,
      required: true
    },
    recipeToEdit: {
      type: Object
    }
  },
  validations: {
    title: {
      required
    },
    description: {
      required
    },
    servings: {
      required,
      greaterThanZero
    },
    prepTime: {
      required,
      greaterThanZero
    },
    cookingTime: {
      required,
      greaterThanZero
    }
  },
  data() {
    return {
      newRecipe: {},
      updatedFields: {},
      title: this.actionType !== "add-recipe" ? this.recipeToEdit.name : "",
      image: null,
      description:
        this.actionType !== "add-recipe" ? this.recipeToEdit.description : "",
      servings:
        this.actionType !== "add-recipe" ? this.recipeToEdit.servings : 0,
      prepTime:
        this.actionType !== "add-recipe" ? this.recipeToEdit.prepTime : 0,
      cookingTime:
        this.actionType !== "add-recipe" ? this.recipeToEdit.cookingTime : 0,
      isVegetarian:
        this.actionType !== "add-recipe" ? this.recipeIsVegetarian : false,
      isLoading: false,
      error: null
    };
  },
  computed: {
    // ...mapGetters({
    //   isAuthenticated: "auth/isAuthenticated",
    //   currentUser: "users/currentUser"
    // }),
    submitBtnLabel() {
      return this.actionType === "add-recipe"
        ? "Submit Recipe"
        : "Update Recipe";
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Recipe title is required.");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required &&
        errors.push("Recipe description is required.");
      return errors;
    },

    servingsErrors() {
      const errors = [];
      if (!this.$v.servings.$dirty) return errors;
      !this.$v.servings.required &&
        errors.push("Number of servings is required.");
      !this.$v.servings.greaterThanZero &&
        errors.push("Number of servings must be greater than zero.");
      return errors;
    },

    prepTimeErrors() {
      const errors = [];
      if (!this.$v.prepTime.$dirty) return errors;
      !this.$v.prepTime.required &&
        errors.push("Preparation time is required.");
      !this.$v.prepTime.greaterThanZero &&
        errors.push("Preparation time must be greater than zero minutes.");
      return errors;
    },

    cookingTimeErrors() {
      const errors = [];
      if (!this.$v.cookingTime.$dirty) return errors;
      !this.$v.cookingTime.required &&
        errors.push("Cooking time is required.");
      !this.$v.cookingTime.greaterThanZero &&
        errors.push("Cooking time must be greater than zero minutes.");
      return errors;
    },

    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    userId() {
      return this.$store.getters.getUserId;
    }
  },
  methods: {
    // ...mapActions({
    //   addRecipe: "recipes/addRecipe",
    //   editAndUpdateRecipe: "recipes/editAndUpdateRecipe"
    // }),
    selectRecipeImage(image) {
      this.image = image;
    },
    selectRecipeType(recipeType) {
      this.newRecipe = {
        ...this.newRecipe,
        recipeType
      };
    },
    selectRecipeDifficulty(difficulty) {
      this.newRecipe = {
        ...this.newRecipe,
        difficulty
      };
    },
    selectRecipeIngredients(ingredients) {
      this.newRecipe = {
        ...this.newRecipe,
        ingredients
      };
    },
    selectRecipeInstructions(instructions) {
      this.newRecipe = {
        ...this.newRecipe,
        instructions
      };
    },
    async submitNewRecipe() {
      if (this.isAuthenticated) {
        const formData = new FormData();
        for (var i = 0; i < this.newRecipe.recipeType.length; i++) {
          formData.append('recipeType[]', this.newRecipe.recipeType[i]);
        }
        for (i = 0; i < this.newRecipe.ingredients.length; i++) {
          formData.append('ingredients[]', this.newRecipe.ingredients[i]);
        }
        for (i = 0; i < this.newRecipe.instructions.length; i++) {
          formData.append('instructions[]', this.newRecipe.instructions[i]);
        }
        formData.append('difficulty', this.newRecipe.difficulty);
        formData.append('image', this.image);
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('serving', this.servings);
        formData.append('preparation_time', this.prepTime);
        formData.append('cooking_time', this.cookingTime);
        formData.append('vegetarian', this.isVegetarian);
        formData.append('rating', 0);
        formData.append('views', 0);
        // const recipe = {
        //   ...this.newRecipe,
        //   image: this.image,
        //   title: this.title,
        //   description: this.description,
        //   serving: this.servings,
        //   preparation_time: this.prepTime,
        //   cooking_time: this.cookingTime,
        //   vegetarian: this.isVegetarian,
        //   rating: 0,
        //   views: 0,
          // user_id: this.userId,
          // ratedBy: [],
          // likedBy: [],
          // bookmarkedBy: [],
          // comments: [],
          // created_at: new Date().toLocaleString(),
          // updated_at: new Date().toLocaleString()
        // }
        for(var pair of formData.entries()) {
          console.log(pair[0]+ ', '+ pair[1]); 
        }
        console.log(formData);
        this.isLoading = true;
        const url = "http://localhost:3000/api/v1/recipes"
        const config = { headers: {
          Authorization: this.$store.getters.getToken,
        } };
        try {
          await axios.post(url, formData, config)
          .then((response) => {
            console.log(response)
            this.isLoading = false;
            this.$router.push('/recipes');
          })
          .catch(errors => {
            this.isLoading = false;
            console.log(errors);
          });
        } catch (error) {
          this.error = error;
          this.isLoading = false;
        }
      }
    },
    async submitUpdatedRecipe() {
      if (
        this.isAuthenticated &&
        this.recipeToEdit.user_id === this.userId()
      ) {
        this.updatedFields = {
          ...this.updatedFields,
          updated_at: new Date().toLocaleString()
        };
        this.isLoading = true;
        try {
          await axios.patch("http://localhost:3000/api/v1/recipes/" + this.recipeToEdit.id, {
            // headers: { Authorization: this.$store.getters.getToken },
            updatedFields: JSON.parse(JSON.stringify(this.updatedFields)),
          }).then(() => {
            this.error = null;
            this.isLoading = false;
          })
        } catch (error) {
          this.error = error;
          this.isLoading = false;
        }
      }
    },
    submitForm() {
      this.actionType === "add-recipe"
        ? this.submitNewRecipe()
        : this.submitUpdatedRecipe();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";
.recipe-description {
  &-label {
    color: $app-secondary-color;
    margin-bottom: 0.5rem;
  }
}
.help-text {
  font-size: 0.85rem;
  color: $app-secondary-color;
}
.fieldset {
  border: 1px solid rgba(0, 0, 0, 0.14);
  padding: 1rem 1rem 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.legend {
  padding: 0 0.125rem 0 0.25rem;
  color: $app-secondary-color;
}
.recipe-time {
  display: flex;
  justify-content: space-between;
  &-prep {
    margin-right: 0.5rem;
    @include mediumDevices {
      margin-right: 1rem;
    }
  }
  &-cooking {
    margin-left: 0.5rem;
    @include mediumDevices {
      margin-left: 1rem;
    }
  }
}
.error {
  color: $error-color;
  font-size: 0.85rem;
}
.button {
  color: $white;
}
</style>