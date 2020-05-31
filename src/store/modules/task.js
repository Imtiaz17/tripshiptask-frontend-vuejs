import store from '../index';
import $axios from '../../main';
const state = {
    page: 1,
    spage: 1,
    offertasks: [],
    seektasks: [],
    categories: [],
    mytasks: [],
    isTLoading: false,
};
const mutations = {
    SET_OFFER_TASK: (state, data) => {
        state.offertasks = data;
    },
    SET_SEEK_TASK: (state, data) => {
        state.seektasks = data;
    },
    SET_CATEGORIES: (state, data) => {
        state.categories = data;
    },
    SET_MYTASK: (state, data) => {
        state.mytasks = data;
    },
}
const actions = {
    getOfferTaskLiting({ commit, state }) {
        state.isTLoading = true
        $axios.get('offertask?page=' + state.page)
            .then(response => {
                commit('SET_OFFER_TASK', response.data);
                state.isTLoading = false
            });

    },
    getSeekTaskLiting({ commit, state }) {
        $axios.get('seektask?page=' + state.spage)
            .then(response => {
                commit('SET_SEEK_TASK', response.data);
            });

    },
    myTasks({ commit, state }) {
        state.isTLoading = true
        $axios.get('mytask')
            .then(response => {
                commit('SET_MYTASK', response.data);
                state.isTLoading = false
            });
    },
    getCategories({ commit, state }) {

        $axios.get('categories/3')
            .then(response => {
                commit('SET_CATEGORIES', response.data);
                 
            });

    },



}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
