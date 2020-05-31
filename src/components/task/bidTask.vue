<template>
    <div style="margin-top:-35px">
        <div class="columns vld-parent">
            <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="false"></loading>
            <div class="column">
                <div v-for="(ubid,index) in content" :key="index">
                    <div v-if="ubid.user_id==id">
                        <div class=" header">
                            <div class="post">
                                <div class="post-content">
                                    <div class="header-title">Your Bid</div>
                                </div>
                            </div>
                        </div>
                        <div class="full-topic" style="margin:-1px 0;padding-bottom:0px " v-if="ubid.task_id==form.task_id">
                            <div class="post">
                                <div class="post-meta">
                                    <div class="post-owner" style="margin-top:-30px">
                                        <img class="avatar" :src="'/images/' + ubid.photo">
                                    </div>
                                </div>
                                <div class="post-content" style="margin-top:-25px ;">
                                    <div class="columns">
                                        <div class="column is-4">
                                            <a style="color: rgb(3, 155, 229);font-weight: 500;font-size: 16px;">{{ubid.bidder_name}}</a>
                                            <!-- <span class="rating">
                                                <star-rating :show-rating=false :star-size="14" :read-only="true" :increment="0.1" :rating="ubid.rating"></star-rating>
                                                <small class="rate">{{ubid.rating}}</small>
                                            </span> -->
                                        </div>
                                        <div class="column">
                                            <span style="font-weight: 500;">{{ubid.posted}} Task posted</span>
                                        </div>
                                        <div class="column">
                                            <span style="font-weight: 500;">{{ubid.completed}} Task completed</span>
                                        </div>
                                        <div class="column is-2" style="font-size: 16px;font-weight: 500;">
                                            <span style="font-weight:500">Amount(BDT)</span>
                                            <span style="color:#00B289">{{ubid.amount}}</span>
                                        </div>
                                    </div>
                                    <div class="columns" style="margin-top: -20px;">
                                        <div class="column is-4">
                                            <span style="font-weight:500;">Short message:</span>
                                            <span>{{ubid.cover_letter}}</span>
                                        </div>
                                        <div class="column is-4" style="" v-if="ubid.co>0">
                                            <span style="font-weight:500;">Counter Offer:</span>
                                            <span>{{ubid.co}}</span>
                                            <span>
                                                <span class="button is-small" style=" background-color: #00b289; color:#fff" v-if="ubid.agree==1">Agreed</span>
                                                <vs-button color="success" type="filled" v-if="ubid.agree==0" @click="agree(ubid.id)">Agree</vs-button>
                                                <vs-button color="danger" type="filled" v-if="ubid.agree==0" @click="disagree(ubid.id)">Disagree</vs-button>
                                            </span>
                                        </div>
                                        <div class="column is-3 is-offset-2">
                                            <div v-if="ubid.pay==1 && ubid.complete==1 && ubid.accepted==1" style="text-align:center;">
                                                <div style="margin-bottom: 10px;">
                                                    <span class="completed">Task completed</span>
                                                </div>
                                                <a @click="taskOwnerReviewModal(index)" v-if="ubid.feedback_given==0" class="button btn-dash info-btn btn-dash is-raised rounded ripple  btn-fade" style="margin-left: 37px;">Give feedback</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content" style="padding:0!important" v-show="comment">
                    <h2 class="responsive-title has-text-centered mt-10">Respond this task
                        with these information</h2>
                    <div class="flex-card light-bordered hover-inset">
                        <div class="card-body">
                            <div class="c">
                                <div class="columns">
                                    <div class="column is-half">
                                        <div class="field">
                                            <label class="label">Short Message</label>
                                            <div class="control">
                                                <textarea class="textarea is-grow" rows="5" placeholder="write not more than 100 charecter" v-validate="'required|max:100'" data-vv-as="field" :class="{'input': true, 'is-danger': errors.has('short message') }" name="short message" v-model="form.cover_letter"></textarea>
                                                <span v-show="errors.has('short message')" class="help is-danger">{{ errors.first('short message') }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns mt-10">
                                    <div class="column is-half">
                                        <div class="field">
                                            <label class="label">Bid Amount</label>
                                            <div class="control">
                                                <input type="number" name="amount" v-model="form.amount" placeholder="put bid amount only if you want to negotiate or else leave it blank" class="input is-small is-primary-focus">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="has-text-center">
                                    <button @click="submit" class="button btn-align info-btn raised">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="(bidd,index) in bidsData.bids" :key="index" v-if="reviewModalRecord(index)">
            <vs-popup class="holamundo" :title=title :active.sync="ratenReview">
                <div class="columns">
                    <div class="column is-4">
                        <label class="label">Rating</label>
                        <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="rating" style="float:left"> </star-rating>
                    </div>
                    <div class="column is-8">
                        <textarea class="textarea is-primary-focus" v-model="review" rows="5" placeholder="Review about the Rider ..."></textarea>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <vs-button @click="taskReview(bidd.id,bidd.user_id)" color="primary" style="float:right" type="filled">Pay</vs-button>
                    </div>
                </div>
            </vs-popup>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import StarRating from 'vue-star-rating'
//    import VeeValidate from 'vee-validate';
// Vue.use(VeeValidate);
// import VueSweetalert2 from 'vue-sweetalert2';
//     import Swal from 'sweetalert2';
//     Vue.use(VueSweetalert2);

export default {
    components: { StarRating },
    props: ['data'],


    data() {
        return {
            active: 0,
            bidsData: this.data,
            title: 'Give rating and feedback to '.concat(this.data.user),
            ratenReview: false,
            rating: 0,
            review: '',
            isLoading: false,
            content: this.data.bids,
            bidid: '',
            id: User.id(),
            bids: '',
            complete: 1,
            comment: true,
            counter_offer_accepted: 1,
            counter_offer_decline: 2,
            form: {
                cover_letter: '',
                amount: '',
                task_id: this.data.id,

            }
        }

    },
    mounted() {
        // EventBus.$on('newBid', (data) => {
        //     this.content.unshift(data)
        //     this.comment = false
        // })

        // Echo.channel('counter-channel')
        //     .listen('CounteEvent', (e) => {
        //         setTimeout(() => {
        //             axios.get('/api/bid/' + this.bidid)
        //                 .then(res => {
        //                     this.content = res.data
        //                 })
        //         }, 0)
        //     })


    },
    created() {
        for (let i = 0; i < this.data.bids.length; i++) {
            if (this.data.bids[i].user_id == this.id) {
                this.bidid = this.data.bids[i].id
                this.comment = false
            }
        }
        this.$axios.get(`user/${this.id}`)
            .then(res => this.bids = res.data.data)
            .catch(error => console.log(error.res))

        // Echo.channel('counter-channel')
        //     .listen('CounteEvent', (e) => {
        //         setTimeout(() => {
        //             axios.get('/api/bid/' + this.bidid)
        //                 .then(res => {
        //                     this.content = res.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('bid-channel')
        //     .listen('BidEvent', (e) => {
        //         this.bidid = e.id
        //     })
        // Echo.channel('accept-channel')
        //     .listen('AcceptEvent', (e) => {
        //         setTimeout(() => {
        //             axios.get('/api/bid/' + this.bidid)
        //                 .then(res => {
        //                     this.content = res.data
        //                 })
        //         }, 0)
        //     })
        // Echo.channel('pay-channel')
        //     .listen('PayEvent', (e) => {
        //         setTimeout(() => {
        //             axios.get('/api/bid/' + this.bidid)
        //                 .then(res => {
        //                     this.content = res.data
        //                 })
        //         }, 0)
        //     })

    },
    methods: {
        agree(id) {
            this.isLoading = true
            this.$axios.patch(`/bid/${id}`, { agree: this.counter_offer_accepted })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('bid/' + this.bidid)
                            .then(res => {
                                this.content = res.data
                            })
                    }, 0);

                    this.isLoading = false
                })
        },
        disagree(id) {
            this.isLoading = true
            this.$axios.patch(`bid/${id}`, { disagree: this.counter_offer_decline })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('bid/' + this.bidid)
                            .then(res => {
                                this.content = res.data
                            })
                    }, 0);

                    this.isLoading = false
                })


        },
        taskOwnerReviewModal(i) {
            this.ratenReview = !this.ratenReview;
            return this.active = i;

        },
        reviewModalRecord: function(i) {
            return this.active === i
        },
        submit() {
            if (this.$validator.validateAll()) {
                this.isLoading = true
                this.$axios.post('bid', this.form)
                    .then((res) => {
                        EventBus.$emit('newBid', res.data.bid)
                        this.isLoading = false
                    })
                    .catch(error => {
                        this.isLoading = false
                    })
            }
        },
        taskcomplete(id) {
            this.isLoading = true
            this.$axios.patch(`bid/${id}`, { complete: this.complete })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('bid/' + this.bidid)
                            .then(res => {

                                this.content = res.data
                            })
                    }, 0);

                    this.isLoading = false
                })
        },
        taskReview(id, userid) {
            this.ratenReview = false
            this.isLoading = true
            this.$axios.post('taskfeedback', {
                    userId: userid,
                    ownerId: this.data.user_id,
                    taskId: this.data.id,
                    bidId: id,
                    rating: this.rating,
                    review: this.review,
                })
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('bid/' + this.bidid)
                            .then(res => {
                                this.content = res.data
                            })
                    })
                    this.isLoading = false
                })
        }
    },
}
</script>
<style scoped>
.full-topic {
    box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.04)
}

