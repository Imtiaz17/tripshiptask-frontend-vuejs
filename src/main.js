import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueHeadful from 'vue-headful';

Vue.component('vue-headful', vueHeadful);
// import './registerServiceWorker'
import { getToken, setToken, removeToken } from './utils/auth';
// import '@mdi/font/css/materialdesignicons.css'
//import 'material-icons/iconfont/material-icons.css';

window.axios = require('axios');
const $axios = axios.create({
    baseURL: 'http://localhost:8000/api',
})
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCdu3RozRNnds9nOhMTPs-ETTWLlV1C-EE',
        libraries: 'places',
    },
});
$axios.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + getToken(); // Set JWT token\
        }
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    }
);
$axios.interceptors.response.use(function(response) {
        if (response.headers.authorization !== undefined) {
            let header = response.headers.authorization.split(" ");
            let token = header[1];
            setToken(token);
        }
        if (response.headers.userstatus !== undefined && store.getters.user !== null) {
            if (response.headers.userstatus !== store.getters.user.status) {
                store.commit('Close_Progressbar')
                store.dispatch('getInfo');
            }
        }

        return response;
    },
    error => {
        // store.dispatch('logout')
        // Toast.fire({
        //     type: 'info',
        //     text: 'You have logged out of the system. Please re-login',
        // })
        return Promise.reject(error);
    },
);

window.EventBus = new Vue();

export default $axios;
Vue.prototype.$axios = $axios;
import floatLabel from './components/global/FloatingLabel.vue'
Vue.component('floatLabel', floatLabel)
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax)
//import './assets/css/bulma.min.css'
import './assets/css/core_kit.css'
import './assets/css/main.css'
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')