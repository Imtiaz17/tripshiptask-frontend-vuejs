<template>
    <vs-row vs-justify="center">
        <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <vs-card>
                <div slot="header" class="editheader">
                    <h3 style="margin-bottom:0em">
                        Update Your Carry Shipment
                    </h3>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="control">
                            <div class="control">
                                <gmap-autocomplete label="Pick up Point" :start_point="info.start_point" placeholder="Start point" :verified="verified" @address_res="handleAddr"></gmap-autocomplete>
                                <span v-show="errors.has('start')" class="help is-danger">{{ errors.first('start') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="control">
                            <float-label label="Preferred pick up date" fixed>
                                <a-date-picker v-model="info.pickup_date" valueFormat="YYYY-MM-DD" placeholder="" :disabled-date="disabledDate" v-validate="'required'" name="date" />
                            </float-label>
                            <span v-show="errors.has('date')" class="help is-danger">{{ errors.first('date') }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <div class="control">
                            <float-label :dispatch="false" label="Preferred pick up time" fixed>
                                <div class="select">
                                    <select name="time" v-model="info.pickup_time" v-validate="'required'">
                                        <option v-for="(item,index) in timeschedule" :key="index" :value="item">{{item}}</option>
                                    </select>
                                </div>
                            </float-label>
                            <span v-show="errors.has('time')" class="help is-danger">{{ errors.first('time') }}</span>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="control">
                            <gmap-autocomplete label="Drop off Point" :verified="verified" :destination="info.destination" placeholder="Destination" @address_res="handleAddr"></gmap-autocomplete>
                            <span v-show="errors.has('destination')" class="help is-danger">{{ errors.first('destination') }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <div class="control">
                            <float-label :dispatch="false" label="Preferred delivery date & time" fixed>
                                <a-date-picker show-time use12-hours :show-time="{ defaultValue: moment('00:00:00', 'h:mm A') }" format="YYYY-MM-DD h:mm A" v-model="info.delivery_date_time" placeholder="" v-validate="'required'" name="delivery_dt" />
                            </float-label>
                            <span v-show="errors.has('delivery date & time')" class="help is-danger">{{ errors.first('delivery date & time') }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field has-addons">
                            <div class="control">
                                <float-label label="Asking amount">
                                    <input type="number" min="0" class="input is-primary-focus" name="amount" v-model="info.amount" v-validate="'required'">
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
                </div>
                <div class="field mt-20">
                    <GmapMap :center="{lat:23.746466,lng:90.376015}" ref="xyz" :zoom="14" map-type-id="terrain" style="width:100%; height:200px">
                    </GmapMap>
                </div>
                <div class="columns mt-5">
                    <div class="column is-4">
                        <div class="control">
                            <float-label :dispatch="false" label="Size of package you prefer to carry" fixed>
                                <div class="select">
                                    <select name="package_type" v-model="info.package_type" v-validate="'required'">
                                        <option v-for="(item,index) in ptype" :key="index" :value="item">{{item}}</option>
                                    </select>
                                </div>
                            </float-label>
                            <span v-show="errors.has('package type')" class="help is-danger">{{ errors.first('package type') }}</span>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="control">
                            <float-label :dispatch="false" label="Weight you are willing to carry" fixed>
                                <div class="select">
                                    <select name="weight" v-model="info.weight" v-validate="'required'">
                                        <option v-for="(item,index) in weights" :key="index" :value="item">{{item}}</option>
                                    </select>
                                </div>
                            </float-label>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-6">
                        <float-label label="Note" fixed>
                            <textarea class="textarea is-primary-focus" v-model="info.details" rows="4"></textarea>
                        </float-label>
                    </div>
                    <div class="column" style="margin-top: 100px;">
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
Vue.use(VeeValidate, {
    events: 'startPlace'
});
import { DatePicker } from 'ant-design-vue';
import { TimePicker } from 'ant-design-vue';
Vue.use(DatePicker);
Vue.use(TimePicker);
import moment from "moment";
import gmapAutocomplete from '@/components/global/gmapautocomplete';
export default {
    components: {
        gmapAutocomplete,
        DatePicker
    },
    props: ['info'],
    data() {
        return {
            moment: moment,
            verified: true,
            config: {
                altInput: true,
                enableTime: false,
                dateFormat: "Y-m-d",
            },
            config1: {
                altInput: true,
                enableTime: true,
                dateFormat: "Y-m-d H:i",
            },
            duration: '',
            distance: '',
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
            weights: [
                '0-1Kg',
                '1-2Kg',
                '2-3Kg',
                '3-4kg',
                '4-5kg',
                '5-10 or more'
            ],
            vehicles: [],


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
        // getvehicles() {
        //     this.$axios.get(`getvehiclesinfo/${this.info.user_id}`)
        //         .then(res => {
        //             this.vehicles = res.data;
        //         })
        //         .catch(error => console.log(error.res.data))

        // },
        startPlace(place) {
            if (place.name == place.address_components[0].long_name) {
                this.info.pickup = place.formatted_address
            } else {
                this.info.pickup = place.name + "," + place.address_components[0].long_name + "," + place.address_components[2].long_name
            }
            this.getRoute()
        },


        endPlace(place) {
            if (place.name == place.address_components[0].long_name) {
                this.info.dropoff = place.formatted_address
            } else {
                this.info.dropoff = place.name + "," + place.address_components[0].long_name + "," + place.address_components[2].long_name
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
            axios.post(`api/vehicles/${this.info.user_id}`, {
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
                this.$axios.patch(`ship/${this.info.slug}`, this.info)
                    .then((res) => {
                        this.$router.push(res.data.path)
                        setTimeout(() => {
                            this.$axios.get('getCarryShip/' + res.data.slug)
                                .then(res => {
                                    EventBus.$emit('ShipUpdated', res.data.data)
                                }, 0)
                        })

                    })
            }

        },
        cancelUpdate() {
            EventBus.$emit('canceledit')
        }
    },
    watch: {


    }

}
</script>
<style scoped>
.vs-card--content {
    padding: 10px;
    font-size: .8rem;
}

.con-vs-card {
    box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.04);
    border-radius: 0px;
    min-height: 604px
}

.editheader {
    text-align: center;
    padding: 9px !important;
    font-size: 14px;
    color: #2d3436;
    background-color: #FFFFFF;
    margin-bottom: 4px;
}

.ddinfo {
    font-size: 14px;
    margin-left: 3px;

}

.mt-15 {
    margin-top: 15px;
}

.el-select {
    width: 100%;
}
</style>