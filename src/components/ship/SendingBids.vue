<template>
    <div  id="element"  class="columns">
        <div class="vld-parent column">
            <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="false"></loading>
            <div class="flex-card light-bordered light-raised trip-info" id="shipelement">
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
                                <div class="post-content ">
                                    <div class="full-topic">
                                        <div class="post">
                                            <div class="post-meta">
                                                <div class="post-owner">
                                                    <img class="avatar" :src="getPhoto(bid.photo)">
                                                    <a class="contactlink" @click="showContactModal(index,bid.bidder_name)">Contact</a>
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
                                                    <div class="column ">
                                                        <span style="color:grey;font-weight:500">{{bid.posted}} ship posted (<a @click="postedfeedback(index)">{{bid.feedbackcount}} Reviews</a>)</span>
                                                        <span class="rating">
                                                            <star-rating :show-rating=false :star-size="14" :read-only="true" :increment="0.1" :rating="bid.posted_rating"></star-rating>
                                                            <small class="rate">{{bid.posted_rating}}</small>
                                                        </span>
                                                    </div>
                                                    <div class="column">
                                                        <span style="color:grey;font-weight:500">{{bid.completed}} ship completed (<a @click="completedfeedback(index)">{{bid.feedbackcount}} Reviews</a>)</span>
                                                        <span class="rating">
                                                            <star-rating :show-rating=false :star-size="14" :read-only="true" :increment="0.1" :rating="bid.completed_rating"></star-rating>
                                                            <small class="rate">{{bid.completed_rating}}</small>
                                                        </span>
                                                    </div>
                                                    <div class="column" style="font-size: 16px;font-weight: 500;color:grey;">
                                                        <span style="font-weight:500">Amount(BDT)</span>
                                                        <span style="color:#00B289">{{bid.amount}}</span>
                                                    </div>
                                                     <!-- <div class="column" v-if="bid.user_id==id && bid.accepted==1 && bid.complete==0">
                                                    <span class="ongoing">Offer Accepted</span>
                                                </div> -->
                                                </div>
                                                <div class="columns">
                                                    <div class="column is-4">
                                                        <span style="font-weight:500;">Message: </span>
                                                        <span>{{bid.cover_letter}}</span>
                                                    </div>
                                                    <div class="column is-4" v-if="bid.ship_owner==id && bid.co==null">
                                                        <div class="columns" v-if="bid.accepted==0">
                                                            <div class="column is-6">
                                                                <label class="label">Counter Offer: </label>
                                                                <input class="input is-primary-focus" v-model="counter_offer[index]" type="text">
                                                                <a @click="submit(bid.id)" class="button raised info-btn is-small btn-fade" style="margin-top:5px">
                                                                    Submit
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="column is-4" v-if="bid.
                                                    ship_owner==id && bid.co>0">
                                                        <label class="label">Counter Offer:</label>
                                                        <span class="counteramt">{{bid.co}} BDT </span>
                                                        <span>
                                                            <vs-chip transparent color="success" v-if="bid.agree==1">Accepted</vs-chip>
                                                            <vs-chip transparent color="danger" v-else-if="bid.agree==2">Declined</vs-chip>
                                                            <vs-chip transparent color="primary" v-else>Pending</vs-chip>
                                                        </span>
                                                    </div>
                                                    <div class="column is-4" v-else-if="bid.user_id==id">
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
                                                        <!--    <div v-if="bid.co>0">
                                                            <span style="font-weight:500;">Counter Offer:</span>
                                                            <span>{{bid.co}}</span>
                                                            <span style="margin-left:5px;">
                                                                <span class="button is-small" style=" background-color: #00b289; color:#fff" v-if="bid.agree==1">Agreed</span>
                                                                <span class="button is-small" style=" background-color: #ff7273; color:#fff" v-if="bid.agree==2">Declined</span>
                                                                <vs-button color="primary" type="filled" @click="agree(bid.id)" v-if="bid.agree==0">Agree</vs-button>
                                                                <vs-button color="danger" type="filled" v-if="bid.agree==0" @click="disagree(bid.id)">Decline</vs-button>
                                                            </span>
                                                        </div> -->
                                                    </div>
                                                    <div class="column is-4" style="margin-bottom:10px" v-if="bid.
                                                    ship_owner==id">
                                                        <a v-if="bid.accepted==0" @click="accept(bid.id)" class="button btn-dash info-btn is-raised rounded btn-fade" style="float:right;">Accept</a>
                                                        <span v-else-if="bid.accepted==1 && bid.complete==0" class="ongoing" style="float:right;">Offer accepted
                                                        </span>
                                                        <div v-else-if="bid.complete==1 && bid.paid==0" style="float:right;">
                                                            <p style="color: #296557;font-weight: 600;">Shipment has been completed,do you want to pay?</p>
                                                            <div style="text-align:center">
                                                                <vs-button type="filled" @click="paymentModal(index,bid.bidder_name)">Yes</vs-button>
                                                                <vs-button type="filled">No</vs-button>
                                                            </div>
                                                        </div>
                                                        <div v-else-if="bid.paid==1" style="float:right;">
                                                            <span class="ongoing">Shipment completed</span>
                                                            <div style="margin-top:12px;margin-left: 28%;" v-if="bid.feedback_got==0">
                                                                <a @click="carrierFeedback(index,bid.bidder_name,bid.payment_method)" class="button btn-dash success-btn btn-dash is-raised rounded ripple  btn-fade">Give a rating</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="column is-4" style="margin-bottom:10px;" v-if="bid.user_id==id &&bid.accepted==1">
                                                        <div v-if="bid.paid==0 && bid.complete==0" style="float: right;">
                                                            <p style="color: #737373;font-weight: 600;">After finishing the shipment, click on Finish Shipment button</p>
                                                            <a style="float: right;" @click="shipmentCompleted(bid.id)" class="button btn-dash info-btn btn-dash is-raised rounded ripple  btn-fade">Finish Shipment</a>
                                                        </div>
                                                        <div v-else-if="bid.paid==0 && bid.complete==1" style="float:right">
                                                            <span class="ongoing">Shipment completed,awaiting payment
                                                            </span>
                                                        </div>
                                                        <div v-else-if=" bid.paid==1" style="float:right">
                                                            <span class="ongoing">Shipment completed
                                                            </span>
                                                            <div style="margin-top:12px;margin-left:28%;" v-if="bid.feedback_given==0">
                                                                <a @click="carrierFeedbackModal(index,bid.ship_poster_name)" class="button btn-dash success-btn btn-dash is-raised rounded ripple  btn-fade">Give a rating</a>
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
        <div v-for="(bidd,index) in bidsData.bids" v-if="modalActiveContent(index)">
            <vs-popup class="holamundo" :title="title" :active.sync="popupActive">
                <section>
                    <div class="columns">
                        <div class="column" style="display:inline-flex">
                            <label class="label">Name: </label>
                            <span class="contactinfo">{{bidd.bidder_name}}</span>
                        </div>
                        <div class="column" style="display:inline-flex">
                            <label class="label">Profession:</label>
                            <span class="contactinfo"> {{bidd.profession}}</span>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column" style="display:inline-flex">
                            <label class="label">Education:</label>
                            <span class="contactinfo">{{ bidd.education}}</span>
                        </div>
                        <div class="column" style="display:inline-flex">
                            <label class="label">Age:</label>
                            <span class="contactinfo">{{ bidd.age}}</span>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column" style="display:inline-flex">
                            <label class="label">Sex:</label>
                            <span class="contactinfo">{{ bidd.sex}}</span>
                        </div>
                        <div class="column" style="display:inline-flex">
                            <label class="label">Email:</label>
                            <span class="contactinfo">{{ bidd.email}}</span></div>
                    </div>
                    <div class="columns">
                        <div class="column" style="display:inline-flex">
                            <label class="label">Mobile:</label>
                            <span class="contactinfo">{{ bidd.phone}}</span>
                        </div>
                        <div class="column" style="display:inline-flex">
                            <label class="label">Address:</label>
                            <span class="contactinfo">{{ bidd.bidder_location}}</span>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column" style="display:inline-flex">
                            <label class="label">Skype:</label>
                            <span class="contactinfo">{{ bidd.skype}}</span>
                        </div>
                        <div class="column" style="display:inline-flex">
                            <label class="label">Facebook Id:</label>
                            <span class="contactinfo">{{ bidd.fblink}}</span>
                        </div>
                    </div>
                </section>
            </vs-popup>
        </div>
        <!-- carrier payment process -->
        <div v-for="(bidd,index) in bidsData.bids" :key="index" v-if="paymentActiveContent(index)">
            <vs-popup class="holamundo" :title="title" :active.sync="popupPayment">
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
                                    <label class="label">If you would like to leave feedback about the carrier, select the reason below:</label>
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
                                    <vs-button @click="review(bidd.id,bidd.ship_owner)" color="primary" style="float:right" type="filled">Submit</vs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </vs-popup>
        </div>
        <!-- carrier payment process -->
        <!-- feedback to the shipper by carrier -->
        <div v-for="(bidd,index) in bidsData.bids" :key="bidd.id" v-if="carrierActiveModal(index)">
            <vs-popup class="holamundo" :title="title" :active.sync="popupCarrierModal">
                <div class="columns">
                    <div class="column is-4">
                        <label class="label">Give a rating about the shipment</label>
                        <star-rating :show-rating=true :star-size="20" style="font-size:17px;margin-top: 0px;" :increment="0.5" v-model="shipperRating"></star-rating>
                    </div>
                    <div class="column is-8">
                        <label class="label">If you would like to leave feedback about the shipper, select the reason below:</label>
                        <div class="field">
                            <div class="b-checkbox is-info" v-for="item,index in shipgiverfeedbacklist">
                                <input v-model="carrierchoosenfeedback" :id="item.name" class="styled" :value="item.text" type="checkbox">
                                <label :for="item.name">
                                    {{item.text}}
                                </label>
                            </div>
                        </div>
                        <textarea class="textarea is-primary-focus" @change="shipperFeedback($event)" rows="4" placeholder="Others.."></textarea>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <vs-button @click="shipperReview(bidd.id,bidd.user_id)" color="primary" style="float:right" type="filled">Submit</vs-button>
                    </div>
                </div>
            </vs-popup>
        </div>
        <!-- feedback to the shipper by carrier -->
        <a-drawer :width="720" :visible="completedfeedbackShow" :body-style="{ paddingBottom: '80px' }" @close="onClose">
            <div v-for="(bidsrecord,index) in bidsData.bids" v-if="completedFeedbackRecord(index)">
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
                                    <a-rate :default-value="bidsrecord.completed_rating" disabled allow-half />
                                </div>
                                <!--  <span class="rating">
                                    <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="bidsrecord.completed_rating" style="float:left"> </star-rating>
                                    <small class="userrating">{{bidsrecord.completed_rating}}</small>
                                </span> -->
                            </li>
                            <li>
                            </li>
                        </ul>
                    </div>
                </div>
                <vs-divider />
                <completed-ship-feedback :data="bidsrecord.ship_completed_feedbacks"></completed-ship-feedback>
            </div>
        </a-drawer>
        <a-drawer :width="720" :visible="postedfeedbackShow" :body-style="{ paddingBottom: '80px' }" @close="onClose">
            <div v-for="(bidsrecord,index) in bidsData.bids" :key="index" v-if="postedFeedbackRecord(index)">
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
                                    <a-rate :default-value="bidsrecord.rating" disabled allow-half />
                                </div>
                                <!--  <span class="rating">
                                    <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="bidsrecord.rating" style="float:left"> </star-rating>
                                    <small class="userrating">{{bidsrecord.rating}}</small>
                                </span> -->
                            </li>
                        </ul>
                    </div>
                </div>
                <vs-divider />
                <posted-ship-feedback :data="bidsrecord.ship_posted_feedbacks"></posted-ship-feedback>
            </div>
        </a-drawer>
        <div v-for="(bidd,index) in bidsData.bids" v-if="reviewModalRecord(index)">
            <vs-popup class="holamundo" :title="title" :active.sync="paynReview">
                <div class="columns">
                    <div class="column is-4">
                        <label class="label">Rating</label>
                        <star-rating :show-rating=true :star-size="20" style="font-size:17px;margin-top: 0px;" :increment="0.5" v-model="rating"></star-rating>
                    </div>
                    <div class="column is-8">
                        <textarea class="textarea is-primary-focus" v-model="review" rows="5" placeholder="Review about the shipper ..."></textarea>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <vs-button @click="pay(bidd.id)" color="primary" style="float:right" type="filled">Pay</vs-button>
                    </div>
                </div>
            </vs-popup>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment-timezone';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
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
        completedShipFeedback: () => import('@/components/ship/CompletedShipFeedback'),
        postedShipFeedback: () => import('@/components/ship/PostedShipFeedback'),
        Loading,
        StarRating
    },
    props: ['data'],
    data() {
        return {
            moment: moment,
            title: "",
            popupActive: false,
            paynReview: false,
            postedfeedbackShow: false,
            shipOwnerReviewModalActive: false,
            completedfeedbackShow: false,
            username: this.$route.params.slug,
            feedbacks: [],
            active: 0,
            bidsData: this.data,
            activeRecord: 0,
            activeReview: 0,
            isShowModal: false,
            record: false,
            isReviewModal: false,
            ownerTitle: '',
            username: this.data.slug,
            isLoading: false,
            counter_offer: [],
            counter_offer_accepted: 1,
            counter_offer_decline: 2,
            bid_accepted: 1,
            paid: 1,
            isPayment: false,
            task_status: 'accepted',
            balance: this.data.balance,
            result: '',
            rating: 0,
            shipperRating: 0,
            completed: 1,
            feedbackgot: 1,
            popupPayment: false,
            activePay: 0,
            paymentbox: true,
            ratingnreview: false,
            choosenfeedback: [],
            riderchoosenfeedback: [],
            carrierchoosenfeedback: [],
            paymentMethod: '',
            feedbacklist: [
                { name: 'text1', text: 'Good Ride' },
                { name: 'text2', text: 'Good Trip' },
            ],

            shipgiverfeedbacklist: [
                { name: 'text3', text: 'His shipement was good' },
                { name: 'text4', text: 'Loved to work with him' },
            ],
            popupCarrierModal: false,
            carrierActive: 0
        }
    },
    computed: {
        id() {
            return this.$store.getters.id
        },
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
        //            this.$axios.get('/getShip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })

        // Echo.channel('accept-channel')
        //     .listen('AcceptEvent', (e) => {
        //         setTimeout(() => {
        //             this.$axios.get('/getShip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('counter-channel')
        //     .listen('CounterEvent', (e) => {
        //         setTimeout(() => {
        //             this.$axios.get('/getShip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('agree-channel')
        //     .listen('AgreeEvent', (e) => {
        //         setTimeout(() => {
        //             this.$axios.get('/getShip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('disagree-channel')
        //     .listen('DisagreeEvent', (e) => {
        //         setTimeout(() => {
        //            this.$axios.get('/getShip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('completed-channel')
        //     .listen('CompletedEvent', (e) => {
        //         setTimeout(() => {
        //            this.$axios.get('/getShip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('pay-channel')
        //     .listen('PayEvent', (e) => {
        //         setTimeout(() => {
        //            this.$axios.get('/getShip/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })

    },
    mounted() {
        EventBus.$on('Sendingbid', (data) => {
            this.bidsData = data
            this.$scrollTo(shipelement, 1000, options)
        })

    },
    methods: {
        onClose() {
            this.postedfeedbackShow = false
            this.completedfeedbackShow = false
        },
        getPhoto(pic) {
            return pic
        },
        paymentModal(i, name) {
            this.popupPayment = true;
            return (this.title = "Select payment method", this.activePay = i)
        },
        paymentActiveContent: function(i) {
            return this.activePay === i
        },
        carrierFeedback(i, name, pmethod) {
            this.popupPayment = true
            this.paymentbox = false
            this.title = ('Give rating and feedback to ').concat(name)
            this.paymentMethod = pmethod
            this.ratingnreview = true
        },
        byCash(id, name) {
            this.isPayment = true
            this.paymentbox = false
            this.$axios.patch(`shipbids/${id}`, {
                    pay: this.paid,
                    paymethod: 'cash'
                })
                .then((res) => {
                    this.isPayment = false
                    this.title = ('Give rating and feedback to ').concat(name)
                    this.paymentMethod = 'By Cash'
                    this.ratingnreview = true
                })
        },
        wallet(id, name, amount) {
            this.isPayment = true
            this.paymentbox = false
            this.$axios.patch(`shipbids/${id}`, {
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
        shipperFeedback(e) {
            this.carrierchoosenfeedback.push(e.target.value)
        },
        review(id, shipperid) {
            this.popupPayment = false
            this.isLoading = true
            this.$axios.patch(`shipbids/${id}`, {
                    rating: this.rating,
                    review: this.choosenfeedback,
                    shipperId: shipperid,
                    feedbackgot: this.feedbackgot,
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getShip/' + this.data.slug)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    })
                    this.isLoading = false
                })
        },

        shipmentCompleted(id) {
            this.isLoading = true
            this.$axios.patch(`shipbids/${id}`, { completed: this.completed })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getShip/' + this.data.slug)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0)

                    this.isLoading = false
                })
        },
        showContactModal(i, name) {
            this.popupActive = true;
            return (this.active = i, this.title = name.concat('\'s', ' contact info'))
        },
        postedFeedbackRecord: function(i) {
            return this.active === i
        },
        completedFeedbackRecord: function(i) {
            return this.active === i
        },
        postedfeedback(i) {
            this.postedfeedbackShow = !this.postedfeedbackShow;
            return this.activeRecord = i;
        },
        completedfeedback(i) {
            this.completedfeedbackShow = !this.completedfeedbackShow;
            return this.active = i;
        },
        carrierFeedbackModal(i, name) {
            this.popupCarrierModal = true;
            return (this.title = ('Give rating and feedback to ').concat(name), this.carrierActive = i)

        },
        carrierActiveModal: function(i) {
            return this.carrierActive === i
        },

        reviewModalRecord: function(i) {
            return this.active === i
        },
        modalActiveContent: function(i) {
            return this.active === i
        },
        shipperReview(id, carrierid) {
            this.popupCarrierModal = false
            this.isLoading = true
            this.$axios.post('shipgiversfeedback', {
                    bidderId: carrierid,
                    shipperId: this.data.user_id,
                    shipId: this.data.id,
                    bidId: id,
                    rating: this.shipperRating,
                    review: this.carrierchoosenfeedback,
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getShip/' + this.data.slug)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    })
                    this.isLoading = false
                })
        },
        updateSlug() {
            this.username = this.$route.params.slug
            this.$axios.get('/bids/' + this.username)
                .then(res => {
                    this.bidsData = res.data.data
                    this.count = res.data.data.length
                })
                .catch(error => console.log(error.response.data))

        },

        submit(id) {
            this.username = this.$route.params.slug
            this.isLoading = true
            this.$axios.patch(`shipbids/${id}`, { co: this.counter_offer })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getShip/' + this.data.slug)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0)
                    this.isLoading = false
                })

        },
        agree(id) {
            this.isLoading = true
            this.$axios.patch(`shipbids/${id}`, { agree: this.counter_offer_accepted })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getShip/' + this.data.slug)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0)

                    this.isLoading = false
                })

        },
        disagree(id) {
            this.isLoading = true
            this.$axios.patch(`shipbids/${id}`, { disagree: this.counter_offer_decline })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getShip/' + this.data.slug)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0);

                    this.isLoading = false
                })
        },
        shipBidderFeedback(id, userid) {
            this.isLoading = true
            this.$axios.post('shipfeedback', {
                    userId: userid,
                    ownerId: this.data.user_id,
                    shipId: this.data.id,
                    bidId: id,
                    rating: this.rating,
                    review: this.review,

                })
                .then((res) => {
                    this.shipOwnerReviewModalActive = false
                    setTimeout(() => {
                        this.$axios.get('/getShip/' + this.data.slug)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0);

                    this.isLoading = false
                })
        },

        accept(id) {
            this.isLoading = true
            this.$axios.patch(`shipbids/${id}`, {
                    accepted: this.bid_accepted,
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getShip/' + this.data.slug)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0)
                    this.isLoading = false

                })

        },
        // pay(id) {
        //     this.isLoading = true
        //     this.$axios.patch(`shipbids/${id}`, {
        //             rating: this.rating,
        //             review: this.review,
        //             pay: this.paid
        //         })
        //         .then((res) => {
        //             this.paynReview = false;
        //             setTimeout(() => {
        //                 this.$axios.get('/getShip/' + this.data.id)
        //                     .then(res => {
        //                         this.bidsData = res.data.data
        //                     })
        //             })
        //             this.isLoading = false
        //         })
        // },
    },
    watch: {
        $route: 'updateSlug',
        immediate: true,


    }


}
</script>
<style scoped>
.sendingbids {
    max-width: 1304px;
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
}

