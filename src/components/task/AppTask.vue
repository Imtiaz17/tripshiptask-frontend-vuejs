<template>
    <div style="padding-top:20px;">
        <div class="columns">
            <div class="column is-4" style="padding:4px">
                <vs-card style="box-shadow:0 2px 3px 1px rgba(0,0,0,0.04)">
                    <div slot="header" class="searchheader">
                        <h3 style="font-weight: 500;">
                            Task
                        </h3>
                    </div>
                </vs-card>
                <img src="../../assets/images/task.png" width="100%">
                <vs-tabs>
                    <vs-tab label="Offer a job" @click="offer">
                        <offer-task :category="categories"></offer-task>
                    </vs-tab>
                    <vs-tab label="Want a job" @click="seek">
                        <seek-task :category="categories"></seek-task>
                    </vs-tab>
                </vs-tabs>
            </div>
            <div class="column is-8" style="padding:4px">
                <vs-row vs-justify="center">
                    <vs-col type="flex" vs-justify="center" vs-align="left" vs-w="12">
                        <vs-card style="box-shadow:0 2px 3px 1px rgba(0,0,0,0.04)">
                            <div slot="header" class="searchheader">
                                <h3 style="font-weight: 500;">
                                    Search Task
                                </h3>
                            </div>
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
                        </vs-card>
                    </vs-col>
                </vs-row>
                <template v-if="offertask">
                    <div slot="header" class="searchheader">
                        <h3 style="font-weight: 500;">
                            Offer a Task
                        </h3>
                    </div>
                    <table class="table is-accent fixed_header ">
                        <thead>
                            <tr>
                                <th width="25%" style="text-align:left">Title</th>
                                <th width="25%" style="text-align:left">Location</th>
                                <th width="25%" style="text-align:left">Date & time</th>
                                <th width="15%" style="text-align:left">Amount</th>
                                <th width="10%" style="text-align:left">Bids</th>
                                <th width="10%" style="text-align:left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <div v-if="isTLoading" style="margin-top:-45px;">
                                <img class="loading" src="../../assets/images/roaling.gif">
                            </div>
                            <div v-else>
                                <tr v-for="(item,index) in getOfferedTask" :key="index">
                                    <td data-th="Title" width="25%" style="text-align:left">
                                        {{item.title}}
                                    </td>
                                    <td data-th="Location" width="25%" style="text-align:left">
                                        {{item.location.split(',')[0]}}
                                    </td>
                                    <td data-th="Date & time" width="25%" style="text-align:left">
                                        {{moment(item.date_time).format('lll')}}
                                    </td>
                                    <td data-th="Amount" width="15%" style="text-align:left">
                                        {{item.amount}}
                                    </td>
                                    <td data-th="Bids" width="10%" style="text-align:left">
                                        {{item.bids_count}}
                                    </td>
                                    <td data-th="Action" width="10%" style="text-align:left">
                                        <router-link :to="item.path">
                                            <button class="button is-small btn-align accent-btn raised rounded btn-outlined">view</button>
                                        </router-link>
                                    </td>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </template>
                <template v-if="seektask">
                    <div slot="header" class="searchheader">
                        <h3 style="font-weight: 500;">
                            Seeking a Task
                        </h3>
                    </div>
                    <table class="table is-accent fixed_header ">
                        <thead>
                            <tr>
                                <th width="25%" style="text-align:left">Title</th>
                                <th width="25%" style="text-align:left">Location</th>
                                <th width="25%" style="text-align:left">Date & time</th>
                                <th width="15%" style="text-align:left">Amount</th>
                                <th width="10%" style="text-align:left">Bids</th>
                                <th width="10%" style="text-align:left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <div v-if="isLoading" style="margin-top:-45px;">
                                <img class="loading" :src="getPhoto()">
                            </div>
                            <div v-else>
                                <tr v-for="(item,index) in getSeekedTask" :key="index">
                                   <td data-th="Title" width="25%" style="text-align:left">
                                        {{item.title}}
                                    </td>
                                    <td data-th="Location" width="25%" style="text-align:left">
                                        {{item.location.split(',')[0]}}
                                    </td>
                                     <td data-th="Date & time" width="25%" style="text-align:left">
                                        {{moment(item.date_time).format('lll')}}
                                    </td>
                                    <td data-th="Amount" width="15%" style="text-align:left">
                                        {{item.amount}}
                                    </td>
                                    <td data-th="Bids" width="10%" style="text-align:left">
                                        {{item.bids_count}}
                                    </td>
                                    <td data-th="Action" width="10%" style="text-align:left">
                                        <router-link :to="item.path">
                                            <button class="button is-small btn-align accent-btn raised rounded btn-outlined">view</button>
                                        </router-link>
                                    </td>
                                </tr>
                            </div>
                        </tbody>
                    </table>
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
        OfferTask: () => import('@/components/task/OfferTask'),
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
            categoysearch:null,
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
        if (this.$store.getters.offerTaskListing.length == 0) {
            this.getOfferTaskLiting();
        }

        if (this.$store.getters.seekTaskListing.length == 0) {
            this.getSeekTaskLiting();
        }
        if (this.$store.getters.categories.length == 0) {
            this.getCategories();
        }
        // axios.get('api/skill')
        //     .then(res => {
        //         this.skills = res.data.data;
        //     })
        //    .catch(error => console.log(error.res.data), )
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
.taskheader {
    font-size: 22px;
    text-align: center;
    margin-bottom: -31px;

}

.loading {
    height: auto;
    max-width: 50%;
    margin: auto;
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.span {
    margin-right: -7px;
}


.table th.gap {
    width: 20%
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

.searchheader {
    text-align: center;
    padding: 7px !important;
    font-size: 18px;
    color: #2d3436;
    background-color: #4adad3b5;
}



</style>
