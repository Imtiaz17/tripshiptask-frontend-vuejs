import store from '../index';
import $axios from '../../main';
const state = {
    page: 1,
    spage: 1,
    transactions: []

};
const mutations = {
    SET_TRANSACTION: (state, data) => {
        state.transactions = data;
    }
}
const actions = {
    getUserTransaction({ commit, state }) {
        $axios.get(`transection/${store.getters.id}`)
            .then(response => {
                commit('SET_TRANSACTION', response.data);
            });

    },

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
