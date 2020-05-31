import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './registerServiceWorker'
import { getToken, setToken, removeToken } from './utils/auth';
// import '@mdi/font/css/materialdesignicons.css'
import 'material-icons/iconfont/material-icons.css';

window.axios = require('axios');
const $axios = axios.create({
  baseURL: 'https://dev.tripshiptask.com/api',
 })
$axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + getToken(); // Set JWT token
    }
    return config;
  },
  error => {
    console.log(error); 
    Promise.reject(error);
  }
);
window.EventBus = new Vue();

export default $axios;
Vue.prototype.$axios = $axios;
import floatLabel from './components/global/FloatingLabel.vue'
Vue.component('floatLabel',floatLabel)
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax)
//import './assets/css/core_blue.css'
// import './assets/css/bulma.min.css'
//import './assets/css/core_lemonade.css'
import './assets/css/core_kit.css'
import './assets/css/main.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
