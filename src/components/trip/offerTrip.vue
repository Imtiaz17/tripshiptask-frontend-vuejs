<template>
    <section>
        <div class="columns">
            <div class="column is-12">
                <div class="control">
                    <gmap-autocomplete  :start_point="start" @address_res="handleAddr" label="Start point" :verified="verified"></gmap-autocomplete>
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
        <div class="columns">
            <div class="column is-6">
                <div class="control">
                    <float-label label="Select Date" :fixed="date==null?false:true">
                        <a-date-picker v-model="date" valueFormat="YYYY-MM-DD" placeholder="" :disabled-date="disabledDate" v-validate="'required'" name="date" />
                    </float-label>
                    <span v-show="errors.has('date')" class="help is-danger">Date is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label label="Select Time" :fixed="offertime==null?false:true">
                        <a-time-picker :open="open" @openChange="handleOpenChange" use12-hours placeholder="" :disabled-hours="disabledHours" valueFormat="HH:mm:ss" :disabled-minutes="disabledMinutes" format="h:mm a" v-model="offertime" v-validate="'required'" name="time" @change="changeTime">
                            <vs-button slot="addon" slot-scope="panel" color="primary" type="filled" @click="handleClose">Ok</vs-button>
                        </a-time-picker>
                    </float-label> <span v-show="errors.has('time')" class="help is-danger">Time is required</span>
                </div>
            </div>
        </div>
        <div class="columns" v-show="midpoint">
            <div class="column">
                <div class="control">
                    <gmap-autocomplete ref="midpoint" @address_res="handleAddr" label="Mid Point" :verified="verified"></gmap-autocomplete>
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
                <GmapMap :center="{lat:23.746466,lng:90.376015}" ref="xyz" :zoom="12" map-type-id="terrain" style="width:100%; height:200px"> </GmapMap>
            </div>
        </div>
        <div class="columns">
            <div class="column is-5">
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
            <div class="column is-7">
                <div class="control">
                    <float-label :dispatch="false" label="Passenger you want to carry">
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
        <div class="columns" v-show="ownvehicle">
            <div class="column is-8">
                <div style="display: inline-flex;">
                    <label class="label">Do you own this vehicle?</label>
                    <div class="control">
                        <ul class="leftx" style="display: inline-flex;">
                            <li style="margin-left:10px;">
                                <vs-radio vs-name="radios1" v-model="have" vs-value="yes" @change="yes">Yes</vs-radio>
                            </li>
                            <li style="margin-left:10px;">
                                <vs-radio vs-name="radios1" v-model="have" vs-value="no" @change="no">No</vs-radio>
                            </li>
                        </ul>
                    </div>
                </div>
                <input type="" v-model="radio" type="hidden" v-validate="'required'" name="vehicle">
                <span v-show="errors.has('vehicle')" class="help is-danger">Please select an option</span>
            </div>
            <div class="column is-4" v-if="ownCar" :class="myVehicles.length>0?'':'owncar'">
                <div class="control" v-if="veloading">
                    <div>
                        <p>Loading...</p>
                    </div>
                </div>
                <div class="control" v-else-if="myVehicles.length>0">
                    <float-label :dispatch="false" label="Select vehicle">
                        <div class="select">
                            <select name="Select vehicle" v-model="vehicle">
                                <option v-for="item,index in myVehicles" :key="index" :value="item.model">{{item.model}}</option>
                            </select>
                        </div>
                    </float-label>
                </div>
                <div class="control" v-else>
                    <span class="v-notfound">No vehicle found</span>
                </div>
            </div>
        </div>
        <div class="columns" v-if="veloading && ownvehicle==false">
            <div class="column is-4">
                <p>Loading...</p>
            </div>
        </div>
        <div class="columns" v-else-if="novehiclestatus && ownvehicle==false">
            <div class="column">
                <p style="color:#f14668">You did not add a motor cycle in your profile. Please <router-link :to="{name:'vehicleinfo'}">add</router-link> motor cycle details before you can choose this option</p>
            </div>
        </div>
        <!--  <div class="columns" v-else-if="myVehicles.length>0 && ownvehicle==false">
            <div class="column is-5">
                <div class="control">
                    <float-label :dispatch="false" label="Select vehicle">
                        <div class="select">
                            <select name="Select vehicle" v-model="vehicle">
                                <option v-for="item,index in myVehicles" :key="index" :value="item.model">{{item.model}}</option>
                            </select>
                        </div>
                    </float-label>
                </div>
            </div>
        </div> -->
        <div class="columns">
            <div class="column is-5">
                <div class="control">
                    <float-label :dispatch="false" label="Prefer to give ride to">
                        <div class="select">
                            <select name="passenger_gender" v-model="preferred_passenger" v-validate="'required'">
                                <option v-for="(item,index) in passenger_gender" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                </div>
            </div>
            <div class="column is-7">
                <div class="field has-addons">
                    <div class="control">
                        <float-label label="Asking Fare (Each Person)">
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
                <span v-show="errors.has('offer amount')" class="help is-danger">Asking amount is required</span>
            </div>
        </div>
        <div class="columns" v-if="currencychanged">
            <div class="column">
                <label class="label">In which country do you want this to be posted?</label>
            </div>
            <div class="column is-5 countrylist">
                <div class="control">
                    <float-label label="Select country">
                        <div class="select">
                            <select name="country" v-model="country">
                                <option v-for="(item,index) in countries" :key="index" :value="item.code">{{item.name}}</option>
                            </select>
                        </div>
                    </float-label>
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
        <div class="mt-20 has-text-right" v-if="verified">
            <button @click="submit" v-bind:class="(loading)?'button info-btn raised is-loading':'button info-btn raised'">Submit
            </button>
        </div>
        <div class="mt-20" v-else>
            <label class="label">For security, you need to <router-link target="_blank" :to="{name:'nidinfo'}">provide</router-link> your National/Govt id to post.</label>
        </div>
        <info-required v-if="provideNidInfo" :title="title" />
    </section>
