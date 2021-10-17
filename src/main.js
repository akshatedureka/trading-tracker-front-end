import Vue from 'vue';
import store from './store';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import router from './router'
import GAuth from 'vue-google-oauth2'
import axios from "axios";

axios.defaults.withCredentials = true;
axios.interceptors.request.use((request) => {
  //request.headers['Access-Control-Allow-Origin'] = '*';
  //request.headers['Access-Control-Allow-Credentials'] = true;
  request.headers.common.Authorization = `Bearer ${store.state.user.token}`;
  request.headers.common.From = store.state.user.id;
  request.headers['email'] = store.state.user.email;
  //console.log(request);

  //let params = new URLSearchParams();
  //params.append('user', 'Test');
  //request.params = params;
  return request;
})

/* export function jwtInterceptor() {
  axios.interceptors.request.use(request => {
      // add auth header with jwt if account is logged in and request is to the api url
      const account = accountService.accountValue;
      const isLoggedIn = account?.token;
      const isApiUrl = request.url.startsWith(process.env.VUE_APP_API_URL);

      if (isLoggedIn && isApiUrl) {
          request.headers.common.Authorization = `Bearer ${account.token}`;
      }

      return request;
  });
} */

const gauthOption = {
  clientId: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
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
