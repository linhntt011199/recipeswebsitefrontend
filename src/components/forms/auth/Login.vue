<template>
  <div>
    <form @submit.prevent="submit" class="form">
      <v-text-field
        v-model.trim="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>

      <v-text-field
        v-model.trim="password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :error-messages="passwordErrors"
        label="Password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
      <p v-show="error" class="error-message">{{ error }}</p>
      <v-btn 
        type="submit" 
        class="mr-4 button" 
        color="#04b4d4" 
        :disabled="isLoading"
        :loading="isLoading" 
        @click="authenticate"
        >log in</v-btn>
    </form>
    <p v-if="showError" class="error-message">Email or Password is incorrect</p>
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "login-form",
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      showError: false
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Invalid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
    },
    authenticate() {
      axios
        .post("http://localhost:3000/authenticate", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.$store.commit('setToken', response.data.auth_token);
          this.$store.commit('setUser', response.data.user);
          this.$router.push('/');
        })
        .catch(error => {
          this.$store.commit('setErrors', error.response.data.errors);
          this.showError = true;
        })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../scss/style";
.form {
  flex-basis: 55%;
  padding: 1rem;
}
.button {
  margin: 0;
  width: 100%;
  color: $white;
}
.error-message {
  font-size: 0.85rem;
  color: $error-color;
  margin-top: 0.5rem;
  margin-bottom: 0;
  margin-left: 1rem;
}
.error {
  color: red;
}
</style>