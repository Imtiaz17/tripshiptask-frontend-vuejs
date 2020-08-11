<template>
    <div style="padding-top:10px;">
        <div class="columns">
            <div class="column is-4" style="padding:4px">
                <vs-tabs>
                    <vs-tab label="Offer a Task" @click="offer">
                        <offer-task :category="categories"></offer-task>
                    </vs-tab>
                    <vs-tab label="Want a Task" @click="seek">
                        <seek-task :category="categories"></seek-task>
                    </vs-tab>
                </vs-tabs>
            </div>
            <div class="column is-8" style="padding:4px">
                <div class="card search">
                    <div class="card-header active-header">
                        Search Tasks
                    </div>
                    <div class="card-content">
                        <div class="columns">
                            <div class="column">
                                <div class="control">
                                    <input class="input is-primary-focus" placeholder="keywords" type="text" v-model="keywords">
                                </div>
                            </div>
                            <div class="column">
                                <div class="control">
                                    <input class="input is-primary-focus " type="text" v-model="location" name="title" placeholder="Location">
                                </div>
                            </div>
                            <div class="column">
                                <div class="control">
                                    <div class="select">
                                        <select v-model="categoysearch">
                                            <option :value="null" disabled hidden>Select Category</option>
                                            <option v-for="(item,index) in categories" :key="index" :value="item.name">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="control">
                                    <date-picker v-model="searchdate" valueType="format" name="date" placeholder="Task date"></date-picker>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <template v-if="offertask">
                    <div class="card">
                        <div class="card-header active-header">
                            Offer a Task
                        </div>
                        <div class="card-content">
                            <div v-if="isTLoading">
                                <img class="loading" src="../../assets/images/roaling.gif">
                            </div>
                            <div v-else class="fixed_header">
                            <table class="table is-accent">
                                <thead>
                                    <tr>
                                        <th style="width:19%">Title</th>
                                        <th>Location</th>
                                        <th>Date & time</th>
                                        <th>Amount</th>
                                        <th>Bids</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in getOfferedTask" :key="index">
                                        <td>
                                            {{item.title}}
                                        </td>
                                        <td>
                                            {{item.location.split(',')[0]}}
                                        </td>
                                        <td>
                                            {{moment(item.date).format('ll')}}
                                            {{item.time}}
                                        </td>
                                        <td>
                                            {{item.amount}}
                                        </td>
                                        <td>
                                            {{item.bids_count}}
                                        </td>
                                        <td>
                                            <router-link :to="item.path">
                                                <button class="button is-small info-btn raised  btn-outlined">view</button>
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </template>
                <template v-if="seektask">
                    <div class="card">
                        <div class="card-header active-header">
                            Want a Task
                        </div>
                        <div class="card-content">
                            <div v-if="isTLoading">
                                <img class="loading" src="../../assets/images/roaling.gif">
                            </div>
                            <div v-else class="fixed_header">
                            <table class="table is-accent">
                                <thead>
                                    <tr>
                                        <th style="width:19%">Title</th>
                                        <th>Location</th>
                                        <th>Date & time</th>
                                        <th>Amount</th>
                                        <th>Bids</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in getSeekedTask" :key="index">
                                        <td>
                                            {{item.title}}
                                        </td>
                                        <td>
                                            {{item.location.split(',')[0]}}
                                        </td>
                                        <td>
                                            {{moment(item.date).format('ll')}}
                                            {{item.time}}
                                        </td>
                                        <td>
                                            {{item.amount}}
                                        </td>
                                        <td>
                                            {{item.bids_count}}
                                        </td>
                                        <td>
                                            <router-link :to="item.path">
                                                <button class="button is-small info-btn raised  btn-outlined">view</button>
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBsOMFpPA9V9dYG3noMdG3OEy88-gVjmk0',
        libraries: 'places',
    },
});
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import moment from 'moment-timezone'
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
import OfferTask from '@/components/task/OfferTask'
Vue.use(VueSweetalert2);
import { mapActions, mapGetters } from 'vuex';
const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    customClass: {
        container: 'container-class'
    }
});
export default {
    components: {
        OfferTask,
        SeekTask: () => import('@/components/task/SeekTask'),
        DatePicker
    },

    data() {
        return {
            moment: moment,
            firsrt: true,
            second: false,
            offertask: true,
            seektask: false,
            isLoading: false,
            keywords: '',
            location: '',
            categoysearch: null,
            skills: [],
            searchdate: '',
            moduleId: 3,
            searchby: '',
            searchBy: [
                'Date: Newest on top',
                'Date: Oldest on top',
                'Price: High to low',
                'Price: Low to high',
            ],
            config: {
                altInput: true,
                enableTime: false,
                dateFormat: "Y-m-d",
            },

        }
    },
    created() {

        this.getOfferTaskLiting();

        this.getSeekTaskLiting();

        
        // axios.get('api/skill')
        //     .then(res => {
        //         this.skills = res.data.data;
        //     })
        //    .catch(error => console.log(error.res.data), )
    },
    mounted() {
        EventBus.$on('updateOfferTask', () => {
            this.getOfferTaskLiting();
        })
        EventBus.$on('updateSeekTask', () => {
            this.getSeekTaskLiting();
        })
    },
    computed: {
        offertasks() {
            return this.$store.getters.offerTaskListing.data
        },

        seektasks() {
            return this.$store.getters.seekTaskListing.data
        },
        categories() {
            return this.$store.getters.categories
        },
        isTLoading() {
            return this.$store.getters.isTLoading
        },

        id() {
            return this.$store.getters.id
        },
        getOfferedTask() {
            return this.offertasks.filter(task => {
                if (this.categoysearch == null && this.searchdate == null) {
                    return task.location.toLowerCase().includes(this.location.toLowerCase()) &&
                        task.title.toLowerCase().includes(this.keywords.toLowerCase())
                } else if (this.categoysearch == null) {
                    return task.location.toLowerCase().includes(this.location.toLowerCase()) &&
                        task.title.toLowerCase().includes(this.keywords.toLowerCase()) &&
                        task.date.includes(this.searchdate)
                } else if (this.searchdate == null) {
                    return task.location.toLowerCase().includes(this.location.toLowerCase()) &&
                        task.title.toLowerCase().includes(this.keywords.toLowerCase()) &&
                        task.category.toLowerCase().includes(this.categoysearch.toLowerCase())
                } else {
                    return task.date.includes(this.searchdate) &&
                        task.title.toLowerCase().includes(this.keywords.toLowerCase()) &&
                        task.location.toLowerCase().includes(this.location.toLowerCase()) &&
                        task.category.toLowerCase().includes(this.categoysearch.toLowerCase())

                }

            })

        },
        getSeekedTask() {
            return this.seektasks.filter(task => {
                if (this.skill == null && this.searchdate == null) {
                    return task.location.toLowerCase().includes(this.location.toLowerCase()) &&
                        task.title.toLowerCase().includes(this.keywords.toLowerCase())
                } else if (this.skill == null) {
                    return task.location.toLowerCase().includes(this.location.toLowerCase()) &&
                        task.title.toLowerCase().includes(this.keywords.toLowerCase()) &&
                        task.date.includes(this.searchdate)
                } else if (this.searchdate == null) {
                    return task.location.toLowerCase().includes(this.location.toLowerCase()) &&
                        task.title.toLowerCase().includes(this.keywords.toLowerCase()) &&
                        task.skill.toLowerCase().includes(this.skill.toLowerCase())
                } else {
                    return task.date.includes(this.searchdate) &&
                        task.title.toLowerCase().includes(this.keywords.toLowerCase()) &&
                        task.location.toLowerCase().includes(this.location.toLowerCase()) &&
                        task.skill.toLowerCase().includes(this.skill.toLowerCase())

                }

            })

        },
    },
    // created() {
    //     this.getOfferTask()
    //     this.getSeekTask()

    // },
    methods: {
        ...mapActions("task",
            ['getOfferTaskLiting', 'getSeekTaskLiting', 'getCategories']),
        offer() {
            this.first = true
            this.second = false
            this.offertask = true
            this.seektask = false
        },
        seek() {
            this.first = false
            this.second = true
            this.offertask = false
            this.seektask = true
        },
        getOfferTask() {
            this.isLoading = true
            this.$axios.get('offertask?page=' + this.page)
                .then(response => {
                    this.isLoading = false
                    this.tasks = response.data.data
                    this.page += 1
                });
        },
        getSeekTask() {
            this.$axios.get('seektask?page=' + this.spage)
                .then(response => {
                    this.seektasks = response.data.data
                    this.isLoading = false
                    this.spage += 1

                });
        },
        task() {
            let photo = "images/task.png";
            return photo;
        },
        getPhoto() {
            let photo = "images/roaling.gif";
            return photo;
        },
        listen() {
            EventBus.$on('taskEdit', () => {
                this.tasked = true
            })
        },
        onChange() {
            this.isLoading = true
            this.$axios.get('task')
                .then(response => {
                    this.isLoading = false
                    this.tasks = response.data.data
                });
        },

    },
    watch: {
        location: function(val) {
            this.location = val
        },
        keywords: function(val) {
            this.keywords = val
        },
        skill: function(val) {
            this.skill = val
        },
        // searchby: function(val) {

        //     if (this.searchby == 'Date: Newest on top') {
        //         this.isLoading = true
        //         axios.get('api/sortbynewtask')
        //             .then(response => {
        //                 this.isLoading = false
        //                 this.tasks = response.data.data

        //             });

        //     } else if (this.searchby == 'Date: Oldest on top') {
        //         this.isLoading = true
        //         axios.get('api/sortbyoldtask')
        //             .then(response => {
        //                 this.isLoading = false
        //                 this.tasks = response.data.data

        //             });
        //     } else if (this.searchby == 'Price: High to low') {
        //         this.isLoading = true
        //         axios.get('api/sortbyhighprice')
        //             .then(response => {
        //                 this.isLoading = false
        //                 this.tasks = response.data.data

        //             });
        //     } else if (this.searchby == 'Price: Low to high') {
        //         this.isLoading = true
        //         axios.get('api/sortbylowprice')
        //             .then(response => {
        //                 this.isLoading = false
        //                 this.tasks = response.data.data

        //             });
        //     }
        // }



    },
}
</script>
<style scoped>
.card-header {
    padding: 10px;
    justify-content: center;
    display: block !important;
    text-align: center;
}

.card-content {
    background-color: transparent;
    padding: 0.5rem 0rem 0rem;
}

.button.button-cta {
    padding: 22px 40px !important
}

.button.button-cta.btn-outlined.is-bold {
    border-width: 2px;
    font-weight: 600
}


.header {
    text-align: center;
    padding: 7px !important;
    font-size: 18px;
    color: #2d3436;
    background-color: #4adad3b5;
}
</style>