<template>
    <div class="conbox">
        <div class="vld-parent dashboard-columns">
            <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="false"></loading>
            <div class="flex-card light-bordered light-raised trip-info" id="element" style="margin-top: 10px;">
                <div class="felx-body">
                    <div class="content">
                        <div class="card-heading is-bordered">
                            <h3 style="border-bottom: 1px solid #e0e0e0;padding: 14px; margin-bottom:0em">
                                Total {{bidsData.bids_count}} Bids</h3>
                        </div>
                        <article class="media recent-post" style="margin-top:0" v-if="bidsData.bids_count==0">
                            <div class="media-content">
                                <div class="post-content" style="padding:25px 0;text-align:center">
                                    <h5>No one bids yet</h5>
                                </div>
                            </div>
                        </article>
                        <article class="media recent-post" style="margin-top: 12px;" v-for="(bid,index) in bidsData.bids" :key="index">
                            <div class="media-content" style="margin-bottom:8px;">
                                <div class="post-content ">
                                    <div class="full-topic">
                                        <div class="post">
                                            <div class="post-meta">
                                                <div class="post-owner" style="margin-top:-40px">
                                                    <img class="avatar" :src="getProfilePhoto(bid.photo)">
                                                </div>
                                            </div>
                                            <div class="post-content" style="margin: -39px 20px;">
                                                <div class="columns">
                                                    <div class="column is-4">
                                                        <a style="color:#039be5;font-weight:500;font-size:16px">{{bid.bidder_name}} </a>
                                                        <a @click="showModal(index,bid.bidder_name)">(See contact
                                                            info)</a>
                                                    </div>
                                                    <div class="column">
                                                        <span style="font-weight:500">{{bid.posted}} trip posted (<a @click="postedFeedbacks(index)">Reviews</a>)</span>
                                                    </div>
                                                    <div class="column">
                                                        <span style="font-weight:500">{{bid.completed}} trip recieved
                                                            (<a @click="completedFeedbacks(index)">Reviews</a>)</span>
                                                    </div>
                                                    <div class="column is-2" style="font-size: 16px;font-weight: 500;">
                                                        <span style="font-weight:500">Amount: </span>
                                                        <span style="color:#00B289">{{bid.amount}} BDT</span>
                                                    </div>
                                                </div>
                                                <div class="columns ">
                                                    <div class="column">
                                                        <span style="font-weight:500;">Short message: </span>
                                                        <span>{{bid.cover_letter}}</span>
                                                    </div>
                                                    <div class="column is-2">
                                                        <span style="font-weight:500;">Vehicle type:</span>
                                                        <span>{{bid.vehicle_type}}</span>
                                                        <br>
                                                        <span style="font-weight:500;">Model:</span>
                                                        <span v-if="bid.vehicle_name==null">N/A</span>
                                                        <span v-else>{{bid.vehicle_name}}</span>
                                                    </div>
                                                    <!--  <div class="column is-4" v-if="bid.trip_owner==id && bid.co>0">
                                                        </div>
 -->
                                                    <div class="column is-2" v-if="bid.trip_owner==id && bid.co>0">
                                                        <span style="font-weight:500;">Counter Offer:</span>
                                                        <span style="margin:0px 10px">{{bid.co}}</span>
                                                        <span>
                                                            <span class="button is-small" style=" background-color: #00b289; color:#fff" v-if="bid.agree==1">Accepted</span>
                                                            <span class="button is-small" style=" background-color: #ff7273; color:#fff" v-else-if="bid.agree==2">Declined</span>
                                                            <span class="button is-small" style=" background-color: #4FC1EA;  color:#fff" v-else>Pending</span>
                                                        </span>
                                                    </div>
                                                    <div class="column is-4" v-if="bid.trip_owner==id &&bid.co==null">
                                                        <div class="columns" v-if="bid.accepted==0">
                                                            <label class="label column is-4">Counter Offer</label>
                                                            <div class="column is-4">
                                                                <input class="input is-primary-focus" v-model="counter_offer[index]" type="text">
                                                            </div>
                                                            <div class="column is-4">
                                                                <a @click='submit(bid.id)' class="button btn-dash primary-btn btn-fade ripple" style="margin-top:-5px">
                                                                    Submit
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="column is-2" v-else-if="bid.user_id==id && bid.co>0">
                                                        <div>
                                                            <span style="font-weight:500;">Counter Offer:</span>
                                                            <span style="margin:0px 10px">{{bid.co}}</span>
                                                            <span>
                                                                <span class="button is-small" style=" background-color: #00b289; color:#fff" v-if="bid.agree==1">Agreed</span>
                                                                <span class="button is-small" style=" background-color: #ff7273; color:#fff" v-if="bid.agree==2">Declined</span>
                                                                <vs-button type="filled" v-if="bid.agree==0" @click="agree(bid.id)">Agree</vs-button>
                                                                <vs-button color="danger" type="filled" v-if="bid.agree==0" @click="disagree(bid.id)">Decline</vs-button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="column" v-if="bid.user_id==id  && bid.accepted==1">
                                                        <div v-if="bid.paid==0 && bid.complete==0" style="float: right;">
                                                            <p style="color: #737373;font-weight: 600;">After finishing the ride, click on Finish Ride button</p>
                                                            <a style="float: right;" @click="rideCompleted(bid.id)" class="button btn-dash info-btn btn-dash is-raised rounded ripple  btn-fade">Finish Ride</a>
                                                        </div>
                                                        <div v-else-if="bid.paid==0 && bid.complete==1" style="float:right">
                                                            <span class="ongoing">Ride completed,awaiting payment
                                                            </span>
                                                        </div>
                                                        <div v-else-if=" bid.paid==1" style="float:right">
                                                            <span class="ongoing">Ride completed
                                                            </span>
                                                            <div style="margin-top:12px;" v-if="bid.feedback_given==0">
                                                                <a @click="tripGiverReviewModal(index,bid.trip_username)" class="button btn-dash success-btn btn-dash is-raised rounded ripple  btn-fade">Give a rating</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="column" v-if="bid.trip_owner==id">
                                                        <a v-if="bid.accepted==0 " @click="accept(bid.id)" class="button btn-dash info-btn btn-dash is-raised rounded ripple  btn-fade" style="float:right">Accept</a>
                                                        <span v-if="bid.accepted==1 && bid.complete==0" class="ongoing">Bid accepted
                                                        </span>
                                                        <div v-else-if="bid.complete==1 && bid.paid==0" style="float:right;">
                                                            <p style="color: #296557;font-weight: 600;">Ride has been completed,do you want to pay?</p>
                                                            <div style="text-align:center">
                                                                <vs-button type="filled" @click="paymentModal(index,bid.bidder_name)">Yes</vs-button>
                                                                <vs-button type="filled">No</vs-button>
                                                            </div>
                                                        </div>
                                                        <div v-else-if="bid.paid==1" style="float:right;">
                                                            <span class="ongoing">Ride completed</span>
                                                            <div style="margin-top:12px;margin-left:6%;" v-if="bid.feedback_got==0">
                                                                <a @click="ridetakerFeedbackModal(index,bid.trip_username,bid.payment_method)" class="button btn-dash success-btn btn-dash is-raised rounded ripple  btn-fade">Give a rating</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="(bidd,index) in bidsData.bids" :key="bidd.id" v-if="modalActiveContent(index)">
            <vs-popup class="holamundo" :title="title" :active.sync="popupActivo">
                <div>
                    <div class="columns">
                        <div class="column" style="display:inline-flex">
                            <label class="label">Name: </label>
                            <span class="contactinfo"> {{ bidd.bidder_name}}</span>
                        </div>
                        <div class="column" style="display:inline-flex">
                            <label class="label">Profession:</label>
                            <span class="contactinfo"> {{bidd.bidder_profession}}</span>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column" style="display:inline-flex">
                            <label class="label">Education:</label>
                            <span class="contactinfo">{{ bidd.bidder_education}}</span>
                        </div>
                        <div class="column" style="display:inline-flex">
                            <label class="label">Age:</label>
                            <span class="contactinfo">{{moment().diff(bidd.bidder_dob, 'years') }}</span>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column" style="display:inline-flex">
                            <label class="label">Sex:</label>
                            <span class="contactinfo">{{ bidd.bidder_sex}}</span>
                        </div>
                        <div class="column" style="display:inline-flex">
                            <label class="label">Email:</label>
                            <span class="contactinfo">{{ bidd.bidder_email}}</span></div>
                    </div>
                    <div class="columns">
                        <div class="column" style="display:inline-flex">
                            <label class="label">Mobile:</label>
                            <span class="contactinfo">{{ bidd.bidder_number}}</span>
                        </div>
                        <div class="column" style="display:inline-flex">
                            <label class="label">Address:</label>
                            <span class="contactinfo">{{ bidd.bidder_location}}</span>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column" style="display:inline-flex">
                            <label class="label">Skype:</label>
                            <span class="contactinfo">{{ bidd.bidder_skype}}</span>
                        </div>
                        <div class="column" style="display:inline-flex">
                            <label class="label">Facebook Id:</label>
                            <span class="contactinfo">{{ bidd.bidder_fblink}}</span>
                        </div>
                    </div>
                </div>
            </vs-popup>
        </div>
        <div v-for="(bidd,index) in bidsData.bids" :key="bidd.trip_username" v-if="tripGiverReviewContent(index)">
            <vs-popup class="holamundo" :title="ownerTitle" :active.sync="tripGiverReviewModalActive">
                <div class="columns">
                    <div class="column is-4">
                        <label class="label">Give a rating about the trip</label>
                        <star-rating :show-rating=true :star-size="20" style="font-size:17px;margin-top: 0px;" :increment="0.5" v-model="ownerRating"></star-rating>
                    </div>
                    <div class="column is-8">
                        <label class="label">If you would like to leave feedback about the trip giver, select the reason below:</label>
                        <div class="field">
                            <div class="b-checkbox is-info" v-for="item,index in tripgiverfeedbacklist">
                                <input v-model="riderchoosenfeedback" :id="item.name" class="styled" :value="item.text" type="checkbox">
                                <label :for="item.name">
                                    {{item.text}}
                                </label>
                            </div>
                        </div>
                        <textarea class="textarea is-primary-focus" @change="ownerFeedback($event)" rows="4" placeholder="Others.."></textarea>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <vs-button @click="riderFeedback(bidd.id,bidd.user_id)" color="primary" style="float:right" type="filled">Submit</vs-button>
                    </div>
                </div>
            </vs-popup>
        </div>
        <!--    ride taker payment system choose -->
        <div v-for="(bidd,index) in bidsData.bids" :key="index" v-if="paymentActiveContent(index)">
            <vs-popup class="holamundo" :title="title" :active.sync="popupActive">
                <div class="vld-parent">
                    <loading :active.sync="isPayment" :can-cancel="false" :is-full-page="false"></loading>
                    <div class="columns" v-show="ratingnreview">
                        <div class="column" style="text-align:center">
                            <div style="display:inline-flex">
                                <label class="plabel">Trip amount:</label>
                                <span class="tripamount">{{bidd.payable_amount}} bdt</span>
                            </div> </br>
                            <div style="display:inline-flex">
                                <label class="plabel">Payment method:</label>
                                <span class="pmethod">{{paymentMethod}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="columns" v-show="paymentbox" style="margin-top: -10px;">
                        <div class="column" style="text-align:center;">
                            <div style="display:inline-flex">
                                <label class="plabel">Payable amount:</label>
                                <span class="payableamount">{{bidd.payable_amount}} bdt</span>
                            </div>
                        </div>
                    </div>
                    <div class="columns" v-show="paymentbox">
                        <div class="column" style="text-align:center;margin-top: -10px;">
                            <p style="font-size: 14px;font-weight: 600;">Select a payment method to pay the amount</p>
                        </div>
                    </div>
                    <div class="forum-container vs-con-loading__container" id="div-with-loading" :style="[isPayment ? {'padding':'100px'} : {'padding':'20px'}]">
                        <div class="columns" v-show="paymentbox">
                            <div class="column">
                                <a class="forum-channel" @click="byCash(bidd.id,bidd.bidder_name)">
                                    <div class="channel-icon">
                                        <span class="material-icons">money</span>
                                    </div>
                                    <div class="channel-meta">
                                        <span>By Cash</span>
                                    </div>
                                </a>
                            </div>
                            <div class="column">
                                <a class="forum-channel" @click="wallet(bidd.id,bidd.bidder_name,bidd.payable_amount)">
                                    <div class="channel-icon">
                                        <span class="material-icons">account_balance_wallet</span>
                                    </div>
                                    <div class="channel-meta">
                                        <span>By E-wallet</span>
                                    </div>
                                </a>
                            </div>
                            <div class="column">
                                <a class="forum-channel">
                                    <div class="channel-icon">
                                        <span class="material-icons">credit_card</span>
                                    </div>
                                    <div class="channel-meta">
                                        <span>By Card</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div v-show="ratingnreview">
                            <div class="columns">
                                <div class="column is-4">
                                    <label class="label">Give a rating about the trip</label>
                                    <star-rating :show-rating=true :star-size="20" style="font-size:17px;margin-top: 0px;" :increment="0.5" v-model="rating"></star-rating>
                                </div>
                                <div class="column is-8">
                                    <label class="label">If you would like to leave feedback about this trip, select the reason below:</label>
                                    <div class="field">
                                        <div class="b-checkbox is-info" v-for="item,index in feedbacklist">
                                            <input v-model="choosenfeedback" :id="item.name" class="styled" :value="item.text" type="checkbox">
                                            <label :for="item.name">
                                                {{item.text}}
                                            </label>
                                        </div>
                                    </div>
                                    <textarea class="textarea is-primary-focus" @change="morefeedback($event)" rows="4" placeholder="Others.."></textarea>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <vs-button @click="review(bidd.id,bidd.trip_owner)" color="primary" style="float:right" type="filled">Submit</vs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </vs-popup>
        </div>
        <!--    ride taker payment system choose -->
        <vs-sidebar position-right parent="body" default-index="1" color="primary" class="sidebarx" spacer v-model="completedfeedbackShow">
            <div v-for="(bidsrecord,index) in bidsData.bids" :key="index" v-if="recordContent(index)" style="margin-top:-10px">
                <div class="header-sidebar" slot="header">
                    <vs-avatar size="70px" :src="'/images/' + bidsrecord.photo" style="float:left" />
                    <div class="con-colors" style="overflow:hidden">
                        <ul style="padding-left:10px">
                            <li style="font-size: 21px;color: rgb(36, 33, 69);font-weight:700">
                                <h4>
                                    {{bidsrecord.bidder_name}}
                                </h4>
                            </li>
                            <li>
                                <h3 style="font-size:17px;color:gray">Trip Completed Rating</h3>
                                <span class="rating" style="display:inline-flex">
                                    <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="bidsrecord.completed_rating" style="float:left"> </star-rating>
                                    <!-- <el-rate v-model="bidsrecord.completed_rating" disabled></el-rate> -->
                                    <small class="rate">{{bidsrecord.completed_rating}}</small>
                                </span>
                                <!-- <span class="rating">
                                    <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="bidsrecord.rating" style="float:left"> </star-rating>
                                    <small class="rate">{{bidsrecord.rating}}</small>
                                </span> -->
                            </li>
                            <li>
                            </li>
                        </ul>
                    </div>
                </div>
                <vs-divider />
                <completed-trip-feedback :data="bidsrecord.trip_completed_feedback"></completed-trip-feedback>
            </div>
        </vs-sidebar>
        <vs-sidebar position-right parent="body" default-index="1" color="primary" class="sidebarx" spacer v-model="postedfeedbackShow">
            <div v-for="(bidsrecord,index) in bidsData.bids" :key="index" v-if="postedRecordContent(index)" style="margin-top:-10px">
                <div class="header-sidebar" slot="header">
                    <vs-avatar size="70px" :src="'/images/' + bidsrecord.photo" style="float:left" />
                    <div class="con-colors" style="overflow:hidden">
                        <ul style="padding-left:10px">
                            <li style="font-size: 21px;color: rgb(36, 33, 69);font-weight:700">
                                <h4>
                                    {{bidsrecord.bidder_name}}
                                </h4>
                            </li>
                            <li>
                                <h3 style="font-size:17px;color:gray">Trip Posted Rating</h3>
                                <span class="rating" style="display:inline-flex">
                                    <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="bidsrecord.posted_rating" style="float:left"> </star-rating>
                                    <!--  <el-rate v-model="bidsrecord.posted_rating" disabled></el-rate> -->
                                    <small class="rate">{{bidsrecord.posted_rating}}</small>
                                </span>
                            </li>
                            <li>
                            </li>
                        </ul>
                    </div>
                </div>
                <vs-divider />
                <posted-trip-feedback :data="bidsrecord.trip_posted_feedback"></posted-trip-feedback>
            </div>
        </vs-sidebar>
    </div>
</template>
<script>
import Vue from 'vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import moment from 'moment-timezone';
import StarRating from 'vue-star-rating'
var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo)
var options = {
    easing: 'ease-in',
    offset: -60,
    force: true,
}
export default {
    components: {
     postedTripFeedback: () => import('@/components/trip/postedTripFeedback'),
     completedTripFeedback: () => import('@/components/trip/completedTripFeedback'), 
    Loading, StarRating },
    props: ['data'],
    data() {
        return {
            postedfeedbackShow: false,
            ratingnreview: false,
            paymentbox: true,
            moment: moment,
            completedfeedbackShow: false,
            active: 0,
            activePay: 0,
            activeReview: 0,
            popupActive: false,
            tripGiverReviewModalActive: false,
            title: "",
            paymentMethod: "",
            ownerTitle: "",
            completed: 1,
            paid: 1,
            ownerRating: 0,
            popupActivo: false,
            counter_offer_accepted: 1,
            counter_offer_decline: 2,
            slug: this.$route.params.slug,
            isLoading: false,
            isPayment: false,
            post_type: this.data.post_type,
            counter_offer: [],
            bidsData: this.data,
            bid_accepted: 1,
            isShowModal: false,
            choosenfeedback: [],
            riderchoosenfeedback: [],
            feedbacklist: [
                { name: 'text1', text: 'Good Ride' },
                { name: 'text2', text: 'Good Trip' },
            ],
            tripgiverfeedbacklist: [
                { name: 'text3', text: 'Behavious of the user is polite' },
                { name: 'text4', text: 'He was very co-operative' },
            ],
            rating: 0,
            activeRecord: 0,
            postedRecord: 0,
        }
    },
    created() {
        var count = 0;
        for (let i = 0; i < this.data.bids.length; i++) {
            if (this.data.bids[i].accepted == 1) {
                count++;
                this.result = count;
            } else {
                this.result = 1;
            }
        }
        // Echo.channel('bid-channel')
        //     .listen('BidEvent', (e) => {
        //         setTimeout(() => {
        //             this.$axios.get('/getTrip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('accept-channel')
        //     .listen('AcceptEvent', (e) => {
        //         setTimeout(() => {
        //             this.$axios.get('/getTrip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('counter-channel')
        //     .listen('CounterEvent', (e) => {
        //         setTimeout(() => {
        //             this.$axios.get('/getTrip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('agree-channel')
        //     .listen('AgreeEvent', (e) => {
        //         setTimeout(() => {
        //             this.$axios.get('/getTrip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('disagree-channel')
        //     .listen('DisagreeEvent', (e) => {
        //         setTimeout(() => {
        //             this.$axios.get('/getTrip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('completed-channel')
        //     .listen('CompletedEvent', (e) => {
        //         setTimeout(() => {
        //             this.$axios.get('/getTrip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('pay-channel')
        //     .listen('PayEvent', (e) => {
        //         setTimeout(() => {
        //             this.$axios.get('/getTrip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
    },
    computed: {
        id() {
            return this.$store.getters.id
        },
    },

    mounted() {
        EventBus.$on('newTrip', (data) => {
            this.bidsData = data.data
            this.$scrollTo(element, 1000, options)
        })

    },
    methods: {
        getProfilePhoto(pic) {
            return pic;
        },
        byCash(id, name) {
            this.isPayment = true
            this.paymentbox = false
            this.$axios.patch(`tripbids/${id}`, {
                    pay: this.paid,
                    paymethod: 'cash'
                })
                .then((res) => {
                    this.isPayment = false
                    this.ratingnreview = true
                    this.title = ('Give rating and feedback to ').concat(name)
                    this.paymentMethod = 'By Cash'

                })

        },
        wallet(id, name, amount) {
            this.isPayment = true
            this.paymentbox = false
            this.$axios.patch(`tripbids/${id}`, {
                    pay: this.paid,
                    payable_amount: amount,
                    paymethod: 'ewallet'
                })
                .then((res) => {
                    this.isPayment = false
                    this.title = ('Give rating and feedback to ').concat(name)
                    this.paymentMethod = 'By E-wallet'
                    this.ratingnreview = true

                })

        },
        morefeedback(e) {
            this.choosenfeedback.push(e.target.value)
        },
        ownerFeedback(e) {
            this.riderchoosenfeedback.push(e.target.value)
        },
        paymentModal(i, name) {
            this.popupActive = true;
            return (this.title = "Select payment method", this.activePay = i)
        },
        tripGiverReviewModal(i, name) {
            this.tripGiverReviewModalActive = true;
            return (this.ownerTitle = ('Give rating and feedback to ').concat(name), this.activeReview = i)
        },
        tripGiverReviewContent: function(i) {
            return this.activeReview === i
        },
        showModal(i, name) {
            this.popupActivo = true;
            return (this.active = i, this.title = name.concat('\'s', ' contact info'))
        },
        modalActiveContent: function(i) {
            return this.active === i
        },
        paymentActiveContent: function(i) {
            return this.activePay === i
        },

        recordContent: function(i) {
            return this.activeRecord === i
        },
        completedFeedbacks(i) {
            this.completedfeedbackShow = !this.completedfeedbackShow;
            return this.activeRecord = i;
        },
        postedFeedbacks(i) {
            this.postedfeedbackShow = !this.postedfeedbackShow;
            return this.postedRecord = i;
        },
        postedRecordContent: function(i) {
            return this.postedRecord === i
        },
        review(id, ownerId) {
            this.popupActive = false
            this.isLoading = true
            this.$axios.patch(`tripbids/${id}`, {
                    rating: this.rating,
                    review: this.choosenfeedback,
                    ownerId: ownerId
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getTrip/' + this.data.id)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    })
                    this.isLoading = false
                })
        },
        ridetakerFeedbackModal(i, name, pmethod) {
            this.popupActive = true
            this.paymentbox = false
            this.title = ('Give rating and feedback to ').concat(name)
            this.paymentMethod = pmethod
            this.ratingnreview = true

        },

        riderFeedback(id, bidderid) {
            this.tripGiverReviewModalActive = false
            this.isLoading = true
            this.$axios.post('tripseekersfeedback', {
                    bidderId: bidderid,
                    tripseekerId: this.data.user_id,
                    tripId: this.data.id,
                    bidId: id,
                    rating: this.ownerRating,
                    review: this.riderchoosenfeedback,
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getTrip/' + this.data.id)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    })
                    this.isLoading = false
                })
        },
        submit(id) {
            this.slug = this.$route.params.slug
            this.isLoading = true
            this.$axios.patch(`tripbids/${id}`, { co: this.counter_offer })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getTrip/' + this.data.id)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0)
                    this.isLoading = false
                })

        },
        agree(id) {
            this.isLoading = true
            this.$axios.patch(`tripbids/${id}`, { agree: this.counter_offer_accepted })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getTrip/' + this.data.id)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0)

                    this.isLoading = false
                })

        },
        disagree(id) {
            this.isLoading = true
            this.$axios.patch(`tripbids/${id}`, { disagree: this.counter_offer_decline })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getTrip/' + this.data.id)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0);

                    this.isLoading = false
                })


        },
        accept(id) {
            this.isLoading = true
            this.$axios.patch(`tripbids/${id}`, {
                    accepted: this.bid_accepted,
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getTrip/' + this.data.id)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0)
                    this.isLoading = false

                })

        },
        rideCompleted(id) {
            this.isLoading = true
            this.$axios.patch(`tripbids/${id}`, { completed: this.completed })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getTrip/' + this.data.id)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0)

                    this.isLoading = false
                })
        }
    },
    watch: {
        postedfeedbackShow: function(val) {
            if (val == true) {
                document.getElementsByTagName("html")[0].style.overflow = "hidden";
            } else
                document.getElementsByTagName("html")[0].style.overflow = "auto"
        },
        completedfeedbackShow: function(val) {
            if (val == true) {
                document.getElementsByTagName("html")[0].style.overflow = "hidden";
            } else
                document.getElementsByTagName("html")[0].style.overflow = "auto"
        },

    }
}
</script>
<style scoped>
.seekingbids {
    max-width: 1304px;
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
}

