<template>
    <div class="offeringbids">
        <div class="vld-parent">
            <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="false"></loading>
            <div class="flex-card light-bordered light-raised trip-info" id="element2">
                <div class="felx-body">
                    <div class="content">
                        <div>
                            <h3 style="border-bottom: 1px solid #e0e0e0;padding: 14px; margin-bottom:0em">
                                Total {{bidsData.bids_count}} Bids</h3>
                        </div>
                        <article class="media recent-post" style="margin-top:0" v-if="bidsData.bids_count==0">
                            <div class="media-content">
                                <div class="post-content" style="padding:25px 0;text-align:center">
                                    <h5>No Bids Yet</h5>
                                </div>
                            </div>
                        </article>
                        <article class="media recent-post" style="margin-top: 12px;margin-bottom: 12px;" v-for="(bid,index) in bidsData.bids" :key="index">
                            <div class="media-content">
                                <div class="post-content ">
                                    <div class="full-topic">
                                        <div class="post">
                                            <div class="post-meta">
                                                <div class="post-owner" style="margin-top:-40px">
                                                    <img class="avatar" :src="getPhoto(bid.photo)">
                                                </div>
                                            </div>
                                            <div class="post-content" style="margin: -39px 20px;">
                                                <div class="columns">
                                                    <div class="column is-4">
                                                        <a style="color:#1F2836;font-weight:500">{{bid.bidder_name}} </a>
                                                        <a @click="showContactModal(index,bid.bidder_name)">(See contact info)</a>
                                                    </div>
                                                    <div class="column">
                                                        <span style="color:grey;font-weight:500">{{bid.posted}} task posted (<a @click="postedfeedback(index)">{{bid.feedbackcount}} Reviews</a>)</span>
                                                        <span class="rating">
                                                            <star-rating :show-rating=false :star-size="14" :read-only="true" :increment="0.1" :rating="bid.posted_rating"></star-rating>
                                                            <small class="rate">{{bid.posted_rating}}</small>
                                                        </span>
                                                    </div>
                                                    <div class="column">
                                                        <span style="color:grey;font-weight:500">{{bid.completed}} task completed (<a @click="completedfeedback(index)">{{bid.feedbackcount}} Reviews</a>)</span>
                                                        <span class="rating">
                                                            <star-rating :show-rating=false :star-size="14" :read-only="true" :increment="0.1" :rating="bid.completed_rating"></star-rating>
                                                            <small class="rate">{{bid.completed_rating}}</small>
                                                        </span>
                                                    </div>
                                                    <div class="column is-2" style="font-size: 16px;font-weight: 500;color:grey;">
                                                        <span style="font-weight:500">Amount(BDT)</span>
                                                        <span class="amount">{{bid.amount}}</span>
                                                    </div>
                                                </div>
                                                <div class="columns" :class="bid.accepted==1?'ab':'cd'">
                                                    <div class="column is-4">
                                                        <span style="font-weight:500;">Short message: </span>
                                                        <span>{{bid.cover_letter}}</span>
                                                    </div>
                                                    <div class="column is-4" v-if="bid.task_owner==id && bid.co>0">
                                                        <span style="font-weight:500;">Counter Offer:</span>
                                                        <span style="margin:0px 5px">{{bid.co}}</span>
                                                        <span>
                                                            <span class="button is-small" style=" background-color: #00b289; color:#fff" v-if="bid.agree==1">Accepted</span>
                                                            <span class="button is-small" style=" background-color: #ff7273; color:#fff" v-else-if="bid.agree==2">Declined</span>
                                                            <span class="button is-small" style=" background-color: #4FC1EA;  color:#fff" v-else>Pending</span>
                                                        </span>
                                                    </div>
                                                    <div class="column is-4" v-if="bid.task_owner==id &&bid.co==null" style="margin-top:-20px">
                                                        <div v-if="bid.accepted==0 ">
                                                            <span style="font-weight:500;">Counter Offer</span>
                                                            <div class="columns">
                                                                <div class="column is-4">
                                                                    <input class="input is-primary-focus" v-model="counter_offer[index]" type="text">
                                                                </div>
                                                                <div class="column is-2">
                                                                    <vs-button color="primary" type="filled" @click='submit(bid.id)'>Submit</vs-button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="column is-4" v-else-if="bid.user_id==id">
                                                        <div v-if="bid.co>0">
                                                            <span style="font-weight:500;">Counter Offer:</span>
                                                            <span style="margin-right:2px;font-weight:600">{{bid.co}}</span>
                                                            <span>
                                                                <span class="button is-small" style=" background-color: #00b289; color:#fff" v-if="bid.agree==1">Agreed</span>
                                                                <span class="button is-small" style=" background-color: #ff7273; color:#fff" v-if="bid.agree==2">Declined</span>
                                                                <vs-button type="filled" v-if="bid.agree==0" @click="agree(bid.id)">Agree</vs-button>
                                                                <vs-button color="danger" type="filled" v-if="bid.agree==0" @click="disagree(bid.id)">Decline</vs-button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="column is-4" style="margin-bottom:10px" v-if="bid.task_owner==id">
                                                        <a style="float:right;" v-if="bid.accepted==0 && bid.paid==0" @click="accept(bid.id)" class="button btn-dash info-btn btn-dash is-raised rounded ripple  btn-fade">Accept</a>
                                                        <span style="float:right;" v-if="bid.accepted==1 && bid.complete==0" class="ongoing">Bid accepted
                                                        </span>
                                                        <div v-else-if="bid.complete==1 && bid.paid==0" style="float:right;">
                                                            <p style="color: #296557;font-weight: 600;">Task has been completed,do you want to pay?</p>
                                                            <div style="text-align:center">
                                                                <vs-button type="filled" @click="paymentModal(index,bid.bidder_name)">Yes</vs-button>
                                                                <vs-button type="filled">No</vs-button>
                                                            </div>
                                                        </div>
                                                        <div v-else-if="bid.paid==1" style="float:right;">
                                                            <span class="ongoing">Task completed</span>
                                                            <div style="margin-top:12px;margin-left: 26%;" v-if="bid.feedback_got==0">
                                                                <a @click="taskGiverFeedbackModal(index,bid.bidder_name,bid.payment_method)" class="button btn-dash success-btn btn-dash is-raised rounded ripple  btn-fade">Give a rating</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="column is-4" style="margin-bottom:10px;" v-if="bid.user_id==id &&bid.accepted==1">
                                                        <div v-if="bid.paid==0 && bid.complete==0" style="float: right;">
                                                            <p style="color: #737373;font-weight: 600;">After finishing the task, click on Finish Task button</p>
                                                            <a style="float: right;" @click="taskCompleted(bid.id)" class="button btn-dash info-btn btn-dash is-raised rounded ripple  btn-fade">Finish Task</a>
                                                        </div>
                                                        <div v-else-if="bid.paid==0 && bid.complete==1" style="float:right">
                                                            <span class="ongoing">Task completed,awaiting payment
                                                            </span>
                                                        </div>
                                                        <div v-else-if=" bid.paid==1" style="float:right">
                                                            <span class="ongoing">Task completed
                                                            </span>
                                                            <div style="margin-top:12px;margin-left:28%;" v-if="bid.feedback_given==0">
                                                                <a @click="taskerFeedbackModal(index,bid.ship_poster_name)" class="button btn-dash success-btn btn-dash is-raised rounded ripple  btn-fade">Give a rating</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- <span v-if="bid.pay==0" class="ongoing">Task Onging</span>
                                                        <div v-else-if="bid.accepted==1 && bid.pay==1">
                                                            <span class="ongoing">Task completed
                                                            </span>
                                                            <div style="margin-left:10%;margin-top:12px;" v-if="bid.feedback_given==0 && bid.pay==1">
                                                                <a @click="taskOwnerReviewModal(index,bid.task_owner_name)" class="button btn-dash success-btn btn-dash is-raised rounded ripple  btn-fade">Give a rating</a>
                                                            </div>
                                                        </div> -->
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
        <div v-for="(bidd,index) in bidsData.bids" :key="index" v-if="modalActiveContent(index)">
            <vs-popup class="holamundo" :title="title" :active.sync="popupActive">
                <section v-if="bidd.accepted==1">
                    <div class="columns">
                        <div class="column" style="display:inline-flex">
                            <label class="label">Name: </label>
                            <p class="contactinfo">{{ bidd.bidder_name}}</p>
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
                <section v-else>
                    <div class="columns">
                        <div class="column" style="display:inline-flex">
                            <label class="label">Name: </label>
                            <span class="contactinfo"> {{ bidd.bidder_name}}</span>
                        </div>
                        <div class="column" style="display:inline-flex">
                            <label class="label">Profession:</label>
                            <p class="contactinfo">{{bidd.profession}}</p>
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
                            <span class="contactinfo"> {{bider_email}}</span></div>
                    </div>
                    <div class="columns">
                        <div class="column" style="display:inline-flex">
                            <label class="label">Mobile:</label>
                            <span class="contactinfo">{{bider_phone}}</span>
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
        <vs-sidebar position-right parent="body" default-index="1" color="primary" class="sidebarx" spacer v-model="completedfeedbackShow">
            <div v-for="(bidsrecord,index) in bidsData.bids" :key="bidsrecord.id" v-if="completedFeedbackRecord(index)" style="margin-top:-10px">
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
                                <span class="rating">
                                    <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="bidsrecord.completed_rating" style="float:left"> </star-rating>
                                    <small class="userrating">{{bidsrecord.completed_rating}}</small>
                                </span>
                            </li>
                            <li>
                            </li>
                        </ul>
                    </div>
                </div>
                <vs-divider />
                <completed-task-feedback :data="bidsrecord.task_completed_feedbacks"></completed-task-feedback>
            </div>
        </vs-sidebar>
        <vs-sidebar position-right parent="body" default-index="1" color="primary" class="sidebarx" spacer v-model="postedfeedbackShow">
            <div v-for="(bidsrecord,index) in bidsData.bids" :key="bidsrecord.bidder_name" v-if="postedFeedbackRecord(index)" style="margin-top:-10px">
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
                                <span class="rating">
                                    <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="bidsrecord.rating" style="float:left"> </star-rating>
                                    <small class="userrating">{{bidsrecord.posted_rating}}</small>
                                </span>
                            </li>
                            <li>
                            </li>
                        </ul>
                    </div>
                </div>
                <vs-divider />
                <posted-task-feedback :data="bidsrecord.task_posted_feedbacks"></posted-task-feedback>
            </div>
        </vs-sidebar>
        <!-- tasker payment process -->
        <div v-for="(bidd,index) in bidsData.bids" :key="bidd.id" v-if="paymentActiveContent(index)">
            <vs-popup class="holamundo" :title="title" :active.sync="popupPayment">
                <div class="vld-parent">
                    <loading :active.sync="isPayment" :can-cancel="false" :is-full-page="false"></loading>
                    <div class="columns" v-show="ratingnreview">
                        <div class="column" style="text-align:center">
                            <div style="display:inline-flex">
                                <label class="plabel">Trip amount:</label>
                                <span class="taskamount">{{bidd.payable_amount}} bdt</span>
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
                                    <label class="label">Give a rating about the tasker</label>
                                    <star-rating :show-rating=true :star-size="20" style="font-size:17px;margin-top: 0px;" :increment="0.5" v-model="taskerrating"></star-rating>
                                </div>
                                <div class="column is-8">
                                    <label class="label">If you would like to leave feedback about the tasker, select the reason below:</label>
                                    <div class="field">
                                        <div class="b-checkbox is-info" v-for="item,index in taskerfeedbacklist">
                                            <input v-model="taskgiverchoosenfeedback" :id="item.name" class="styled" :value="item.text" type="checkbox">
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
                                    <vs-button @click="review(bidd.id,bidd.task_owner)" color="primary" style="float:right" type="filled">Submit</vs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </vs-popup>
        </div>
        <!-- carrier payment process -->
        <!-- feedback to the tasktaker by tasker -->
        <div v-for="(bidd,index) in bidsData.bids" :key="bidd.user_id" v-if="taskerActiveModal(index)">
            <vs-popup class="holamundo" :title="title" :active.sync="popupTaskerModal">
                <div class="columns">
                    <div class="column is-4">
                        <label class="label">Give a rating about the Task</label>
                        <star-rating :show-rating=true :star-size="20" style="font-size:17px;margin-top: 0px;" :increment="0.5" v-model="taskgiverrating"></star-rating>
                    </div>
                    <div class="column is-8">
                        <label class="label">If you would like to leave feedback about the Task giver, select the reason below:</label>
                        <div class="field">
                            <div class="b-checkbox is-info" v-for="item,index in taskgiverfeedbacklist">
                                <input v-model="taskerchoosenfeedback" :id="item.name" class="styled" :value="item.text" type="checkbox">
                                <label :for="item.name">
                                    {{item.text}}
                                </label>
                            </div>
                        </div>
                        <textarea class="textarea is-primary-focus" @change="taskerFeedback($event)" rows="4" placeholder="Others.."></textarea>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <vs-button @click="taskerReview(bidd.id,bidd.user_id)" color="primary" style="float:right" type="filled">Submit</vs-button>
                    </div>
                </div>
            </vs-popup>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Rate } from 'element-ui';
