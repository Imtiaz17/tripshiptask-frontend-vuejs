<template>
    <section>
        <div class="columns">
            <div class="column is-12">
                <div class="control">
                    <gmap-autocomplete :start_point="pickuppoint" @address_res="handleAddr" label="Pick up point" :verified="verified"></gmap-autocomplete>
                    <input type="hidden" v-model="pickuppoint" v-validate="'required'" name="pick_up">
                    <span v-show="errors.has('pick_up')" class="help is-danger">Pick up point is required</span>
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
                    <float-label label="Preferred pick up date" :fixed="date==null?false:true">
                        <a-date-picker v-model="date" valueFormat="YYYY-MM-DD" placeholder="" :disabled-date="disabledDate" v-validate="'required'" name="date" />
                    </float-label>
                    <span v-show="errors.has('date')" class="help is-danger">Preferred pick up date is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false" label="Preferred pick up time">
                        <div class="select">
                            <select name="time" v-model="time" v-validate="'required'">
                                <option v-for="(item,index) in timeschedule" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('time')" class="help is-danger">Preferred pick up time is required</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <div class="control">
                    <gmap-autocomplete :destination="dropoffpoint" @address_res="handleAddr" label="Preferred delivery point(optional)" :verified="verified"></gmap-autocomplete>
                    <input type="hidden" v-model="dropoffpoint" name="drop_off">
                </div>
            </div>
        </div>
        <div class="columns" v-if="verified">
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
                    <float-label label="Preferred delivery date" :fixed="delivery_date==null?false:true">
                        <a-date-picker format="YYYY-MM-DD" v-model="delivery_date" placeholder="" v-validate="'required'" name="delivery_date" />
                    </float-label>
                    <span v-show="errors.has('delivery_date')" class="help is-danger">Approx. delivery date and time is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false" label="Preferred delivery time">
                        <div class="select">
                            <select name="delivery_time" v-model="delivery_time" v-validate="'required'">
                                <option v-for="(item,index) in timeschedule" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('delivery_time')" class="help is-danger">Preferred delivery time is required</span>
                </div>
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
            <div class="column is-6">
                <div class="field has-addons">
                    <div class="control">
                        <float-label label="Asking amount">
                            <input type="number" min="0" class="input is-primary-focus" name="asking amount" v-model="amount" v-validate="'required'">
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
                <span v-show="errors.has('asking amount')" class="help is-danger">Asking amount is required</span>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false" label="Size of package prefer to carry">
                        <div class="select">
                            <select name="packagetype" v-model="packagetype">
                                <option v-for="(item,index) in ptype" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('packagetype')" class="help is-danger">Size of package is required</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false" label="Weight willing to carry">
                        <div class="select">
                            <select name="weight" v-model="weight" v-validate="'required'">
                                <option v-for="(item,index) in weights" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('weight')" class="help is-danger">Weight is required</span>
                </div>
            </div>
        </div>
        <div class="columns is-mobile">
            <div class="column is-12">
                <div style="display: inline-flex;">
                    <label class="label">Are you using your own vehicle?</label>
                    <div class="control">
                        <ul class="leftx" style="display: inline-flex;">
                            <li style="margin-left:10px;">
                                <vs-radio v-model="ownvehicle" vs-value="1">Yes</vs-radio>
                            </li>
                            <li style="margin-left:10px;">
                                <vs-radio v-model="ownvehicle" vs-value="0">No</vs-radio>
                            </li>
                        </ul>
                    </div>
                </div>
                <input type="" v-model="ownvehicle" type="hidden" v-validate="'required'" name="vehicle">
                <span v-show="errors.has('vehicle')" class="help is-danger">Please select an option</span>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="control">
                    <float-label label="Note">
                        <textarea class="textarea is-primary-focus" v-model="details" rows="4"></textarea>
                    </float-label>
                </div>
            </div>
        </div>
        <div class="mt-10 has-text-right" v-if="verified">
            <button @click="submit" v-bind:class="(loading)?'button info-btn raised is-loading':'button info-btn raised'">Submit
            </button>
        </div>
        <div class="mt-20" v-else>
            <label class="label">For security, you need to <router-link target="_blank" :to="{name:'nidinfo'}">provide</router-link> your National/Govt id to post.</label>
        </div <info-required v-if="provideNidInfo" :title="title" />
    </section>
