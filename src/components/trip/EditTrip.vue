<template>
    <vs-row vs-justify="center">
        <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <vs-card>
                <div slot="header" class="editheader">
                    <h3 style="margin-bottom:0em">
                        {{title}}
                    </h3>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="control">
                            <gmap-autocomplete label="Start point" :start_point="info.start_point" placeholder="Start point" :verified="verified" @address_res="handleAddr"></gmap-autocomplete>
                            <i @click="showMidPoint" class="sl sl-icon-plus" style="position: absolute;right: 9px;top: 6px;font-size: 16px;cursor: pointer;"></i>
                            <span v-show="errors.has('start')" class="help is-danger">{{ errors.first('start') }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <div class="control">
                            <float-label label="Select Date" :fixed="info.date==null?false:true">
                                <a-date-picker v-model="info.date" valueFormat="YYYY-MM-DD" placeholder="" :disabled-date="disabledDate" v-validate="'required'" name="date" />
                            </float-label>
                            <span v-show="errors.has('date')" class="help is-danger">{{ errors.first('date') }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <div class="control">
                            <float-label label="Select Time" :fixed="info.time==null?false:true">
                                <a-time-picker use12-hours placeholder="" :disabled-hours="disabledHours" valueFormat="HH:mm:ss" :disabled-minutes="disabledMinutes" format="h:mm a" v-model="info.time" v-validate="'required'" name="time">
                                    <vs-button slot="addon" slot-scope="panel" color="primary" type="filled">Ok</vs-button>
                                </a-time-picker>
                            </float-label>
                            <!-- <float-label label="Trip time">
                                <date-picker v-model="info.time" format="hh:mm a" type="time" valueType="format" placeholder="Select Time" v-validate="'required'" name="time"></date-picker>
                            </float-label> -->
                        </div>
                        <span v-show="errors.has('time')" class="help is-danger">{{ errors.first('time') }}</span>
                    </div>
                </div>
                <div class="field mt-5" v-if="info.via || midpoint">
                    <label class="label">Mid point:</label>
                    <div class="control">
                        <gmap-autocomplete v-model="info.via" placeholder="Mid point" class="input is-small is-primary-focus" name="midpoint" :verified="verified">
                        </gmap-autocomplete>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-4 mt-5">
                        <div class="control">
                            <gmap-autocomplete label="Destination" :destination="info.destination" placeholder="Destination" :verified="verified" @address_res="handleAddr"></gmap-autocomplete>
                            <span v-show="errors.has('destination')" class="help is-danger">{{ errors.first('destination') }}</span>
                        </div>
                    </div>
                    <!-- <div class="column is-2" style="display:inline-flex;margin-top:15px;">
                        <label class="label">Distance: </label>
                        <label class="ddinfo"> {{info.distance}}</label>
                    </div>
                    <div class="column is-2" style="display:inline-flex;margin-top:15px;">
                        <label class="label">Duration:</label>
                        <label class="ddinfo"> {{info.duration}}</label>
                    </div> -->
                    <div class="column is-4 mt-5">
                        <div class="field has-addons">
                            <div class="control">
                                <float-label :label="amountlabel">
                                    <input type="number" min="0" class="input is-primary-focus" name="offer amount" v-model="info.pay" v-validate="'required'">
                                </float-label>
                            </div>
                            <div class="control">
                                <span class="select">
                                    <select v-model="info.currency">
                                        <option :value="info.currency">{{info.currency}}</option>
                                        <option v-if="info.currency !=='USD'" value="USD">USD</option>
                                    </select>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="column is-4 mt-5">
                        <div class="control">
                            <float-label :dispatch="false" fixed :label="preferlabel">
                                <div class="select">
                                    <select name="passenger_gender" v-model="info.preferred_passenger" v-validate="'required'">
                                        <option v-for="(item,index) in passenger_gender" :key="index" :value="item">{{item}}</option>
                                    </select>
                                </div>
                            </float-label>
                        </div>
                    </div>
                </div>
                <div class="field mt-20">
                    <GmapMap :center="{lat:23.746466,lng:90.376015}" ref="xyz" :zoom="12" map-type-id="terrain" style="width:100%; height:300px"> </GmapMap>
                </div>
                <div class="columns mt-5">
                    <div class="column is-3">
                        <div class="control">
                            <float-label :dispatch="false" label="Vehicle type" :fixed='info.vehicle_type?true:false'>
                                <div class="select">
                                    <select name="vehicle type" v-model="info.vehicle_type" v-validate="'required'" placeholder="Vehicle type">
                                        <option v-for="(vehicle,index) in voptions" :key="index" :value="vehicle">{{vehicle}}</option>
                                    </select>
                                </div>
                            </float-label>
                            <span v-show="errors.has('vehicle type')" class="help is-danger">{{ errors.first('vehicle type') }}</span>
                        </div>
                    </div>
                    <div class="column is-3" v-if="info.post_type=='offer'">
                        <div class="control">
                            <float-label :dispatch="false" label="How many passenger?" fixed>
                                <div class="select">
                                    <select name="passenger_number" v-model="info.vehicle_seat">
                                        <option v-for="(item,index) in passengers" :key="index" :value="item">{{item}}</option>
                                    </select>
                                </div>
                            </float-label>
                            <span v-show="errors.has('passenger_number')" class="help is-danger">{{ errors.first('passenger_number') }}</span>
                        </div>
                    </div>
                    <div class="column is-3" v-else>
                        <div class="control">
                            <float-label :dispatch="false" label="How many of you?" fixed>
                                <div class="select">
                                    <select name="passenger_number" v-model="info.vehicle_seat">
                                        <option v-for="(item,index) in vseat" :key="index" :value="item">{{item}}</option>
                                    </select>
                                </div>
                            </float-label>
                            <span v-show="errors.has('passenger_number')" class="help is-danger">{{ errors.first('passenger_number') }}</span>
                        </div>
                    </div>
                    <div class="column is-3" v-show="ownvehicle">
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
                    <div class="column is-3" v-if="ownCar || info.vehicle_name">
                        <div class="control" v-if="veloading">
                            <div>
                                <p>Loading...</p>
                            </div>
                        </div>
                        <div class="control" v-else-if="info.vehicle_name || myVehicles.length>0">
                            <float-label :dispatch="false" label="Select vehicle" fixed>
                                <div class="select">
                                    <select name="Select vehicle" v-model="info.vehicle_name">
                                        <option v-for="item,index in myVehicles" :key="index" :value="item.model?item.model:item">{{item.model?item.model:item}}</option>
                                    </select>
                                </div>
                            </float-label>
                        </div>
                        <div class="control" v-else>
                            <span style="color:red">No vehicles found</span>
                        </div>
                    </div>
                </div>
                <div class="columns" v-if="novehiclestatus && ownvehicle==false">
                    <div class="column">
                        <p style="color:#f14668">You did not add a motor cycle in your profile. Please <router-link :to="{name:'vehicleinfo'}">add</router-link> motor cycle details before you can choose this option</p>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-6">
                        <div class="control">
                            <float-label label="Details" fixed>
                                <textarea class="textarea is-primary-focus" rows="3" v-model="info.details" name="details"></textarea>
                            </float-label>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column" style="margin-top: 50px;">
                        <vs-button type="gradient" style="float:right" @click="cancelUpdate">Cancel</vs-button>
                        <vs-button color="success" type="gradient" style="float:right;margin-right: 13px" @click="update">Update</vs-button>
                    </div>
                </div>
            </vs-card>
        </vs-col>
    </vs-row>
</template>
<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import moment from "moment";
import { DatePicker } from 'ant-design-vue';
import { TimePicker } from 'ant-design-vue';
Vue.use(DatePicker);
Vue.use(TimePicker);
import gmapAutocomplete from '@/components/global/gmapautocomplete';
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    closeButton: 'close-button-class'
})

