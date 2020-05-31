<template>
    <section>
        <div class="columns">
            <div class="column is-12" style="margin-top:10px;">
                <div class="control">
                    <gmap-autocomplete @address_res="handleAddr" placeholder="Pick up point" :premium="premium"></gmap-autocomplete>
                    <input type="hidden" v-model="pickuppoint" v-validate="'required'" name="pick_up">
                    <span v-show="errors.has('pick_up')" class="help is-danger">Pick up point is required</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top:-33px">
            <div class="column">
                <a style="float:right;font-size:12px;color:#039BE5" v-show="start_Marker" @click="startMarker" type="submit">Set on map
                </a>
            </div>
        </div>
        <div class="columns" style="margin-top: -27px;">
            <div class="column is-12">
                <div class="control">
                    <float-label label="What's your preferred pick up date?" fixed>
                        <date-picker v-model="date" valueType="format" v-validate="'required'" name="date"></date-picker>
                    </float-label>
                    <span v-show="errors.has('date')" class="help is-danger">Preferred pick up date is required</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top: -20px;">
            <div class="column is-12">
                <div class="control">
                    <float-label :dispatch="false" label="What's your preferred pick up time?" fixed>
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
                    <gmap-autocomplete @address_res="handleAddr" placeholder="Preferred delivery point(optional)" :premium="premium"></gmap-autocomplete>
                    <input type="hidden" v-model="dropoffpoint" v-validate="'required'" name="drop_off">
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top:-33px">
            <div class="column">
                <a style="float:right;font-size:12px;color:#039BE5" v-show="end_Marker" @click="endMarker" type="submit">Set on map
                </a>
            </div>
        </div>
        <div class="columns" style="margin-top:-23px">
            <div class="column is-7">
                <div class="control">
                    <float-label label="Preferred delivery date & time" fixed>
                        <date-picker format="YYYY-MM-DD hh:mm a" v-model="datetime" type="datetime" value-type="format" v-validate="'required'" name="delivery_dt"></date-picker>
                    </float-label>
                    <span v-show="errors.has('delivery_dt')" class="help is-danger">Approx. delivery date and time is required</span>
                </div>
            </div>
            <div class="column is-5">
                <div class="control">
                    <float-label label="Asking amount" fixed>
                        <input type="number" min="0" class="input is-primary-focus" name="asking amount" v-model="amount" v-validate="'required'">
                    </float-label>
                    <span v-show="errors.has('asking amount')" class="help is-danger">Asking amount is required</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top:-8px;padding:0px 10px;">
            <GmapMap :center="{lat:23.746466,lng:90.376015}" ref="xyz" :zoom="14" map-type-id="terrain" style="width:100%; height:200px">
            </GmapMap>
        </div>
        <div class="columns" style="margin-top:10px">
            <div class="column is-12">
                <div class="control">
                    <float-label :dispatch="false" label="What size of goods do you prefer to carry?" fixed>
                        <div class="select">
                            <select name="document" v-model="document">
                                <option v-for="(item,index) in documents" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('document')" class="help is-danger">Size of package is required</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top:-14px;">
            <div class="column is-12">
                <div class="control">
                    <float-label :dispatch="false" label="Maximum weight you are willing to carry" fixed>
                        <div class="select">
                            <select name="weight" v-model="packagesize" v-validate="'required'">
                                <option v-for="(item,index) in sizes" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('weight')" class="help is-danger">Weight is required</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top:-8px;">
            <div class="column is-8">
                <div style="display: inline-flex;">
                    <label class="label">Do you have a vehicle?</label>
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
            <div class="column is-4" v-if="ownCar" style="margin-top: -4px;padding-left: 0px;">
                <div class="control" v-if="myVehicles.length>0">
                    <float-label :dispatch="false" label="Select vehicle" fixed>
                        <div class="select">
                            <select v-model="vehicle">
                                <option v-for="(item,index) in myVehicles" :key="index" :value="item.model">{{item.model}}</option>
                            </select>
                        </div>
                    </float-label>
                </div>
                <div class="control" v-else-if="myVehicles.length<1" style="padding-left: 18px;">
                    <span style="color:red">No vehicle found</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top:-15px;">
            <div class="column is-9">
                <div class="control">
                    <float-label label="Note" fixed>
                        <textarea class="textarea is-primary-focus" v-model="details" rows="4"></textarea>
                    </float-label>
                </div>
            </div>
        </div>
        <div class="mt-10 has-text-right">
            <button @click="submit" v-bind:class="(loading)?'button btn-align info-btn raised is-loading':'button btn-align info-btn raised'">Submit
            </button>
        </div>
    </section>
</template>
<script>
import moment from "moment";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import gmapAutocomplete from '../global/gmapautocomplete'
export default {
    components: {
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
            date: '',
            time: null,
            document: null,
            radio: '',
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
            details: '',
            datetime: '',
            deliverydatetime: '',
            packagesize: null,
            ownCar: false,
            amount: '',
            vehicle: '',
            distance: '',
            duration: '',
            myVehicles: [],
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
            documents: [
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


    created() {

    },
    methods: {
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

                            vm.getRoute()
                        }
                    }
                });
            });

        },


        loadV() {
            if (this.myVehicles.length > 0) {

            } else
                this.$axios.get(`getvehiclesinfo/${this.id}`)
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
            this.radio = "a",
                this.ownCar = true
            this.loadV();
        },
        no() {
            this.radio = "a",
                this.ownCar = false
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
                            vehicle: this.vehicle,
                            document: this.document,
                            amount: this.amount,
                            notes: this.details,
                            deliverydatetime: this.deliverydatetime,
                            packagesize: this.packagesize,
                        })
                        .then((res) => {
                            this.loading = false
                            this.$vs.notify({
                                title: 'Success',
                                text: 'Your "Carry a package" has been posted successfully',
                                position: 'top-right',
                                color: 'success'
                            })

                            this.$router.push(res.data.path)
                        })
                        .catch(error => {
                            this.loading = false
                            this.$vs.notify({
                                title: 'Error',
                                text: 'Oops,somwthing went wrong.Please check again',
                                position: 'top-right',
                                color: 'danger'
                            })
                        });

                }
            })
        },
    },
    watch: {
        'datetime': function(val) {
            this.datetime = val
            this.deliverydatetime = moment(val, "YYYY-MM-DD h:mm A").format("YYYY-MM-DD HH:mm:ss")
        }
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

</style>