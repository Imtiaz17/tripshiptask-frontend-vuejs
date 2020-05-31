import store from '../index';
import $axios from '../../main';
const state = {
    page: 1,
    spage: 1,
    tpage: 1,
    trips: [],
    seektrips: [],
    mytrips:[],
    vehicles:[],
    isLoading:false
};
const mutations = {
    SET_TRIPS: (state, data) => {
        state.trips = data;
    },
    SET_SEEKTRIPS: (state, data) => {
        state.seektrips = data;
    },
    SET_MYTRIPS: (state, data) => {
        state.mytrips = data;
    },
    SET_VEHICLES: (state, data) => {
        state.vehicles = data;
    },
}

const actions = {
    getOfferrips({ commit, state }) {
      state.isLoading=true
        $axios.get('offertrip?page=' + state.page)
            .then(response => {
                commit('SET_TRIPS', response.data);
                 state.isLoading=false
            });
    },
    getSeekTrips({ commit, state }) {
        $axios.get('seektrip?page=' + state.spage)
            .then(response => {
                commit('SET_SEEKTRIPS', response.data);
            });

    },
    myTrip({ commit, state }) {
         state.isLoading=true
        $axios.get('mytrip')
            .then(response => {
                commit('SET_MYTRIPS', response.data);
                 state.isLoading=false
            });

    },
     getVehicleInfo({ commit, state }) {
        $axios.get(`getvehiclesinfo/${store.getters.id}`)
            .then(response => {
                commit('SET_VEHICLES', response.data.data);
            });

    },
    



}
export default {
    namespaced:true,
    state,
    mutations,
    actions,
};
