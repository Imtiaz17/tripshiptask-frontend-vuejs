<template>
    <div class="columns">
        <div class="vld-parent column">
            <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="false"></loading>
            <div class="flex-card light-bordered light-raised trip-info" id="element">
                <div class="flex-body">
                    <div class="content">
                        <div class="offer-content-heading">
                            <h3>Offers: {{bidsData.bids_count}}</h3>
                        </div>
                        <article class="media recent-post" style="margin-top:0" v-if="bidsData.bids_count==0">
                            <div class="media-content">
                                <div class="post-content no-offers">
                                    <h5>No offers yet</h5>
                                </div>
                            </div>
                        </article>
                        <article class="media recent-post" v-for="(bid,index) in bidsData.bids" :key="index">
                            <div class="media-content">
                                <div class="full-topic">
                                    <div class="post">
                                        <div class="post-meta">
                                            <div class="post-owner">
                                                <img class="avatar" :src="getProfilePhoto(bid.photo)">
                                                <a v-if="bid.accepted==1" class="contactlink" @click="showModal(index,bid.bidder_name)">Contact</a>
                                            </div>
                                        </div>
                                        <div class="post-content">
                                            <div class="columns">
                                                <div class="column is-4">
                                                    <div class="basicinfo">
                                                        <a>{{bid.bidder_name}} </a>
                                                        <span v-if="bid.bidder_sex=='Male'">M</span>
                                                        <span v-else-if="bid.bidder_sex=='Female'">F</span>
                                                        <span v-else>{{bid.bidder_sex}}</span>
                                                        <span>| {{moment().diff(bid.bidder_dob, 'years') }} </span>
                                                    </div>
                                                    <div class="backgroundinfo">
                                                        <span>{{bid.bidder_education}}</span>
                                                        <span> | {{bid.bidder_profession}}</span>
                                                    </div>
                                                </div>
                                                <div class="column">
                                                    <span style="font-weight:500">{{bid.posted}} Trips posted<a @click="tripPostedFeedbacks(index)"> Reviews</a></span>
                                                </div>
                                                <div class="column">
                                                    <span style="font-weight:500">{{bid.completed}} Trips recieved
                                                        <a @click="tripCompletedFeedbacks(index)"> Reviews</a></span>
                                                </div>
                                                <div class="column" style="font-weight: 500;text-align: center;">
                                                    <span>Passenger: </span>
                                                    <span>{{bid.passenger}}</span>
                                                    <br>
                                                    <div v-if="bid.amount !=null">
                                                        <span style="font-weight:500">Amount: </span>
                                                        <span style="color:#00B289">{{bid.amount}} BDT</span>
                                                    </div>
                                                </div>
                                                <div class="column" v-if="bid.user_id==id && bid.accepted==1 && bid.complete==0">
                                                    <span class="ongoing">Offer Accepted</span>
                                                </div>
                                            </div>
                                            <div class="columns">
                                                <div class="column is-4">
                                                    <span style="font-weight:500;">Message: </span>
                                                    <span>{{bid.cover_letter}}</span>
                                                </div>
                                                <div class="column is-8" v-if="bid.accepted==1 && bid.trip_owner!==id &&bid.user_id!==id">
                                                    <span class="ongoing" style="float:right">Accepted</span>
                                                </div>
                                                <!-- <div class="column is-2" style="padding:0">
                                                        <span style="font-weight:500;">Vehicle type:</span>
                                                        <span>{{bid.vehicle_type}}</span>
                                                        <br>
                                                        <span style="font-weight:500;">Model:</span>
                                                        <span v-if="bid.vehicle_name==null">N/A</span>
                                                        <span v-else>{{bid.vehicle_name}}</span>
                                                    </div> -->
                                                <div class="column is-4" v-if="bid.trip_owner==id&& bid.co>0">
                                                    <label class="label">Counter Offer:</label>
                                                    <span class="counteramt">{{bid.co}} BDT </span>
                                                    <span>
                                                        <vs-chip transparent color="success" v-if="bid.agree==1">Accepted</vs-chip>
                                                        <vs-chip transparent color="danger" v-else-if="bid.agree==2">Declined</vs-chip>
                                                        <vs-chip transparent color="primary" v-else>Pending</vs-chip>
                                                    </span>
                                                </div>
                                                <div class="column is-4" v-if="bid.trip_owner==id && bid.co==null">
                                                    <div class="columns" v-if="bid.accepted==0 && canAccept">
                                                        <div class="column is-6">
                                                            <label class="label">Counter Offer: </label>
                                                            <input class="input is-primary-focus" v-model="counter_offer[index]" type="text">
                                                            <a @click="submit(bid.id)" class="button raised info-btn is-small btn-fade" style="margin-top:5px">
                                                                Submit
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="column is-4" v-if="bid.user_id==id">
                                                    <div v-if="bid.co>0">
                                                        <label class="label">Counter Offer:</label>
                                                        <span class="counteramt">{{bid.co}} BDT</span>
                                                        <span>
                                                            <vs-chip transparent color="success" v-if="bid.agree==1">Agreed</vs-chip>
                                                            <vs-chip transparent color="success" v-if="bid.agree==2">Declined</vs-chip>
                                                            <vs-button type="filled" v-if="bid.agree==0" @click="agree(bid.id)">Agree</vs-button>
                                                            <vs-button color="danger" type="filled" v-if="bid.agree==0" @click="disagree(bid.id)">Decline</vs-button>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="column is-4" v-if="bid.trip_owner==id && bid.accepted==0">
                                                    <a @click="accept(bid.id,bid.passenger)" class="button info-btn raised rounded btn-fade" style="float:right">Accept</a>
                                                </div>
                                                <div class="column is-4" v-if="bid.trip_owner==id && bid.accepted==1">
                                                    <div v-if="bid.paid==0 && bid.complete==0 && bid.passenger_accepted==0" style="float: right;">
                                                        <span class="ongoing">Offer Accepted</span>
                                                    </div>
                                                    <div v-else-if="bid.paid==0 && bid.complete==0 && bid.passenger_accepted==1" style="float: right;">
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
                                                            <a @click="tripTakerReviewModal(index,bid.bidder_name)" class="button btn-dash success-btn btn-dash is-raised rounded ripple  btn-fade">Give a rating</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="column is-4" v-if="bid.user_id==id">
                                                    <div v-if="bid.accepted==1 && bid.complete==0 && bid.passenger_accepted==0 && canAccept" class="rideconfirm">
                                                        <span style="color: #296557;font-weight: 600;">Confirm the ride?</span>
                                                        <vs-button type="filled" @click="passenger_accepted(bid.id)">Yes</vs-button>
                                                        <vs-button type="filled">No</vs-button>
                                                    </div>
                                                    <div v-else-if="bid.complete==1 && bid.paid==0" style="float:right;">
                                                        <p style="color: #296557;font-weight: 600;">Ride has been completed,do you want to pay?</p>
                                                        <div style="text-align:center">
                                                            <vs-button type="filled" @click="paymentModal(index,bid.trip_username)">Yes</vs-button>
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
                        </article>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="(bidd,index) in bidsData.bids" :key="bidd.index" v-if="bidderinfoModalActiveContent(index)">
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
                            <label class="label">Gender:</label>
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
                </div>
            </vs-popup>
        </div>
        <!-- rating to trip taker -->
        <div v-for="(bidd,index) in bidsData.bids" :key="bidd.index" v-if="tripTakerReviewContent(index)">
            <vs-popup class="holamundo" :title="ownerTitle" :active.sync="tripTakerReviewModalActive">
                <div class="columns">
                    <div class="column is-4">
                        <label class="label">Give a rating about the trip</label>
                        <a-rate v-model="ownerRating" allow-half />
                    </div>
                    <div class="column is-8">
                        <label class="label">If you would like to leave feedback about the passenger, select the reason below:</label>
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
        <!-- rating to trip taker -->
        <!--    ride taker payment system choose -->
        <div v-for="(bidd,index) in bidsData.bids" :key="index" v-if="paymentActiveContent(index)">
            <vs-popup class="holamundo" :title="title" :active.sync="popupActive">
                <div class="vld-parent">
                    <loading :active.sync="isPayment" :can-cancel="false" :is-full-page="false"></loading>
                    <div class="columns" v-show="ratingnreview">
                        <div class="column" style="text-align:center">
                            <div style="display:inline-flex">
                                <label class="plabel">Payable amount:</label>
                                <span class="payableamount">{{bidd.payable_amount}} bdt</span>
                            </div> </br>
                            <div style="display:inline-flex">
                                <label class="plabel">Payment method:</label>
                                <span class="pmethod">{{paymentMethod}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="columns" v-show="paymentbox">
                        <div class="column" style="text-align:center;">
                            <div style="display:inline-flex">
                                <label class="plabel">Payable amount:</label>
                                <span class="payableamount">{{bidd.payable_amount}} bdt</span>
                            </div>
                        </div>
                    </div>
                    <div class="columns" v-show="paymentbox" style="margin-top: -10px;">
                        <div class="column" style="text-align:center;">
                            <p style="font-size: 14px;font-weight: 600;margin-top: -10px;">Select a payment method to pay the amount</p>
                        </div>
                    </div>
                    <div class="forum-container vs-con-loading__container" id="div-with-loading" :style="[isPayment ? {'padding':'100px'} : {'padding':'20px'}]">
                        <div class="columns" v-show="paymentbox">
                            <div class="column">
                                <a class="forum-channel" @click="byCash(bidd.id,bidd.trip_username)">
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
                                    <a-rate v-model="rating" allow-half />
                                </div>
                                <div class="column is-8">
                                    <label class="label">If you would like to leave feedback about the trip, select the reason below:</label>
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
                                    <vs-button @click="review(bidd.id,bidd.user_id)" color="primary" style="float:right" type="filled">Submit</vs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </vs-popup>
        </div>
        <!--    ride taker payment system choose -->
        <a-drawer :width="720" :visible="postedfeedbackShow" :body-style="{ paddingBottom: '80px' }" @close="onClose">
            <span v-for="(bidsrecord,index) in bidsData.bids" :key="index" v-if="recordContent(index)">
                <div class="header">
                    <vs-avatar size="70px" :src="'/images/' + bidsrecord.photo" style="float:left" />
                    <div class="con-colors" style="overflow:hidden">
                        <ul>
                            <li>
                                <h4>
                                    {{bidsrecord.bidder_name}}
                                </h4>
                            </li>
                            <li>
                                <div class="rating">
                                    <a-rate :default-value="bidsrecord.posted_rating" disabled allow-half />
                                </div>
                            </li>
                            <li>
                            </li>
                        </ul>
                    </div>
                </div>
                <vs-divider />
                <posted-trip-feedback :data="bidsrecord.trip_posted_feedback" :rate="bidsrecord.posted_rating"></posted-trip-feedback>
            </span>
        </a-drawer>
        <a-drawer :width="720" :visible="completedfeedbackShow" :body-style="{ paddingBottom: '80px' }" @close="onClose">
            <div v-for="(bidsrecord,index) in bidsData.bids" :key="index" v-if="recordContent(index)" style="margin-top:-10px">
                <div class="header">
                    <vs-avatar size="70px" :src="'/images/' + bidsrecord.photo" style="float:left" />
                    <div class="con-colors" style="overflow:hidden">
                        <ul style="padding-left:10px">
                            <li>
                                <h4>
                                    {{bidsrecord.bidder_name}}
                                </h4>
                            </li>
                            <li>
                                <div class="rating">
                                    <a-rate :default-value="bidsrecord.completed_rating" disabled allow-half />
                                </div>
                            </li>
                            <li>
                            </li>
                        </ul>
                    </div>
                </div>
                <vs-divider />
                <completed-trip-feedback :data="bidsrecord.trip_completed_feedback"></completed-trip-feedback>
            </div>
        </a-drawer>
    </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment-timezone';
import Loading from 'vue-loading-overlay';
import { Rate } from 'ant-design-vue';
import 'ant-design-vue/lib/rate/style/index.css'
import Swal from 'sweetalert2';
export default {
    components: {
        postedTripFeedback: () => import('@/components/trip/postedTripFeedback'),
        completedTripFeedback: () => import('@/components/trip/completedTripFeedback'),
        Loading,
    },
    props: ['data'],
    data() {
        return {
            paymentbox: true,
            ratingnreview: false,
            postedfeedbackShow: false,
            completedfeedbackShow: false,
            active: 0,
            activePay: 0,
            activeReview: 0,
            moment: moment,
            popupActive: false,
            tripTakerReviewModalActive: false,
            title: "",
            paymentMethod: "",
            ownerTitle: "",
            paid: 1,
            isPayment: false,
            ownerRating: 0,
            popupActivo: false,
            counter_offer_accepted: 1,
            counter_offer_decline: 2,
            bider_email: "Please accept bid to see",
            bider_phone: "Please accept bid to see",
            slug: this.$route.params.slug,
            isLoading: false,
            post_type: this.data.post_type,
            counter_offer: [],
            bidsData: this.data,
            bid_accepted: 1,
            completed: 1,
            isShowModal: false,
            result: '',
            feedback: '',
            choosenfeedback: [],
            riderchoosenfeedback: [],
            rating: 0,
            activeRecord: 0,
            feedbacklist: [
                { name: 'text1', text: 'Good Ride' },
                { name: 'text2', text: 'Good Trip' },
            ],
            tripgiverfeedbacklist: [
                { name: 'text3', text: 'Behavious of the user is polite' },
                { name: 'text4', text: 'He was very co-operative' },
            ],
            canAccept: true,

        }
    },
    created() {

        if (this.data.seats_available == 0) {
            this.canAccept = false
        }
        // var count = 0;

        // for (let i = 0; i < this.data.bids.length; i++) {
        //     if (this.data.bids[i].accepted == 1) {
        //         count++;
        //         this.result = count;
        //     } else {
        //         this.result = 1;
        //     }
        // }
        //  Echo.channel('bid-channel')
        //     .listen('BidEvent', (e) => {
        //         setTimeout(() => {
        //             axios.get('/api/getTrip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })

        // Echo.channel('accept-channel')
        //     .listen('AcceptEvent', (e) => {
        //         setTimeout(() => {
        //             axios.get('/api/getTrip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('counter-channel')
        //     .listen('CounterEvent', (e) => {
        //         setTimeout(() => {
        //             axios.get('/api/getTrip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('agree-channel')
        //     .listen('AgreeEvent', (e) => {
        //         setTimeout(() => {
        //             axios.get('/api/getTrip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('disagree-channel')
        //     .listen('DisagreeEvent', (e) => {
        //         setTimeout(() => {
        //             axios.get('/api/getTrip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('completed-channel')
        //     .listen('CompletedEvent', (e) => {
        //         setTimeout(() => {
        //             axios.get('/api/getTrip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('pay-channel')
        //     .listen('PayEvent', (e) => {
        //         setTimeout(() => {
        //             axios.get('/api/getTrip/' + this.data.id)
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
        EventBus.$on('newBid', (data) => {
            this.bidsData = data.data
        })
    },
    methods: {
        onClose() {
            this.postedfeedbackShow = false
            this.completedfeedbackShow = false
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
        paymentModal(i, name) {
            this.popupActive = true;
            return (this.title = "Select payment method", this.activePay = i)
        },
        morefeedback(e) {
            this.choosenfeedback.push(e.target.value)
        },
        ownerFeedback(e) {
            this.riderchoosenfeedback.push(e.target.value)
        },
        ridetakerFeedbackModal(i, name, pmethod) {
            this.popupActive = true
            this.paymentbox = false
            this.title = ('Give rating and feedback to ').concat(name)
            this.paymentMethod = pmethod
            this.ratingnreview = true

        },
        tripTakerReviewModal(i, name) {
            this.tripTakerReviewModalActive = true;
            return (this.ownerTitle = ('Give rating and feedback to ').concat(name), this.activeReview = i)
        },
        tripTakerReviewContent: function(i) {
            return this.activeReview === i
        },
        showModal(i, name) {
            this.popupActivo = true;
            return (this.active = i, this.title = name.concat('\'s', ' contact info'))
        },
        bidderinfoModalActiveContent: function(i) {
            return this.active === i
        },
        paymentActiveContent: function(i) {
            return this.activePay === i
        },

        recordContent: function(i) {
            return this.activeRecord === i
        },
        tripPostedFeedbacks(i) {

            this.postedfeedbackShow = !this.postedfeedbackShow;
            return this.activeRecord = i;


        },
        getProfilePhoto(pic) {
            return pic;
        },
        tripCompletedFeedbacks(i) {
            this.completedfeedbackShow = !this.completedfeedbackShow;
            return this.activeRecord = i;

        },
        passenger_accepted(id) {
            this.isLoading = true
            this.$axios.patch(`tripbids/${id}`, {
                    passenger_accepted: 1
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('getTrip/' + this.data.id)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    })
                    this.isLoading = false
                })
                .catch(error => {
                    this.isLoading = false
                    if (error.response.status == 403) {
                        Swal.fire({
                            position: 'center',
                            type: 'error',
                            html: '<p style="text-align:center;">Please update E-wallet Balance</p>',
                            showConfirmButton: true,

                        })
                    }

                    if (error.response.status == 422) {
                        this.$vs.notify({
                            title: 'Error',
                            text: 'Oops! Something went wrong. Please try again.',
                            position: 'top-right',
                            color: 'danger'
                        })
                    }

                });
        },
        review(id, bidderId) {
            this.popupActive = false
            this.isLoading = true
            this.$axios.patch(`tripbids/${id}`, {
                    rating: this.rating,
                    review: this.choosenfeedback,
                    bidderId: bidderId
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('getTrip/' + this.data.id)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    })
                    this.isLoading = false
                })

        },
        riderFeedback(id, bidderid) {
            this.tripTakerReviewModalActive = false
            this.isLoading = true
            this.$axios.post('tripgiverfeedback', {
                    bidderId: bidderid,
                    tripgiverId: this.data.user_id,
                    tripId: this.data.id,
                    bidId: id,
                    rating: this.ownerRating,
                    review: this.riderchoosenfeedback,
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('getTrip/' + this.data.id)
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
                        this.$axios.get('getTrip/' + this.data.id)
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
                        this.$axios.get('getTrip/' + this.data.id)
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
                        this.$axios.get('getTrip/' + this.data.id)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0);

                    this.isLoading = false
                })

        },
        accept(id, passenger) {
            this.isLoading = true
            this.$axios.patch(`tripbids/${id}`, {
                    accepted: this.bid_accepted,
                    totalpassenger: passenger + this.data.seats_available
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getTrip/' + this.data.id)
                            .then(res => {
                                EventBus.$emit('updatePost', res.data.data)
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
        // postedfeedbackShow: function(val) {
        //     if (val == true) {
        //         document.getElementsByTagName("html")[0].style.overflow = "hidden";
        //     } else
        //         document.getElementsByTagName("html")[0].style.overflow = "auto"
        // },
        // completedfeedbackShow: function(val) {
        //     if (val == true) {
        //         document.getElementsByTagName("html")[0].style.overflow = "hidden";
        //     } else
        //         document.getElementsByTagName("html")[0].style.overflow = "auto"
        // },

    }
}
</script>
<style scoped>
.offeringbids {
    max-width: 1304px;
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;
}

.full-topic {
    width: 100%;
    background: #fff;
    padding: 10px;
    margin-top: -10px;
    border: none;
    margin: 0
}

.recent-post {
    margin-top: 0px;
}

.vs-button {
    padding: 7px !important;
    margin: 0px 5px;
}

th {
    padding: 6px 53px;
    padding-top: 5px;
    padding-bottom: 3px;
    border: 0;
    text-align: left;
    font-size: .85rem;
}

.active {
    display: block;
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


.namenrating {
    float: right;
    margin-right: -15px;
}


.vs-popup {
    width: 400px !important;
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

::-webkit-scrollbar {
    width: 5px;
}

.completed {
    font-size: 16px;
    font-weight: 700;
    color: #00B289;
    border: 1px solid;
    padding: 7px;
    float: right;
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

.rideconfirm {
    position: relative;
    left: -57px;
    float: right;
}

.plabel {
    font-size: 16px;
    font-weight: 600;
}
</style>