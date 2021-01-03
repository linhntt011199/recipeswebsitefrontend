import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue();

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('AutoLogin')
  }
}).$mount('#app')
