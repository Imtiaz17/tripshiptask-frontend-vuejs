<template>
    <div style="padding-top:20px;">
        <div class="columns">
            <div class="column is-4" style="padding:4px">
                <vs-card style="box-shadow:0 2px 3px 1px rgba(0,0,0,0.04)">
                    <div slot="header" class="searchheader">
                        <h3 style="font-weight: 500;">
                            Ship
                        </h3>
                    </div>
                </vs-card>
                <img src="../../assets/images/shipping.png" width="100%">
                <vs-tabs>
                    <vs-tab label="Send a package" @click="send">
                        <send-package></send-package>
                    </vs-tab>
                    <vs-tab label="Carry a package" @click="carry">
                        <carry-package></carry-package>
                    </vs-tab>
                </vs-tabs>
            </div>
            <div class="column is-8" style="padding:4px">
                <vs-row vs-justify="center">
                    <vs-col type="flex" vs-justify="center" vs-align="left" vs-w="12">
                        <vs-card style="box-shadow:0 2px 3px 1px rgba(0,0,0,0.04)">
                            <div slot="header" class="searchheader">
                                <h3 style="font-weight: 500;">
                                    Search Ship
                                </h3>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <div class="control">
                                        <input class="input is-primary-focus " placeholder="Pick up point" v-model="startsearch" type="text">
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="control">
                                        <input class="input is-primary-focus " placeholder="Drop off point" v-model="endsearch" type="text">
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="control">
                                        <div class="select">
                                            <select v-model="goodstype">
                                                <option :value="null" disabled hidden>Select type of goods</option>
                                                <option v-for="(item,index) in gtype" :key="index" :value="item">{{item}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="column">
                                    <date-picker v-model="searchdate" valueType="format" placeholder="Pick up date" name="date"></date-picker>
                                </div>
                            </div>
                        </vs-card>
                    </vs-col>
                </vs-row>
                <template v-if="sendpackage">
                    <div slot="header" class="searchheader">
                        <h3 style="font-weight: 500;">
                            Sending a package
                        </h3>
                    </div>
                    <table class="table is-accent fixed_header ">
                        <thead>
                            <tr>
                                <th width="20%" style="text-align:left">Pickup Point</th>
                                <th width="20%" style="text-align:left">Dropoff Point</th>
                                <th width="20%" style="text-align:left">Documents</th>
                                <th width="20%" style="text-align:left">Pickup Date</th>
                                <th width="20%" style="text-align:left">Delivery Date</th>
                                <th width="10%" style="text-align:left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <div v-if="isSLoading" style="margin-top:-45px;">
                                <img class="loading" src="../../assets/images/roaling.gif">
                            </div>
                            <div v-else>
                                <tr v-for="(item,index) in getShipments" :key="index">
                                    <td data-th="Pickup Point" width="20%" style="text-align:left">
                                        {{item.start_point.split(',')[0]}}
                                    </td>
                                    <td data-th="Dropoff Point" width="20%" style="text-align:left">
                                        {{item.destination.split(',')[0]}}
                                    </td>
                                    <td data-th="Documents" width="20%" style="text-align:left">
                                        {{item.documents}}
                                    </td>
                                    <td data-th="Pickup Date" width="20%" style="text-align:left">
                                        {{moment(item.pickup_date).format("ll")}}
                                    </td>
                                    <td data-th="Delivery Date" width="20%" style="text-align:left">
                                        {{moment(item.delivery_date_time).format("lll")}}
                                    </td>
                                    <td data-th="Action" width="10%" style="text-align:left">
                                        <router-link :to="item.path">
                                            <button class="button is-small btn-align accent-btn raised rounded btn-outlined">view</button>
                                        </router-link>
                                    </td>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </template>
                <template v-if="carrypackage">
                    <div slot="header" class="searchheader">
                        <h3 style="font-weight: 500;">
                            Carry a package
                        </h3>
                    </div>
                    <table class="table is-accent fixed_header ">
                        <thead>
                            <tr>
                                <th width="20%" style="text-align:left">Pickup Point</th>
                                <th width="20%" style="text-align:left">Dropoff Point</th>
                                <th width="20%" style="text-align:left">Documents</th>
                                <th width="20%" style="text-align:left">Pickup Date</th>
                                <th width="20%" style="text-align:left">Delivery Date</th>
                                <th width="10%" style="text-align:left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <div v-if="isSLoading" style="margin-top:-45px;">
                                <img class="loading" :src="getPhoto()">
                            </div>
                            <div v-else>
                                <tr v-for="(item,index) in getCarryShipments" :key="index">
                                    <td data-th="Pickup Point" width="20%" style="text-align:left">
                                        {{item.start_point.split(',')[0]}}
                                    </td>
                                    <td data-th="Dropoff Point" width="20%" style="text-align:left" v-if="item.destination">
                                        {{item.destination.split(',')[0]}}
                                    </td>
                                    <td data-th="Dropoff Point" width="20%" style="text-align:left" v-else>
                                        {{item.destination}}
                                    </td>
                                    <td data-th="Documents" width="20%" style="text-align:left">
                                        {{item.documents}}
                                    </td>
                                    <td data-th="Pickup Date" width="20%" style="text-align:left">
                                        {{moment(item.pickup_date).format("ll")}}
                                    </td>
                                    <td data-th="Delivery Date" width="20%" style="text-align:left">
                                        {{moment(item.delivery_date_time).format("lll")}}
                                    </td>
                                    <td data-th="Action" width="10%" style="text-align:left">
                                        <router-link :to="item.path">
                                            <button class="button is-small btn-align accent-btn raised rounded btn-outlined">view</button>
                                        </router-link>
                                    </td>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import moment from 'moment-timezone';
import 'moment-duration-format';
import { mapActions, mapGetters } from 'vuex';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBsOMFpPA9V9dYG3noMdG3OEy88-gVjmk0',
        libraries: 'places',
    },
});

