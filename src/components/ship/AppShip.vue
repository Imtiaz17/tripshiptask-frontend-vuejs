<template>
    <div style="padding-top:10px;">
        <div class="columns">
            <div class="column is-4" style="padding:4px">
                <!--   <img src="../../assets/images/shipping.png" width="100%"> -->
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
                <div class="card search">
                    <div class="card-header active-header">
                        Search Shipments
                    </div>
                    <div class="card-content">
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
                    </div>
                </div>
                <br>
                <template v-if="sendpackage">
                    <div class="card">
                        <div class="card-header active-header">
                            Sending a package
                        </div>
                        <div class="card-content">
                            <div v-if="isSLoading">
                                <img class="loading" src="../../assets/images/roaling.gif">
                            </div>
                            <div v-else class="fixed_header">
                                <table class="table is-accent">
                                    <thead>
                                        <tr>
                                            <th>Pickup Point</th>
                                            <th>Dropoff Point</th>
                                            <th>Documents</th>
                                            <th>Pickup Date</th>
                                            <th>Delivery Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div v-if="isSLoading">
                                            <img class="loading" src="../../assets/images/roaling.gif">
                                        </div>
                                        <tr v-else v-for="(item,index) in getShipments" :key="index">
                                            <td>
                                                {{item.start_point.split(',')[0]}}
                                            </td>
                                            <td>
                                                {{item.destination.split(',')[0]}}
                                            </td>
                                            <td>
                                                {{item.documents}}
                                            </td>
                                            <td>
                                                {{moment(item.pickup_date).format("ll")}}
                                            </td>
                                            <td>
                                                {{moment(item.delivery_date_time).format("lll")}}
                                            </td>
                                            <td data-th="Action">
                                                <router-link :to="item.path">
                                                    <button class="button is-small info-btn raised  btn-outlined">view</button>
                                                </router-link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-if="carrypackage">
                    <div class="card">
                        <div class="card-header active-header">
                            Carry a package
                        </div>
                        <div class="card-content">
                            <div v-if="isSLoading">
                                <img class="loading" src="../../assets/images/roaling.gif">
                            </div>
                            <div v-else class="fixed_header">
                                <table class="table is-accent">
                                    <thead>
                                        <tr>
                                            <th>Pickup Point</th>
                                            <th>Dropoff Point</th>
                                            <th>Weight</th>
                                            <th>Pickup Date</th>
                                            <th>Delivery Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <div v-if="isSLoading">
                                            <img class="loading" :src="getPhoto()">
                                        </div>
                                        <tr v-else v-for="(item,index) in getCarryShipments" :key="index">
                                            <td>
                                                {{item.start_point.split(',')[0]}}
                                            </td>
                                            <td v-if="item.destination">
                                                {{item.destination.split(',')[0]}}
                                            </td>
                                            <td v-else>
                                                {{item.destination}}
                                            </td>
                                            <td>
                                                {{item.weight}}
                                            </td>
                                            <td>
                                                {{moment(item.pickup_date).format("ll")}}
                                            </td>
                                            <td>
                                                {{moment(item.delivery_date_time).format("lll")}}
                                            </td>
                                            <td>
                                                <router-link :to="item.path">
                                                    <button class="button is-small info-btn raised  btn-outlined">view</button>
                                                </router-link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
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
import sendPackage from '@/components/ship/SendPackage';
export default {
    components: {
        sendPackage,
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
        this.getSendLiting();
        this.getCarryListing();
    },
    mounted() {
        EventBus.$on('updateSendPackageList', () => {
            this.getSendLiting();
        })
        EventBus.$on('updateCarryPackageList', () => {
            this.getCarryListing();
        })

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
.card-header {
    padding: 10px;
    justify-content: center;
    display: block !important;
    text-align: center;
}

.card-content {
    background-color: transparent;
    padding: 0.5rem 0rem 0rem;
}
</style>