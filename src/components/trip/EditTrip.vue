<template>
    <vs-row vs-justify="center">
        <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <vs-card>
                <div slot="header" class="editheader">
                    <h3 style="margin-bottom:0em">
                        Edit your Offered Trip
                    </h3>
                </div>
                <div class="columns">
                    <div class="column">
                        <label class="label">Start Time</label>
                        <div class="control">
                            <gmap-autocomplete :start_point="info.start_point" placeholder="Start point" :premium="premium"  @address_res="handleAddr" ></gmap-autocomplete>
                            <i @click="showMidPoint" class="sl sl-icon-plus" style="position: absolute;right: 9px;top: 6px;font-size: 16px;cursor: pointer;"></i>
                            <span v-show="errors.has('start')" class="help is-danger">{{ errors.first('start') }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <label class="label">Trip Date</label>
                        <div class="control">
                              <date-picker v-model="info.date" valueType="format" placeholder="Select Date"  v-validate="'required'" name="date"></date-picker>
                  
                            <span v-show="errors.has('date')" class="help is-danger">{{ errors.first('date') }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <label class="label">Trip Time:</label>
                         <div class="control">
                         <date-picker v-model="time" format="hh:mm a" type="time" valueType="format" placeholder="Select Time"  v-validate="'required'" name="time"></date-picker>
                     </div>

                        <span v-show="errors.has('time')" class="help is-danger">{{ errors.first('time') }}</span>
                    </div>
                </div>
                <div class="field mt-5" v-if="info.via || midpoint">
                    <label class="label">Mid point:</label>
                    <div class="control">
                        <gmap-autocomplete v-model="info.via" placeholder="Mid point" class="input is-small is-primary-focus" name="midpoint" :premium="premium">
                        </gmap-autocomplete>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-4 mt-5">
                        <label class="label">Destination</label>
                        <div class="control">
                             <gmap-autocomplete :destination="info.destination" placeholder="Destination" :premium="premium"  @address_res="handleAddr" ></gmap-autocomplete>
                           <!--  <span v-show="errors.has('destination')" class="help is-danger">{{ errors.first('destination') }}</span> -->
                        </div>
                    </div>
                    <div class="column is-4" style="display:inline-flex;    margin-top: 32px;">
                        <label class="label">Distance: </label>
                        <label class="ddinfo"> {{info.distance}}</label>
                    </div>
                    <div class="column is-4" style="display:inline-flex;    margin-top: 32px;">
                        <label class="label">Duration:</label>
                        <label class="ddinfo"> {{info.duration}}</label>
                    </div>
                </div>
                <div class="field mt-20">
                    <GmapMap :center="{lat:23.746466,lng:90.376015}" ref="xyz" :zoom="12" map-type-id="terrain" style="width:100%; height:300px"> </GmapMap>
                </div>
                <div class="columns" style="margin-top:5px;">
                    <div class="column mt-5">
                        <label class="label">Vehicle type</label>
                        <div class="control">
                            
                                <div class="select is-small">
                                    <select name="vehicle type" v-model="info.vehicle_type" v-validate="'required'" v-on:change="loadV" placeholder="Vehicle type">
                                        <option v-for="(vehicle,index) in voptions" :key="index" :value="vehicle">{{vehicle}}</option>
                                    </select>
                                </div>
                           
                            <span v-show="errors.has('vehicle type')" class="help is-danger">{{ errors.first('vehicle type') }}</span>
                        </div>
                    </div>
                    <div class="column mt-5" style="margin-top: 8px;" v-show="own">
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
                    <div class="column mt-30" v-if="ownCar || info.vehicle_name">
                        <div class="control" v-if="info.vehicle_name || myVehicles.length>0">
                           
                                <div class="select is-small">
                                    <select name="Select vehicle" v-model="info.vehicle_name">
                                        <option v-for="vehicle,index in myVehicles" :key="index" :value="item">{{vehicle}}</option>
                                    </select>
                                </div>
                          
                            <!--   <el-select size="small" v-model="info.vehicle_name">
                                <el-option v-for="vehicle in myVehicles" :key="vehicle" :label="vehicle" :value="vehicle">
                                </el-option>
                            </el-select> -->
                        </div>
                        <div class="control" v-else-if="myVehicles.length==0">
                            <span style="color:red">No vehicles found</span>
                        </div>
                    </div>
                    <div class="column mt-5" v-if="info.post_type=='offer'">
                        <label class="label">How many passenger?</label>
                        <div class="control">
                            
                                <div class="select is-small">
                                    <select name="passenger_number" v-model="info.seat">
                                        <option v-for="(item,index) in passengers" :key="index" :value="item">{{item}}</option>
                                    </select>
                                </div>
                            
                            
                            <span v-show="errors.has('passenger_number')" class="help is-danger">{{ errors.first('passenger_number') }}</span>
                        </div>
                    </div>
                    <div class="column mt-5" v-else>
                        <label class="label">How many of you?</label>
                        <div class="control">
                            
                                <div class="select is-small">
                                    <select name="passenger_number" v-model="info.seat">
                                        <option v-for="(item,index) in vseat" :key="index" :value="item">{{item}}</option>
                                    </select>
                                </div>
                            
                            
                            <span v-show="errors.has('passenger_number')" class="help is-danger">{{ errors.first('passenger_number') }}</span>
                        </div>
                    </div>
                   
                </div>
                <div class="columns">
                     <div class="column is-3 mt-5">
                        <label class="label">Willing to pay</label>
                        <div class="control">
                            <input class="input is-small is-primary-focus " type="text" v-model="info.pay" name="pay amount" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('pay') }">
                            <span v-show="errors.has('pay amount')" class="help is-danger">{{ errors.first('pay amount') }}</span>
                        </div>
                    </div>

                    <div class="column is-6 mt-5">
                        <label class="label">Details</label>
                        <div class="control">
                            <textarea class="textarea is-primary-focus" placeholder="write details about your ride" rows="3" v-model="info.details" name="details" :class="{'input': true, 'is-danger': errors.has('details') }"></textarea>
                        </div>
                    </div>
                    <div class="column is-3" style="margin-top: 100px;">
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
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
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
        DatePicker
    },
    props: ['info'],
    data() {
        return {
            moment:moment,
            premium: true,
            path: this.info.path,
            post_type: 'seek',
            id: '',
            voptions: [
                'Car',
                'Mini van',
                'Motorcycle',
                'Electric Scooter',
                'CNG',
                'Rickshaw',
                'Bicycle'
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
            own: false,
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
    created()
    {
         this.time=moment(this.info.time, "HH:mm:ss").format("hh:mm a")
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
            this.$axios.post(`vehicles/${this.info.user_id}`, {
                    ve: this.info.vehicle_type,
                    id: this.info.user_id
                })
                .then(res => {
                    this.myVehicles = res.data;

                })
                .catch(error => console.log(error.res.data))
        },
        yes() {
            this.ownCar = true
            this.rentCar = false
        },
        no() {
            this.ownCar = false
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
        'time':function(val){
            this.info.time = moment(val, "hh:mm a").format("HH:mm:ss")
        },
        'info.vehicle_type': function(val) {
            this.myVehicles = []
            this.own = true
            this.info.vehicle_name = ""
            this.loadV()
        }
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
select 
{
    width:100%
}
.select{
    width:100%;
}
.ddinfo {
    font-size: 14px;
    margin-left: 3px;

}
</style>