</template>
<script>
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCdu3RozRNnds9nOhMTPs-ETTWLlV1C-EE',
        libraries: 'places',
    },
});
import moment from "moment";
import { DatePicker } from 'ant-design-vue';
import { TimePicker } from 'ant-design-vue';
Vue.use(DatePicker);
Vue.use(TimePicker);
import gmapAutocomplete from '../global/gmapautocomplete'
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: true,
})
export default {
    components: {
        infoRequired: () => import('@/components/global/InfoRequired'),
        gmapAutocomplete,
        DatePicker
    },
    data() {
        return {
            moment: moment,
            premium: true,
            post_type: 'carry_package',
            pickuppoint: '',
            dropoffpoint: '',
            start_Marker: true,
            end_Marker: true,
            s_lat: null,
            s_lng: null,
            d_lat: null,
            d_lng: null,
            date: null,
            time: null,
            document: null,
            ownvehicle: '',
            currencychanged: false,
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
            details: '',
            delivery_date: null,
            delivery_time: null,
            deliverydatetime: '',
            weight: '',
            packagetype: null,
            amount: '',
            vehicle: '',
            distance: '',
            duration: '',
            myVehicles: [],
            timeschedule: [
                'Before  6:00 a.m.',
                'Between 6:00 a.m. - 6:30 a.m.',
                'Between 6:30 a.m. - 7:00 a.m.',
                'Between 7:00 a.m. - 7:30 a.m.',
                'Between 7:30 a.m. - 8:00 a.m.',
                'Between 8:00 a.m. - 8:30 a.m.',
                'Between 8:30 a.m. - 9:00 a.m.',
                'Between 9:00 a.m. - 9:30 a.m.',
                'Between 9:30 a.m. - 10:00 a.m.',
                'Between 10:00 a.m. - 10:30 a.m.',
                'Between 10:30 a.m. - 11:00 a.m.',
                'Between 11:00 a.m. - 11:30 a.m.',
                'Between 11:30 a.m. - 12:00 p.m.',
                'Between 12:00 p.m. - 12:30 p.m.',
                'Between 12:30 p.m. - 1:00 p.m.',
                'Between 1:00 p.m. - 1:30 p.m.',
                'Between 1:30 p.m. - 2:00 p.m.',
                'Between 2:00 p.m. - 2:30 p.m.',
                'Between 2:30 p.m. - 3:00 p.m.',
                'Between 3:00 p.m. - 3:30 p.m.',
                'Between 3:30 p.m. - 4:00 p.m.',
                'Between 4:00 p.m. - 4:30 p.m.',
                'Between 4:30 p.m. - 5:00 p.m.',
                'Between 5:00 p.m. - 5:30 p.m.',
                'Between 5:30 p.m. - 6:00 p.m.',
                'Between 6:00 p.m. - 6:30 p.m.',
                'Between 6:30 p.m. - 7:00 p.m.',
                'Between 7:00 p.m. - 7:30 p.m.',
                'Between 7:30 p.m. - 8:00 p.m.',
                'After  8:00 p.m.',
            ],
            ptype: [
                'Small package (perishable items)',
                'Small package (non-perishable items)',
                'Medium package (perishable items)',
                'Medium package (non-perishable items)',
                'Large package (perishable items)',
                'Large package (non-perishable items)',
            ],
            weights: [
                '0-1Kg',
                '1-2Kg',
                '2-3Kg',
                '3-4kg',
                '4-5kg',
                '5-10 or more'
            ],
            loading: false,
            provideNidInfo: false,
            title: '',
            postdata: {
                module: "ship",
                type: "carry_package"
            },
            savepost: null
        }
    },
    computed: {
        verified() {
            return this.$store.getters.user.status == 'verified'
        },
        id() {
            return this.$store.getters.user.id
        },
        usercurrency() {
            return this.$store.getters.user.currency
        },
        usercountry() {
            return this.$store.getters.user.country
        },
        queryString() {
            return Object.keys(this.postdata)
                .map(k => `${k}=${this.postdata[k]}`)
                .join('&');
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
        EventBus.$on('CarryPackageRepost', (info) => {
            this.pickuppoint = info.start_point
            this.dropoffpoint = info.destination
            this.amount = info.amount
            this.document = info.documents
            this.packagetype = info.package_type
            this.details = info.details
            this.weight = info.weight
            this.getRoute()
        })

        this.$refs.xyz.$mapPromise.then(() => {
            this.directionsService = new google.maps.DirectionsService()
            this.directionsDisplay = new google.maps.DirectionsRenderer()
            this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
        })
    },


    created() {

    },
    methods: {
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
                    for (var i = 0; i < moment().minute() + 3; i++) {
                        minutes.push(i);
                    }
                }
                return minutes;
            }
        },
        disabledDateTime() {
            return {
                disabledHours: () => this.disabledHours(),
            };
        },
        handleAddr(data) {
            if (data.field == "Pick up point") {
                this.pickuppoint = data.address
                this.getRoute();
            } else if (data.field == "Preferred delivery point(optional)") {
                this.dropoffpoint = data.address
                this.getRoute();
            }
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
                origin: this.pickuppoint,
                destination: this.dropoffpoint,
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
                            vm.pickuppoint = results[0].formatted_address;
                            EventBus.$emit('setstartlocation', vm.pickuppoint)
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
                            vm.dropoffpoint = results[0].formatted_address;
                            EventBus.$emit('setendlocation', vm.dropoffpoint)
                            vm.getRoute()
                        }
                    }
                });
            });

        },


        loadV() {
            if (this.myVehicles.length > 0) {

            } else {
                this.$axios.get(`getvehiclesinfo/${this.id}`)
                    .then(res => {
                        this.myVehicles = res.data.data;

                    })
                    .catch(error => console.log(error.res.data))
            }
        },
        getPhoto() {
            let photo = "images/circle.gif";
            return photo;
        },

        // retrivePost() {
        //     this.$axios.get(`/retrivepost?${this.queryString}`)
        //         .then(res => {
        //             this.pickuppoint = res.data.data.start_point
        //             this.dropoffpoint = res.data.data.destination
        //             this.amount = res.data.data.amount
        //             this.document = res.data.data.documents
        //             this.packagetype = res.data.data.package_type
        //             this.details = res.data.data.details
        //             this.weight = res.data.data.weight
        //             this.ownvehicle=res.data.data.own_vehicle
        //             this.getRoute()
        //         })
        // },

        submit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.loading = true
                    this.$axios.post('ship', {
                            post_type: this.post_type,
                            id: this.id,
                            pickuppoint: this.pickuppoint,
                            dropoffpoint: this.dropoffpoint,
                            date: this.date,
                            time: this.time,
                            vehicle: this.vehicle,
                            distance: this.distance,
                            duration: this.duration,
                            amount: this.amount,
                            notes: this.details,
                            country: this.country,
                            currency: this.currency,
                            delivery_date: this.delivery_date,
                            delivery_time: this.delivery_time,
                            packagetype: this.packagetype,
                            weight: this.weight,
                            ownvehicle: this.ownvehicle
                        })
                        .then((res) => {
                            EventBus.$emit('CloseRepost')
                            this.loading = false
                            Toast.fire({
                                type: 'success',
                                text: 'Your "Carry a package" post is successful',
                            })
                            const clear = async () => {
                                this.pickuppoint = ''
                                this.dropoffpoint = ''
                                this.date = ''
                                this.time = ''
                                this.vehicle = ''
                                this.goodtype = ''
                                this.amount = ''
                                this.details = ''
                                this.delivery_date = ''
                                this.delivery_time = ''
                                this.packagetype = ''
                                this.weight = ''
                                this.savepost = null
                                this.ownvehicle = null
                            }
                            clear().then(() => {
                                this.$validator.reset()
                            })
                            EventBus.$emit('removedata')
                            EventBus.$emit('updateCarryPackageList')

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
                                    text: 'Oops,somwthing went wrong.Please check again',
                                    position: 'top-right',
                                    color: 'danger'
                                });
                            }
                        });

                }
            })
        },
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
        // 'datetime': function(val) {
        //     this.datetime = val
        //     this.deliverydatetime = moment(val, "YYYY-MM-DD h:mm A").format("YYYY-MM-DD HH:mm:ss")
        // }
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

.button.info-btn:hover {
    color: #fff !important;
}

.is-6:first-child {
    padding-right: 0px;
}

.con-vs-checkbox {
    justify-content: start;
}

.button.light-raised:hover {
    box-shadow: 0 3px 10px 4px rgba(0, 0, 0, 0.04);
}

.restrict {
    font-size: 1em;
}
</style>