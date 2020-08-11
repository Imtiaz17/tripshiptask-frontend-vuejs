<template>
    <div class="maincolumns">
         <vue-headful title="My Trips" description="my trip" />
        <div class="columns">
            <div class="column is-10 is-offset-1">
                <vs-tabs class="multiple">
                    <vs-tab label="Give a Ride">
                        <div v-if="isLoading">
                            <img class="loading" src="../../assets/images/roaling.gif">
                        </div>
                        <div v-else>
                            <posted-trip v-if="mytrips" :data="mytrips.posted_trips"></posted-trip>
                        </div>
                    </vs-tab>
                    <vs-tab label="Get a Ride">
                        <seeked-trip v-if="mytrips" :data="mytrips.seeked_trips"></seeked-trip>
                    </vs-tab>
                    <vs-tab label="Completed Rides">
                        <completed-trip v-if="mytrips" :data="mytrips.completed_trips"></completed-trip>
                    </vs-tab>
                </vs-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        PostedTrip:() => import('@/components/trip/PostedTrip'),
        CompletedTrip:() => import('@/components/trip/CompletedTrip'),
        SeekedTrip:() => import('@/components/trip/SeekedTrip')
    },
    data() {
        return {
            first: true,
            second: false,
        }
    },
    computed: {
        id() {
            return this.$store.getters.id
        },
        mytrips() {
            return this.$store.getters.mytrips.data
        },
        isLoading() {
            return this.$store.getters.isLoading
        }
    },

    created() {
        this.myTrip();
    },
    methods: {
        ...mapActions("trip",
            ['myTrip']),
        getPhoto() {
            let photo = "../../assets/images/roaling.gif";
            return photo;
        },

        posted() {
            this.first = true,
                this.second = false

        },
        completed() {
            this.second = true,
                this.first = false
        },
        // onChange() {
        //     this.isLoading = true
        //     axios.get(`api/mytrip/${this.auth}`)
        //         .then(res => {
        //             this.data = res.data.data
        //             this.isLoading = false

        //         })
        //         .catch(error => console.log(error.res))
        // },
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