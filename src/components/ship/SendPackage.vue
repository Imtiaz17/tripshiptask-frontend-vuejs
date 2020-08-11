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
                    <float-label label="Date you plan to mail the item" :fixed="date==null?false:true">
                        <a-date-picker v-model="date" valueFormat="YYYY-MM-DD" placeholder="" :disabled-date="disabledDate" v-validate="'required'" name="date" />
                    </float-label>
                    <span v-show="errors.has('date')" class="help is-danger">Preferred mailing date is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false" label="Time you plan to mail the item">
                        <div class="select">
                            <select name="time" v-model="time" v-validate="'required'">
                                <option v-for="(item,index) in timeschedule" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('time')" class="help is-danger">Preferred mailing time is required</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <div class="control">
                    <gmap-autocomplete :destination="dropoffpoint" @address_res="handleAddr" label="Drop off point" :verified="verified"></gmap-autocomplete>
                    <input type="hidden" v-model="dropoffpoint" v-validate="'required'" name="drop_off">
                    <span v-show="errors.has('drop_off')" class="help is-danger">Drop off point is required</span>
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
                    <float-label label="Preferred delivery date" :fixed="delivery_date==null?false:true">
                        <a-date-picker format="YYYY-MM-DD" v-model="delivery_date" placeholder="" v-validate="'required'" :disabled-date="disabledDate" name="delivery_date" />
                    </float-label>
                    <span v-show="errors.has('delivery_date')" class="help is-danger">Preferred delivery date is required</span>
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
                        <float-label label="Willing to pay">
                            <input type="number" min="0" class="input is-primary-focus" name="amount" v-model="amount" v-validate="'required'">
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
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label label="What are you sending?">
                        <input type="text" class="input is-primary-focus" name="document" v-model="document" v-validate="'required'">
                    </float-label>
                    <span v-show="errors.has('document')" class="help is-danger">Description of goods is required</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false" label="Type of goods">
                        <div class="select">
                            <select name="goods_type" v-model="goodtype">
                                <option v-for="(item,index) in gtype" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('goods_type')" class="help is-danger">Type of goods is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label label="Approx. value of the goods">
                        <input type="number" min="0" class="input is-primary-focus" name="document_worth" v-model="document_worth" v-validate="'required|numeric'">
                    </float-label>
                    <span v-show="errors.has('document_worth')" class="help is-danger">Approx. value of the goods is required</span>
                </div>
            </div>
        </div>
        <div class="columns" v-if="measure">
            <div class="column">
                <input class="input is-primary-focus" placeholder="length in inches" type="text" v-model="length">
            </div>
            <div class="column">
                <input class="input is-primary-focus" placeholder="width in inches" type="text" v-model="width">
            </div>
            <div class="column">
                <input class="input is-primary-focus" placeholder="height in inches" type="text" v-model="height">
            </div>
        </div>
        <div class="columns">
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false" label="Packaging type">
                        <div class="select">
                            <select name="package_type" v-model="packagetype" v-validate="'required'">
                                <option v-for="(item,index) in ptype" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('package_type')" class="help is-danger">Package type is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="field has-addons">
                    <div class="control">
                        <float-label label="Weight of package">
                            <input type="number" min="0" class="input is-primary-focus" name="weight" v-model="weight">
                        </float-label>
                    </div>
                    <div class="control">
                        <span class="select">
                            <select>
                                <option>KG</option>
                                <option>Lbs</option>
                            </select>
                        </span>
                    </div>
                </div>
                <span v-show="errors.has('weight')" class="help is-danger">Weight of package is required</span>
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
        <div class="mt-20" v-if="countryrestriction">
            <label class="label">For security, you need to <router-link target="_blank" :to="{name:'nidinfo'}">provide</router-link> your National/Govt id to post.</label>
        </div>
        <div class="mt-10 has-text-right" v-else>
            <button @click="submit" v-bind:class="(loading)?'button info-btn raised is-loading':'button info-btn raised'">Submit
            </button>
        </div>
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
import gmapAutocomplete from '../global/gmapautocomplete'
import { DatePicker } from 'ant-design-vue';
import { TimePicker } from 'ant-design-vue';
Vue.use(DatePicker);
Vue.use(TimePicker);
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
const dictionary = {
    en: {
        messages: {
            numeric: () => 'Numbers only'
        }
    },
};
Vue.use(VeeValidate);
Validator.localize(dictionary);
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
        gmapAutocomplete,
        DatePicker
    },
    data() {
        return {
            moment: moment,
            premium: true,
            place: false,
            post_type: 'send_package',
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
            measure: false,
            packagetype: null,
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
            goodtype: null,
            document: '',
            document_worth: '',
            details: '',
            distance: '',
            duration: '',
            delivery_date: null,
            delivery_time: null,
            deliverydatetime: '',
            amount: '',
            length: '',
            width: '',
            height: '',
            weight: '',
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
                'Small Envelope',
                'Large Envelope',
                'Small package (perishable items)',
                'Small package (non-perishable items)',
                'Medium package (perishable items)',
                'Medium package (non-perishable items)',
                'Large package (perishable items)',
                'Large package (non-perishable items)',
            ],
            gtype: [
                'Perishable',
                'Non-perishable',
            ],
            loading: false,
            postdata: {
                module: "ship",
                type: "send_package"
            },
            savepost: null,
            verified: true
        }
    },
    mounted() {
        if (this.usercountry == 'USA') {
            this.currencychanged = true
            this.country = 'USA'
        }
        EventBus.$on('SendPackageRepost', (info) => {
            this.pickuppoint = info.start_point
            this.dropoffpoint = info.destination
            this.amount = info.amount
            this.document = info.documents
            this.goodtype = info.good_type
            this.document_worth = info.document_price
            this.packagetype = info.package_type
            this.notes = info.details
            this.weight = info.weight
            this.length = info.length
            this.width = info.width
            this.height = info.height
            this.getRoute()
        })
        this.$refs.xyz.$mapPromise.then(() => {
            this.directionsService = new google.maps.DirectionsService()
            this.directionsDisplay = new google.maps.DirectionsRenderer()
            this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
        })
    },

    computed: {
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
        countryrestriction() {
            return this.$store.getters.user.status !== 'verified' && this.$store.getters.user.country == 'KE'
        },
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
                this.s_lat = data.latitude
                this.s_lng = data.longitude
                this.getRoute();
            } else if (data.field == "Drop off point") {
                this.dropoffpoint = data.address
                this.d_lat = data.latitude
                this.d_lng = data.longitude
                this.getRoute();
            }
        },

        key() {
            if (this.pickuppoint === '') {
                this.place = false
            } else
                this.place = true

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
                            packagetype: this.packagetype,
                            goodtype: this.goodtype,
                            document: this.document,
                            amount: this.amount,
                            notes: this.details,
                            delivery_date: this.delivery_date,
                            delivery_time: this.delivery_time,
                            length: this.length,
                            width: this.width,
                            height: this.height,
                            weight: this.weight,
                            country: this.country,
                            currency: this.currency,
                            distance: this.distance,
                            duration: this.duration,
                            document_worth: this.document_worth,
                        })
                        .then((res) => {
                            EventBus.$emit('CloseRepost')
                            this.loading = false
                            Toast.fire({
                                type: 'success',
                                text: 'Your "Send a package" post is successful',
                            })
                            const clear = async () => {
                                this.pickuppoint = ''
                                this.dropoffpoint = ''
                                this.date = ''
                                this.time = ''
                                this.packagetype = ''
                                this.goodtype = ''
                                this.document = ''
                                this.amount = ''
                                this.details = ''
                                this.delivery_date = ''
                                this.delivery_time = ''
                                this.length = ''
                                this.width = ''
                                this.height = ''
                                this.distance = ''
                                this.duration = ''
                                this.weight = ''
                                this.document_worth = ''
                            }
                            clear().then(() => {
                                this.$validator.reset()
                            })
                            EventBus.$emit('removedata')
                            EventBus.$emit('updateSendPackageList')
                        })
                        .catch(error => {
                            this.loading = false
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
        'datetime': function(val) {
            this.datetime = val
            this.deliverydatetime = moment(val, "YYYY-MM-DD h:mm A").format("YYYY-MM-DD HH:mm:ss")
        },
        packagetype: function(val) {
            this.measure = false
            if (this.packagetype == 'Small Envelope' || this.packagetype == 'Large Envelope') {
                this.measure = false
            } else {
                this.measure = true
            }


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

.button.info-btn:hover {
    color: #fff !important;
}

.con-vs-checkbox {
    justify-content: start;
}

.is-6:first-child {
    padding-right: 0px;
}

.button.light-raised:hover {
    box-shadow: 0 3px 10px 4px rgba(0, 0, 0, 0.04);
}
</style>