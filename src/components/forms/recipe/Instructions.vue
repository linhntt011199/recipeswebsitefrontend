<template>
  <div class="instructions">
    <p class="instructions-label">Instructions</p>

    <p class="help-text">Please enter instructions in order</p>

    <form @submit.prevent="addInstruction" class="instruction-form">
      <v-text-field
        v-model="instruction"
        append-icon="mdi-plus"
        label="Enter Instructions"
        required
        filled
        :error-messages="instructionErrors"
        @input="$v.instruction.$touch()"
        @blur="$v.instruction.$touch()"
      ></v-text-field>
    </form>

    <v-list dense v-show="instructions.length > 0" class="instructions-preview">
      <v-list-item
        v-for="(instruction, index) in instructions"
        :key="index"
        class="instruction-list-item"
      >
        <v-list-item-content>
          <v-list-item-title v-text="instruction"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon @click="removeInstruction(instruction)">
          <v-icon class="instruction-list-cancel">mdi-close-circle</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  name: "instructions-field",

  mixins: [validationMixin],
  props: {
    actionType: {
      type: String,
      required: true
    },
    recipeInstructions: {
      type: Array
    }
  },

  validations: {
    instruction: {
      required
    }
  },
  data() {
    return {
      instruction: "",
      instructions:
        this.actionType !== "add-recipe" ? this.recipeInstructions : []
    };
  },

  computed: {
    instructionErrors() {
      const errors = [];
      if (!this.$v.instruction.$dirty) return errors;
      !this.$v.instruction.required &&
        errors.push("Recipe instruction is required.");
      return errors;
    }
  },
  methods: {
    addInstruction() {
      const { instruction, instructions } = this.$data;
      if (instruction) {
        instructions.push(instruction.trim());
        this.$emit("recipeInstructions", this.instructions);
        this.instruction = "";
      }
    },
    removeInstruction(instruction) {
      this.instructions.splice(this.instructions.indexOf(instruction), 1);
      this.$emit("recipeInstructions", this.instructions);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";
.instructions {
  &-label {
    color: $app-secondary-color;
  }
  &-preview {
    max-height: 10rem;
    overflow: auto;
  }
}
.instruction {
  &-form {
    display: flex;
  }
  &-list {
    &-item {
      margin-bottom: 0.5rem;
      padding: 0 0.75rem;
      background-color: #efefef;
    }
    &-cancel {
      cursor: pointer;
      &:hover {
        color: $error-color;
      }
    }
  }
}
.help-text {
  font-size: 0.85rem;
  color: #333333;
  margin-bottom: 0.5rem;
}
</style>