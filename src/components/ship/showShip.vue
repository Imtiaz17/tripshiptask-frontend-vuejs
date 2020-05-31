<template>
    <div>
        <div class="content vld-parent">
            <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
            <div id="main-dashboard" class="conbox">
                <div id="social-layout" class="dashboard-columns" style="min-height:500px;">
                    <div class="columns">
                        <div class="column is-8">
                            <div v-if="editship">
                                <edit-ship :info="data"></edit-ship>
                            </div>
                            <div v-else>
                                <div class="flex-card featured-feed-post light-bordered light-raised" style="min-height:100px; max-height:380px">
                                    <div class="c-body">
                                        <div class="columns is-mobile" style="margin-top:30px">
                                            <div class="column is-8" style="margin-top:-27px">
                                                <span class="shipid">
                                                    {{data.title}}
                                                </span>
                                                <h4 class="shititle">
                                                    From: {{data.start_point.split(',')[0]}} - To: {{data.destination.split(',')[0]}}
                                                </h4>
                                            </div>
                                            <div class="column is-4">
                                                <div class="author-meta" style="margin-top: -26px;float:right;padding:0px 17px">
                                                    <div style="color:gray">Published by
                                                        <span style="color: black;font-weight:600">{{data.user}}</span>
                                                    </div>
                                                    <div style="color:gray">
                                                        Posted
                                                        <span>
                                                            {{moment(data.created_at).fromNow()}}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr style="margin:0;margin-top:-11px">
                                        <div class="post-detail-section">
                                            <div class="post-body">
                                                <h5>Ship Details</h5>
                                                <div class="divider"></div>
                                                <p style="font-size: 15px;line-height: 23px;">
                                                    {{data.details}}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="post-activity">
                                            <div class="columns tactivity  is-mobile">
                                                <div class="left column is-9">
                                                    <h5>Ship Activity</h5>
                                                    <div class="divider"></div>
                                                    <div class="field" style="display:inline-flex">
                                                        <label class="label">Total Bids:</label>
                                                        <div v-if="data.post_type=='send_package'" class="control" style="margin-left:5px;margin-top:-2px;">
                                                            <label>{{data.bids_count}}</label>
                                                        </div>
                                                        <div v-else class="control" style="margin-left:5px;margin-top:-2px;">
                                                            <label>{{data.carry_bids_count}}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="right column is-3" v-if="ship_owner">
                                                    <vs-button type="filled" @click="edit">Edit</vs-button>
                                                    <vs-button color="danger" type="filled" @click="deleted(data.slug)">Delete</vs-button>
                                                </div>
                                                <div class="right column is-3 is-offset-1" v-else v-show="canBid">
                                                    <a @click="bidship" class="button btn-dash info-btn btn-dash is-raised rounded ripple  btn-fade"><span class="material-icons">
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
                                <h3 class="card-heading is-bordered">Ship information</h3>
                                <article class="media recent-post">
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32" style="padding-top: 5px;">
                                            <span class="material-icons">room</span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Pickup Point:</p>
                                        <div>
                                            <p class="post-info">{{data.start_point}}</p>
                                        </div>
                                    </div>
                                </article>
                                <article class="media recent-post">
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32" style="padding-top: 5px;">
                                            <span class="material-icons">room</span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Dropoff point:</p>
                                        <p class="post-info">
                                            {{data.destination}}
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
                                        <p class="post-title">Pickup Date:</p>
                                        <p class="post-info">
                                            {{data.pickup_date}}
                                        </p>
                                    </div>
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32" style="padding-top: 5px;">
                                            <span class="material-icons">access_time</span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Pickup time:</p>
                                        <p class="post-info">
                                            {{moment(data.pickup_time, "HH:mm").format("hh:mm A")}}
                                        </p>
                                    </div>
                                </article>
                                <article class="media recent-post">
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32">
                                            <span class="material-icons">
                                                timer
                                            </span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Delivery date time:</p>
                                        <p class="post-info">
                                            {{moment(data.delivery_date_time).format("lll")}}
                                        </p>
                                    </div>
                                </article>
                                <article class="media recent-post">
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32">
                                            <span class="material-icons">
                                                description
                                            </span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Documents:</p>
                                        <p class="post-info">
                                            {{data.documents}}
                                        </p>
                                    </div>
                                </article>
                                <article class="media recent-post" v-if="data.package_type!==null">
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32">
                                            <span class="material-icons">
                                                ballot
                                            </span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Package type:</p>
                                        <p class="post-info">
                                            {{data.package_type}}
                                        </p>
                                    </div>
                                </article>
                                <article class="media recent-post" v-else>
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32">
                                            <i class="material-icons">trending_up</i>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Package size:</p>
                                        <p class="post-info">
                                            {{data.package_size}}
                                        </p>
                                    </div>
                                </article>
                                <article class="media recent-post" v-if="data.length||data.width||data.height">
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32">
                                            <i class="material-icons">border_all</i>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Product Length x width x height:</p>
                                        <p class="post-info">
                                            {{data.length}} x {{data.width}} x {{data.height}}
                                        </p>
                                    </div>
                                </article>
                                <article class="media recent-post" v-if="data.post_type=='send_package'">
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32">
                                            <span class="material-icons">
                                                money
                                            </span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Willing to pay:</p>
                                        <p class="post-info">
                                            <span class="amountpayble">
                                                {{data.amount}} BDT
                                            </span>
                                        </p>
                                    </div>
                                </article>
                                <article class="media recent-post" v-if="data.post_type=='carry_package'">
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32">
                                            <span class="material-icons">
                                                money
                                            </span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Asking amount:</p>
                                        <p class="post-info">
                                            <span class="amountpayble">
                                                {{data.amount}} BDT
                                            </span>
                                        </p>
                                    </div>
                                </article>
                            </div>
                            <div class="flex-card light-bordered light-raised trip-giver-info">
                                <h3 class="card-heading is-bordered">Ship poster’s information</h3>
                                <article class="media recent-post">
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32">
                                            <span class="material-icons">star_border</span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <span class="rating" @click="shipPosterRating">
                                            <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="data.ship_poster_rating" style="float:left"> </star-rating>
                                            <!--  <el-rate v-model="data.ship_poster_rating" disabled ></el-rate>
                                               <small class="rate" v-if="data.ship_owner_rating>0">{{data.ship_poster_rating}}</small> -->
                                        </span>
                                    </div>
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32">
                                            <span class="material-icons">local_offer</span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Ships posted:</p>
                                        <p class="post-info">
                                            {{data.total_ship}}
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
                                            <a :href="data.facebook" target="_blank">
                                                {{data.facebook}}
                                            </a>
                                        </div>
                                    </div>
                                </article>
                                <article class="media recent-post">
                                    <div class="media-left is-hidden-mobile">
                                        <figure class="image is-32x32">
                                            <span class="material-icons">history</span>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="post-title">Member since:</p>
                                        <p class="post-info">
                                            {{data.user_created}}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <vs-sidebar position-right parent="body" default-index="1" color="primary" class="sidebarx" spacer v-model="feedbackShow">
            <div class="header-sidebar" slot="header">
                <vs-avatar size="70px" :src="'/images/' + data.ship_owner_photo" style="float:left" />
                <div class="con-colors" style="overflow:hidden">
                    <ul style="padding-left:10px">
                        <li style="font-size: 21px;color: rgb(36, 33, 69);font-weight:700">
                            <h4>
                                {{data.user}}
                            </h4>
                            <i @click="feedbackShow=!feedbackShow" class="material-icons" style="float:right;margin-top:-28px;    cursor: pointer;">clear</i>
                        </li>
                        <li>
                            <span class="rating">
                                <star-rating :show-rating=false :star-size="18" :read-only="true" :increment="0.1" :rating="data.ship_poster_rating" style="float:left"> </star-rating>
                                <small class="userrating">{{data.ship_poster_rating}}</small>
                            </span>
                        </li>
                        <li>
                        </li>
                    </ul>
                </div>
            </div>
            <posted-ship-feedback :data="data.ship_poster_feedback"></posted-ship-feedback>
        </vs-sidebar>
        <sending-bids :data="data" v-if="data.post_type=='send_package'"> </sending-bids>
        <carrying-bids :data="data" v-else-if="data.post_type=='carry_package'"></carrying-bids>
        <vs-popup class="holamundo" title="Bid for this Ship" :active.sync="bid">
            <div v-if="data.post_type=='send_package'">
                <bid-For-sendpackage :data="data"></bid-For-sendpackage>
            </div>
            <div v-else>
                <bid-For-Carrypackage :data="data"></bid-For-Carrypackage>
            </div>
        </vs-popup>
    </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment-timezone';