export default {
    components: {
        gmapAutocomplete,
    },
    props: ['info'],
    data() {
        return {
            moment: moment,
            verified: true,
            path: this.info.path,
            post_type: 'seek',
            id: '',
            voptions: [
                'Car',
                'Mini Van/Micro',
                'Motorcycle',
                'Electric Scooter',
                'CNG',
                'Rickshaw',
            ],
            passengers: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7'
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
            passenger_gender: [
                'Male',
                'Female',
                'Any'
            ],
            config: {
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
            start_Marker: true,
            end_Marker: true,
            isLoading: false,
            coordinates: null,
            ownvehicle: false,
            novehiclestatus: false,
            veloading: false,
            ownCar: false,
            rentCar: false,
            myVehicles: [],
            vlength: '',
            data: '',
            trips: [],
            error: [],
            vehicle_type: '',
            midpoint: false,
            start: '',
            date: '',
            time: '',
            mid: '',
            distance: '',
            duration: '',
            destination: '',
            vehicle: '',
            vehicle_seat: '',
            pay: '',
            details: '',
        }
    },
    created() {
        this.time = moment(this.info.time, "HH:mm:ss").format("hh:mm a")
        if (this.info.vehicle_type == 'Car') {
            this.passengers.splice(4, 3)
        } else if (this.info.vehicle_type == 'Mini Van/Micro') {
            this.passengers = [1, 2, 3, 4, 5, 6, 7]
        } else if (this.info.vehicle_type == 'Motorcycle' || this.info.vehicle_type == 'Electric Scooter') {
            this.passengers.splice(1, 6)
        } else if (this.info.vehicle_type == 'CNG') {
            this.passengers.splice(3, 4)
        } else if (this.info.vehicle_type == 'Rickshaw') {
            this.passengers.splice(1, 6)
        }
        if (this.info.vehicle_name) {
            this.myVehicles.push(this.info.vehicle_name)
        }
    },
    computed: {
        amountlabel() {
            if (this.info.post_type == 'offer') {
                return 'Asking Fare (Each Person)'
            }
            if (this.info.post_type == 'seek') {
                return 'Willing to pay'
            }
        },
        preferlabel() {
            if (this.info.post_type == 'offer') {
                return 'Prefer to get ride to'
            }
            if (this.info.post_type == 'seek') {
                return 'Prefer to get ride from'
            }
        },
        title(){
              if (this.info.post_type == 'offer') {
                return 'Edit your Offered Trip'
            }
            if (this.info.post_type == 'seek') {
                return 'Edit your Seeked Trip'
            }
        }
    },
    mounted() {

        this.$refs.xyz.$mapPromise.then(() => {
            this.directionsService = new google.maps.DirectionsService()
            this.directionsDisplay = new google.maps.DirectionsRenderer()
            this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
            this.getRoute()
        })
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
        handleAddr(data) {
            if (data.field == "Start point") {
                this.info.start_point = data.address
                this.getRoute();
            } else if (data.field == "Destination") {
                this.info.destination = data.address
                this.getRoute();
            } else {
                this.info.via = data.address
                this.getRoute();
            }
        },

        startPlace(place) {
            if (place.name == place.address_components[0].long_name) {
                this.info.start_point = place.formatted_address
            } else {
                this.info.start_point = place.name + "," + place.address_components[0].long_name + "," + place.address_components[2].long_name
            }

            this.getRoute()
        },
        showMidPoint() {
            this.midpoint = !this.midpoint

        },
        midPlace(place) {
            if (place.name == place.address_components[0].long_name) {
                this.info.via = place.formatted_address
            } else {
                this.info.via = place.name + "," + place.address_components[0].long_name + "," + place.address_components[2].long_name
            }
            this.getRoute()

        },

        endPlace(place) {
            if (place.name == place.address_components[0].long_name) {
                this.info.destination = place.formatted_address
            } else {
                this.info.destination = place.name + "," + place.address_components[0].long_name + "," + place.address_components[2].long_name
            }
            this.getRoute()
        },
        cancel() {
            EventBus.$emit('edited')
        },

        getRoute() {
            var vm = this
            var waypts = [];
            var midpoint = this.info.via
            if (midpoint) {
                waypts.push({
                    location: midpoint,
                    stopover: true
                })
            };

            vm.directionsService.route({
                origin: this.info.start_point,
                destination: this.info.destination,
                travelMode: 'DRIVING',
                waypoints: waypts
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    let mile = response.routes[0].legs[0].distance.text;
                    vm.info.distance = mile;
                    let duration = response.routes[0].legs[0].duration.text;
                    vm.info.duration = duration;
                    vm.directionsDisplay.setDirections(response)
                } else {
                    console.log('Directions request failed due to ' + status)
                }

            })
        },
        loadV() {
            if (this.myVehicles.length > 0) {

            } else {
                this.veloading = true
                this.$axios.get(`getvehiclesinfo?vehicle=${this.info.vehicle_type}&user=${this.info.user_id}`)
                    .then(res => {
                        if (res.status == 200) {
                            this.veloading = false
                            this.myVehicles = res.data.data;
                        }
                        if (res.status == 204) {
                            if (this.info.vehicle_type == 'Motorcycle' || this.info.vehicle_type == 'Electric Scooter') {
                                const clear = async () => {
                                    this.info.vehicle_type = null
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
        yes() {
            this.ownCar = true
            this.rentCar = false
            this.loadV()
        },
        no() {
            this.ownCar = false
            this.info.vehicle_name = null
        },
        update() {
            if (this.$validator.validateAll()) {

                this.$axios.patch(`trip/${this.info.slug}`, this.info)
                    .then((res) => {
                        if (res.response = 200) {
                            this.$router.push(res.data.path)
                            setTimeout(() => {
                                this.$axios.get('trip/' + res.data.slug)
                                    .then(res => {
                                        EventBus.$emit('tripupdated', res.data.data)
                                    }, 0)
                            })

                        } else
                            alert('sorry! something went wrong');

                    })
            }

        },
        cancelUpdate() {
            EventBus.$emit('cancelupdate')
        }
    },
    watch: {
        'info.start_point': function(val) {
            this.info.start_point = val
        },
        'time': function(val) {
            this.info.time = moment(val, "hh:mm a").format("HH:mm:ss")
        },
        'info.vehicle_type': function(val) {
            if (this.info.post_type==='offer') {
                this.ownvehicle = false
                this.have = false
                this.passengers = [1, 2, 3, 4, 5, 6, 7]
                if (this.info.vehicle_type == 'Car') {
                    const clear = async () => {
                        this.passengers.splice(4, 3)
                    }
                    clear().then(() => {
                        this.$validator.reset()
                    })
                    this.novehiclestatus = false
                    this.ownvehicle = true
                }
                if (this.info.vehicle_type == 'Mini Van/Micro') {
                    const clear = async () => {
                        this.passengers = [1, 2, 3, 4, 5, 6, 7]
                    }
                    clear().then(() => {
                        this.$validator.reset()
                    })
                    this.novehiclestatus = false
                    this.ownvehicle = true
                }

                if (this.info.vehicle_type == 'Motorcycle' || this.info.vehicle_type == 'Electric Scooter') {
                    const clear = async () => {
                        this.passengers.splice(1, 6)
                    }
                    clear().then(() => {
                        this.$validator.reset()
                    })
                    this.loadV()
                }
                if (this.info.vehicle_type == 'CNG') {
                    const clear = async () => {
                        this.passengers.splice(3, 4)
                    }
                    clear().then(() => {
                        this.radio = 'vehicle'
                        this.$validator.reset()
                    })
                    this.novehiclestatus = false
                    this.ownvehicle = true
                }
                if (this.info.vehicle_type == 'Rickshaw') {

                    const clear = async () => {
                        this.passengers.splice(1, 6)
                    }
                    clear().then(() => {
                        this.radio = 'vehicle'
                        this.$validator.reset()
                    })
                    this.novehiclestatus = false
                    this.ownvehicle = true
                }
                this.myVehicles = []
            }
        },

        // 'info.vehicle_type': function(val) {
        //     this.myVehicles = []
        //     this.own = true
        //     this.info.vehicle_name = ""
        //     this.loadV()
        // }
    }

}
</script>
<style scoped>
.vs-card--content {
    padding: 10px;
    font-size: .8rem;
    margin-bottom: 34px;
}

.con-vs-card {
    box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.04);
    border-radius: 0px;
    min-height: 692px;
}

.editheader {
    text-align: center;
    padding: 9px !important;
    font-size: 14px;
    color: #2d3436;
    background-color: #FFFFFF;
    margin-bottom: 4px;
}

select {
    width: 100%
}

.select {
    width: 100%;
}

.ddinfo {
    font-size: 14px;
    margin-left: 3px;

}
</style>