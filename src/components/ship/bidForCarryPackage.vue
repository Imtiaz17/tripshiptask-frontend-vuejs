<template>
    <section>
        <div class="columns" style="margin-top:1px">
            <div class="column is-6">
                <div class="control">
                    <float-label>
                        <input type="text" class="input is-primary-focus" id="sendfrom" v-model="pickuppoint" v-validate="'required'" name="pick_up" placeholder="Pick up point">
                    </float-label>
                    <!--     <div class="field-wrapper">
                        <input type="text" id="sendfrom" v-model="pickuppoint" v-validate="'required'" name="pick up point">
                        <div class="field-placeholder"><span>Pick up point</span></div>
                    </div> -->
                    <a style="float:right;font-size:12px;color:#039BE5;margin-top:1px" v-show="start_Marker" @click="startMarker" type="submit">Set on map
                    </a>
                    <span v-show="errors.has('pick_up')" class="help is-danger">Package pick up point is required</span>
                </div>
            </div>
            <!-- <div class="column is-9" style="padding-left: 0px;">
                <div class="control">
                    <gmap-autocomplete placeholder="Start point" class="input is-small is-primary-focus" @place_changed="pickUpPoint">
                    </gmap-autocomplete>
                    <input type="hidden" v-model="pickuppoint" v-validate="'required'" name="pick up point">
                    <span v-show="errors.has('pick up point')" class="help is-danger">{{ errors.first('pick up point') }}</span>
                </div>
            </div> -->
            <div class="column is-6">
                <div class="control">
                    <VueCtkDateTimePicker id="OfferDatePicker" label="What's the Date you plan to mail the item?" :no-label="true" color="#6BA3FF" input-size="sm" v-model="date" format="DD-MM-YYYY" formatted="ll" output-format="YYYY-MM-DD" :no-header="true" :only-date="true" :no-button="true" :auto-close="true" v-validate="'required'" name="date" />
                    <!--   <flat-pickr class="input is-primary-focus " v-validate="'required'" name="date" :config="config" placeholder="What's the Date you plan to mail the item?" :class="{'input': true, 'is-danger': errors.has('date') }" v-model="date"></flat-pickr> -->
                    <span v-show="errors.has('date')" class="help is-danger">Preferred mailing date is required</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top: -24px;">
            <div class="column is-6">
                <div class="control">
                    <float-label>
                        <input type="text" class="input is-primary-focus" id="sendto" v-model="dropoffpoint" v-validate="'required'" name="drop_off" placeholder="Drop off point">
                    </float-label>
                    <!--   <div class="field-wrapper">
                        <input type="text" id="sendto" v-model="dropoffpoint" v-validate="'required'" name="drop off point">
                        <div class="field-placeholder"><span>Drop off point</span></div>
                    </div> -->
                    <a style="float:right;font-size:12px;color:#039BE5;margin-top:1px" v-show="end_Marker" @click="endMarker" type="submit">Set on map
                    </a>
                    <span v-show="errors.has('drop_off')" class="help is-danger">Drop off point is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false">
                        <div class="select is-select">
                            <select name="time" v-model="time" v-validate="'required'">
                                <option :value="null" disabled selected>What's the Time you plan to mail the item?</option>
                                <option v-for="(item,index) in timeschedule" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <!--   <el-select name="time" size="small" v-model="time" placeholder="What's the Time you plan to mail the item?" v-validate="'required'">
                        <el-option v-for="item,index in timeschedule" :key="index" :label="item" :value="item">
                        </el-option>
                    </el-select> -->
                    <span v-show="errors.has('time')" class="help is-danger">Preferred mailing time is required</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-top:-23px">
            <div class="column is-6">
                <div class="control">
                    <VueCtkDateTimePicker id="OfferTimePicker" color="#6BA3FF" input-size="sm" v-model="deliverydatetime" label="Preferred delivery date & time" :no-label="true" :no-header="true" format=" YYYY-MM-DD hh:mm a" output-format="YYYY-MM-DD hh:mm" formatted="lll" :v-validate="'required'" name="delivery_dt" />
                    <!--  <flat-pickr class="input is-primary-focus " v-validate="'required'" name="delivery date & time" :config="config1" placeholder="Preferred delivery date & time" :class="{'input': true, 'is-danger': errors.has('date') }" v-model="deliverydatetime"></flat-pickr> -->
                    <span v-show="errors.has('delivery_dt')" class="help is-danger">Approx. delivery date and time is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label>
                        <input type="text" class="input is-primary-focus" name="amount" v-model="amount" v-validate="'required'" placeholder="Willing to pay">
                    </float-label>
                    <!--  <div class="field-wrapper">
                        <input type="text" name="amount" v-model="amount" v-validate="'required'">
                        <div class="field-placeholder"><span>Willing to pay</span></div>
                    </div> -->
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
                    <float-label>
                        <input type="text" class="input is-primary-focus" name="goods" v-model="goods" v-validate="'required'" placeholder="What are you sending?">
                    </float-label>
                    <span v-show="errors.has('goods')" class="help is-danger">Details of goods is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false">
                        <div class="select is-select">
                            <select name="goods_type" v-model="goodtype">
                                <option :value="null" disabled selected>Type of goods</option>
                                <option v-for="(item,index) in gtype" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('goods_type')" class="help is-danger">Type of good is required</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-6">
                <div class="control">
                    <float-label>
                        <input type="text" class="input is-primary-focus" name="document_worth" v-model="goods_worth" v-validate="'required|numeric'" placeholder="Approx. value of the goods">
                    </float-label>
                    <span v-show="errors.has('document_worth')" class="help is-danger">{{ errors.first('document_worth') }}</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false">
                        <div class="select is-select">
                            <select name="package_type" v-model="packagetype" v-validate="'required'">
                                <option :value="null" disabled selected>Packaging type</option>
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
                <input class="input is-small is-primary-focus" placeholder="length in inches" type="text" v-model="length">
            </div>
            <div class="column">
                <input class="input is-small is-primary-focus" placeholder="width in inches" type="text" v-model="width">
            </div>
            <div class="column">
                <input class="input is-small is-primary-focus" placeholder="height in inches" type="text" v-model="height">
            </div>
        </div>
        <div class="columns" style="margin-top:-15px;">
            <div class="column is-6">
                <div class="control">
                    <float-label>
                        <textarea class="textarea is-primary-focus" v-model="details" rows="4" placeholder="Your notes ..."></textarea>
                    </float-label>
                </div>
            </div>
        </div>
        <div class="mt-10 has-text-right">
            <button type="submit" @click="bidsubmit" class="button btn-align info-btn raised">Submit
            </button>
        </div>
    </section>
