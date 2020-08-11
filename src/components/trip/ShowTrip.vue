<template>
    <div>
        <div class="content vld-parent">
            <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
            <div id="main-dashboard">
                <div class="columns">
                    <div class="column is-8">
                        <div v-if="trip">
                            <edit-trip :info="data"></edit-trip>
                        </div>
                        <div v-else>
                            <div class="flex-card featured-feed-post light-bordered light-raised" style="min-height:100px; max-height:380px">
                                <div class="body">
                                    <div class="columns is-mobile">
                                        <div class="column is-8">
                                            <span class="tripid">
                                                Trip Id: {{info.trip_id}}
                                            </span>
                                            <h4 class="triptitle">
                                                {{info.title}}
                                            </h4>
                                        </div>
                                        <div class="column is-4">
                                            <div class="posting-time">
                                                <span>Posted {{moment(info.created_at).fromNow()}}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr style="margin: -7px 0px 0px;">
                                    <div class="post-detail-section">
                                        <div class="post-body">
                                            <h5>Notes</h5>
                                            <div class="divider"></div>
                                            <p style="font-size: 15px;line-height: 23px;">
                                                {{info.details}}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="post-activity">
                                        <div class="columns tactivity  is-mobile">
                                            <div class="left column">
                                            </div>
                                            <div class="right column is-3" v-if="trip_owner">
                                                <vs-button v-if="showDeleteTrip" type="filled" color="danger" @click="deleteTrip(info.slug)">Delete</vs-button>
                                                <vs-button type="filled" @click="editTrip">Edit</vs-button>
                                                <vs-button v-if="showCancelTrip" @click="cancelTrip" color="rgb(11, 189, 135)" type="filled">Cancel Trip</vs-button>
                                            </div>
                                            <div class="column is-3" v-else v-show="canBid">
                                                <a v-if="verified" @click="bidtrip" class="button btn-dash info-btn is-raised rounded btn-fade right"><span class="material-icons">
                                                        add_alert
                                                    </span>Offer</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top:-12px">
                                <google-map :data="data"></google-map>
                            </div>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="flex-card light-bordered light-raised trip-info">
                            <h3 class="card-heading is-bordered">Trip information</h3>
                            <article class="media recent-post">
                                <div class="media-left is-hidden-mobile">
                                    <figure class="image is-32x32">
                                        <span v-if="info.vehicle_type=='Car'" class="material-icons">directions_car</span>
                                        <span v-else-if="info.vehicle_type=='Motorcycle'" class="material-icons">two_wheeler</span>
                                        <span v-else-if="info.vehicle_type=='Mini van'" class="material-icons">local_shipping</span>
                                        <span v-else><span class="material-icons">local_taxi</span></span>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Vehicle Type:</p>
                                    <p class="post-info">{{info.vehicle_type}}</p>
                                    <p class="post-title">Vehicle:</p>
                                    <p class="post-info">{{info.vehicle_name}}</p>
                                </div>
                                <div class="media-left is-hidden-mobile">
                                    <figure class="image is-32x32">
                                        <span class="material-icons">airline_seat_legroom_normal</span>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Total Seats:</p>
                                    <p class="post-info">
                                        {{info.vehicle_seat}}
                                    </p>
                                    <p class="post-title">Seats Available:</p>
                                    <p class="post-info">
                                        {{info.seats_available}}
                                    </p>
                                </div>
                            </article>
                            <article class="media recent-post">
                                <div class="media-left is-hidden-mobile">
                                    <figure class="image is-32x32" style="padding-top: 5px;">
                                        <span class="material-icons">
                                            near_me
                                        </span>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Start Point:</p>
                                    <p class="post-info">
                                        {{info.start_point}}
                                    </p>
                                </div>
                            </article>
                            <article class="media recent-post" v-if="info.via">
                                <div class="media-left is-hidden-mobile">
                                    <figure class="image is-32x32">
                                        <span class="material-icons">room</span>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Mid Point</p>
                                    <p class="post-info"> {{info.via}}
                                    </p>
                                </div>
                            </article>
                            <article class="media recent-post">
                                <div class="media-left is-hidden-mobile">
                                    <figure class="image is-32x32">
                                        <span class="material-icons" style="margin-top: 3px;">beenhere</span>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Destination:</p>
                                    <p class="post-info">
                                        {{info.destination}}
                                    </p>
                                </div>
                            </article>
                            <article class="media recent-post">
                                <div class="media-left is-hidden-mobile">
                                    <figure class="image is-32x32">
                                        <span class="material-icons">trending_up</span>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Trip distance:</p>
                                    <p class="post-info">
                                        {{info.distance}}
                                    </p>
                                </div>
                                <div class="media-left is-hidden-mobile" style="    margin-left: -46px;">
                                    <figure class="image is-32x32">
                                        <span class="material-icons">schedule</span>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Trip duration:</p>
                                    <p class="post-info">
                                        {{info.duration}}
                                    </p>
                                </div>
                            </article>
                            <article class="media recent-post">
                                <div class="media-left is-hidden-mobile">
                                    <figure class="image is-32x32">
                                        <span class="material-icons">
                                            calendar_today
                                        </span>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Date:</p>
                                    <p class="post-info">
                                        {{moment(info.date).format("ll")}}
                                    </p>
                                </div>
                                <div class="media-left is-hidden-mobile" style="margin-left: -73px;">
                                    <figure class="image is-32x32">
                                        <span class="material-icons">access_time</span>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Time:</p>
                                    <p class="post-info">
                                        {{moment(info.time, "HH:mm::ss").format("hh:mm A")}}
                                    </p>
                                </div>
                            </article>
                            <article class="media recent-post">
                                <div class="media-left is-hidden-mobile">
                                    <figure class="image is-32x32">
                                        <span class="material-icons">how_to_reg</span>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Prefer to give ride:</p>
                                    <p class="post-info"> {{info.preferred_passenger}}
                                    </p>
                                </div>
                            </article>
                            <article class="media recent-post">
                                <div class="media-left is-hidden-mobile">
                                    <figure class="image is-32x32">
                                        <span class="material-icons">
                                            money
                                        </span>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Offered Amount:</p>
                                    <p class="post-info">
                                        <span class="amountpayble">
                                            {{info.pay}} {{info.currency}}
                                        </span>
                                    </p>
                                </div>
                            </article>
                        </div>
                        <div class="flex-card light-bordered light-raised trip-giver-info">
                            <h3 class="card-heading is-bordered">Trip poster’s information</h3>
                            <article class="media recent-post">
                                <div class="media-left is-hidden-mobile">
                                    <figure class="image is-32x32">
                                        <i class="material-icons">local_offer</i>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Posted:</p>
                                    <div class="post-info">
                                        <div class="verified">
                                            <span class="username">
                                                {{data.user.split(' ')[0]}}</span>
                                            <span class="material-icons">
                                                verified
                                            </span>
                                            <span class="text">Govt Id Verified</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <article class="media recent-post" style="margin: auto;">
                                <div class="media-left is-hidden-mobile">
                                    <figure class="image is-32x32">
                                        <span class="material-icons">star_border</span>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <div class="rating" @click="feedbackShow=true">
                                        <a-rate :default-value="info.trip_poster_rating" disabled allow-half />
                                    </div>
                                </div>
                            </article>
                            <article class="media recent-post">
                                <div class="media-left is-hidden-mobile">
                                    <figure class="image is-32x32">
                                        <i class="material-icons">local_offer</i>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Trips posted:</p>
                                    <p class="post-info">
                                        {{info.total_trip}}
                                    </p>
                                </div>
                            </article>
                            <article class="media recent-post">
                                <div class="media-left is-hidden-mobile">
                                    <figure class="image is-32x32">
                                        <i class="material-icons">history</i>
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="post-title">Member since:</p>
                                    <p class="post-info">
                                        {{info.user_created}}
                                    </p>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <offer-bids :data="info" v-if="info.post_type=='offer'" v-show="offering"></offer-bids>
        <seeking-bids :data="info" v-else-if="info.post_type=='seek'"></seeking-bids>
        <post-bid :content="info" v-if="bid"></post-bid>
        <a-drawer :width="720" :visible="feedbackShow" :body-style="{ paddingBottom: '80px' }" @close="onClose">
            <div class="header">
                <vs-avatar size="70px" :src="'/images/' + data.trip_owner_photo" style="float:left" />
                <div class="con-colors" style="overflow:hidden">
                    <ul style="padding-left:10px">
                        <li>
                            <h4>
                                {{data.user}}
                            </h4>
                        </li>
                        <li>
                            <span class="address">
                                <i class="material-icons">room</i>
                                <p>{{data.user_location}}</p>
                            </span>
                        </li>
                        <li>
                            <div class="rating">
                                <a-rate :default-value="data.trip_poster_rating" disabled allow-half />
                            </div>
                            <!-- <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="data.trip_poster_rating" style="float:left"> </star-rating>
                                <small class="rate">{{data.trip_poster_rating}}</small> -->
                        </li>
                        <li>
                        </li>
                    </ul>
                </div>
            </div>
            <vs-divider />
            <posted-trip-feedback v-if="feedbackShow" :data="postedfeedbacks"></posted-trip-feedback>
        </a-drawer>
    </div>
