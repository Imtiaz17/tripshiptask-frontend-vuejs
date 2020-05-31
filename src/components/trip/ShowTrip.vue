<template>
    <div>
        <div class="content vld-parent">
            <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
            <div id="main-dashboard" class="conbox">
                <div id="social-layout" class="dashboard-columns" style="min-height:500px;">
                    <div class="columns">
                        <div class="column is-8">
                            <div v-if="trip">
                                <edit-trip :info="data"></edit-trip>
                            </div>
                            <div v-else>
                                <div class="flex-card featured-feed-post light-bordered light-raised" style="min-height:100px; max-height:380px">
                                    <div class="c-body">
                                        <div class="columns is-mobile" style="margin-top:30px">
                                            <div class="column is-8" style="margin-top:-27px">
                                                <span class="tripid">
                                                    Trip Id: {{info.trip_id}}
                                                </span>
                                                <h4 class="triptitle">
                                                    {{info.title}}
                                                </h4>
                                            </div>
                                            <div class="column is-4">
                                                <!--  <button @click="" class="button btn-align info-btn raised" v-if="post_type=='offer'">Back</button> -->
                                                <!--  <a @click="$router.go(-1)">back</a>
                                                 -->
                                                <div class="author-meta" style="margin-top: -26px;float:right;padding:0px 17px">
                                                    <div style="color:gray">Published by
                                                        <span style="color: black;font-weight:600">{{info.user}}</span>
                                                    </div>
                                                    <div style="color:gray">
                                                        Posted
                                                        <span>
                                                            {{moment(info.created_at).fromNow()}}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr style="margin:0;margin-top:-11px">
                                        <div class="post-detail-section">
                                            <div class="post-body">
                                                <h5>Ride Details</h5>
                                                <div class="divider"></div>
                                                <p style="font-size: 15px;line-height: 23px;">
                                                    {{info.details}}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="post-activity">
                                            <div class="columns tactivity  is-mobile">
                                                <div class="left column is-9">
                                                    <h5>Trip Activity</h5>
                                                    <div class="divider"></div>
                                                    <div class="field" style="display:inline-flex">
                                                        <label class="label">Total Bids:</label>
                                                        <div class="control" style="margin-left:5px;margin-top:-2px;">
                                                            <label>{{info.bids_count}}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="right column is-3" v-if="trip_owner">
                                                    <vs-button type="filled" @click="editTrip">Edit</vs-button>
                                                    <vs-button type="filled" color="danger" @click="deleteTrip(info.slug)">Delete</vs-button>
                                                </div>
                                                <div class="column is-3" v-else v-show="canBid">
                                                    <a @click="bidtrip" class="button btn-dash info-btn btn-dash is-raised rounded ripple  btn-fade right"><span class="material-icons">
                                                            add_alert
                                                        </span> Bid</a>
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
                                    </div>
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32">
                                            <span class="material-icons">airline_seat_legroom_normal</span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Seats Available:</p>
                                        <p class="post-info">
                                            {{info.seat}}
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
                                    <div class="media-left is-hidden-mobile">
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
                                    <div class="media-left is-hidden-mobile">
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
                                            <span class="material-icons">
                                                money
                                            </span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Offered Amount:</p>
                                        <p class="post-info">
                                            <span class="amountpayble">
                                                {{info.pay}} BDT
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
                                            <span class="material-icons">star_border</span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-info">
                                            <span class="rating" @click="tripOwnerRating">
                                                <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="info.trip_poster_rating" style="float:left"> </star-rating>
                                                <!--  <el-rate v-model="data.trip_poster_rating" disabled></el-rate> -->
                                                <!--  <small class="rate">{{data.trip_poster_rating}}</small> -->
                                            </span>
                                        </p>
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
                                            <img src="https://img.icons8.com/material/48/000000/facebook-new.png" />
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <div class="post-share">
                                            <p class="post-title">Facebook id:</p>
                                            <a :href="info.facebook" target="_blank">
                                                {{info.facebook}}
                                            </a>
                                        </div>
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
        </div>
        <offer-bids :data="content" v-if="content.post_type=='offer'" v-show="offering"></offer-bids>
        <seeking-bids :data="content" v-else-if="content.post_type=='seek'"></seeking-bids>
        <vs-popup class="holamundo" title="Bid for this ride" :active.sync="bid">
            <div class="columns" v-if="content.post_type=='seek'">
                <div class="column is-4">
                    <div class="field mt-5">
                        <div class="control">
                            <float-label :dispatch="false" label="Vehicle type" fixed>
                            <div class="select">
                                <select name="vehicle_type" v-on:change="loadV" v-model="form.vehicle_type" v-validate="'required'">
                                    <option v-for="(item,index) in voptions" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                        </float-label>
                            <span v-show="errors.has('vehicle_type')" class="help is-danger">Vehicle type is required</span>
                        </div>
                    </div>
                </div>
                <div class="column is-4" v-if="own">
                    <label class="label">Do you own this vehicle?</label>
                    <div class="control">
                        <ul class="leftx" style="display: inline-flex;">
                            <li style="margin-left:10px;">
                                <vs-radio vs-name="radios1" vs-value="yes" @change="yes">Yes</vs-radio>
                            </li>
                            <li style="margin-left:10px;">
                                <vs-radio vs-name="radios1" vs-value="no" @change="no">No</vs-radio>
                            </li>
                        </ul>
                    </div>
                    <input type="" v-model="radio" type="hidden" v-validate="'required'" name="vehicle">
                    <span v-show="errors.has('vehicle')" class="help is-danger">Please select an option</span>
                </div>
                <div class="column is-4" v-if="ownCar">
                    <div class="control" v-if="myVehicles.length>0">
                        <select v-on:change="loadV" v-model="form.vehicle">
                            <option :value="null" disabled selected>Select vehicle</option>
                            <option v-for="(item,index) in myVehicles" :key="index" :value="item">{{item}}</option>
                        </select>
                    </div>
                    <div class="control" v-else-if="myVehicles.length==0">
                        <span style="color:red">No vehicles found</span>
                    </div>
                </div>
            </div>
            <div class="columns is-vcentered">
                <div class="column is-4">
                    <div class="control">
                        <float-label label="Bid amount" fixed>
                            <input type="number" v-model="form.amount" name="amount" class="input is-primary-focus">
                        </float-label>
                    </div>
                </div>
                <span class="infotext">Put in the amount only if you want to negotiate</span>
            </div>
            <div class="columns">
                <div class="column is-three-quarters">
                    <div class="field">
                        <div class="control">
                            <float-label label="Short Message" fixed>
                                <textarea class="textarea is-primary-focus" v-model="form.message" rows="4" placeholder="Optional"></textarea>
                            </float-label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="has-text-center">
                <button @click="submit" class="button btn-align info-btn raised">Submit</button>
            </div>
        </vs-popup>
        <vs-sidebar position-right parent="body" default-index="1" color="primary" class="sidebarx" spacer v-model="feedbackShow">
            <div class="header-sidebar" slot="header">
                <vs-avatar size="70px" :src="'/images/' + data.trip_owner_photo" style="float:left" />
                <div class="con-colors" style="overflow:hidden">
                    <ul style="padding-left:10px">
                        <li style="font-size: 21px;color: rgb(36, 33, 69);font-weight:700">
                            <h4>
                                {{data.user}}
                            </h4>
                            <span @click="removeModal" class="material-icons" style="float:right;margin-top:-28px;    cursor: pointer;">clear</span>
                        </li>
                        <li>
                            <span class="address">
                                <i class="material-icons" style="font-size:21px">room</i>
                                <p style="margin-top: -2px;">{{data.user_lcoation}}</p>
                            </span>
                        </li>
                        <li>
                            <span class="rating">
                                <!-- <el-rate v-model="data.trip_poster_rating" disabled></el-rate> -->
                                <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="data.trip_poster_rating" style="float:left"> </star-rating>
                                <small class="rate">{{data.trip_poster_rating}}</small>
                            </span>
                        </li>
                        <li>
                        </li>
                    </ul>
                </div>
            </div>
            <posted-trip-feedback :data="postedfeedbacks"></posted-trip-feedback>
        </vs-sidebar>
    </div>
