import Vuex from 'vuex';
import Vue from 'vue';
import Cookies from 'js-cookie'
import $axios from '../main';
import { getToken, setToken, removeToken } from '../utils/auth';
import VuexPersist  from 'vuex-persist'
import trip from './modules/trip'
import ship from './modules/ship'
import task from './modules/task'
import router from '../router'
import transaction from './modules/transaction'
Vue.use(Vuex)
const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage,
   reducer: (state) => ({
      user: state.user,
      id: state.id
  })
 
})
export default new Vuex.Store({

    state: {
        user: null,
        id: null,
        tokenExist: !!getToken()

    },

    getters: {
        id: state => state.id,
        user: state => state.user,
        loggedIn: state => state.tokenExist,
        trips: state => state.trip.trips,
        seektrips: state => state.trip.seektrips,
        isLoading: state => state.trip.isLoading,
        sendlisting: state => state.ship.sendlisting,
        carrylisting: state => state.ship.carrylisting,
        isSLoading: state => state.ship.isSLoading,
        offerTaskListing: state => state.task.offertasks,
        seekTaskListing: state => state.task.seektasks,
        isTLoading: state => state.task.isTLoading,
        categories: state => state.task.categories,
        mytasks: state => state.task.mytasks,
        mytrips: state => state.trip.mytrips,
        myships: state => state.ship.myships,
        vehicles: state => state.trip.vehicles,
        transactions: state => state.transaction.transactions,
    },

    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        FETCH_USER_SUCCESS(state, user) {
            state.user = user.data
            state.id = user.data.id
            state.tokenExist=true
        },
        Remove_User(state) {
            state.user = null
            state.id = null
            state.tokenExist=false
        },

    },
    plugins: [vuexLocalStorage.plugin],
    actions: {
        getInfo({commit,state}){
              $axios.post('auth/loggedinuser')
               .then((res) => {
                    commit('FETCH_USER_SUCCESS', res.data.data)
                })
        },

        saveToken({ commit, dispatch }, { token }) {
            Cookies.set('token', token)
            $axios.post('auth/loggedinuser')
                .then((res) => {
                    commit('SET_TOKEN',token)
                    commit('FETCH_USER_SUCCESS', res.data)
                     router.push('/trip')
                })
        },
        // logout({ commit, state }) {
        //     return new Promise((resolve, reject) => {
                
        //             .then(() => {
        //                 Cookies.remove('token');
        //                 commit('Remove_User')
                       
        //             })
        //     })
        // },
    },
    modules: {
        trip,
        ship,
        task,
        transaction,
    },

})