import 'moment-duration-format';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo)
var options = {
    easing: 'ease-in',
    offset: -60,
    force: true,
}
import VueSweetalert2 from 'vue-sweetalert2';
import StarRating from 'vue-star-rating'
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    closeButton: 'close-button-class'
})

export default {

    components: {
        sendingBids: () => import('@/components/ship/SendingBids'),
        carryingBids: () => import('@/components/ship/CarryingBids'),
        googleMap: () => import('@/components/global/googleMap'),
        editShip: () => import('@/components/ship/editShip'),
        postedShipFeedback: () => import('@/components/ship/PostedShipFeedback'),
        bidForCarrypackage: () => import('@/components/ship/bidForCarryPackage'),
        bidForSendpackage: () => import('@/components/ship/bidForSendPackage'),
        StarRating,
        Loading
    },
    props: ['data'],
    data() {
        return {
            isLoading: false,
            feedbackShow: false,
            editship: false,
            canBid: true,
            moment: moment,
            bid: false,

        }

    },
    created() {
        for (let i = 0; i < this.data.bids.length; i++) {
            if (this.data.bids[i].user_id == this.authId) {
                this.canBid = false
            }
        }
        for (let i = 0; i < this.data.carryBids.length; i++) {
            if (this.data.carryBids[i].user_id == this.authId) {
                this.canBid = false
            }
        }
    },
    computed: {
        authId() {
            return this.$store.getters.id
        },
        ship_owner() {
            return this.$store.getters.id == this.data.user_id
        }

    },


    mounted() {
        EventBus.$on('canceledit', () => {
            this.editship = false
        })
        EventBus.$on('closeSendingBid', () => {
            this.bid = false
            this.canBid = false
            this.isLoading = true
        })
        EventBus.$on('closeCarryBid', () => {
            this.bid = false
            this.canBid = false
            this.isLoading = true
        })
        EventBus.$on('Sendingbid', () => {
            this.isLoading = false
            this.$scrollTo(element, 1000, options)
        })
        EventBus.$on('Carryingbid', () => {
            this.isLoading = false
            this.$scrollTo(element, 1000, options)
        })
        EventBus.$on('updated', (value) => {
            this.editship = false
            this.data = value
            Toast.fire({
                type: 'success',
                title: 'Ship post successfully updated.'
            })
        })

    },
    methods: {
        bidship() {
            this.bid = true;
        },
        edit() {
            this.editship = true
        },
        removeModal() {
            this.feedbackShow = false
        },
        shipPosterRating() {
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
        deleted(slug) {
            Swal.fire({
                title: 'Are you sure you want to delete this post?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axios.delete(`api/ship/${this.data.slug}`)
                    Swal.fire(
                        'Deleted!',
                        'Your task has been deleted.',
                        'success'
                    )
                    this.$router.push('/ship')
                } else(

                    result.dismiss === Swal.DismissReason.cancel
                )

            })
        },
    },
    watch: {

    }

}
</script>
<style scoped>
.shititle {
    padding-top: 5px;
    margin-bottom: 5px;
    margin-left: 10px;
}

.flex-card .card-body {
    padding: 0px 0px;
}
.content {
    padding: 20px 0px 0px;
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


@media only screen and (max-width: 769px) {

    .right {
        float: right;
    }

    .trip-info {
        margin-left: 0px
    }


    .trip-info {
        margin-left: 0px;
        margin-top: 10px;
    }

    .trip-giver-info {
        margin-left: 0px
    }
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

.sl {
    font-weight: bold;
    font-size: 17px;
}

.right button {
    margin: 0px 3px;
}

.fa {
    font-size: 17px;
    margin-top: 7px;
}

.section-wrapper {
    margin: -28px -22px
}

.im {
    font-weight: bold;
    font-size: 21px;
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

.el-rate__item {
    margin-left: -7px !important;
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
</style>