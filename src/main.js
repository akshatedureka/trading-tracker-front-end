import Vue from 'vue';
import store from '@/store';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import router from './router'
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '225314601298-c3rtso3o9hpm5se1a30qoi2tu81p48cj.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app');
