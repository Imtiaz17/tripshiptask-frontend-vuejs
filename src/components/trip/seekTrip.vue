<template>
    <section>
        <div class="columns">
            <div class="column is-12">
                <div class="control">
                    <gmap-autocomplete :start_point="start" @address_res="handleAddr" label="Start point" :verified="verified"></gmap-autocomplete>
                    <input type="hidden" v-model="start" v-validate="'required'" name="start point">
                    <span class="material-icons" @click="midpoint=true" style="position: absolute;right: 9px;top:10px;font-size: 16px;cursor: pointer;">add_circle_outline</span>
                    <span v-show="errors.has('start point')" class="help is-danger">Start point is required</span>
                </div>
            </div>
        </div>
        <div class="columns setonmap" v-if="verified">
            <div class="column">
                <a style="float:right;font-size:12px;color:#039BE5" v-show="start_Marker" @click="startMarker" type="submit">Set on map
                </a>
            </div>
        </div>
        </div>
        <div class="columns">
            <div class="column is-6">
                <div class="control">
                    <float-label label="Select Date" :fixed="date==null?false:true">
                        <a-date-picker v-model="date" placeholder="" valueFormat="YYYY-MM-DD" :disabled-date="disabledDate" v-validate="'required'" name="date" />
                    </float-label>
                    <span v-show="errors.has('date')" class="help is-danger">Date is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label label="Select Time" :fixed="seektime==null?false:true">
                        <a-time-picker :open="open" @openChange="handleOpenChange" use12-hours placeholder="" :disabled-hours="disabledHours" valueFormat="HH:mm:ss" :disabled-minutes="disabledMinutes" format="h:mm a" v-model="seektime" v-validate="'required'" name="time">
                            <vs-button slot="addon" slot-scope="panel" color="primary" type="filled" @click="handleClose">Ok</vs-button>
                        </a-time-picker>
                    </float-label>
                    <span v-show="errors.has('time')" class="help is-danger">Time is required</span>
                </div>
            </div>
        </div>
        <div class="columns" v-show="midpoint">
            <div class="column">
                <div class="control">
                    <gmap-autocomplete @address_res="handleAddr" label="Mid Point" :verified="verified"></gmap-autocomplete>
                    <span class="material-icons" @click="enablemidpoint" style="position: absolute;right: 9px;top:10px;font-size: 16px;cursor: pointer;">
                        clear
                    </span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <div class="control">
                    <gmap-autocomplete :destination="destination" @address_res="handleAddr" label="Destination" :verified="verified"></gmap-autocomplete>
                    <input type="hidden" v-model="destination" v-validate="'required'" name="destination">
                    <span v-show="errors.has('destination')" class="help is-danger">Destination is required</span>
                </div>
            </div>
        </div>
        <div class="columns setonmap" v-if="verified">
            <div class="column">
                <a style="float:right;font-size:12px;color:#039BE5" v-show="end_Marker" @click="endMarker" type="submit">Set on map
                </a>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <GmapMap :center="{lat:23.746466,lng:90.376015}" ref="xyz" :zoom="14" map-type-id="terrain" style="width:100%; height:200px">
                </GmapMap>
            </div>
        </div>
        <div class="columns">
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false" label="Select vehicle">
                        <div class="select">
                            <select name="vehicle type" v-model="vehicle_type" v-validate="'required'">
                                <option v-for="(item,index) in voptions" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('vehicle type')" class="help is-danger">Vehicle type is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false" label="How many of you">
                        <div class="select">
                            <select name="passenger number" v-model="vehicle_seat" v-validate="'required'">
                                <option v-for="(item,index) in vseat" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('passenger number')" class="help is-danger">Number of passengers is required</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false" label="Prefer to get ride from">
                        <div class="select">
                            <select name="passenger_gender" v-model="preferred_passenger" v-validate="'required'">
                                <option v-for="(item,index) in passenger_gender" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                </div>
            </div>
            <div class="column is-6">
                <div class="field has-addons">
                    <div class="control">
                        <float-label label="Willing to pay">
                            <input type="number" min="0" class="input is-primary-focus" name="offer amount" v-model="pay" v-validate="'required'">
                        </float-label>
                    </div>
                    <div class="control">
                        <span class="select">
                            <select v-model="currency">
                                <option :value="usercurrency">{{usercurrency}}</option>
                                <option v-if="usercurrency !=='USD'" value="USD">USD</option>
                            </select>
                        </span>
                    </div>
                </div>
                <span v-show="errors.has('offer amount')" class="help is-danger">Willing to pay amount is required </span>
            </div>
        </div>
        <div class="columns" v-if="currencychanged">
            <div class="column">
                <label class="label">In which country do you want this to be posted?</label>
            </div>
            <div class="column is-5 countrylist">
                <div class="control">
                    <div class="select">
                        <select name="country" v-model="country">
                            <option v-for="(item,index) in countries" :key="index" :value="item.code">{{item.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <div class="control">
                    <float-label label="Note">
                        <textarea class="textarea is-primary-focus" v-model="details" rows="4"></textarea>
                    </float-label>
                </div>
            </div>
        </div>
        <div class="mt-20" v-if="countryrestriction">
            <label class="label">For security, you need to <router-link target="_blank" :to="{name:'nidinfo'}">provide</router-link> your National/Govt id to post.</label>
        </div>
        <div class="mt-20 has-text-right" v-else>
            <button @click="submit" v-bind:class="(loading)?'button info-btn raised is-loading':'button info-btn raised'">Submit
            </button>
        </div>
    </section>
</template>
<script>
import Vue from 'vue';
import moment from "moment";
import { DatePicker } from 'ant-design-vue';
import { TimePicker } from 'ant-design-vue';
Vue.use(DatePicker);
Vue.use(TimePicker);
// import DatePicker from 'vue2-datepicker';
// import 'vue2-datepicker/index.css';
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: true,
})
export default {
    components: { gmapAutocomplete: () => import('../global/gmapautocomplete'), DatePicker },
    data() {
        return {
            moment: moment,
            open: false,
            post_type: 'seek',
            voptions: [
                'Car',
                'Mini Van/Micro',
                'Motorcycle',
                'Electric Scooter',
                'CNG',
                'Rickshaw'
            ],
            vseat: [
                'Just Myself',
                '2 of us',
                '3 of us',
                '4 of us',
                '5 of us',
                '6 of us',
                '7 of us',

            ],
            currency: this.$store.getters.user.currency,
            country: '',
            countries: [
                { name: 'Australia', code: 'AUS' },
                { name: 'Bangladesh', code: 'BD' },
                { name: 'Canada', code: 'CA' },
                { name: 'India', code: 'IND' },
                { name: 'Kenya', code: 'KE' },
                { name: 'Pakistan', code: 'PK' },
                { name: 'United Kingdom', code: 'UK' },
                { name: 'United States', code: 'USA' },
            ],
            currencychanged: false,
            passenger_gender: [
                'Male',
                'Female',
                'Any'
            ],

            seektime: null,
            start_Marker: true,
            end_Marker: true,
            isLoading: false,
            coordinates: null,
            own: false,
            select2: 'primary',
            ownCar: false,
            rentCar: false,
            myVehicles: [],
            vlength: '',
            data: '',
            trips: [],
            error: [],
            vehicle_type: null,
            midpoint: false,
            start: '',
            s_lat: null,
            s_lng: null,
            d_lat: null,
            d_lng: null,
            date: null,
            time: '',
            mid: '',
            distance: '',
            duration: '',
            destination: '',
            vehicle: '',
            vehicle_seat: null,
            preferred_passenger: '',
            pay: '',
            details: '',
            loading: false,
            savepost: null,
            postdata: {
                module: "trip",
                type: "seek"
            },
            verified: true,

        }
    },
    computed: {
        id() {
            return this.$store.getters.id
        },

        countryrestriction() {
            return this.$store.getters.user.status !== 'verified' && this.$store.getters.user.country == 'KE'
        },
        queryString() {
            return Object.keys(this.postdata)
                .map(k => `${k}=${this.postdata[k]}`)
                .join('&');
        },
        usercurrency() {
            return this.$store.getters.user.currency
        },
        usercountry() {
            return this.$store.getters.user.country
        },
    },

    created() {

    },
    mounted() {
        if (this.usercountry == 'USA') {
            this.currencychanged = true
            this.country = 'USA'
        }
        EventBus.$on('GetRideRepost', (info) => {
            this.start = info.start_point
            this.destination = info.destination
            this.vehicle_type = info.vehicle_type
            this.pay = info.amount
            this.s_lat = info.point['s_lat']
            this.s_lng = info.point['s_lng']
            this.d_lat = info.point['d_lat']
            this.d_lng = info.point['d_lng']
            this.vehicle_seat = info.vehicle_seat
            this.preferred_passenger = info.preferred_passenger
            this.details = info.details
            this.getRoute()
        })


        this.$refs.xyz.$mapPromise.then(() => {
            this.directionsService = new google.maps.DirectionsService()
            this.directionsDisplay = new google.maps.DirectionsRenderer()
            this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
        })
    },


    methods: {
        handleOpenChange(open) {
            this.open = open;
        },
        handleClose() {
            this.open = false;
        },
        disabledDate(current) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return current < today;
        },
        disabledHours() {
            const today = new Date()
            if (new Date(this.date).toDateString() == today.toDateString()) {
                var hours = [];
                for (var i = 0; i < moment().hour(); i++) {
                    hours.push(i);
                }
                return hours;
            }

        },
        disabledMinutes(selectedHour) {
            const today = new Date()
            if (new Date(this.date).toDateString() == today.toDateString()) {
                var minutes = [];
                if (selectedHour === moment().hour()) {
                    for (var i = 0; i < moment().minute()+3; i++) {
                        minutes.push(i);
                    }
                }
                return minutes;
            }
        },

        handleAddr(data) {
            if (data.field == "Start point") {
                this.start = data.address
                this.s_lat = data.latitude
                this.s_lng = data.longitude
                this.getRoute();
            } else if (data.field == "Destination") {
                this.destination = data.address
                this.d_lat = data.latitude
                this.d_lng = data.longitude
                this.getRoute();
            } else {
                this.mid = data.address
                this.getRoute();
            }
        },

        startMarker() {
            this.start_Marker = false
            this.geocoder = new google.maps.Geocoder()
            this.infowindow = new google.maps.InfoWindow()
            var vm = this
            var marker = new google.maps.Marker({
                map: this.$refs.xyz.$mapObject,
                position: new google.maps.LatLng(23.746466, 90.376015),
                draggable: true
            })
            google.maps.event.addListener(marker, 'dragend', function() {
                vm.geocoder.geocode({ 'latLng': marker.getPosition() }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            vm.start = results[0].formatted_address;
                            EventBus.$emit('setstartlocation', vm.start)
                            vm.getRoute()
                        }
                    }
                });
            });
        },
        endMarker() {
            this.end_Marker = false
            this.geocoder = new google.maps.Geocoder()
            this.infowindow = new google.maps.InfoWindow()
            var vm = this
            var marker2 = new google.maps.Marker({
                map: this.$refs.xyz.$mapObject,
                position: new google.maps.LatLng(23.751, 90.3735),
                draggable: true
            })
            google.maps.event.addListener(marker2, 'dragend', function() {
                vm.geocoder.geocode({ 'latLng': marker2.getPosition() }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            vm.destination = results[0].formatted_address;
                            EventBus.$emit('setendlocation', vm.start)
                            vm.getRoute()
                        }
                    }
                });
            });

        },
        getRoute() {
            var vm = this
            var waypts = [];
            var midpoint = this.mid
            if (midpoint) {
                waypts.push({
                    location: midpoint,
                    stopover: true
                })
            };

            vm.directionsService.route({
                origin: this.start,
                destination: this.destination,
                travelMode: google.maps.TravelMode.DRIVING,
                waypoints: waypts
            }, function(response, status) {

                if (status === google.maps.DirectionsStatus.OK) {
                    let mile = response.routes[0].legs[0].distance.text;
                    vm.distance = mile;
                    let duration = response.routes[0].legs[0].duration.text;
                    vm.duration = duration;
                    vm.directionsDisplay.setDirections(response)
                } else {
                    console.log('Directions request failed due to ' + status)
                }
            })
        },
        enablemidpoint() {
            this.midpoint = false
            this.mid = ''
        },
        getPhoto() {
            let photo = "images/circle.gif";
            return photo;
        },
        yes() {
            this.ownCar = true
            this.rentCar = false
        },
        no() {
            this.ownCar = false
        },
        submit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.loading = true
                    this.$axios.post('trip', {
                            post_type: this.post_type,
                            start_point: this.start,
                            date: this.date,
                            time: this.time,
                            destination: this.destination,
                            preferred_passenger: this.preferred_passenger,
                            distance: this.distance,
                            duration: this.duration,
                            s_lat: this.s_lat,
                            s_lng: this.s_lng,
                            d_lat: this.d_lat,
                            d_lng: this.d_lng,
                            via: this.mid,
                            country: this.country,
                            currency: this.currency,
                            vehicle: this.vehicle,
                            vehicle_seat: this.vehicle_seat,
                            pay: this.pay,
                            details: this.details,
                            vehicle_type: this.vehicle_type,
                        })
                        .then((res) => {
                            EventBus.$emit('CloseRepost')
                            this.loading = false
                            EventBus.$emit('removedata')
                            EventBus.$emit('updateSeekTrips')
                            Toast.fire({
                                type: 'success',
                                text: 'Your "Get a ride" post is successful',
                            })

                            const clear = async () => {
                                this.post_type = ''
                                this.date = ''
                                this.seektime = ''
                                this.vehicle = ''
                                this.vehicle_seat = ''
                                this.pay = ''
                                this.radio = ''
                                this.s_lat = '',
                                    this.s_lng = '',
                                    this.d_lat = '',
                                    this.d_lng = '',
                                    this.vehicle_type = ''
                                this.details = null
                            }
                            clear().then(() => {
                                this.$validator.reset()
                            })
                        })
                        .catch(error => {
                            if (error.response.status == 403) {
                                Swal.fire({
                                    position: 'center',
                                    type: 'error',
                                     html: '<p style="text-align:center;">Update E-wallet Balance</p>',
                                    text: error.response.data.message,
                                    showConfirmButton: true,

                                })
                            }
                            if (error.response.status == 422) {
                                this.$vs.notify({
                                    title: 'Error',
                                    text: 'Oops! Something went wrong. Please try again.',
                                    position: 'top-right',
                                    color: 'danger'
                                })
                            }
                        });
                }
            })
        }
    },
    watch: {
        currency: function(val) {
            if (val == 'USD') {
                this.currencychanged = true
                if (this.usercountry == 'AUS') {
                    this.countries.splice(0, 1)
                } else if (this.usercountry == 'BD') {
                    this.countries.splice(1, 1)
                } else if (this.usercountry == 'CA') {
                    this.countries.splice(2, 1)
                } else if (this.usercountry == 'IND') {
                    this.countries.splice(3, 1)
                } else if (this.usercountry == 'KE') {
                    this.countries.splice(4, 1)
                } else if (this.usercountry == 'PK') {
                    this.countries.splice(5, 1)
                } else if (this.usercountry == 'UK') {
                    this.countries.splice(6, 1)
                } else if (this.usercountry == 'USA') {
                    this.countries.splice(7, 1)
                }
            } else {
                this.currencychanged = false
                this.currency = this.usercurrency
                this.country = this.usercountry
            }
        },

        'seektime': function(val) {
            this.time = moment(val, "h:mm A").format("HH:mm:ss")
        },
        vehicle_type: function(val) {
            this.vseat = [
                'Just Myself',
                '2 of us',
                '3 of us',
                '4 of us',
                '5 of us',
                '6 of us',
                '7 of us'
            ]
            if (this.vehicle_type == 'Car') {
                const clear = async () => {
                    this.vseat.splice(4, 3)
                }
                clear().then(() => {
                    this.$validator.reset()
                })
            }
            if (this.vehicle_type == 'Mini Van/Micro') {
                const clear = async () => {
                    this.vseat = [
                        'Just Myself',
                        '2 of us',
                        '3 of us',
                        '4 of us',
                        '5 of us',
                        '6 of us',
                        '7 of us'
                    ]
                }
                clear().then(() => {
                    this.$validator.reset()
                })
            }

            if (this.vehicle_type == 'Motorcycle' || this.vehicle_type == 'Electric Scooter') {
                const clear = async () => {
                    this.vseat.splice(1, 6)
                }
                clear().then(() => {
                    this.$validator.reset()
                })
            }
            if (this.vehicle_type == 'CNG') {
                const clear = async () => {
                    this.vseat.splice(3, 4)
                }
                clear().then(() => {
                    this.$validator.reset()
                })
            }
            if (this.vehicle_type == 'Rickshaw') {
                const clear = async () => {
                    this.vseat.splice(1, 6)
                }
                clear().then(() => {
                    this.$validator.reset()
                })
            }
        },
        start: function(val) {
            this.start = val
        },
        mid: function(val) {
            this.mid = val
        },

        destination: function(val) {
            this.destination = val
        },


    }
}
</script>
<style scoped>
.mx-datepicker {
    position: relative;
    display: inline-block;
    max-width: 100%;
    width: 100% !important;
}

.con-vs-checkbox {
    justify-content: start;
}

.button.light-raised:hover {
    box-shadow: 0 3px 10px 4px rgba(0, 0, 0, 0.04);
}

.header {
    font-size: 1.5em;
    color: #363636;
    font-weight: 600;
    line-height: 1.125;
}

.button.info-btn:hover {
    color: #fff !important;
}

.textarea {
    margin-top: -10px;
}
</style>