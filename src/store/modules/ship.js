import store from '../index';
import $axios from '../../main';
const state = {
    page: 1,
    spage: 1,
    sendlisting: [],
    carrylisting: [],
    myships: [],
    isSLoading: false
};

const mutations = {
    SET_SLISTING: (state, data) => {
        state.sendlisting = data;
    },
    SET_CLISTING: (state, data) => {
        state.carrylisting = data;
    },
    SET_MYSHIPS: (state, data) => {
        state.myships = data;
    }
}

const actions = {
    getSendLiting({ commit, state }) {
        state.isSLoading = true
        $axios.get('sendpackage?page=' + state.page)
            .then(response => {
                commit('SET_SLISTING', response.data);
                state.isSLoading = false
            });

    },
    getCarryListing({ commit, state }) {
        $axios.get('carrypackage?page=' + state.spage)
            .then(response => {
                commit('SET_CLISTING', response.data);
            });

    },
    myShips({ commit, state }) {
        state.isSLoading = true
        $axios.get('myship')
            .then(response => {
                commit('SET_MYSHIPS', response.data);
                state.isSLoading = false
            });

    },



}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
