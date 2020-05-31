<template>
    <section>
        <div class="content  vld-parent">
            <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
            <div id="main-dashboard" class="conbox">
                <div id="main-dashboard">
                    <div id="social-layout" class="dashboard-columns">
                        <div class="columns">
                            <div class="column is-8" style="padding-right:0px">
                                <div v-if="tasked">
                                    <edit-task :data="data"></edit-task>
                                </div>
                                <div v-else>
                                    <div class="flex-card featured-feed-post light-bordered light-raised" style="min-height:100px; max-height:380px">
                                        <div class="c-body">
                                            <div class="columns" style="margin-top:30px">
                                                <div class="column is-8" style="margin-top:-27px">
                                                    <span class="taskid">
                                                        Task id: {{data.task_id}}
                                                    </span>
                                                    <h4 class="tasktitle">
                                                        {{data.title}}
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
                                                    <h5>Task Details</h5>
                                                    <div class="divider"></div>
                                                    <p style="font-size: 15px;line-height: 23px;">
                                                        {{data.details}}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="post-activity">
                                                <div class="columns tactivity  is-mobile">
                                                    <div class="left column" v-if="data.person_need !== null">
                                                        <section class="section" style="padding: 0rem;">
                                                            <h5>Task
                                                                Preffered</h5>
                                                            <div class="divider"></div>
                                                        </section>
                                                        <div class="field" style="display:inline-flex">
                                                            <label class="label">Person Need:</label>
                                                            <div class="control" style="margin-left:5px;margin-top:-2px;">
                                                                <label>{{data.person_need}}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="left column">
                                                        <h5>Task
                                                            Activity</h5>
                                                        <div class="divider"></div>
                                                        <div class="field" style="display:inline-flex">
                                                            <label class="label">Total Bids:</label>
                                                            <div class="control" style="margin-left:5px;margin-top:-2px;">
                                                                <label>{{data.bids_count}}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="right column is-3" v-if="task_owner">
                                                        <vs-button type="filled" @click="editTask">Edit</vs-button>
                                                        <vs-button color="danger" type="filled" @click="deleteTask(data.slug)">Delete</vs-button>
                                                    </div>
                                                    <div class="column is-3" v-else-if="data.post_type=='offer'" v-show="canBid">
                                                        <a @click="bidoffertask" class="button btn-dash info-btn btn-dash is-raised rounded ripple  btn-fade right"><span class="material-icons">
                                                                add_alert
                                                            </span> Bid</a>
                                                    </div>
                                                    <div class="column is-3" v-else-if="data.post_type=='seek'" v-show="canBid">
                                                        <a @click="bidseektask" class="button btn-dash info-btn btn-dash is-raised rounded ripple  btn-fade"><span class="material-icons right">
                                                                add_alert
                                                            </span> Bid</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="margin-top:-12px">
                                         <gmap-map
                                            :center="data.lat_lng"
                                            :zoom="16"
                                            ref="map"
                                            style="width: 100%; min-height:240px"
                                            >
                                            <gmap-marker
                                            :position="data.lat_lng"
                                            ></gmap-marker>
                                        </gmap-map>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-4">
                                <div class="flex-card light-bordered light-raised task-info">
                                    <h3 class="card-heading is-bordered">Task information</h3>
                                    <article class="media recent-post">
                                        <div class="media-left is-hidden-mobile">
                                            <figure class="image is-32x32" style="padding-top: 5px;">
                                                <span class="material-icons">
                                                    nature_people
                                                </span>
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <p class="post-title">Skills Required:</p>
                                            <div v-for="skill,index in data.skills" :key="index">
                                                <vs-chip>
                                                    {{skill}}
                                                </vs-chip>
                                            </div>
                                        </div>
                                    </article>
                                    <article class="media recent-post">
                                        <div class="media-left is-hidden-mobile">
                                            <figure class="image is-32x32" style="padding-top: 5px;">
                                                <span class="material-icons">
                                                    my_location
                                                </span>
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <p class="post-title">Task Location</p>
                                            <p class="post-info">{{data.location}}</p>
                                        </div>
                                    </article>
                                    <article class="media recent-post">
                                        <div class="media-left is-hidden-mobile">
                                            <figure class="image is-32x32" style="padding-top: 5px;">
                                                <span class="material-icons">money</span>
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <p class="post-title">Offered Amount</p>
                                            <span class="amount">{{data.amount}}</span>
                                        </div>
                                    </article>
                                    <article class="media recent-post">
                                        <div class="media-left is-hidden-mobile">
                                            <figure class="image is-32x32" style="padding-top: 5px;">
                                                <span class="material-icons">calendar_today</span>
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <div>
                                                <p class="post-title">Task Date & Time</p>
                                                <div class="post-timestamp"></div>
                                                <div class="post-read-more">
                                                    {{moment(data.date_time).format("MMMM Do YYYY,h:mm:ss a")}}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div class="flex-card light-bordered light-raised task-poster-info">
                                    <h3 class="card-heading is-bordered">Task poster's information</h3>
                                    <article class="media recent-post">
                                        <div class="media-left is-hidden-mobile">
                                            <figure class="image is-32x32">
                                                <span class="material-icons">star_border</span>
                                            </figure>
                                        </div>
                                        <div class="media-content" @click="taskPosterRating" style="cursor: pointer;">
                                            <span class="rating">
                                                <star-rating :show-rating=false :star-size="16" :read-only="true" :increment="0.1" :rating="data.task_poster_rating"></star-rating>
                                                <span class="rate">{{data.task_poster_rating}}</span>
                                            </span>
                                        </div>
                                    </article>
                                    <article class="media recent-post">
                                        <div class="media-left is-hidden-mobile">
                                            <figure class="image is-32x32">
                                                <span class="material-icons">
                                                    note_add
                                                </span>
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <h5 class="post-title"> {{data.total_task}} Task posted</h5>
                                        </div>
                                    </article>
                                    <article class="media recent-post">
                                        <div class="media-left is-hidden-mobile">
                                            <figure class="image is-32x32">
                                                <img src="https://img.icons8.com/material/48/000000/facebook-new.png" />
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <div>
                                                <div class="post-share">
                                                    <a :href="fb" target="_blank">
                                                        {{fb}}
                                                    </a>
                                                </div>
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
                                            <div style="display:inline-flex">
                                                <h5 class="post-title">Member since</h5>
                                                <div class="post-read-more" style="    margin-left: 5px;margin-top: -2px;">{{data.user_created}}</div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                    <offering-bids v-if="data.post_type=='offer'" :data="content"></offering-bids>
                    <seeking-bids v-else-if="data.post_type=='seek'" :data="content"></seeking-bids>
                    <!-- <bid-task v-else :data="data"></bid-task> -->
                </div>
            </div>
        </div>
        <!-- Bid for seek task -->
        <vs-popup class="holamundo" title="Bid for this Task" :active.sync="bid">
            <div class="columns">
                <div class="column is-three-quarters">
                    <div class="field">
                        <label class="label">Short Message</label>
                        <div class="control">
                            <textarea class="textarea is-primary-focus" rows="5" v-model="form.cover_letter"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column is-half">
                    <div class="field">
                        <label class="label">Bid Amount</label>
                        <div class="control">
                            <input type="number" style="font-weight: 500;" v-model="form.amount" name="amount" class="input is-primary-focus" placeholder="amount">
                        </div>
                        <span style="color:rgb(154, 152, 152);font-weight:400">Put bid amount only if you want to negotiate or else leave it blank</span>
                    </div>
                </div>
            </div>
            <div class="has-text-right">
                <button @click="submit" class="button btn-align info-btn raised">
                    Submit
                </button>
            </div>
        </vs-popup>
        <!-- Bid for offer task -->
        <vs-popup class="holamundo" title="Bid for this Task" :active.sync="offerbid">
            <div class="columns">
                <div class="column is-three-quarters">
                    <div class="field">
                        <label class="label">Short Message</label>
                        <div class="control">
                            <textarea class="textarea is-primary-focus" rows="5" v-model="form.cover_letter"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column is-half">
                    <div class="field">
                        <label class="label">Bid Amount</label>
                        <div class="control">
                            <input type="number" style="font-weight: 500;" v-model="form.amount" name="amount" class="input is-primary-focus" placeholder="amount">
                        </div>
                        <span style="color:rgb(154, 152, 152);font-weight:400">Put bid amount only if you want to negotiate or else leave it blank</span>
                    </div>
                </div>
            </div>
            <div class="has-text-center">
                <button @click="bidsubmit" class="button btn-align info-btn raised">
                    Submit
                </button>
            </div>
        </vs-popup>
        <vs-sidebar position-right parent="body" default-index="1" color="primary" class="sidebarx" spacer v-model="feedbackShow">
            <div class="header-sidebar" slot="header">
                <vs-avatar size="70px" :src="'/images/' + data.owner_photo" style="float:left" />
                <div class="con-colors" style="overflow:hidden">
                    <ul style="padding-left:10px">
                        <li style="font-size: 21px;color: rgb(36, 33, 69);font-weight:700">
                            <h4>
                                {{data.user}}
                            </h4>
                            <i @click="removeModal" class="material-icons" style="float:right;margin-top:-28px;    cursor: pointer;">clear</i>
                        </li>
                        <li>
                            <span class="rating">
                                <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="data.task_poster_rating" style="float:left"> </star-rating>
                                <small class="rate">{{data.task_poster_rating}}</small>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <posted-task-feedback :data="data.task_poster_feedback"></posted-task-feedback>
        </vs-sidebar>
    </section>
