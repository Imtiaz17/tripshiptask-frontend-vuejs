<template>


    <vs-row vs-justify="center">
        <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <vs-card>
                <div slot="header" class="editheader">
                    <h3 style="margin-bottom:0em">
                        Edit your Shipment
                    </h3>
                </div>
                <div class="columns">
                    <div class="column">
                        <label class="label">Pick up point</label>
                        <div class="control">
                            <div class="control">
                                <gmap-autocomplete placeholder="Ride start point" class="input is-small is-primary-focus" @place_changed="startPlace" data-vv-validate-on="startPlace|required" name="start" id="start">
                                </gmap-autocomplete>
                                <span v-show="errors.has('start')" class="help is-danger">{{ errors.first('start') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <label class="label">Dropoff point</label>
                        <div class="control">
                            <gmap-autocomplete placeholder="destination" v-validate="'required'" name="destination" class="input is-small is-primary-focus" id="des" @place_changed="endPlace">
                            </gmap-autocomplete>
                            <span v-show="errors.has('destination')" class="help is-danger">{{ errors.first('destination') }}</span>
                        </div>
                    </div>
                </div>
                <div class="columns mt-15">
                    <div class="column is-4">
                        <label class="label">What's your preferred pick up date?</label>
                        <div class="control">
                            <div class="control">
                                <flat-pickr class="input is-primary-focus " v-validate="'required'" name="date" :config="config" placeholder="Select a date" :class="{'input': true, 'is-danger': errors.has('date') }" v-model="info.pickup_date"></flat-pickr>
                                <span v-show="errors.has('date')" class="help is-danger">{{ errors.first('date') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="column is-4">
                        <label class="label">What's your preferred pick up time?</label>
                        <div class="control">
                            <el-select name="time" size="small" v-model="info.pickup_time" v-validate="'required'" placeholder="Select Time">
                                <el-option v-for="(time,index) in timeschedule" :key="index" :label="time" :value="time">
                                </el-option>
                            </el-select>
                            <span v-show="errors.has('time')" class="help is-danger">{{ errors.first('time') }}</span>
                        </div>
                    </div>
                    <div class="column is-4">
                        <label class="label">Preferred delivery date & time</label>
                        <div class="control">
                            <flat-pickr class="input is-primary-focus " v-validate="'required'" name="delivery date & time" :config="config1" placeholder="Select a date & time" :class="{'input': true, 'is-danger': errors.has('date') }" v-model="info.delivery_date_time"></flat-pickr>
                            <span v-show="errors.has('delivery date & time')" class="help is-danger">{{ errors.first('delivery date & time') }}</span>
                        </div>
                    </div>
                </div>
                <div class="field mt-20">
                    <GmapMap :center="{lat:23.746466,lng:90.376015}" ref="xyz" :zoom="14" map-type-id="terrain" style="width:100%; height:200px">
                    </GmapMap>
                </div>
                <div class="columns mt-15">
                    <div class="column" v-if="info.post_type=='send_package'">
                        <label class="label">What are you sending?</label>
                        <div class="control">
                            <input class="input is-primary-focus" v-model="info.documents" name="document">
                            <span v-show="errors.has('document')" class="help is-danger">{{ errors.first('document') }}</span>
                        </div>
                    </div>
                    <div class="column" v-else>
                        <label class="label">What do you prefer to carry?</label>
                        <div class="control">
                            <el-select name="package type" size="small" v-model="info.package_type" v-validate="'required'" placeholder="Select package type">
                                <el-option v-for="(item,index) in types" :key="index" :label="item" :value="item">
                                </el-option>
                            </el-select>
                            <span v-show="errors.has('package type')" class="help is-danger">{{ errors.first('package type') }}</span>
                        </div>
                    </div>
                    <div class="column" v-if="info.post_type=='send_package'">
                        <label class="label">Packaging type</label>
                        <div class="control">
                            <el-select name="package type" size="small" v-model="info.package_type" v-validate="'required'" placeholder="Select package type">
                                <el-option v-for="(item,index) in types" :key="index" :label="item" :value="item">
                                </el-option>
                            </el-select>
                            <span v-show="errors.has('package type')" class="help is-danger">{{ errors.first('package type') }}</span>
                        </div>
                    </div>
                    <div class="column" v-else>
                        <label class="label">Packaging size</label>
                        <div class="control">
                            <el-select name="package size" size="small" v-model="info.package_size" v-validate="'required'" placeholder="Select package type">
                                <el-option v-for="(item,index) in sizes" :key="index" :label="item" :value="item">
                                </el-option>
                            </el-select>
                            <span v-show="errors.has('package size')" class="help is-danger">{{ errors.first('package size') }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <label class="label" v-if="info.post_type=='send_package'">Willing to pay</label>
                        <label class="label" v-else> Asking amount</label>
                        <div class="control">
                            <input class="input is-primary-focus" v-model="info.amount" name="amount">
                            <span v-show="errors.has('amount')" class="help is-danger">{{ errors.first('amount') }}</span>
                        </div>
                    </div>
                </div>
                <div class="columns  mt-15" style="margin-bottom: 10px;">
                    <div class="column is-3" v-if="info.post_type=='carry_package'">
                        <label class="label">Vehicle</label>
                        <div class="control">
                            <el-select name="vehicle" size="small" v-model="info.vehicle" v-validate="'required'" placeholder="Select vehicle">
                                <el-option v-for="(item,index) in vehicles" :key="index" :label="item.model" :value="item.model">
                                </el-option>
                            </el-select>
                            <span v-show="errors.has('vehicle')" class="help is-danger">{{ errors.first('vehicle') }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <label class="label">Notes</label>
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
Vue.use(VeeValidate, {
    events: 'startPlace'
});
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import gmapAutocomplete from '@/components/global/gmapautocomplete';
export default {
     components: {
        gmapAutocomplete,
        DatePicker
    },
    props: ['info'],
    data() {
        return {
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
                'before  6:00 a.m.',
                'between 6:00 a.m. - 6:30 a.m.',
                'between 6:30 a.m. - 7:00 a.m.',
                'between 7:00 a.m. - 7:30 a.m.',
                'between 7:30 a.m. - 8:00 a.m.',
                'between 8:00 a.m. - 8:30 a.m.',
                'between 8:30 a.m. - 9:00 a.m.',
                'between 9:00 a.m. - 9:30 a.m.',
                'between 9:30 a.m. - 10:00 a.m.',
                'between 10:00 a.m. - 10:30 a.m.',
                'between 10:30 a.m. - 11:00 a.m.',
                'between 11:00 a.m. - 11:30 a.m.',
                'between 11:30 a.m. - 12:00 p.m.',
                'between 12:00 p.m. - 12:30 p.m.',
                'between 12:30 p.m. - 1:00 p.m.',
                'between 1:00 p.m. - 1:30 p.m.',
                'between 1:30 p.m. - 2:00 p.m.',
                'between 2:00 p.m. - 2:30 p.m.',
                'between 2:30 p.m. - 3:00 p.m.',
                'between 3:00 p.m. - 3:30 p.m.',
                'between 3:30 p.m. - 4:00 p.m.',
                'between 4:00 p.m. - 4:30 p.m.',
                'between 4:30 p.m. - 5:00 p.m.',
                'between 5:00 p.m. - 5:30 p.m.',
                'between 5:30 p.m. - 6:00 p.m.',
                'between 6:00 p.m. - 6:30 p.m.',
                'between 6:30 p.m. - 7:00 p.m.',
                'between 7:00 p.m. - 7:30 p.m.',
                'between 7:30 p.m. - 8:00 p.m.',
                'after  8:00 p.m.',
            ],
            types: [
                'Small Envelope',
                'Large Envelope',
                'Small package (perishable items)',
                'Small package (non-perishable items)',
                'Medium package (perishable items)',
                'Medium package (non-perishable items)',
                'Large package (perishable items)',
                'Large package (non-perishable items)',
            ],
            sizes: [
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

        this.getvehicles()
        document.getElementById('start').value = this.info.pickup
        document.getElementById('des').value = this.info.dropoff

        this.$refs.xyz.$mapPromise.then(() => {
            this.directionsService = new google.maps.DirectionsService()
            this.directionsDisplay = new google.maps.DirectionsRenderer()
            this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
            this.getRoute()
        })
    },

    methods: {
        getvehicles() {
            axios.get(`api/getvehiclesinfo/${this.info.user_id}`)
                .then(res => {
                    this.vehicles = res.data;
                })
                .catch(error => console.log(error.res.data))

        },
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

            vm.directionsService.route({
                origin: this.info.pickup,
                destination: this.info.dropoff,
                travelMode: 'DRIVING',
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    if (response.routes[0].legs.length > 1) {
                        var metere = response.routes[0].legs[0].distance.value + response.routes[0].legs[1].distance.value;
                        vm.info.distance = (metere / 1000).toFixed(1);
                        var min = response.routes[0].legs[0].duration.value + response.routes[0].legs[1].duration.value;
                        vm.info.duration = (Math.round(min / 60));
                    } else {
                        var metere = ((response.routes[0].legs[0].distance.value) / 1000).toFixed(1);
                        vm.info.distance = metere
                        var min = (response.routes[0].legs[0].duration.value)
                        vm.info.duration = (Math.round(min / 60));
                    }
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

                axios.patch(`api/ship/${this.info.slug}`, this.info)
                    .then((res) => {
                        this.$router.push(res.data.path)
                        setTimeout(() => {
                            axios.get('/api/getShip/' + res.data.slug)
                                .then(res => {
                                    EventBus.$emit('updated', res.data.data)
                                }, 0)
                        })

                        // if (res.response = 200) {
                        //     Toast.fire({
                        //         type: 'success',
                        //         title: 'Trip info update successful'
                        //     })

                        // } else
                        //     alert('sorry! something went wrong');

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
