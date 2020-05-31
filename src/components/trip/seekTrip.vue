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
        </div>
        <div class="columns"  style="margin-top: -18px;margin-bottom: 0px;">
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
                   <date-picker v-model="seektime" format="hh:mm a" type="time" valueType="format"   v-validate="'required'" name="time"></date-picker>
               </float-label>
                    <span v-show="errors.has('time')" class="help is-danger">Time is required</span>
                </div>
            </div>
        </div>
        <div class="columns" v-show="midpoint">
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
            <GmapMap :center="{lat:23.746466,lng:90.376015}" ref="xyz" :zoom="14" map-type-id="terrain" style="width:100%; height:200px">
            </GmapMap>
        </div>
        <div class="columns" style="margin-top:0px;">
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
                    <float-label :dispatch="false" label="How many of you" fixed>
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
        <div class="columns" style="margin-top:-13px;">
            <div class="column is-6">
                <div class="control">
                    <float-label label="Willing to pay (fare)" fixed>
                        <input type="number" min="0" class="input is-primary-focus" name="offer amount" v-model="pay" v-validate="'required'">
                    </float-label>
                    <span v-show="errors.has('offer amount')" class="help is-danger">Willing to pay amount is required </span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-10">
                <div class="control">
                    <float-label label="Note" fixed>
                        <textarea class="textarea is-primary-focus" v-model="details" rows="4"></textarea>
                    </float-label>
                </div>
            </div>
        </div>
        <div class="mt-20 has-text-right">
            <button @click="submit" v-bind:class="(loading)?'button btn-align info-btn raised is-loading':'button btn-align info-btn raised'">Submit
            </button>
        </div>
    </section>
</template>
<script>
import moment from "moment";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    components: {  gmapAutocomplete: () => import('../global/gmapautocomplete'),DatePicker },
    data() {
        return {
            moment: moment,
            premium: true,
            post_type: 'seek',
            voptions: [
                'Car',
                'Mini van',
                'Motorcycle',
                'Electric Scooter',
                'CNG',
                'Rickshaw',
                'Bicycle'
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
            seektime:'',
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
            start:'',
            date:'',
            time:'',
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
        id() {
            return this.$store.getters.id
        }
    },

    created() {

    },
    mounted() {
        this.$refs.xyz.$mapPromise.then(() => {
            this.directionsService = new google.maps.DirectionsService()
            this.directionsDisplay = new google.maps.DirectionsRenderer()
            this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
        })
    },
    // mounted() {

    //     this.$refs.xyz.$mapPromise.then(() => {
    //         this.directionsService = new google.maps.DirectionsService()
    //         this.directionsDisplay = new google.maps.DirectionsRenderer()
    //         this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
    //         let input1 = document.getElementById("seekfrom");
    //         let autocomplete1 = new google.maps.places.Autocomplete(input1);
    //         let input2 = document.getElementById("seekto");
    //         let autocomplete2 = new google.maps.places.Autocomplete(input2);
    //         //after change place of from
    //         autocomplete1.addListener('place_changed', () => {
    //             var place = autocomplete1.getPlace()
    //             if (place.name == place.address_components[0].long_name) {
    //                 this.start = place.formatted_address
    //             } else {
    //                 this.start = place.name + "," + place.address_components[0].long_name + "," + place.address_components[2].long_name
    //             }
    //             this.getRoute()

    //         })
    //         //after change place of to 
    //         autocomplete2.addListener('place_changed', () => {
    //             var place = autocomplete2.getPlace()
    //             if (place.name == place.address_components[0].long_name) {
    //                 this.destination = place.formatted_address
    //             } else {
    //                 this.destination = place.name + "," + place.address_components[0].long_name + "," + place.address_components[2].long_name
    //             }
    //             this.getRoute()

    //         });
    //     })

    // },

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

        showMidPoint() {
            this.midpoint = !this.midpoint

        },

        // loadV() {
        //     axios.post(`api/vehicles/${this.id}`, {
        //             ve: this.vehicle_type,
        //             id: this.id
        //         })
        //         .then(res => {
        //             this.myVehicles = res.data;

        //         })
        //         .catch(error => console.log(error.res.data))
        // },
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
                     this.loading=true
                    this.$axios.post('trip', {
                            post_type: this.post_type,
                            id: this.id,
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
                            type: this.vehicle_type
                        })
                        .then((res) => {
                             this.loading=false
                              this.$vs.notify({
                                title:'Success',
                                text:'Your "Get a ride" post is successful',
                                position:'top-right',
                                color:'success'
                              })
                            EventBus.$emit('removedata')
                            EventBus.$emit('updateSeekTrips')
                            const clear = async () => {
                                this.post_type = ''
                                this.date = ''
                                this.time = ''
                                this.vehicle = ''
                                this.vehicle_seat = ''
                                this.pay = ''
                                this.radio = ''
                                this.vehicle_type = ''
                                this.details = null
                            }
                            clear().then(() => {
                                this.$validator.reset()
                            })
                        })
                        .catch(error => {
                            this.$vs.notify({
                                title:'Error',
                                text:'Oops! Something went wrong. Please try again.',
                                position:'top-right',
                                color:'danger'
                              })
                        });
                }
            })
        }
    },
    watch: {
        'seektime':function(val){
            console.log(val)
             this.time = moment(val, "h:mm A").format("HH:mm:ss")
        },
        // vehicle_type: function(val) {
        //     this.myVehicles = []
        //     this.own = true

        // },
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
.mx-datepicker {
    position: relative;
    display: inline-block;
    max-width: 100%;
    width: 100% !important;
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
</style>
</script>