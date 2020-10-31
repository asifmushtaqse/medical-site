import Vue  from  'vue'
import Vuex  from  'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
export  default  new  Vuex.Store({
    state: {
        token:  localStorage.getItem('token') ||  '',
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        baseUrl: process.env.VUE_APP_API_URL,
        homeUrl: process.env.VUE_APP_HOME_URL,
        monthNames: ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
    },
    mutations: {
        auth_success(state, {token, currentUser}){
            state.token = token
            state.currentUser = currentUser
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = "Token " + token;
        },
        logout(state){
            state.token = ''
            state.currentUser = ''
            localStorage.removeItem('token')
            localStorage.removeItem('currentUser')
            delete axios.defaults.headers.common['Authorization']
        },
    },
    actions: {
        login({commit, state}, payload){
            console.log(payload)
            return new Promise((resolve, reject) => {
                axios.post(state.homeUrl + 'api-token-auth/', payload)
                    .then(function (response) {
                        const data = JSON.parse(JSON.stringify(response.data));
                        console.log(response.data)
                        console.log(data.user)
                        commit('auth_success', {
                            token: data.token,
                            currentUser: data.user
                        });
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        },
        logout({commit}){
            return new Promise((resolve, reject) => {
                commit('logout')
                resolve()
                reject()
            })
        },
        list_request({state}, {endpoint}){
            return new Promise((resolve, reject)=>{
                axios.get(state.baseUrl + endpoint)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        },
        view_request({state}, {endpoint, id}){
            return new Promise((resolve, reject)=>{
                axios.get(state.baseUrl + endpoint + "/" + id)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        },
        add_request({state}, {endpoint, payload, meta}){
            return new Promise((resolve, reject)=>{
                axios.post(state.baseUrl + endpoint, payload, meta)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        },
        delete_request({state}, {endpoint, id}){
            return new Promise((resolve, reject)=>{
                axios.delete(state.baseUrl + endpoint + "/" + id)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        },
        update_request({state}, {endpoint, payload, meta}){
            return new Promise((resolve, reject)=>{
                axios.put(state.baseUrl + endpoint, payload, meta)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        },
    },
    getters : {
        isAdmin: state => state.currentUser.is_superuser,
        isActive: state => state.currentUser.is_active,
        isStaff: state => state.currentUser.is_staff,
        isAdminOrStaff: (state, getters) => getters.isAdmin || getters.isStaff,
        getMonthNames: state => state.monthNames,
        currentUser: state => state.currentUser
    }
});