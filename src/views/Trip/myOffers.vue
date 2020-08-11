<template>
    <div class="maincolumns">
        <vue-headful title="My Trip Offers" />
        <div class="columns">
            <div class="column is-10 is-offset-1">
                <div class="card">
                <!-- <div class="columns">
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
                </div> -->
                <div v-if="offers.length>0" class="fixed_header">
                    <table class="table is-accent">
                        <thead>
                            <tr>
                                <th style="width:30%">From - To</th>
                                <th>Trip Id</th>
                                <th>Trip Date</th>
                                <th>Amount</th>
                                <th>Counter Offer</th>
                                <th>Accepted</th>
                                <th>view</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in offers" :key="index">
                                <td style="width:30%">

                                    {{item.trip_start_point.split(',')[0]}} - {{item.trip_destination.split(',')[0]}}
                                </td>
                                <td>
                                    {{item.trip_id}}
                                </td>
                                <td>
                                    {{moment(item.date).format('DD/MM/YYYY')}}
                                </td>
                                <td>
                                    {{item.amount}}
                                </td>
                                <td>
                                    {{item.co}}
                                </td>
                                <td>
                                    <span v-if="item.accepted==0">No</span>
                                    <span v-else-if="item.accepted==1">Yes</span>
                                </td>
                                <td>
                                    <router-link :to="item.path">
                                        <button class="button is-small secondary-btn raised rounded btn-outlined">View</button>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <div style="padding:80px;margin-top:48px;">
                        <p style="font-size:26px;text-align:center;color:#ccc">No records found</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    components: {},
    data() {
        return {
            moment: moment,
            offers: '',
        }
    },
    computed: {
        id() {
            return this.$store.getters.id
        },

    },

    created() {
        this.myTripOffers();
    },
    methods: {
        myTripOffers() {
            this.$axios.get('my-trip-offers')
                .then(res => {
                    this.offers = res.data.data
                })
        },

        getPhoto() {
            let photo = "../../assets/images/roaling.gif";
            return photo;
        },

    }
}
</script>
<style scoped>
.flex-card .tabs {
    padding: 0px;
}

.tabs ul li:hover a {
    border-bottom-color: #039BE5 !important
}


.active {
    color: #039BE5 !important;

}

.is-activee {
    background-color: #039BE5 !important;
    border-bottom-color: #039BE5 !important;

}


.maincolumns {
    padding-top: 20px;
}

.main {
    font-weight: 500;

}

.side li {
    padding: 5px;
}

.side li a {
    color: #4A4A4A;
}

.height {
    position: absolute;
    left: 50%;
    top: 10%;
    bottom: 10%;
    border-left: 1px solid white;
}

.loading {
    height: auto;
    max-width: 50%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: none !important;
}
</style>