<template>
    <section>
        <div v-if="data.length>0" class="fixed_header">
            <table class="table is-accent">
                <thead>
                    <tr>
                        <th style="width:30%">From - To</th>
                        <th>Shipment Id</th>
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
                            {{item.shipment_id}}
                        </td>
                        <td>
                            {{item.amount}} {{currency}}
                        </td>
                        <td>
                            <span class="rating">
                                <star-rating :show-rating=false :star-size="17" :read-only="true" :increment="0.1" :rating="item.shipment_rating"></star-rating>
                                <small class="rate">{{item.shipment_rating}}</small>
                            </span>
                        </td>
                        <td>
                            <button @click="sendpackage(item)" v-if="item.post_type=='send_package'" class="button is-small info-btn raised rounded">Repost</button>
                            <button @click="carrypackage(item)" v-else-if="item.post_type=='carry_package'" class="button is-small info-btn raised rounded">Repost</button>
                            <router-link :to="item.path">
                                <button class="button is-small btn-align accent-btn raised rounded btn-outlined">view</button>
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
        <vs-popup class="holamundo" title="title" :active.sync="sendpackageactivo">
            <send-package></send-package>
        </vs-popup>
        <vs-popup class="holamundo" title="title" :active.sync="carrypackageactivo">
            <carry-package></carry-package>
        </vs-popup>
    </section>
</template>
<script>
import StarRating from 'vue-star-rating'
import moment from 'moment'
export default {
    components: {
        StarRating,
        sendPackage: () => import('@/components/ship/SendPackage'),
        carryPackage: () => import('@/components/ship/CarryPackage')
    },
    props: ['data'],
    data() {
        return {
            moment: moment,
            sendpackageactivo: false,
            carrypackageactivo: false

        }
    },
    computed: {
        currency() {
            return this.$store.getters.user.currency
        },
    },
    methods: {
        sendpackage(info) {
            this.sendpackageactivo = true;
            EventBus.$emit('SendPackageRepost', info)
        },
        carrypackage(info) {
            this.carrypackageactivo = true;
            EventBus.$emit('CarryPackageRepost', info)
        }
    },


}
</script>
<style scoped>
.rate {
    color: #00B289;
    margin-top: 1px;
    margin-left: 3px;
    font-size: 14px;
}

.rating {
    display: inline-flex;
}

table td button {
    margin-right: 4px;
}
</style>