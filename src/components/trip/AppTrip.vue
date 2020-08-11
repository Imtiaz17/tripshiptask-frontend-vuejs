<template>
    <div style=" padding-top:10px;">
        <div class="columns">
            <div class="column is-4" style="padding:4px">
                <!--  <img src="../../assets/images/ride.png" width="100%"> -->
                <vs-tabs>
                    <vs-tab label="Give a Ride" @click="offer">
                        <offer-trip></offer-trip>
                    </vs-tab>
                    <vs-tab label="Get a Ride" @click="seek">
                        <seek-trip></seek-trip>
                    </vs-tab>
                </vs-tabs>
            </div>
            <div class="column is-8" style="padding:4px">
                <div class="card search">
                    <div class="card-header active-header">
                        Search Trips
                    </div>
                    <div class="card-content">
                        <div class="columns">
                            <div class="column is-3">
                                <div class="control">
                                    <gmap-autocomplete @address_res="handleAddr" label="Start point" :verified="verified"></gmap-autocomplete>
                                </div>
                            </div>
                            <div class="column">
                                <div class="control">
                                    <float-label label="Radius">
                                        <input type="number" min="0" class="input is-primary-focus" v-model="search.sradious">
                                    </float-label>
                                </div>
                            </div>
                            <div class="column is-3">
                                <div class="control">
                                    <gmap-autocomplete @address_res="handleAddr" label="Destination" :verified="verified"></gmap-autocomplete>
                                </div>
                            </div>
                            <div class="column">
                                <div class="control">
                                    <float-label label="Radius">
                                        <input type="number" min="0" class="input is-primary-focus" v-model="search.dradious">
                                    </float-label>
                                </div>
                            </div>
                            <div class="column is-2">
                                <div class="control">
                                    <float-label :dispatch="false" label="Select vehicle">
                                        <div class="select">
                                            <select v-model="search.vehicle">
                                                <option v-for="(item,index) in voptions" :key="index" :value="item">{{item}}</option>
                                            </select>
                                        </div>
                                    </float-label>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-3">
                                <div class="control">
                                    <float-label label="Trip date">
                                        <date-picker v-model="search.date" valueType="format"></date-picker>
                                    </float-label>
                                </div>
                            </div>
                            <div class="column is-1">
                                <div class="control">
                                    <button @click="searchTrips" class="button searchbtn info-btn raised">Search</button>
                                </div>
                            </div>
                            <div class="column is-2">
                                <div class="control">
                                    <button @click="clearsearch" class="button clearbtn info-btn raised">Clear Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <template v-if="offertrip">
                    <div class="card">
                        <div class="card-header active-header">
                            Give a Ride
                        </div>
                        <div class="card-content">
                            <div v-if="isofferLoading">
                                <img class="loading" src="../../assets/images/roaling.gif">
                            </div>
                            <div v-else-if="trips.length==0">
                                <div style="padding:60px;">
                                    <p style="font-size:26px;text-align:center;color:#ccc">No results found</p>
                                </div>
                            </div>
                            <div v-else class="fixed_header">
                            <table class="table is-accent">
                                <thead>
                                    <tr>
                                        <th style="width:17%">Start Point</th>
                                        <th>Destination</th>
                                        <th>Amount</th>
                                        <th>Vehicle</th>
                                        <th>Passenger</th>
                                        <th>Bids</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in trips" :key="index">
                                        <td>
                                            {{item.start_point.split(',')[0]}}
                                        </td>
                                        <td>
                                            {{item.destination.split(',')[0]}}
                                        </td>
                                        <td>
                                            {{item.pay}}
                                        </td>
                                        <td>
                                            {{item.vehicle_type}}
                                        </td>
                                        <td>
                                            {{item.vehicle_seat}}
                                        </td>
                                        <td>
                                            {{item.bids_count}}
                                        </td>
                                        <td>
                                            <router-link :to="item.path">
                                                <button class="button is-small info-btn raised  btn-outlined">view</button>
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                    <!--  <div v-if="trips.length>30" @click="offerloadMore" style="margin-top:10px;text-align: center;">
                        <button :class="isload?'is-loading':''" class="button raised is-small info-btn" style="">Load More...</button>
                    </div> -->
                </template>
                <template v-if="seektrip">
                    <div class="card">
                        <div class="card-header active-header">
                            Get a Ride
                        </div>
                        <div class="card-content">
                           
                            <div v-if="isseekLoading">
                                <img class="loading" src="../../assets/images/roaling.gif">
                            </div>
                             <div v-else-if="seektrips.length==0">
                                <div style="padding:60px;">
                                    <p style="font-size:26px;text-align:center;color:#ccc">No results found</p>
                                </div>
                            </div>
                            <div v-else class="fixed_header">
                            <table class="table is-accent">
                                <thead>
                                    <tr>
                                        <th style="width:17%">Start Point</th>
                                        <th>Destination</th>
                                        <th>Amount</th>
                                        <th>Vehicle</th>
                                        <th>Passenger</th>
                                        <th>Bids</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in seektrips" :key="index">
                                        <td>
                                            {{item.start_point.split(',')[0]}}
                                        </td>
                                        <td>
                                            {{item.destination.split(',')[0]}}
                                        </td>
                                        <td>
                                            {{item.pay}}
                                        </td>
                                        <td>
                                            {{item.vehicle_type}}
                                        </td>
                                        <td>
                                            {{item.vehicle_seat}}
                                        </td>
                                        <td>
                                            {{item.bids_count}}
                                        </td>
                                        <td>
                                            <router-link :to="item.path">
                                                <button class="button is-small info-btn raised  btn-outlined">view</button>
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                    <!--  <div v-if="seektrips.length>30" @click="seekLoadMore" style="margin-top:10px;text-align: center;">
                        <button :class="isload?'is-loading':''" class="button info-btn raised is-small" style="">Load More...</button>
                    </div> -->
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: true,
    timerProgressBar: true,
})
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import gmapAutocomplete from '../global/gmapautocomplete';
import offerTrip from './offerTrip';
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        gmapAutocomplete,
        offeringTrips: () => import('./OfferingTrips'),
        offerTrip,
        seekTrip: () => import('./seekTrip'),
        DatePicker
    },
    data() {
        return {
            isLoad: true,
            activeName: 'first',
            isload: false,
            first: true,
            second: false,
            offertrip: true,
            seektrip: false,
            config: {
                enableTime: false,
                dateFormat: "Y-m-d",
            },
            voptions: [
                'Car',
                'Mini Van/Micro',
                'Motorcycle',
                'Electric Scooter',
                'CNG',
                'Rickshaw',
            ],
            vseat: [
                '1',
                '2',
                '3',
                '3',
                '4',
                '5',
                '6',
                '7'
            ],
            paginate: [],
            start_Marker: true,
            end_Marker: true,
            coordinates: null,
            own: false,
            select2: 'primary',
            ownCar: false,
            rentCar: false,
            myVehicles: [],
            vlength: '',
            data: '',
            tripath: [],
            error: [],
            vehicle_type: '',
            midpoint: false,
            start: '',
            searchdate: '',
            mid: '',
            distance: '',
            duration: '',
            destination: '',
            vehicle: '',
            vehicle_seat: '',
            pay: '',
            result: [],
            details: '',
            startsearch: '',
            endsearch: '',
            busy: false,
            page: 1,
            spage: 1,
            active: true,
            search: {
                slat: '',
                slng: '',
                dlat: '',
                dlng: '',
                sradious: '',
                dradious: '',
                vehicle: '',
                date: '',
                post_type: 'offer',
            },
            isofferLoading: false,
            isseekLoading: false,
            trips: [],
            seektrips: [],
        }
    },

    created() {
        this.getOfferrips();
        this.getSeekTrips();
    },
    mounted() {
        EventBus.$on('updateOfferTrips', () => {
            this.getOfferrips();
        })
        EventBus.$on('updateSeekTrips', () => {
            this.getSeekTrips();
        })
    },

    computed: {
        queryString() {
            return Object.keys(this.search)
                .map(k => `${k}=${this.search[k]}`)
                .join('&');
        },
        verified() {
            return this.$store.getters.user.status == 'verified'
        },
        id() {
            return this.$store.getters.user.id
        },

    },

    methods: {
        offer() {
            this.offertrip = true
            this.seektrip = false
            this.search.post_type = 'offer'
        },
        seek() {
            this.offertrip = false
            this.seektrip = true
            this.search.post_type = 'seek'
        },
        getOfferrips() {
            this.isofferLoading = true
            this.$axios.get('offertrip?page=' + this.page)
                .then(response => {
                    this.trips = response.data.data;
                    this.isofferLoading = false
                });
        },
        getSeekTrips() {
            this.isseekLoading = true
            this.$axios.get('seektrip?page=' + this.spage)
                .then(response => {
                    this.seektrips = response.data.data;
                    this.isseekLoading = false
                });

        },

        startPlace(place) {
            this.startsearch = place.name
        },
        endPlace(place) {
            this.endsearch = place.name
        },
        loadMoreData() {
            this.isload = true
        },
        offerloadMore: function() {
            this.isload = true
            this.$axios.get('offertrip?page=' + this.page)
                .then(response => {
                    this.trips.push(...response.data.data);
                    this.page += 1
                    this.isload = false
                })
        },
        seekLoadMore: function() {
            this.isload = true
            this.$axios.get('seektrip?page=' + this.spage)
                .then(response => {
                    this.trips.push(...response.data.data);
                    this.spage += 1
                    this.isload = false
                })

        },

        handleAddr(data) {
            if (data.field == "Start point") {
                this.search.slat = data.latitude
                this.search.slng = data.longitude
            } else if (data.field == "Destination") {
                this.search.dlat = data.latitude
                this.search.dlng = data.longitude
            }
        },
        searchTrips() {
            if (this.search.post_type == 'offer') {
                this.isofferLoading = true
                this.trips = []
                this.$axios.get(`/search?${this.queryString}`)
                    .then((res) => {
                        this.isofferLoading = false
                        this.trips = res.data.data
                    })

            } else {
                this.isseekLoading = true
                this.seektrips = []
                this.$axios.get(`/search?${this.queryString}`)
                    .then((res) => {
                        this.isseekLoading = false
                        this.seektrips = res.data.data
                    })
            }

        },
        clearsearch() {
            EventBus.$emit('removedata')
            this.search.slat = ''
            this.search.slng = ''
            this.search.dlat = ''
            this.search.dlng = ''
            this.search.sradious = ''
            this.search.dradious = ''
            this.search.vehicle = ''
            this.search.date = ''
            this.getOfferrips()
        },
        getPhoto() {
            let photo = "images/roaling.gif";
            return photo;
        },
        yes() {
            this.ownCar = true
            this.rentCar = false
        },
        no() {
            this.ownCar = false
        },
        vclose() {
            this.vehiclesearch = null
        },
        cclose() {
            this.searchdate = ''
        },
        apply() {

            var vm = this
            vm.directionsService.route({
                origin: this.startsearch,
                destination: this.endsearch,
                travelMode: 'DRIVING',
            }, function(response, status) {

                if (status === google.maps.DirectionsStatus.OK) {
                    var routes = response.routes;
                    for (var j = 0; j < routes.length; j++) {
                        var points = routes[j].overview_path;
                        //getLiText(points[j]);
                        for (var i = 0; i < points.length; i++) {
                            getLiText(points[i]);
                        }
                    }

                    function getLiText(point) {
                        var lat = point.lat(),
                            lng = point.lng();
                        vm.result.push(lat + "-" + lng)
                    }
                    vm.trips.filter(trip => {
                        let checker = (arr, target) => target.every(v => arr.includes(v));
                        console.log(checker(vm.result, trip.paths));
                    })
                    // for (var j = 0; j <vm.trips.length; j++) {
                    //  vm.tripath=vm.trips[j]


                }
            })
        }
    },



    watch: {
        vehiclesearch: function(val) {
            this.vehiclesearch = val
        },
        page: function(val) {
            this.page = val
        },
        first: function(val) {
            this.first = val
        },
        second: function(val) {
            this.second = val
        },

        "search.plat": function(val) {
            this.search.plat = val;
        },
        "search.plng": function(val) {
            this.search.plng = val;
        },
        "search.dlat": function(val) {
            this.search.dlat = val;
        },
        "search.dlng": function(val) {
            this.search.dlng = val;
        }

        // this.first = false
        // this.second = true
        // this.offertrip = false
        // this.seektrip = true
    }

}
</script>
<style scoped>
.card-header {
    padding: 10px;
    justify-content: center;
    display: block !important;
    text-align: center;
}

.card-content {
    background-color: transparent;
    padding: 0.5rem 0rem 0rem;
}

div.wrapper {
    overflow: hidden;
    overflow-y: scroll;
    height: 100px;
}

/* width */
::-webkit-scrollbar {
    width: 5px;
}

.search .column {
    padding: 10px 4px;
}

.load {
    position: relative;
    top: 0px;
    padding: -3px;
    left: 303px;
    margin-bottom: 6px;
    margin-top: 6px;
}

.header {
    font-size: 1.5em;
    color: #363636;
    font-weight: 600;
    line-height: 1.125;
}

.midpoint:hover {
    border-bottom: 1px solid #039BE5;
    width: 100%;
}


input.input.is-small {
    border-radius: 5px;
    font-size: 13px;
}

.clearbtn {
    height: 34px;
    width: 87px;
    font-size: 13px;
}


#map {
    height: 40%;
    width: 100%;
    background-color: grey;
}

.field.sm .field-input {
    height: 2.2rem !important;
    min-height: 2.2rem !important;
    font-size: 14px;
    color: #878787;
}

.searchbtn {
    height: 34px;
    width: 58px;
    font-size: 13px;
}

.table {
    width: 100%;
}
</style>