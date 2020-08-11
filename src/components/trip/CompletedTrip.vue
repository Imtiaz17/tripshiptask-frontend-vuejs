<template>
    <section>
        <div v-if="data.length>0" class="fixed_header">
            <table class="table is-accent">
                <thead>
                    <tr>
                        <th style="width:30%">From - To</th>
                        <th>Trip Id</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in data" :key="index">
                        <td style="width:30%">
                            {{item.title}}
                        </td>
                        <td>
                            {{item.trip_id}}
                        </td>
                        <td>
                            {{moment(data.date).format('DD/MM/YYYY')}}
                        </td>
                        <td>
                            {{item.amount}} {{currency}}
                        </td>
                        <td style="width:20%">
                            <span class="rating">
                                <a-rate :default-value="item.trip_rating" disabled allow-half />
                                <small class="rate">{{item.trip_rating}}</small>
                            </span>
                        </td>
                        <td>
                            <button @click="offershowtrip(item)" v-if="item.post_type=='offer'" class="button is-small info-btn raised rounded">Repost</button>
                            <button @click="seekshowtrip(item)" v-else-if="item.post_type=='seek'" class="button is-small info-btn raised rounded">Repost</button>
                            <router-link :to="item.path">
                                <button class="button is-small secondary-btn raised rounded btn-outlined">View</button>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <div style="padding:20px;margin-top:48px;">
                <p style="font-size:26px;text-align:center;color:#ccc">No records found</p>
            </div>
        </div>
        <vs-popup class="holamundo" title="title" :active.sync="offerpopupActivo">
            <offer-trip></offer-trip>
        </vs-popup>
        <vs-popup class="holamundo" title="title" :active.sync="seekpopupActivo">
            <seek-trip></seek-trip>
        </vs-popup>
    </section>
</template>
<script>
import Vue from 'vue'
import { Rate } from 'ant-design-vue';
import 'ant-design-vue/lib/rate/style/index.css'
Vue.use(Rate);
import moment from 'moment'
export default {
    components: {
        seekTrip: () => import('@/components/trip/seekTrip'),
        offerTrip: () => import('@/components/trip/offerTrip')
    },

    props: ['data'],
    data() {
        return {
            moment: moment,
            offerpopupActivo: false,
            seekpopupActivo: false
        }
    },
    computed: {
        currency() {
            return this.$store.getters.user.currency
        },
    },
    methods: {
        offershowtrip(info) {
            this.offerpopupActivo = true;
            EventBus.$emit('Repost', info)

        },
        seekshowtrip(info) {
            this.seekpopupActivo = true;
            EventBus.$emit('GetRideRepost', info)

        },
    }

}
</script>
<style scoped>
table td button {
    margin-right: 4px;
}

.rate {
    color: #00B289;
    margin-top: 1px;
    margin-left: 3px;
    font-size: 16px;
    font-weight:600;
}

.rating {
    display: inline-flex;
}
</style>