</template>
<script>
import Vue from 'vue';
import { DatePicker } from 'ant-design-vue';
import { TimePicker } from 'ant-design-vue';
Vue.use(DatePicker);
Vue.use(TimePicker);
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: true,
})
import moment from "moment";
import VeeValidate from 'vee-validate';
//import DatePicker from 'vue2-datepicker';
//import 'vue2-datepicker/index.css';
Vue.use(VeeValidate);
import gmapAutocomplete from '../global/gmapautocomplete'
export default {
    components: {
        infoRequired: () => import('@/components/global/InfoRequired'),
        gmapAutocomplete,
    },
    data() {
        return {
            
            open: false,
            moment: moment,
            place: false,
            placeholder: false,
            address: " ",
            post_type: 'offer',
            voptions: [
                'Car',
                'Mini Van/Micro',
                'Motorcycle',
                'Electric Scooter',
                'CNG',
                'Rickshaw',
            ],
            novehiclestatus: false,
            vseat: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7'
            ],
            radio: '',
            have: null,
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
            ownvehicle: false,
            offertime: null,
            start_Marker: true,
            end_Marker: true,
            isLoading: false,
            own: false,
            select2: 'primary',
            ownCar: false,
            rentCar: false,
            myVehicles: [],
            vlength: '',
            data: '',
            trips: [],
            path: [],
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
            pay: '',
            details: '',
            preferred_passenger: '',
            loading: false,
            provideNidInfo: false,
            title: '',
            savepost: null,
            veloading: false,
            postdata: {
                module: "trip",
                type: "offer"
            }

        }
    },
    computed: {
        verified() {
            return this.$store.getters.user.status == 'verified'
        },
        id() {
            return this.$store.getters.user.id
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

    mounted() {
        if (this.usercountry == 'USA') {
            this.currencychanged = true
            this.country = 'USA'
        }
        EventBus.$on('infoSubmitted', () => {
            this.provideNidInfo = false
            this.submit()
        })
        EventBus.$on('Repost', (info) => {
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
        handleClose() {
            this.open = false;
        },
        handleOpenChange(open) {
            this.open = open;
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
        changeTime(time) {
            console.log(time)
        },
        disabledMinutes(selectedHour) {
            const today = new Date()
            if (new Date(this.date).toDateString() == today.toDateString()) {
                var minutes = [];
                if (selectedHour === moment().hour()) {
                    for (var i = 0; i < moment().minute() + 3; i++) {
                        minutes.push(i);
                    }
                }
                return minutes;
            }
        },
        updateCurrency(e) {
            this.$store.commit('updateCurrency', e.target.value)
        },
        disabledBeforeToday(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today || date > new Date(today.setMonth(today.getMonth() + 3))
        },
        disabledTime(time) {
            const today = new Date();
            const hr = today.getHours()
            return time < new Date(hr)
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

        focus() {
            setTimeout(() => {
                this.$refs.input.focus()
            }, 0)

        },
        key() {
            if (this.start === '') {
                this.place = false
            } else
                this.place = true

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
        // rmvMarker() {
        //     var marker = new google.maps.Marker({
        //         map: this.$refs.xyz.$mapObject,
        //         draggable: true
        //     })


        //     marker.addListener("dblclick", function() {

        //         marker.setMap(null);
        //     });

        // },

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
                            EventBus.$emit('setendlocation', vm.destination)
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
            this.midpoint = !this.midpoint
            this.mid = ''

        },
        loadV() {
            if (this.myVehicles.length > 0) {

            } else {
                this.veloading = true
                this.$axios.get(`getvehiclesinfo?vehicle=${this.vehicle_type}&user=${this.id}`)
                    .then(res => {
                        if (res.status == 200) {
                            this.veloading = false
                            this.myVehicles = res.data.data;
                        }
                        if (res.status == 204) {
                            if (this.vehicle_type == 'Motorcycle' || this.vehicle_type == 'Electric Scooter') {
                                const clear = async () => {
                                    this.vehicle_type = null
                                }
                                clear().then(() => {
                                    this.$validator.reset()
                                })
                                this.ownvehicle = false
                                this.novehiclestatus = true
                            }
                            this.veloading = false
                        }

                    })
                    .catch(error => console.log(error.res.data))
            }
        },
        getPhoto() {
            let photo = "images/circle.gif";
            return photo;
        },
        yes() {
            this.radio = "true"
            this.ownCar = true
            this.rentCar = false
            this.loadV()
        },
        no() {
            this.radio = "true"
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
                            country: this.country,
                            currency: this.currency,
                            distance: this.distance,
                            preferred_passenger: this.preferred_passenger,
                            s_lat: this.s_lat,
                            s_lng: this.s_lng,
                            d_lat: this.d_lat,
                            d_lng: this.d_lng,
                            duration: this.duration,
                            via: this.mid,
                            vehicle: this.vehicle,
                            vehicle_seat: this.vehicle_seat,
                            pay: this.pay,
                            details: this.details,
                            vehicle_type: this.vehicle_type,
                            savepost: this.savepost,
                        })
                        .then((res) => {
                            EventBus.$emit('CloseRepost')
                            this.loading = false
                            Toast.fire({
                                type: 'success',
                                text: 'Your "Give a ride" post is successful',
                            })
                            EventBus.$emit('removedata')
                            EventBus.$emit('updateOfferTrips')
                            const clear = async () => {
                                this.date = ''
                                this.offertime = ''
                                this.vehicle = ''
                                this.vehicle_seat = ''
                                this.pay = ''
                                this.radio = ''
                                this.s_lat = '',
                                    this.s_lng = '',
                                    this.d_lat = '',
                                    this.d_lng = '',
                                    this.ownCar = false
                                this.vehicle_type = ''
                                this.details = null
                            }
                            clear().then(() => {
                                this.$validator.reset()
                            })
                        })
                        .catch(error => {
                            this.loading = false
                            if (error.response.status == 400) {
                                this.provideNidInfo = true
                                this.title = error.response.data.error.message
                            }
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
        // currency: function(val) {
        //     if (val == 'USD') {
        //         this.currencychanged = true
        //         if (this.usercountry == 'AUS') {
        //             this.countries.splice(0, 1)
        //         } else if (this.usercountry == 'BD') {
        //             this.countries.splice(1, 1)
        //         } else if (this.usercountry == 'CA') {
        //             this.countries.splice(2, 1)
        //         } else if (this.usercountry == 'IND') {
        //             this.countries.splice(3, 1)
        //         } else if (this.usercountry == 'KE') {
        //             this.countries.splice(4, 1)
        //         } else if (this.usercountry == 'PK') {
        //             this.countries.splice(5, 1)
        //         } else if (this.usercountry == 'UK') {
        //             this.countries.splice(6, 1)
        //         } else if (this.usercountry == 'USA') {
        //             this.countries.splice(7, 1)
        //         }
        //     } else {
        //         this.currencychanged = false
        //         this.currency = this.usercurrency
        //         this.country = this.usercountry
        //     }
        // },
        vehicle_type: function(val) {
            this.ownvehicle = false
            this.have = false
            this.vseat = [1, 2, 3, 4, 5, 6, 7]
            if (this.vehicle_type == 'Car') {
                const clear = async () => {
                    this.vseat.splice(4, 3)
                }
                clear().then(() => {
                    this.$validator.reset()
                })
                this.novehiclestatus = false
                this.ownvehicle = true
            }
            if (this.vehicle_type == 'Mini Van/Micro') {
                const clear = async () => {
                    this.vseat = [1, 2, 3, 4, 5, 6, 7]
                }
                clear().then(() => {
                    this.$validator.reset()
                })
                this.novehiclestatus = false
                this.ownvehicle = true
            }

            if (this.vehicle_type == 'Motorcycle' || this.vehicle_type == 'Electric Scooter') {
                const clear = async () => {
                    this.vseat.splice(1, 6)
                }
                clear().then(() => {
                    this.$validator.reset()
                })
                this.loadV()
            }
            if (this.vehicle_type == 'CNG') {
                const clear = async () => {
                    this.vseat.splice(3, 4)
                }
                clear().then(() => {
                    this.radio = 'vehicle'
                    this.$validator.reset()
                })
                this.novehiclestatus = false
                this.ownvehicle = true
            }
            if (this.vehicle_type == 'Rickshaw') {

                const clear = async () => {
                    this.vseat.splice(1, 6)
                }
                clear().then(() => {
                    this.radio = 'vehicle'
                    this.$validator.reset()
                })
                this.novehiclestatus = false
                this.ownvehicle = true
            }
            this.myVehicles = []
            this.own = true


        },
        offertime: function(val) {
            this.time = moment(val, "h:mm A").format("HH:mm:ss")
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
.header {
    font-size: 1.5em;
    color: #363636;
    font-weight: 600;
    line-height: 1.125;
}

.con-vs-checkbox {
    justify-content: start;
}

.textarea {
    margin-top: -10px;
}

.datepicker {
    bottom: 0% !important;
    top: 100% !important;
}

.datetimepicker .datepicker {
    margin-left: 0px !important;
}

.up {
    transform: scale(.75) translateY(-19px) translateX(-66px);
}

.midpoint:hover {
    border-bottom: 1px solid #039BE5;
    width: 100%;
}

.button.info-btn:hover {
    color: #fff !important;
}

.button.light-raised:hover {
    box-shadow: 0 3px 10px 4px rgba(0, 0, 0, 0.04);
}

.input-select-label-primary--active {
    color: #363636;
}

.restrict {
    font-size: 1em;
}

.column.is-5 {
    padding-right: 0px;
}

.owncar {
    margin-top: 14px;
    padding: 0px !important;
    margin-left: -18px;
}

.v-notfound {
    color: rgb(241, 70, 104);
    font-size: 13px;
}

@media only screen and (max-width:769px) {
    .column.is-5 {
        flex: none;
        width: 41.66667%;
        padding-right: 0px !important;
    }
}
</style>