</template>
<script>
import Vue from 'vue';
import googleMap from '@/components/global/googleMap'
import moment from 'moment-timezone';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Rate } from 'ant-design-vue';
import { Drawer } from 'ant-design-vue';
import 'ant-design-vue/lib/rate/style/index.css'
import 'ant-design-vue/lib/drawer/style/index.css'
Vue.use(Rate);
Vue.use(Drawer);
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    closeButton: 'close-button-class'
})
// var SocialSharing = require('vue-social-sharing');
// Vue.use(SocialSharing);
// import bidTrip from './bidTrip';
export default {

    components: {
        postedTripFeedback: () => import('@/components/trip/postedTripFeedback'),
        completedTripFeedback: () => import('@/components/trip/completedTripFeedback'),
        offerBids: () => import('@/components/trip/OfferingBids'),
        seekingBids: () => import('@/components/trip/SeekingBids'),
        editTrip: () => import('@/components/trip/EditTrip'),
        postBid: () => import('@/components/trip/PostaBid'),
        Loading,
        googleMap
    },
    props: ['data'],
    data() {
        return {
            info: this.data,
            isLoading: false,
            tripownerid: this.data.user_id,
            postedfeedbacks: this.data.trip_poster_feedback,
            feedbackShow: false,
            trip: false,
            id: '',
            rt: 4,
            status: 'cancel',
            offering: true,
            own: false,
            text: false,
            bid: false,
            canBid: true,
            radio: '',
            time: this.data.duration,
            mapLoaded: false,
            content: this.data,
            moment: moment,
            showCancelTrip: false,
            showDeleteTrip: true,
        }

    },
    created() {
        if (this.data.seats_available <= 0) {
            this.canBid = false
        }
        for (let i = 0; i < this.data.bids.length; i++) {
            if (this.data.bids[i].user_id == this.authId) {
                this.canBid = false
            }
            if (this.data.bids[i].passenger_accepted == 1) {
                this.showCancelTrip = true
                this.showDeleteTrip = false
            }
        }
    },

    computed: {
        authId() {
            return this.$store.getters.id
        },
        trip_owner() {
            return this.$store.getters.id == this.data.user_id
        },
        verified() {
            return this.$store.getters.user.status == 'verified'
        }

    },

    mounted() {

        EventBus.$on('bidPosting', () => {
            this.bid = false
            this.isLoading = true
        })
        EventBus.$on('bidPosted', () => {
            this.canBid = false
            this.$axios.get('getTrip/' + this.data.id)
                .then(res => {
                    this.isLoading = false
                    this.info = res.data.data
                    EventBus.$emit('newBid', res.data)
                    Toast.fire({
                        type: 'success',
                        title: 'Offer sent successfully'
                    })
                })
        })
        EventBus.$on('updatePost', (value) => {
            this.info = value
        })

        EventBus.$on('bidFailed', () => {
            this.bid = false
            this.isLoading = false
            alert('something gone wrong! try again later!!')
        })
        EventBus.$on('tripupdated', (value) => {
            this.offering = true
            this.trip = false
            this.info = value
            Toast.fire({
                type: 'success',
                title: 'Trip post successfully updated.'
            })
        })


        EventBus.$on('cancelupdate', () => {
            this.offering = true
            this.trip = false
        })

        EventBus.$on('edited', () => {
            this.offering = true
            this.trip = false
        })

    },
    methods: {
        onClose() {
            this.feedbackShow = false
        },
        amountfield() {
            this.text = true;
        },
        removeModal() {
            this.feedbackShow = false
        },
        cancelTrip() {
            this.$vs.dialog({
                type: 'confirm',
                color: 'danger',
                title: `Alert`,
                text: 'Are you sure you want to cancel the trip?',
                acceptText: 'Yes',
                accept: this.acceptAlert
            })

        },
        acceptAlert() {
            this.$axios.patch(`canceltrip/${this.data.slug}`, this.status)
        },
        calcRoute: function() {
            this.directionsService = new google.maps.DirectionsService()
            this.directionsDisplay = new google.maps.DirectionsRenderer()
            this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
            var vm = this
            vm.directionsService.route({
                origin: this.data.start_point,
                destination: this.data.destination,
                travelMode: 'DRIVING'
            }, function(response, status) {
                if (status === 'OK') {
                    console.log("hello");
                    vm.directionsDisplay.setDirections(response)
                } else {
                    console.log('Directions request failed due to ' + status)
                }
            })
        },


        editTrip() {
            this.offering = false
            this.trip = true
        },

        bidtrip() {
            this.bid = true
        },
        tripOwnerRating() {
            this.feedbackShow = !this.feedbackShow;
        },
        deleteTrip(slug) {
            Swal.fire({
                title: 'Are you sure you want to delete this post?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.$axios.delete(`trip/${this.data.slug}`)
                        .then(res => {
                            Swal.fire(
                                'Deleted!',
                                'Your Trip has been deleted.',
                                'success'
                            )
                            this.$router.push('/trip')

                        })

                } else(

                    result.dismiss === Swal.DismissReason.cancel
                )

            })
        },
    },
    watch: {
        // feedbackShow: function(val) {
        //     if (val == true) {
        //         document.getElementsByTagName("html")[0].style.overflow = "hidden";
        //     } else
        //         document.getElementsByTagName("html")[0].style.overflow = "auto"
        // },

    }
}
</script>
<style scoped>
.triptitle {
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 0;
    margin-left: 10px;
}

