import Vue from 'vue'
import App from './App.vue'
import router from './router'
import DataTable from '@andresouzaabreu/vue-data-table'
import Vuex from 'vuex'
import store  from  './store/index.js'
import axios from "axios";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

Vue.use(VueToast,{
    duration: 3000,
    position: 'top'
});
Vue.config.productionTip = false
Vue.component("data-table", DataTable)
Vue.use(Vuex)

const  token  =  localStorage.getItem('token') || store.state.token;
if (token) {
    axios.defaults.headers.common['Authorization'] = "Token " + token;
}

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        let errorResponse = error.response;
        if (errorResponse.status === 401 && errorResponse.config && !errorResponse.config.__isRetryRequest) {
            store.dispatch('logout')
            .then(e => {
                console.log(e)
                router.push({ name: 'Login'})
            })
            .catch(e => {
                console.log(e);
            })
        }
        return Promise.reject(error);
    }
);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