</template>
<script>
import Vue from 'vue';
import StarRating from 'vue-star-rating';
import 'moment-duration-format';
import moment from 'moment-timezone';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

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
        googleMap: () => import('@/components/global/googleMap'),
        offerBids: () => import('@/components/trip/OfferingBids'),
        seekingBids: () => import('@/components/trip/SeekingBids'),
        editTrip: () => import('@/components/trip/EditTrip'),
        StarRating,
        Loading
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
            offering: true,
            ownCar: false,
            rentCar: false,
            own: false,
            text: false,
            bid: false,
            canBid: true,
            radio: '',
            time: this.data.duration,
            mapLoaded: false,
            content: this.data,
            moment: moment,
            form: {
                vehicle_type: '',
                vehicle: '',
                message: '',
                amount: '',
                trip_id: this.data.id,
            },
            myVehicles: [],
            voptions: [
                'Car',
                'Mini van',
                'Motorcycle',
                'Electric Scooter',
                'CNG',
                'Rickshaw',
                'Bicycle'
            ]

        }

    },
    created() {
        for (let i = 0; i < this.data.bids.length; i++) {
            if (this.data.bids[i].user_id == this.authId) {
                this.canBid = false
            }
        }
        // axios.post('api/auth/me', this.data)
        //     .then(res =>
        //         this.id = res.data.id)
        //     .catch(error => console.log(error.res.data))
    },

    computed: {
        authId() {
            return this.$store.getters.id
        },
        trip_owner() {
            return this.$store.getters.id == this.data.user_id
        }

    },

    mounted() {
        // this.$refs.xyz.$mapPromise.then(() => {
        //     this.directionsService = new google.maps.DirectionsService()
        //     this.directionsDisplay = new google.maps.DirectionsRenderer()
        //     this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
        //     var vm = this
        //     var waypts = []
        //     var midpoint = this.data.via
        //     if (midpoint) {
        //         waypts.push({
        //             location: midpoint,
        //             stopover: true
        //         })
        //     };

        //     vm.directionsService.route({
        //         origin: this.data.start_point,
        //         destination: this.data.destination,
        //         travelMode: 'DRIVING',
        //         waypoints: waypts
        //     }, function(response, status) {
        //         if (status === 'OK') {
        //             vm.directionsDisplay.setDirections(response)
        //         } else {
        //             console.log('Directions request failed due to ' + status)
        //         }
        //     });
        // }, 2000);

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
        amountfield() {
            this.text = true;
        },
        removeModal() {
            this.feedbackShow = !this.feedbackShow
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
        loadV() {
            this.$axios.post(`vehicles/${this.authId}`, {
                    ve: this.form.vehicle_type,
                    id: this.id
                })
                .then(res => {
                    this.myVehicles = res.data;

                })
                .catch(error => console.log(error.res.data))
        },
        yes() {
            this.radio = "true"
            this.ownCar = true
            this.rentCar = false
        },
        no() {
            this.radio = "true"
            this.ownCar = false
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
        submit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.bid = false
                    this.isLoading = true
                    this.$axios.post('tripbids', this.form)
                        .then((res) => {
                            this.canBid = false
                            this.bid = false
                            setTimeout(() => {
                                this.isLoading = false
                                this.$axios.get('getTrip/' + this.data.id)
                                    .then(res => {
                                        EventBus.$emit('newTrip', res.data)
                                    })
                            }, 0)
                        })
                        .catch(error => {
                            this.isLoading = false
                            console.log(error.res.data)
                        })
                }
            })
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
                    this.axios.delete(`trip/${this.data.slug}`)
                    Swal.fire(
                        'Deleted!',
                        'Your task has been deleted.',
                        'success'
                    )
                    this.$router.push('/task')
                } else(

                    result.dismiss === Swal.DismissReason.cancel
                )

            })
        },
    },
    watch: {
        'form.vehicle_type': function(val) {
            this.myVehicles = []
            this.own = true
            this.loadV()

        },
        feedbackShow: function(val) {
            if (val == true) {
                document.getElementsByTagName("html")[0].style.overflow = "hidden";
            } else
                document.getElementsByTagName("html")[0].style.overflow = "auto"
        },

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

.post-body {
    padding: 0px 10px;
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
    margin-left: -15px
}

.vs-sidebar--header {
    padding: 3px 5px;
}

.trip-giver-info {
    min-height: 160px;
    margin-top: -20px;
    margin-left: -15px;
}

.taskinfo {
    margin-left: 7px;
}

.header {
    min-height: 65px;
    border-bottom: 1px solid #e0e0e0;

}

a {
    color: #878787;
}

.featured-feed-post .post-body {
    padding: 0em 1em !important;
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
    padding: 20px 0px 0px;
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
    font-size: 1.5em;
    margin-bottom: 0.2em;
}

.recent-post {
    margin-top: 1px;
    margin-bottom: 4px;
}

.media+.media {
    padding-top: 0.3rem;
}

.recent-post a {
    margin: 0px;
}

.recent-post .post-title {
    margin-bottom: 0px !important;
    float: left;
    padding-right: 5px;
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



.rating {
    margin-left: 2px;
    width: 87%;
    display: inline-flex;
    cursor: pointer;
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


.address {
    display: inline-flex;
    font-size: 15px;
    margin-left: -6px;
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
</style>