.full-topic {
    width: 100%;
    background: #fff;
    padding: 16px;
    margin-top: -10px;
    border: none;
    margin: 0
}

.post-content h5 {
    margin: 19px 0px;
    font-size: 24px;
    color: #BCBCBC;
    font-weight: 400;
}

.active {
    display: block;
}

.header {
    width: 100%;
    background: #fff;
    border: 1px solid #e0e0e0;
    height: 50px;
    color: #444;
    box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.04);
}

.rate {
    color: #fff;
    background-color: #4FC1EA;
    border-radius: 3px;
    display: inline-flex;
    font-size: 15px;
    padding: 0px 5px;
    height: 22px;
}

.modal.is-active {
    -webkit-transform: scale(1);
    transform: scale(1);
    position: absolute;
    top: -300px;
    overflow-y: hidden !important;
}

.rating {
    float: left;
}

.contactinfo {
    margin: 2px;
    padding-left: 5px;
}

overflow: hidden;

.namenrating {
    float: right;
    margin-right: -15px;
}

.header-title {
    font-size: 20px;
    margin: 10px;
}

.ratingtext {
    font-size: 15px;
    position: absolute;
    top: 37px;
    right: 15px;
}

.ongoing {
    font-size: 16px;
    font-weight: 700;
    color: #00B289;
    border: 1px solid;
    padding: 7px;

}

.vs-table--tbody-table .tr-values td {
    padding: 10px 10px !important;
}

.completed {
    font-size: 16px;
    font-weight: 700;
    color: #00B289;
    border: 1px solid;
    padding: 7px;
    float: right;
}

.vs-button {
    padding: 7px !important;
    margin: 0px 5px;
}

.forum-container .forum-channel:hover span {
    color: #7F00FF;
}

.forum-container .forum-channel:hover {
    box-shadow: 10px 10px 15px 0px #ddd;
}

.tripamount {
    font-size: 16px;
    margin-left: 4px;
    color: #070707;
    font-weight: 600;
}

.payableamount {
    font-size: 20px;
    margin-left: 4px;
    margin-top: -4px;
    color: #070707;
    font-weight: 600;
}

.pmethod {
    font-size: 16px;
    margin-left: 4px;
    margin-top: 0px;
    color: #070707;
    font-weight: 600;
}

.plabel {
    font-size: 16px;
    font-weight: 600;
}
</style>