.flex-card .card-body {
    padding: 0px 0px;
}

.recent-post figure img {
    width: 28px;
    border-radius: 0% !important;
}

.responsive-title {
    padding: 12px 9px;
}

.trip-info {
    min-height: 200px;
    margin-left: -5px
}

.vs-sidebar--header {
    padding: 3px 5px;
}

.trip-giver-info {
    min-height: 160px;
    margin-top: -20px;
    margin-left: -5px;
}

.taskinfo {
    margin-left: 7px;
}

a {
    color: #878787;
}

.featured-feed-post .post-meta {
    padding-left: 15px;
    padding-right: 8px;
    padding-top: 24px;
    font-size: 1rem;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
}

a:hover {
    color: #35B9EF;
}


.content {
    padding: 20px 0px 0px 0px;
    margin-bottom: 0rem;
}

.image.is-32x32 {
    height: 20px;
    width: 20px;
}

.material-icons {
    font-size: 20px;
}


.card-heading {
    color: rgb(53, 175, 234);
    border-bottom: 1px solid #e0e0e0;
    padding: 14px;
}

.content h5 {
    font-size: 1.02rem;
}

.content h3 {
    font-size: 1.3em;
    margin-bottom: 0.2em;
}

.recent-post {
    margin-top: 6px;
    margin-bottom: 6px;
}