</template>
<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCdu3RozRNnds9nOhMTPs-ETTWLlV1C-EE',
        libraries: 'places',
    },
});

import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
import moment from 'moment-timezone'
Vue.use(VueSweetalert2);
import StarRating from 'vue-star-rating'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    components: {
        bidTask: () => import('@/components/task/bidTask'),
        offeringBids: () => import('@/components/task/OfferingBids'),
        seekingBids: () => import('@/components/task/SeekingBids'),
        editTask: () => import('@/components/task/EditTask'),
        postedTaskFeedback: () => import('@/components/task/PostedTaskFeedback'),
        StarRating,
        Loading
    },
    props: ['data'],
    data() {
        return {
            isLoading: false,
            canBid: true,
            feedbackShow: false,
            content: this.data,
            moment: moment,
            slug: this.$route.params.slug,
            title: this.data.title,
            description: this.data.details,
            bidsuserid: '',
            tasked: false,
            bid: false,
            offerbid: false,
            fb: this.data.facebook,
            task_archive: 1,
            task_undo: 0,
            cover_letter: '',
            amount: '',
            result: '',
            form: {
                cover_letter: '',
                amount: '',
                task_id: this.data.id,

            }

        }

    },
    computed: {
        authId() {
            return this.$store.getters.id
        },
        task_owner() {
            return this.$store.getters.id == this.data.user_id
        },
    },
    created() {
        for (let i = 0; i < this.data.bids.length; i++) {
            if (this.data.bids[i].user_id == this.authId) {
                this.bidsuserid = this.data.bids[i].user_id
                this.canBid = false
            }
        }

    },

    mounted() {
        // if (this.data.location) {
        //     this.$refs.xyz.$mapPromise.then(() => {
        //         this.geocoder = new google.maps.Geocoder()
        //         this.infowindow = new google.maps.InfoWindow()
        //         var vm = this
        //         var marker = new google.maps.Marker({
        //             map: this.$refs.xyz.$mapObject,
        //             position: new google.maps.LatLng(23.746466, 90.376015),
        //             draggable: false
        //         })
        //         vm.geocoder.geocode({ 'latLng': marker.getPosition() }, function(results, status) {
        //             if (status == google.maps.GeocoderStatus.OK) {
        //                 if (results[0]) {
        //                     vm.data.location = results[0].formatted_address;

        //                 }
        //             }
        //         });

        //     })
        // }

        //   this.$refs.xyz.$mapPromise.then(() => {
        //     this.directionsService = new google.maps.DirectionsService()
        //     this.directionsDisplay = new google.maps.DirectionsRenderer()
        //     this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
        // })

        EventBus.$on('cancelTask', () => {
            this.tasked = false
        })

    },

    methods: {
        updateSlug() {
            this.username = this.$route.params.slug
            this.$axios.get('task/' + this.username)
                .then(res => {
                    this.content = res.data.data
                })
                .catch(error => console.log(error.response.data))
        },
        bidseektask() {
            this.bid = true;

        },
        bidoffertask() {
            this.offerbid = true;
        },
        removeModal() {
            this.feedbackShow = !this.feedbackShow
        },
        taskPosterRating() {
            this.feedbackShow = true;
        },
        editTask() {
            this.tasked = true;
        },
        submit() {
            if (this.$validator.validateAll()) {
                this.bid = false
                this.isLoading = true
                this.$axios.post('bid', this.form)
                    .then((res) => {
                        this.canBid = false
                        setTimeout(() => {
                            this.$axios.get('getTask/' + this.slug)
                                .then(res => {
                                    this.isLoading = false
                                    EventBus.$emit('bidForSeekTask', res.data)
                                })
                        }, 0)
                    })
                    .catch(error => {
                        this.isLoading = false
                        console.log(error.res.data)
                    })
            }
        },
        bidsubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.offerbid = false;
                    this.isLoading = true
                    this.$axios.post('bid', this.form)
                        .then((res) => {
                            this.canBid = false
                            setTimeout(() => {
                                this.$axios.get('/getTask/' + this.slug)
                                    .then(res => {
                                        this.isLoading = false
                                        EventBus.$emit('bidOfferTask', res.data)
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
        deleteTask(slug) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.axios.delete(`task/${this.data.slug}`)
                    Swal.fire(
                        'Deleted!',
                        'Your task has been deleted.',
                        'success'
                    )
                    this.$router.push('/home')
                } else(

                    result.dismiss === Swal.DismissReason.cancel
                )

            })


        },
    },
    watch: {
        $route: 'updateSlug',
        immediate: true

    }
}
</script>
<style scoped>
.flex-card .card-body {
    padding: 0px 0px;
}

.skills {
    margin-left: -13px;
}

.responsive-title {
    padding: 9px 9px;
}

.rate {
    color: #fff;
    background-color: #4FC1EA;
    border-radius: 4px;
    display: inline-flex;
    font-size: 13px;
    padding: 0px 3px;
    height: 21px;
}

.rating {
    width: 100%;
    display: inline-flex;
}

.featured-feed-post .post-body {
    padding: 0em 1em !important;
}


a {
    color: #878787;
}

.content {
    padding: 20px 0px 0px;
}

a:hover {
    color: #35B9EF;
}

.fa {
    margin-top: 4px;
    font-size: 22px;
}

.tasktitle {
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 0;
    margin-left: 10px;
}

.card-heading {
    padding: 14px;
    border-bottom: 1px solid #e0e0e0;
}

.content h5 {
    font-size: 1.02rem;
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


.task-poster-info {
    min-height: 170px;
    margin-top: -20px;
}

.vs-button {
    padding: 8px 9px;
}

.content h2 {
    font-size: 1.55em;
    margin-bottom: 0.7714em;
}

.recent-post .post-title {
    margin-bottom: 0px !important;
    float: left;
    padding-right: 5px;
}

.right button {
    margin: 0px 5px;
}

.featured-feed-post .post-body {
    padding: 25px 0px;
}

.section-wrapper {
    margin: -28px -22px
}

.task-info {
    min-height: 185px;
}

.content li+li {
    margin-top: 0em !important;
    margin-left: .5em !important;
}

.amount {
    background-color: rgb(255, 71, 87);
    padding: 3px 6px;
    color: rgb(255, 255, 255);
    font-size: 14px;
}
</style>