.small {
    color: #fff;
    background-color: #4FC1EA;
    border-radius: 3px;
    display: inline-flex;
    font-size: 12px;
    padding: 0px 6px;
    height: 19px;

}

.rate {
    color: #00B289;
    margin-top: -1px;
    margin-left: 3px;
}

.userrating {
    color: #fff;
    background-color: #4FC1EA;
    border-radius: 3px;
    display: inline-flex;
    font-size: 15px;
    padding: 0px 5px;
    height: 22px;
}


.img {
    height: auto;
    max-width: 34%;
    border-radius: 8px;
}

.location {
    margin-top: 6px;
}

.full-topic {
    width: 100%;
    background: #fff;
    padding: 16px;
    margin-top: -10px;
    border: none;
    margin: 0
}

.namenrating {
    float: right;
    margin-right: -15px;
}

.header-title {
    font-size: 20px;
    margin: 10px;
}

.top-wrap {
    margin-top: -30px;
}

.ongoing {
    font-size: 16px;
    font-weight: 700;
    color: #00B289;
    border: 1px solid;
    padding: 7px;
    margin-left: 38px;
}

.dashboard-wrapper .flex-card .content {
    padding: 0px !important;
}

.vs-button {
    padding: 7px !important;
    margin: 0px 5px;
}

.vs-button-primary.vs-button-filled {
    background: #039BE5 !important;
}

small {
    font-size: 1em;
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