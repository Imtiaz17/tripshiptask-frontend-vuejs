<template>
    <div style=" padding-top:20px;">
        <div class="columns">
            <div class="column is-4" style="padding:4px">
                <vs-card style="box-shadow:0 2px 3px 1px rgba(0,0,0,0.04)">
                    <div slot="header" class="searchheader">
                        <h3 style="font-weight: 500;">
                            Trip
                        </h3>
                    </div>
                </vs-card>
                <img src="../../assets/images/ride.png" width="100%">
                <vs-tabs>
                    <vs-tab label="Give a ride" @click="offer">
                        <offer-trip></offer-trip>
                    </vs-tab>
                    <vs-tab label="Take a ride" @click="trip">
                        <seek-trip></seek-trip>
                    </vs-tab>
                </vs-tabs>
            </div>
            <div class="column is-8" style="padding:4px">
                <vs-row vs-justify="center">
                    <vs-col type="flex" vs-justify="center" vs-align="left" vs-w="12">
                        <vs-card style="box-shadow:0 2px 3px 1px rgba(0,0,0,0.04)">
                            <div slot="header" class="searchheader">
                                <h3 style="font-weight: 500;">
                                    Search Trips
                                </h3>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <div class="control">
                                        <float-label label="Start point" fixed>
                                            <input class="input is-primary-focus " type="text" v-model="startsearch">
                                        </float-label>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="control">
                                        <float-label label="Destination" fixed>
                                            <input class="input is-primary-focus " type="text" v-model="endsearch">
                                        </float-label>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="control">
                                        <float-label :dispatch="false" label="Select vehicle" fixed>
                                            <div class="select">
                                                <select v-model="vehiclesearch">
                                                    <option v-for="(item,index) in voptions" :key="index" :value="item">{{item}}</option>
                                                </select>
                                            </div>
                                        </float-label>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="control">
                                        <float-label label="Trip date" fixed>
                                            <date-picker v-model="searchdate" valueType="format"></date-picker>
                                        </float-label>
                                    </div>
                                </div>
                            </div>
                        </vs-card>
                    </vs-col>
                </vs-row>
                <template v-if="offertrip">
                    <div slot="header" class="searchheader">
                        <h3 style="font-weight: 500;">
                            Offering a Ride
                        </h3>
                    </div>
                    <table class="table is-accent fixed_header ">
                        <thead>
                            <tr>
                                <th width="25%" style="text-align:left">Start Point</th>
                                <th width="25%" style="text-align:left">Destination</th>
                                <th width="10%" style="text-align:left">Amount</th>
                                <th width="20%" style="text-align:left">Vehicle</th>
                                <th width="10%" style="text-align:left">Passenger</th>
                                <th width="20%" style="text-align:left">Bids</th>
                                <th width="10%" style="text-align:left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <div v-if="isLoading" style="margin-top:-45px;">
                                <img class="loading" src="../../assets/images/roaling.gif">
                            </div>
                            <div v-else>
                                <tr v-for="(item,index) in getOfferedTrips" :key="index">
                                    <td data-th="Start Point" width="25%" style="text-align:left">
                                        {{item.start_point.split(',')[0]}}
                                    </td>
                                    <td data-th="Destination" width="25%" style="text-align:left">
                                        {{item.destination.split(',')[0]}}
                                    </td>
                                    <td data-th="Amount" width="10%" style="text-align:left">
                                        {{item.pay}}
                                    </td>
                                    <td data-th="Vehicle" width="20%" style="text-align:left">
                                        {{item.vehicle_type}}
                                    </td>
                                    <td data-th="Passenger" width="10%" style="text-align:left">
                                        {{item.seat}}
                                    </td>
                                    <td data-th="Bids" width="20%" style="text-align:left">
                                        {{item.bids_count}}
                                    </td>
                                    <td data-th="Action" width="10%" style="text-align:left">
                                        <router-link :to="item.path">
                                            <button class="button is-small btn-align accent-btn raised rounded btn-outlined">view</button>
                                        </router-link>
                                    </td>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                    <div v-if="trips && trips.length>30" style="margin-top:10px;text-align: center;">
                        <button @click="loadMore" :class="isload?'is-loading':''" class="button primary-btn" style="">Load More...</button>
                    </div>
                </template>
                <template v-if="seektrip">
                    <div v-if="isLoading">
                        <img class="loading" :src="getPhoto()">
                    </div>
                    <div v-else>
                        <div slot="header" class="searchheader">
                            <h3 style="font-weight: 500;">
                                Seeking a Ride
                            </h3>
                        </div>
                        <table class="table is-accent fixed_header ">
                            <thead>
                                <tr>
                                    <th width="25%" style="text-align:left">Start Point</th>
                                    <th width="25%" style="text-align:left">Destination</th>
                                    <th width="10%" style="text-align:left">Amount</th>
                                    <th width="20%" style="text-align:left">Vehicle</th>
                                    <th width="10%" style="text-align:left">Passenger</th>
                                    <th width="20%" style="text-align:left">Bids</th>
                                    <th width="10%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <div v-if="isLoading" style="margin-top:-45px;">
                                    <img class="loading" :src="getPhoto()">
                                </div>
                                <div v-else>
                                    <tr v-for="(item,index) in getSeekedTrips" :key="index">
                                        <td data-th="Start Point" width="25%" style="text-align:left">
                                            {{item.start_point.split(',')[0]}}
                                        </td>
                                        <td data-th="Destination" width="25%" style="text-align:left">
                                            {{item.destination.split(',')[0]}}
                                        </td>
                                        <td data-th="Amount" width="10%" style="text-align:left">
                                            {{item.pay}}
                                        </td>
                                        <td data-th="Vehicle" width="20%" style="text-align:left">
                                            {{item.vehicle_type}}
                                        </td>
                                        <td data-th="Passenger" width="10%" style="text-align:left">
                                            {{item.seat}}
                                        </td>
                                        <td data-th="Bids" width="20%" style="text-align:left">
                                            {{item.bids_count}}
                                        </td>
                                        <td data-th="Action" width="10%">
                                            <router-link :to="item.path">
                                                <button class="button is-small btn-align accent-btn raised rounded btn-outlined">view</button>
                                            </router-link>
                                        </td>
                                    </tr>
                                </div>
                            </tbody>
                        </table>
                        <div v-if="seektrips.length>30" @click="seekLoadMore" style="margin-top:10px;text-align: center;">
                            <button :class="isload?'is-loading':''" class="button primary-btn" style="">Load More...</button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCdu3RozRNnds9nOhMTPs-ETTWLlV1C-EE',
        libraries: 'places',
    },
});

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
// import VeeValidate from 'vee-validate';
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        offeringTrips: () => import('./OfferingTrips'),
        offerTrip: () => import('./offerTrip'),
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
                'Mini van',
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
            vehiclesearch: null,
            busy: false,
            page: 1,
            spage: 1,

        }
    },

    created() {


        if (this.$store.getters.trips.length == 0) {
            this.getOfferrips();
        }
        if (this.$store.getters.seektrips.length == 0) {
            this.getSeekTrips();
        }
    },
    mounted() {
        EventBus.$on('updateOfferTrips', () => {
            this.getOfferrips();
        })
        EventBus.$on('updateSeekTrips', () => {
            this.getSeekTrips();
        })
    },

    // EventBus.$on('seekingtrip', () => {

    //     this.first = false
    //     this.second = true
    //     this.$router.push('/home')
    // })


    computed: {
        trips() {
            return this.$store.getters.trips.data
        },
        seektrips() {
            return this.$store.getters.seektrips.data
        },
        isLoading() {
            return this.$store.getters.isLoading
        },
        id() {
            return this.$store.getters.id
        },

        getOfferedTrips() {
            return this.trips.filter(trip => {
                if (this.vehiclesearch == null && this.searchdate == null) {
                    return trip.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        trip.destination.toLowerCase().includes(this.endsearch.toLowerCase())
                } else if (this.vehiclesearch == null) {
                    return trip.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        trip.destination.toLowerCase().includes(this.endsearch.toLowerCase()) &&
                        trip.date.includes(this.searchdate)
                } else if (this.searchdate == null) {
                    return trip.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        trip.destination.toLowerCase().includes(this.endsearch.toLowerCase()) &&
                        trip.vehicle_type.toLowerCase().includes(this.vehiclesearch.toLowerCase())
                } else {
                    return trip.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        trip.destination.toLowerCase().includes(this.endsearch.toLowerCase()) &&
                        trip.vehicle_type.toLowerCase().includes(this.vehiclesearch.toLowerCase()) &&
                        trip.date.includes(this.searchdate)
                }

            })

        },

        getSeekedTrips() {
            return this.seektrips.filter(trip => {
                if (this.vehiclesearch == null && this.searchdate == null) {
                    return trip.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        trip.destination.toLowerCase().includes(this.endsearch.toLowerCase())
                } else if (this.vehiclesearch == null) {
                    return trip.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        trip.destination.toLowerCase().includes(this.endsearch.toLowerCase()) &&
                        trip.date.includes(this.searchdate)
                } else if (this.searchdate == null) {
                    return trip.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        trip.destination.toLowerCase().includes(this.endsearch.toLowerCase()) &&
                        trip.vehicle_type.toLowerCase().includes(this.vehiclesearch.toLowerCase())
                } else {
                    return trip.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        trip.destination.toLowerCase().includes(this.endsearch.toLowerCase()) &&
                        trip.vehicle_type.toLowerCase().includes(this.vehiclesearch.toLowerCase()) &&
                        trip.date.includes(this.searchdate)
                }

            })

        },

    },
    methods: {
        ...mapActions("trip",
            ['getOfferrips', 'getSeekTrips']),
        startPlace(place) {
            this.startsearch = place.name
        },
        endPlace(place) {
            this.endsearch = place.name
        },
        loadMoreData() {
            this.isload = true
        },
        loadMore: function() {
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
        alloffertrips() {

            this.$store.dispatch('trip/getAllTrips');
            // .then(response => {
            //     this.trips = response.data.data
            //     this.isLoading = false
            //     this.page += 1
            // });


        },
        allseektrips() {
            this.$axios.get('seektrip?page=' + this.spage)
                .then(response => {
                    this.seektrips = response.data.data
                    this.isLoading = false
                    this.spage += 1
                });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        offer() {
            this.offertrip = true
            this.seektrip = false
        },
        trip() {
            this.offertrip = false
            this.seektrip = true
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

    // var routes = response.routes;
    // for (var j = 0; j < routes.length; j++) {
    //     var points = routes[j].overview_path;
    //     //getLiText(points[j]);
    //     for (var i = 0; i < points.length; i++) {
    //         getLiText(points[i]);
    //     }
    // }

    // function getLiText(point) {
    //     var lat = point.lat(),
    //         lng = point.lng();
    //    console.log(lat+"-"+lng)

    // }


    //          var map;
    // var service;
    // var infowindow;
    //           var pyrmont = new google.maps.LatLng(this.startsearch,this.endsearch);

    //   map = new google.maps.Map(document.getElementById('map'), {
    //         center: {lat:this.startsearch, lng: this.endsearch},
    //       zoom: 15
    //     });

    //       let request = {
    //     location:pyrmont,
    //     radius: '500'
    //   };

    //   service = new google.maps.places.PlacesService(map);
    //   service.nearbySearch(request, callback);
    //   function callback(results, status) {
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     for (var i = 0; i < results.length; i++) {
    //       var place = results[i];
    //       // createMarker(results[i]);
    //       console.log(results[i]);
    //     }
    //   }
    // }

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

        startsearch: function(val) {
            this.startsearch = val
        },

        endsearch: function(val) {
            this.endsearch = val
        }


        // this.first = false
        // this.second = true
        // this.offertrip = false
        // this.seektrip = true
    }

}
</script>
<style scoped>
.con-vs-tabs {
    background: #fff;
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

.searchheader {
    text-align: center;
    padding: 7px !important;
    font-size: 18px;
    color: #2d3436;
    background-color: #1abc9c61;
}

.loading {
    height: auto;
    max-width: 50%;
    margin: auto;
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
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
</style>