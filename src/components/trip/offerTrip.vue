<template>
    <section>
        <div class="columns">
            <div class="column is-12" style="margin-top:20px;">
                <div class="control">
                    <gmap-autocomplete @address_res="handleAddr" placeholder="Start point" :premium="premium"></gmap-autocomplete>
                    <input type="hidden" v-model="start" v-validate="'required'" name="start point">
                    <span class="material-icons" @click="showMidPoint" style="position: absolute;right: 9px;top:10px;font-size: 16px;cursor: pointer;">add_circle_outline</span>
                    <span v-show="errors.has('start point')" class="help is-danger">Start point is required</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top:-33px;margin-bottom:0px">
            <div class="column">
                <a style="float:right;font-size:12px;color:#039BE5" v-show="start_Marker" @click="startMarker" type="submit">Set on map
                </a>
            </div>
        </div>
        <div class="columns" style="margin-top: -18px;margin-bottom: 0px;">
            <div class="column is-6">
                <div class="control">
                    <float-label label="Select Date" fixed>
                        <date-picker v-model="date" valueType="format" v-validate="'required'" name="date"></date-picker>
                    </float-label>
                    <span v-show="errors.has('date')" class="help is-danger">Date is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label label="Select Time" fixed>
                        <date-picker v-model="offertime" format="hh:mm a" type="time" valueType="format" v-validate="'required'" name="time"></date-picker>
                    </float-label>
                    <span v-show="errors.has('time')" class="help is-danger">Time is required</span>
                </div>
            </div>
        </div>
        <div class="columns" v-show="midpoint" style="margin-top:4px">
            <div class="column">
                <div class="control">
                    <gmap-autocomplete @address_res="handleAddr" placeholder="Mid Point" :premium="premium"></gmap-autocomplete>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top:-7px">
            <div class="column is-12">
                <div class="control">
                    <gmap-autocomplete @address_res="handleAddr" placeholder="Destination" :premium="premium"></gmap-autocomplete>
                    <input type="hidden" v-model="destination" v-validate="'required'" name="destination">
                    <span v-show="errors.has('destination')" class="help is-danger">Destination is required</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top:-33px">
            <div class="column">
                <a style="float:right;font-size:12px;color:#039BE5" v-show="end_Marker" @click="endMarker" type="submit">Set on map
                </a>
            </div>
        </div>
        <div class="columns" style="margin-top:-8px;padding:0px 10px;">
            <GmapMap :center="{lat:23.746466,lng:90.376015}" ref="xyz" :zoom="12" map-type-id="terrain" style="width:100%; height:200px"> </GmapMap>
        </div>
        <div class="columns is-mobile" style="margin-top:0px;">
            <div class="column is-5">
                <div class="control">
                    <float-label :dispatch="false" label="Select vehicle" fixed>
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
                    <float-label :dispatch="false" label="Passenger you want to carry" fixed>
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
        </div>
        <div class="columns is-mobile" style="margin-top:-5px;">
            <div class="column is-8">
                <div style="display: inline-flex;">
                    <label class="label">Do you own this vehicle?</label>
                    <div class="control">
                        <ul class="leftx" style="display: inline-flex;">
                            <li style="margin-left:10px;">
                                <vs-radio vs-name="radios1" vs-value="yes" @change="yes">Yes</vs-radio>
                            </li>
                            <li style="margin-left:10px;">
                                <vs-radio vs-name="radios1" vs-value="no" @change="no">No</vs-radio>
                            </li>
                        </ul>
                    </div>
                </div>
                <input type="" v-model="radio" type="hidden" v-validate="'required'" name="vehicle">
                <span v-show="errors.has('vehicle')" class="help is-danger">Please select an option</span>
            </div>
            <div class="column is-4" v-if="ownCar" style="margin-top:7px;padding:0px; margin-left: -18px;">
                <div class="control" v-if="myVehicles.length>0">
                    <float-label :dispatch="false"  label="Select vehicle" fixed>
                        <div class="select">
                            <select name="Select vehicle" v-model="vehicle">
                                <option v-for="item,index in myVehicles" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                </div>
                <div class="control" v-else-if="myVehicles.length==0" style="margin-top:5px;padding-left: 18px;">
                    <span style="color:red">No vehicle found</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top:-5px;">
            <div class="column is-6">
                <div class="control">
                    <float-label  label="Asking Fare (for each person)" fixed>
                        <input type="number" min="0" class="input is-primary-focus" name="offer amount" v-model="pay" v-validate="'required'">
                    </float-label>
                    <span v-show="errors.has('offer amount')" class="help is-danger">Asking amount is required</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-10">
                <div class="control">
                    <float-label  label="Note" fixed>
                        <textarea class="textarea is-primary-focus" v-model="details" rows="4"></textarea>
                    </float-label>
                </div>
            </div>
        </div>
        <div class="mt-20 has-text-right">
            <!--  <el-button type="primary" icon="el-icon-edit"></el-button> -->
            <button @click="submit" v-bind:class="(loading)?'button btn-align info-btn raised is-loading':'button btn-align info-btn raised'">Submit
            </button>
        </div>
    </section>