.media+.media {
    padding-top: 0.3rem;
}

.media-left {
    margin-right: .2rem;
}

.recent-post a {
    margin: 0px;
}

.recent-post .post-title {
    float: left;
    padding-right: 5px;
}

.content p:not(:last-child) {
    margin-bottom: 0;
}

.media .media-content p {
    font-size: 1em !important;
}

.image.is-32x32 {
    height: 20px;
    width: 20px;
}

.material-icons {
    font-size: 20px;
}

.content figure {
    margin-left: .5em;
    margin-right: .2em;
    text-align: left;
}

.content h2 {
    font-size: 1.55em;
    margin-bottom: 0.7714em;
}

.content h1,
.content h2,
.content h3,
.content h4,
.content h5,
.content h6 {
    color: #363636;
    font-weight: 500;
    line-height: 1.125;
}

.section-wrapper {
    margin: -28px -22px
}

.swal2-icon.swal2-warning {
    border-color: #DD3333 !important;
    color: #DD3333 !important;
}

.rate {
    margin-top: 2px;
    font-size: 13px;
    border: 1px solid rgb(77, 177, 226);
    background: rgb(77, 177, 226);
    padding: 0px 3px;
    color: #fff;
    margin-left: 2px;
    border-radius: 4px;

}

table th {
    color: #363636;
    background-color: #cfe4f9;
}

.ratingtext {
    font-size: 15px;
    position: absolute;
    top: 37px;
    right: 27px;
}

@media only screen and (max-width: 780px) {
    .dashboard-wrapper .section-wrapper {
        max-width: 1406px !important;
        margin: -30px 0.5px;
    }
}

.infotext {
    color: #717171;
    padding: 4px;
}

.verified {
    font-size: 18px;
    margin: px;
    display: flex;
    justify-content: flex-start;
}

.con-vs-dialog .vs-dialog .vs-dialog-text {
    font-size: 1em;
}

.verified .username {
    color: black;
    font-weight: 600;
    font-size: 14px;
}

.verified .material-icons {
    font-size: 18px;
}

.verified .text {
    font-size: 13px;
    margin-top: 2px;
}
</style>