export default {
    components: {
        sendPackage: () => import('@/components/ship/SendPackage'),
        carryPackage: () => import('@/components/ship/CarryPackage'),
        DatePicker
    },
    data() {
        return {
            sendpackage: true,
            carrypackage: false,
            moment: moment,
            page: 1,
            sendpackageships: [],
            carrypackageships: [],
            startsearch: '',
            endsearch: '',
            goodstype: null,
            searchdate: '',
            gtype: [
                'Perishable',
                'Non-perishable',
            ]
        }
    },
    computed: {
        sendlisting() {
            return this.$store.getters.sendlisting.data
        },

        carrylisting() {
            return this.$store.getters.carrylisting.data
        },
        isSLoading() {
            return this.$store.getters.isSLoading
        },

        id() {
            return this.$store.getters.id
        },
        getShipments() {
            return this.sendlisting.filter(shipping => {
                if (this.goodstype == null && this.searchdate == null) {
                    return shipping.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        shipping.destination.toLowerCase().includes(this.endsearch.toLowerCase())
                } else if (this.goodstype == null) {
                    return shipping.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        shipping.destination.toLowerCase().includes(this.endsearch.toLowerCase()) &&
                        shipping.pickup_date.includes(this.searchdate)
                } else if (this.searchdate == null) {
                    return shipping.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        shipping.destination.toLowerCase().includes(this.endsearch.toLowerCase()) &&
                        shipping.good_type.includes(this.goodstype)
                } else {
                    return shipping.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        shipping.destination.toLowerCase().includes(this.endsearch.toLowerCase()) &&
                        shipping.good_type.includes(this.goodstype) &&
                        shipping.pickup_date.includes(this.searchdate)
                }

            })

        },
        getCarryShipments() {
            return this.carrylisting.filter(shipping => {
                if (this.goodstype == null && this.searchdate == null) {
                    return shipping.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        shipping.destination.toLowerCase().includes(this.endsearch.toLowerCase())
                } else if (this.goodstype == null) {
                    return shipping.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        shipping.destination.toLowerCase().includes(this.endsearch.toLowerCase()) &&
                        shipping.pickup_date.includes(this.searchdate)
                } else if (this.searchdate == null) {
                    return shipping.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        shipping.destination.toLowerCase().includes(this.endsearch.toLowerCase()) &&
                        shipping.good_type.includes(this.goodstype)
                } else {
                    return shipping.start_point.toLowerCase().includes(this.startsearch.toLowerCase()) &&
                        shipping.destination.toLowerCase().includes(this.endsearch.toLowerCase()) &&
                        shipping.good_type.includes(this.goodstype) &&
                        shipping.pickup_date.includes(this.searchdate)
                }

            })

        },


    },
    created() {
        if (this.$store.getters.sendlisting.length == 0) {
            this.getSendLiting();
        }

        if (this.$store.getters.carrylisting.length == 0) {
            this.getCarryListing();
        }
    },
    methods: {
        ...mapActions("ship",
            ['getSendLiting', 'getCarryListing']),

        send() {
            this.sendpackage = true
            this.carrypackage = false

        },
        carry() {
            this.sendpackage = false
            this.carrypackage = true
        },
        getSendPackage() {
            this.isLoading = true
            this.$axios.get('sendpackage?page=' + this.page)
                .then(response => {
                    this.sendpackageships = response.data.data
                    this.isLoading = false
                    this.page += 1

                });
        },
        getCarryPackage() {
            this.isLoading = true
            this.$axios.get('carrypackage?page=' + this.page)
                .then(response => {
                    this.carrypackageships = response.data.data
                    this.isLoading = false
                    this.page += 1

                });
        },
        getPhoto() {
            let photo = "images/roaling.gif";
            return photo;
        }
    },
    watch: {
        goodstype: function(val) {
            this.goodstype = val
        },
        startsearch: function(val) {
            this.startsearch = val
        },

        endsearch: function(val) {
            this.endsearch = val
        }
    }


}
</script>
<style scoped>
.con-vs-tabs {
    background: #fff;
}

.searchheader {
    text-align: center;
    padding: 7px !important;
    font-size: 18px;
    color: #2d3436;
    background-color: #1abc9c61;
}

.loading {
    height: auto;
    max-width: 50%;
    margin: auto;
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>