</template>
<script>
import Vue from 'vue';
import moment from "moment";
import VeeValidate from 'vee-validate';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
Vue.use(VeeValidate);

export default {
    components: {
        gmapAutocomplete: () => import('../global/gmapautocomplete'),
        DatePicker
    },
    data() {
        return {
            moment: moment,
            premium: true,
            place: false,
            placeholder: false,
            address: " ",
            post_type: 'offer',
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
                '4',
                '5',
                '6',
                '7'
            ],
            radio: '',
            config: {
                minDate: new Date(),
                altInput: true,
                enableTime: false,
                dateFormat: "Y-m-d",
            },
            config1: {
                altInput: true,
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
            },
            offertime: '',
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
            path: [],
            vehicle_type: null,
            midpoint: false,
            start: '',
            date: '',
            time: '',
            mid: '',
            distance: '',
            duration: '',
            destination: '',
            vehicle: '',
            vehicle_seat: null,
            pay: '',
            details: '',
            loading: false

        }
    },
    computed: {

    },

    mounted() {

        this.$refs.xyz.$mapPromise.then(() => {
            this.directionsService = new google.maps.DirectionsService()
            this.directionsDisplay = new google.maps.DirectionsRenderer()
            this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
        })
    },

    methods: {
        handleAddr(data) {
            if (data.field == "Start point") {
                this.start = data.address
                this.getRoute();
            } else if (data.field == "Destination") {
                this.destination = data.address
                this.getRoute();
            } else {
                this.mid = data.address
                this.getRoute();
            }
        },
        val() {
            d = document.getElementById("date").value;
            alert(d);
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
                            $('#des').val(results[0].formatted_address);
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
                console.log(response)
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

        showMidPoint() {
            this.midpoint = !this.midpoint

        },
        clear() {
            this.start = "",
                this.date = ""
        },

        loadV() {

            this.$axios.post(`vehicles/${this.id}`, {
                    ve: this.vehicle_type,
                    id: this.id
                })
                .then(res => {
                    this.myVehicles = res.data;

                })
                .catch(error => console.log(error.res.data))
        },
        getPhoto() {
            let photo = "images/circle.gif";
            return photo;
        },
        yes() {
            this.radio = "true"
            this.ownCar = true
            this.rentCar = false
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
                            start: this.start,
                            date: this.date,
                            time: this.time,
                            destination: this.destination,
                            distance: this.distance,
                            duration: this.duration,
                            via: this.mid,
                            vehicle: this.vehicle,
                            vehicle_seat: this.vehicle_seat,
                            pay: this.pay,
                            details: this.details,
                            type: this.vehicle_type,
                            path: this.path
                        })
                        .then((res) => {
                            this.loading = false
                            this.$vs.notify({
                                title: 'Success',
                                text: 'Your "Give a ride" post is successful',
                                position: 'top-right',
                                color: 'success'
                            })
                            EventBus.$emit('removedata')
                            EventBus.$emit('updateOfferTrips')
                            const clear = async () => {
                                this.date = ''
                                this.time = ''
                                this.vehicle = ''
                                this.vehicle_seat = ''
                                this.pay = ''
                                this.radio = ''
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
        vehicle_type: function(val) {
            this.vehicle_seat = ''
            this.vseat = [1, 2, 3, 4, 5, 6, 7]
            if (this.vehicle_type == 'Car') {
                this.vseat.splice(4, 3)
            }
            if (this.vehicle_type == 'Motorcycle' || this.vehicle_type == 'Electric Scooter') {
                this.vseat.splice(1, 6)
            }
            if (this.vehicle_type == 'CNG') {
                this.vseat.splice(3, 4)
            }
            if (this.vehicle_type == 'Rickshaw') {
                this.vseat.splice(2, 5)
            }
            this.myVehicles = []
            this.own = true
            this.loadV()

        },
        offertime: function(val) {
            this.time = moment(val, "h:mm A").format("HH:mm:ss")
        },
        start: function(val) {
            this.start = val
        },
        mid: function(val) {
            this.mid = val
            if (!val) {
                this.mid = ''
            }
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

.input-select-label-primary--active {
    color: #363636;
}

.label {
    color: gray;
}
</style>
</script>