Vue.component(Rate.name, Rate);
import PostedTaskFeedback from './PostedTaskFeedback'
import CompletedTaskFeedback from './CompletedTaskFeedback'
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
        postedTaskFeedback: () => import('@/components/task/PostedTaskFeedback'),
        completedTaskFeedback: () => import('@/components/task/CompletedTaskFeedback'),
        Loading,
        StarRating
    },
    props: ['data'],
    data() {
        return {
            title: "",
            popupActive: false,
            paynReview: false,
            postedfeedbackShow: false,
            taskOwnerReviewModalActive: false,
            completedfeedbackShow: false,
            username: this.$route.params.slug,
            active: 0,
            bidsData: this.data,
            activeRecord: 0,
            activeReview: 0,
            isShowModal: false,
            record: false,
            bider_email: "Please accept bid to see",
            bider_phone: "Please accept bid to see",
            isReviewModal: false,
            ownerTitle: '',
            username: this.data.slug,
            isLoading: false,
            counter_offer: [],
            counter_offer_accepted: 1,
            bid_accepted: 1,
            completed: 1,
            paid: 1,
            task_status: 'accepted',
            balance: this.data.balance,
            result: '',
            taskerrating: 0,
            taskgiverrating: 0,
            isPayment: false,
            popupPayment: false,
            paymentbox: true,
            ratingnreview: false,
            activePay: 0,
            popupTaskerModal: false,
            taskerActive: 0,
            feedbackgot: 1,
            taskgiverchoosenfeedback: [],
            taskerchoosenfeedback: [],
            paymentMethod: '',
            taskerfeedbacklist: [
                { name: 'text1', text: 'Good Tasker' },
                { name: 'text2', text: 'Very talented' },
            ],

            taskgiverfeedbacklist: [
                { name: 'text3', text: 'His task was good' },
                { name: 'text4', text: 'Loved to work with him' },
            ],

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
        //            this.$axios.get('/getTask/' + this.data.id)
        //                     .then(res => {
        //                         this.bidsData = res.data.data
        //                     })
        //         }, 0)
        //     })
        //     Echo.channel('counter-channel')
        //     .listen('CounterEvent', (e) => {
        //         setTimeout(() => {
        //            this.$axios.get('/getTask/' + this.data.id)
        //                     .then(res => {
        //                         this.bidsData = res.data.data
        //                     })
        //         }, 0)
        //     })
        // Echo.channel('agree-channel')
        //     .listen('AgreeEvent', (e) => {
        //         setTimeout(() => {
        //             this.$axios.get('/getTask/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('disagree-channel')
        //     .listen('DisagreeEvent', (e) => {
        //         setTimeout(() => {
        //             this.$axios.get('/getTask/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        //     Echo.channel('accept-channel')
        //     .listen('AcceptEvent', (e) => {
        //         setTimeout(() => {
        //             this.$axios.get('/getTask/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('completed-channel')
        //     .listen('CompletedEvent', (e) => {
        //         setTimeout(() => {
        //               this.$axios.get('/getTask/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })
        //      Echo.channel('pay-channel')
        //     .listen('PayEvent', (e) => {
        //         setTimeout(() => {
        //              this.$axios.get('/getTask/' + this.data.id)
        //                 .then(res => {
        //                     this.bidsData = res.data.data
        //                 })
        //         }, 0)
        //     })

    },
    mounted() {
        EventBus.$on('bidOfferTask', (data) => {
            this.bidsData = data.data
            this.$scrollTo(element2, 1000, options)
        })

    },
    methods: {
        getPhoto(pic) {
            return pic;
        },
        paymentModal(i, name) {
            this.popupPayment = true;
            return (this.title = "Select payment method", this.activePay = i)
        },
        paymentActiveContent: function(i) {
            return this.activePay === i
        },
        morefeedback(e) {
            this.taskgiverchoosenfeedback.push(e.target.value)
        },
        taskerFeedback(e) {
            this.taskerchoosenfeedback.push(e.target.value)
        },
        taskGiverFeedbackModal(i, name, pmethod) {
            this.popupPayment = true
            this.paymentbox = false
            this.title = ('Give rating and feedback to ').concat(name)
            this.paymentMethod = pmethod
            this.ratingnreview = true
        },

        submit(id) {
            this.username = this.$route.params.slug
            this.isLoading = true
            this.$axios.patch(`bid/${id}`, { co: this.counter_offer })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/task/' + this.username)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0)
                    this.isLoading = false
                })

        },
        agree(id) {
            this.isLoading = true
            this.$axios.patch(`bid/${id}`, { agree: this.counter_offer_accepted })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getTask/' + this.data.slug)
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
                        this.$axios.get('/getTask/' + this.data.slug)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0);

                    this.isLoading = false
                })
        },
        accept(id) {
            this.isLoading = true
            this.$axios.patch(`bid/${id}`, {
                    accepted: this.bid_accepted,
                    total_bids: this.result,
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getTask/' + this.data.slug)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0)
                    this.isLoading = false

                })

        },
        taskCompleted(id) {
            this.isLoading = true
            this.$axios.patch(`bid/${id}`, { completed: this.completed })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getTask/' + this.data.slug)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    }, 0)

                    this.isLoading = false
                })
        },
        byCash(id, name) {
            this.isPayment = true
            this.paymentbox = false
            this.$axios.patch(`bid/${id}`, {
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
            this.$axios.patch(`bid/${id}`, {
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


        review(id, taskgiverid) {
            this.popupPayment = false
            this.isLoading = true
            this.$axios.patch(`bid/${id}`, {
                    rating: this.taskerrating,
                    review: this.taskgiverchoosenfeedback,
                    taskgiverId: taskgiverid,
                    feedbackgot: this.feedbackgot,
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getTask/' + this.data.slug)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    })
                    this.isLoading = false
                })
        },
        taskerFeedbackModal(i, name) {
            this.popupTaskerModal = true;
            return (this.title = ('Give rating and feedback to ').concat(name), this.taskerActive = i)

        },
        taskerActiveModal: function(i) {
            return this.taskerActive === i
        },

        taskerReview(id, taskerid) {
            this.popupTaskerModal = false
            this.isLoading = true
            this.$axios.post('taskgiverfeedback', {
                    bidderId: taskerid,
                    taskgiverId: this.data.user_id,
                    taskId: this.data.id,
                    bidId: id,
                    rating: this.taskgiverrating,
                    review: this.taskerchoosenfeedback
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('/getTask/' + this.data.slug)
                            .then(res => {
                                this.bidsData = res.data.data
                            })
                    })
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

        // reviewModal(i, name) {
        //     this.paynReview = true;
        //     return (this.title = ('Give rating and feedback to ').concat(name),
        //         this.active = i)
        // },
        // taskOwnerReviewModal(i, name) {
        //     this.taskOwnerReviewModalActive = true;
        //     return (this.ownerTitle = ('Give rating and feedback to ').concat(name), this.activeReview = i)
        // },
        // taskOwnerReviewRecord: function(i) {
        //     return this.activeReview === i
        // },
        reviewModalRecord: function(i) {
            return this.active === i
        },
        modalActiveContent: function(i) {
            return this.active === i
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


        // taskWorkerFeedback(id, userid) {
        //     this.taskOwnerReviewModalActive = false
        //     this.isLoading = true
        //     this.$axios.post('taskfeedback', {
        //             userId: userid,
        //             ownerId: this.data.user_id,
        //             taskId: this.data.id,
        //             bidId: id,
        //             rating: this.rating,
        //             review: this.review,

        //         })
        //         .then((res) => {
        //             setTimeout(() => {
        //                 this.$axios.get('/getTask/' + this.data.id)
        //                     .then(res => {
        //                         this.bidsData = res.data.data
        //                     })
        //             }, 0);

        //             this.isLoading = false
        //         })
        // },


        // pay(id) {
        //     this.isLoading = true
        //     this.$axios.patch(`bid/${id}`, {
        //             rating: this.rating,
        //             review: this.review,
        //             pay: this.paid
        //         })
        //         .then((res) => {
        //             this.paynReview = false;
        //             setTimeout(() => {
        //                 this.$axios.get('/getTask/' + this.data.id)
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
.offeringbids {
    max-width: 1304px;
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
}

.fa-close:hover {
    color: #0984E3;
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

.rating {
    width: 100%;
    display: inline-flex;
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

.ab {
    margin-top: -16px;
}

.cd {
    margin-top: -3px;
}

.header {
    width: 100%;
    background: #fff;
    border: 1px solid #e0e0e0;
    height: 50px;
    color: #444;
    box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.04);
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

.taskamount {
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