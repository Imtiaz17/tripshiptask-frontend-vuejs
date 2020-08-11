<template>
    <section>
         <div class="columns">
            <div class="column is-3">
                <div class="control">
                    <float-label :dispatch="false" label="Status" fixed>
                        <div class="select">
                            <select v-model="status">
                                <option v-for="(item,index) in statuses" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                </div>
            </div>
        </div>

        <div v-if="data.length>0" class="fixed_header">
            <table class="table is-accent">
                <thead>
                    <tr>
                        <th style="width:30%">From - To</th>
                        <th>Trip Id</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in results" :key="index">
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
                        <td>
                            <span v-if="today>item.date" class="tag is-danger">Expired</span>
                            <span v-else class="tag is-success">Live</span>
                        </td>
                        <td >
                            <button @click="showtrip(item)" v-if="today>item.date" class="button is-small info-btn raised rounded btn-left">Repost</button>
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
        <vs-popup class="holamundo" title="title" :active.sync="popupActivo">
                 <seek-trip></seek-trip>
            </vs-popup>
    </section>
</template>
<script>
import moment from 'moment'
export default {
     components: {
         seekTrip: () => import('@/components/trip/seekTrip'),
    },

    props: ['data'],
    data() {
        return {
            moment: moment,
            today: moment().format('YYYY-MM-DD'),
            popupActivo:false,
            statuses: ['All', 'Live', 'Expired'],
            status: 'All'

        }
    },
    computed: {
         currency() {
            return this.$store.getters.user.currency
        },
        results() {
            return this.data.filter(trip => {
                if (this.status == 'Live') {
                    return trip.date > this.today
                }
                if (this.status == 'All') {
                    return trip
                }
                if (this.status == 'Expired') {
                    return trip.date < this.today
                }
            })
        }
    },
    mounted()
    {
        EventBus.$on('CloseRepost', () => {
             this.popupActivo = false
        })
    },
    methods: {
        showtrip(info) {
            this.popupActivo = true;
            EventBus.$emit('GetRideRepost', info)
        },
    }

}
</script>
<style scoped>
</style>