</template>
<script>

import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBsOMFpPA9V9dYG3noMdG3OEy88-gVjmk0',
        libraries: 'places',
    },
});
export default {
    props: ['data'],
    data() {
        return {
            pickuppoint: '',
            dropoffpoint: '',
            date: '',
            time: '',
            goodtype: '',
            measure: false,
            goods: '',
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
            goods_worth: '',
            details: '',
            distance: '',
            duration: '',
            length: '',
            width: '',
            height: '',
            deliverydatetime: '',
            packagesize: '',
            start_Marker: true,
            end_Marker: true,
            amount: '',
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
            gtype: [
                'Perishable',
                'Non-perishable',
            ],
            packagetype: '',
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
        }
    },
    computed: {
        id() {
            return this.$store.getters.id
        },
    },
    mounted() {
        // $(function() {
        //     $(".field-wrapper .field-placeholder").on("click", function() {
        //         $(this).closest(".field-wrapper").find("input").focus();
        //     });
        //     $(".field-wrapper input").on("keyup", function() {
        //         var value = $.trim($(this).val());
        //         if (value) {
        //             $(this).closest(".field-wrapper").addClass("hasValue");
        //         } else {
        //             $(this).closest(".field-wrapper").removeClass("hasValue");
        //         }
        //     });
        //     $(".field-wrapper .amount-placeholder").on("click", function() {
        //         $(this).closest(".field-wrapper").find("input").focus();
        //     });
        //     $(".field-wrapper input").on("keyup", function() {
        //         var value = $.trim($(this).val());
        //         if (value) {
        //             $(this).closest(".field-wrapper").addClass("hasValue");
        //         } else {
        //             $(this).closest(".field-wrapper").removeClass("hasValue");
        //         }
        //     });


        // });

        this.$refs.xyz.$mapPromise.then(() => {
            this.directionsService = new google.maps.DirectionsService()
            this.directionsDisplay = new google.maps.DirectionsRenderer()
            this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
            let input1 = document.getElementById("sendfrom");
            document.getElementById('sendfrom').placeholder = '';
            let autocomplete1 = new google.maps.places.Autocomplete(input1);
            let input2 = document.getElementById("sendto");
            document.getElementById('sendto').placeholder = '';
            let autocomplete2 = new google.maps.places.Autocomplete(input2);
            //after change place of from
            autocomplete1.addListener('place_changed', () => {
                var place = autocomplete1.getPlace()
                if (place.name == place.address_components[0].long_name) {
                    this.pickuppoint = place.formatted_address
                } else {
                    this.pickuppoint = place.name + "," + place.address_components[0].long_name + "," + place.address_components[2].long_name
                }
                this.getRoute()

            })
            //after change place of to 
            autocomplete2.addListener('place_changed', () => {
                var place = autocomplete2.getPlace()
                if (place.name == place.address_components[0].long_name) {
                    this.dropoffpoint = place.formatted_address
                } else {
                    this.dropoffpoint = place.name + "," + place.address_components[0].long_name + "," + place.address_components[2].long_name
                }
                this.getRoute()

            });
        })

    },
    created() {

    },
    methods: {
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
                            $('#pickuppoint').val(results[0].formatted_address);
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
                            $('#dropoffpoint').val(results[0].formatted_address);
                            vm.getRoute()
                        }
                    }
                });
            });

        },
        getRoute() {
            var vm = this
            vm.directionsService.route({
                origin: this.pickuppoint,
                destination: this.dropoffpoint,
                travelMode: 'DRIVING',
            }, function(response, status) {

                if (status === google.maps.DirectionsStatus.OK) {
                    var routes = response.routes;
                    if (response.routes[0].legs.length > 1) {
                        var metere = response.routes[0].legs[0].distance.value + response.routes[0].legs[1].distance.value;
                        vm.distance = (metere / 1000).toFixed(1);
                        var min = response.routes[0].legs[0].duration.value + response.routes[0].legs[1].duration.value;
                        vm.duration = (Math.round(min / 60));
                    } else {
                        var metere = ((response.routes[0].legs[0].distance.value) / 1000).toFixed(1);
                        vm.distance = metere
                        var min = (response.routes[0].legs[0].duration.value)
                        vm.duration = (Math.round(min / 60));
                    }
                    vm.directionsDisplay.setDirections(response)
                } else {
                    console.log('Directions request failed due to ' + status)
                }
            })
        },
        pickUpPoint(place) {
            this.pickuppoint = place.name
            this.getRoute()
        },
        dropOffPoint(place) {
            this.dropoffpoint = place.name
            this.getRoute()
        },
        bidsubmit() {

            this.$validator.validateAll().then((result) => {
                if (result) {
                    EventBus.$emit('closeCarryBid')
                    this.$axios.post('carryshipbids', {
                            ship_id: this.data.id,
                            pickuppoint: this.pickuppoint,
                            dropoffpoint: this.dropoffpoint,
                            date: this.date,
                            time: this.time,
                            goods: this.goods,
                            goodtype: this.goodtype,
                            goods_worth: this.goods_worth,
                            notes: this.details,
                            deliverydatetime: this.deliverydatetime,
                            packagetype: this.packagetype,
                            amount: this.amount,
                            length: this.length,
                            width: this.width,
                            height: this.height,
                        })
                        .then((res) => {
                            setTimeout(() => {
                                this.$axios.get('getShip/' + this.data.id)
                                    .then(res => {
                                        EventBus.$emit('Carryingbid', res.data.data)
                                    })
                            }, 0)

                        })
                        .catch(error => {
                            console.log(error.response.data.errors)
                        });
                }
            })
        }
    },
    watch: {
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
.el-select {
    width: 100%;
}

.vs-popup--close,
.vs-popup--content {
    overflow-x: hidden;
}

.button.info-btn:hover {
    color: #fff !important;
}
</style>