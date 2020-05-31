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
                    <float-label label="What's the Date you plan to mail the item?" fixed>
                     <date-picker v-model="date" valueType="format" v-validate="'required'" name="date"></date-picker>
                 </float-label>
                    <span v-show="errors.has('date')" class="help is-danger">Preferred mailing date is required</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top: -15px;">
            <div class="column is-12">
                <div class="control">
                    <float-label :dispatch="false" label="What's the time you plan to mail the item?" fixed>
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
                     <gmap-autocomplete @address_res="handleAddr" placeholder="Drop off point" :premium="premium"></gmap-autocomplete>
                    <input type="hidden" v-model="dropoffpoint" v-validate="'required'" name="drop_off">
                    <span v-show="errors.has('drop_off')" class="help is-danger">Drop off point is required</span>
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
                    <float-label :dispatch="false" label="Preferred delivery date & time" fixed>
                   <date-picker
                   format="YYYY-MM-DD hh:mm a"
                    v-model="datetime"
                    type="datetime"
                    value-type="format"
                    v-validate="'required'"
                    name="delivery_dt"
                  ></date-picker>
                 </float-label>
                    <span v-show="errors.has('delivery_dt')" class="help is-danger">Approx. delivery date and time is required</span>
                </div>
            </div>
            <div class="column is-5">
                <div class="control">
                    <float-label label="Willing to pay" fixed>
                        <input type="number" min="0" class="input is-primary-focus" name="amount" v-model="amount" v-validate="'required'">
                    </float-label>
                    <span v-show="errors.has('amount')" class="help is-danger">Amount is required</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top:-8px;padding:0px 10px;">
            <GmapMap :center="{lat:23.746466,lng:90.376015}" ref="xyz" :zoom="14" map-type-id="terrain" style="width:100%; height:200px">
            </GmapMap>
        </div>
        <div class="columns" style="margin-top:10px">
            <div class="column is-6">
                <div class="control">
                    <float-label label="What are you sending?" fixed>
                        <input type="text" class="input is-primary-focus" name="document" v-model="document" v-validate="'required'">
                    </float-label>
                    <span v-show="errors.has('document')" class="help is-danger">Description of goods is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false" label="Type of goods" fixed>
                        <div class="select">
                            <select name="goods_type" v-model="goodtype">
                                <option v-for="(item,index) in gtype" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    
                    <span v-show="errors.has('goods_type')" class="help is-danger">Type of goods is required</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-6">
                <div class="control">
                    <float-label label="Approx. value of the goods" fixed>
                        <input type="text" class="input is-primary-focus" name="document_worth" v-model="document_worth" v-validate="'required|numeric'">
                    </float-label>
                    
                    <span v-show="errors.has('document_worth')" class="help is-danger">Approx. value of the goods is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false" label="Packaging type" fixed>
                        <div class="select">
                            <select name="package_type" v-model="packagetype" v-validate="'required'">
                                <option v-for="(item,index) in ptype" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    
                    <span v-show="errors.has('package_type')" class="help is-danger">Package type is required</span>
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
import Vue from 'vue';
import moment from "moment";
import gmapAutocomplete from '../global/gmapautocomplete'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
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
export default {
     components: {
        gmapAutocomplete,DatePicker
    },
    data() {
        return {
            moment:moment,
            premium: true,
            place: false,
            post_type: 'send_package',
            pickuppoint: '',
            dropoffpoint: '',
            start_Marker: true,
            end_Marker: true,
            date: '',
            time: null,
            measure: false,
            packagetype: null,
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
            goodtype: null,
            document: '',
            document_worth: '',
            details: '',
            distance: '',
            duration: '',
            datetime:'',
            deliverydatetime: '',
            amount: '',
            length: '',
            width: '',
            height: '',
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
             loading: false
        }
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
            } else if (data.field == "Drop off point") {
                this.dropoffpoint = data.address
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

   
        submit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                     this.loading=true
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
                            deliverydatetime: this.deliverydatetime,
                            length: this.length,
                            width: this.width,
                            height: this.height,
                            distance: this.distance,
                            duration: this.duration,
                        })
                        .then((res) => {
                             this.loading=false
                             this.$vs.notify({
                                title:'Success',
                                text:'Your "Send a package" post is  successful',
                                position:'top-right',
                                color:'success'
                              })
                             EventBus.$emit('removedata')
                            this.$router.push(res.data.path)
                        })
                        .catch(error => {
                            this.loading=false
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
        'datetime':function(val)
        {
            this.datetime=val
            this.deliverydatetime= moment(val, "YYYY-MM-DD h:mm A").format("YYYY-MM-DD HH:mm:ss")
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

</style>