import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth_token: localStorage.getItem('token') || '',
    user: {},
    recipeList: [],
    errors: ''
  },

  mutations: {
    setToken(state, token) {
      state.auth_token = token;
      localStorage.setItem('auth_token', token);
    },

    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', user);
    },

    setErrors(state, errors) {
      state.errors = errors;
    },

    logout(state) {
      state.auth_token = '';
      state.user = {};
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    },
    setRecipeList(state, recipeList) {
      state.recipeList = recipeList;
      localStorage.setItem('recipeList', recipeList);
    }
  },

  getters: {
    user (state) {
      return state.user
    },
    getToken(state) {
      return state.auth_token;
    },

    isAuthenticated(state) {
      return !!state.auth_token;
    },

    getUserId(state) {
      return state.user.id;
    },

    getUserName(state) {
      return state.user.name;
    },

    getErrors(state) {
      return state.errors;
    },
    recipeList (state) {
      return state.recipeList;
    }
  },
  actions : {
    // login({commit}, user){
    //   return new Promise((resolve, reject) => {
    //     commit('auth_request')
    //     axios({url: 'http://localhost:3000/authenticate', data: user, method: 'POST' })
    //     .then(response => {
    //       const token = response.data.token
    //       const user = response.data.user
    //       localStorage.setItem('token', token)
    //       axios.defaults.headers.common['Authorization'] = token
    //       commit('auth_success', token, user)
    //       resolve(response)
    //     })
    //     .catch(err => {
    //       commit('auth_error')
    //       localStorage.removeItem('token')
    //       reject(err)
    //     })
    //   })
    // },
    AutoLogin ({commit}) {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        return
      }
      const user = localStorage.getItem('user')
      const auth_token = localStorage.getItem('auth_token')
      commit('setToken', auth_token)
      commit('setUser', user)
    }
  }
});