.msg::after {
    content: '';
    width: 10px;
    height: 2px;
    border-bottom: 1px solid red;

}

.full-topic {
    width: 100%;
    background: #fff;
    border: 1px slid #e0e0e0;
    padding: 16px;
    border-radius: 4px;
}

.header {
    width: 100%;
    background: #fff;
    border: 1px solid #e0e0e0;
    height: 50px;
    color: #5CB4EB;
    box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.04)
}

.review {
    font-size: 14px;
    font-weight: 600;
    color: #00B289;
    border: 1px solid;
    padding: 5px;
    margin-left: 38px;
}

.ongoing {
    font-size: 16px;
    font-weight: 700;
    color: #00B289;
    border: 1px solid;
    padding: 7px;
    margin-left: 38px;
}

.completed {
    font-size: 14px;
    font-weight: 600;
    color: #00B289;
    border: 1px solid;
    padding: 5px;
    margin-left: 38px;
}

.header-title {
    font-size: 20px;
    margin: 10px;
    text-align: left;
}

.msg {
    font-size: 12px;
    font-weight: 500;
    color: grey;

}

.top-wrap {
    margin-top: -30px;
}

.rate {
    color: #fff;
    background-color: #4FC1EA;
    border-radius: 3px;
    display: inline-flex;
    font-size: 13px;
    padding: 0px 2px;
    height: 21px;
}

.rating {
    width: 100%;
    display: inline-flex;
}

.vs-button {
    padding: 7px;
}
</style>