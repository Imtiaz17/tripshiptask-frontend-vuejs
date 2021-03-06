<template>
    <section>
        <div class="columns">
            <div class="column is-12">
                <div class="control">
                    <float-label :dispatch="false" label="Select a category">
                        <div class="select">
                            <select name="category" v-model="form.category" v-validate="'required'">
                                <option v-for="(cat,index) in categories" :key="index" :value="cat.name">{{cat.name}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('category')" class="help is-danger">Category is required</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <div class="control">
                    <float-label label="Title of the task you are seeking">
                        <input type="text" class="input is-primary-focus" v-model="form.title" v-validate="'required'" name="title">
                    </float-label>
                    <span v-show="errors.has('title')" class="help is-danger">Seeking task title is required</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <div class="control">
                    <vs-chips color="rgb(145, 32, 159)" placeholder="Skills I have" v-model="form.chips">
                        <vs-chip :key="chip" @click="remove(chip)" v-for="chip in form.selectedskill" closable>
                            {{ chip }}
                        </vs-chip>
                        <div class="choose-skill" @click="openSkill"><i class="vs-icon notranslate icon-scale material-icons null">add</i></div>
                    </vs-chips>
                    <span v-show="errors.has('skill')" class="help is-danger">Skillset is required</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-6">
                <div class="control">
                    <float-label label="Date of the task" :fixed="form.date==null?false:true">
                        <a-date-picker v-model="form.date" valueFormat="YYYY-MM-DD" placeholder="" :disabled-date="disabledDate" />
                    </float-label>
                    <span v-show="errors.has('date')" class="help is-danger">Task date is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label label="Time of the task" :fixed="form.time==null?false:true">
                        <a-time-picker :open="open" @openChange="handleOpenChange" use12-hours placeholder="" :disabled-hours="disabledHours" valueFormat="HH:mm:ss" :disabled-minutes="disabledMinutes" format="h:mm a" v-model="form.time">
                            <vs-button slot="addon" slot-scope="panel" color="primary" type="filled" @click="handleClose">Ok</vs-button>
                        </a-time-picker>
                    </float-label>
                </div>
                <span v-show="errors.has('time')" class="help is-danger">Task time is required</span>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <div class="control">
                    <float-label label="No of hours I am available for the task (by default 1 hr)" fixed>
                        <input type="number" min="1" class="input is-primary-focus" name="" v-model="form.hour_available">
                    </float-label>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <div class="control">
                    <gmap-autocomplete :destination="form.location" @address_res="handleAddr" label="Task seeking location" :verified="verified"></gmap-autocomplete>
                    <input type="hidden" v-model="form.location" v-validate="'required'" name="location">
                    <span v-show="errors.has('location')" class="help is-danger">Task location is required</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-6">
                <div class="control">
                    <float-label :dispatch="false" label="Prefer to get task from">
                        <div class="select">
                            <select name="task_to" v-model="form.preferred_gender" v-validate="'required'">
                                <option v-for="(item,index) in gender" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                </div>
            </div>
            <div class="column is-6">
                <div class="field has-addons">
                    <div class="control">
                        <float-label label="Expected amount">
                            <input type="number" min="0" class="input is-primary-focus" name="expected amount" v-model="form.amount" v-validate="'required'">
                        </float-label>
                    </div>
                    <div class="control">
                        <span class="select">
                            <select v-model="form.currency">
                                <option :value="usercurrency">{{usercurrency}}</option>
                                <option v-if="usercurrency !=='USD'" value="USD">USD</option>
                            </select>
                        </span>
                    </div>
                </div>
                <span v-show="errors.has('expected amount')" class="help is-danger">Expected amount is required</span>
            </div>
        </div>
        <div class="columns" v-if="currencychanged">
            <div class="column">
                <label class="label">In which country do you want this to be posted?</label>
            </div>
            <div class="column is-5 countrylist">
                <div class="control">
                    <div class="select">
                        <select name="country" v-model="form.country">
                            <option v-for="(item,index) in countries" :key="index" :value="item.code">{{item.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="control">
                    <float-label label="Note">
                        <textarea class="textarea is-primary-focus" v-model="form.details" rows="4"></textarea>
                    </float-label>
                </div>
            </div>
        </div>
        <div class="mt-10 has-text-right" v-if="verified">
            <button @click="submit" v-bind:class="(loading)?'button info-btn raised is-loading':'button info-btn raised'">Submit
            </button>
        </div>
        <div class="mt-20" v-else>
            <label class="label">For security, you need to <router-link target="_blank" :to="{name:'nidinfo'}">provide</router-link> your National/Govt id to post.</label>
        </div <info-required v-if="provideNidInfo" :title="title" />
        <vs-popup title="Add skills" class="skills-list" :active.sync="skill" id="spopup">
            <div v-if="loading" class="column is-12">
                <img class="loading" src="../../assets/images/roaling.gif">
            </div>
            <div v-else>
                <div class="columns" v-for="skill,index in skills" :key="index">
                    <div class="column is-3">
                        <span class="category">{{skill.name}}:</span>
                    </div>
                    <ul class="centerx column" style="display:inline-flex">
                        <div v-for="sk in skill.skills" :key="sk.id">
                            <label class="checkbox">
                                <input type="checkbox" v-model="form.selectedskill" :value="sk.name">
                                {{ sk.name }}
                            </label>
                        </div>
                    </ul>
                </div>
            </div>
            </div>
        </vs-popup>
    </section>
</template>
<script>
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCdu3RozRNnds9nOhMTPs-ETTWLlV1C-EE',
        libraries: 'places',
    },
});
import moment from "moment";
import VeeValidate from 'vee-validate';
import { DatePicker } from 'ant-design-vue';
import { TimePicker } from 'ant-design-vue';
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(VeeValidate);
import gmapAutocomplete from '../global/gmapautocomplete'
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: true,
})
import { mapActions } from 'vuex';
export default {
    components: {
        infoRequired: () => import('@/components/global/InfoRequired'),
        gmapAutocomplete,
    },
    data() {
        return {
            moment: moment,
            premium: true,
            skill_need: null,
            skill: false,
            validator: null,
            isLoading: false,
            tasked: false,
            placeholder: "select category first",
            toggle: false,
            tasks: [],
            locationsearch: '',
            loading: false,
            currencychanged: false,
            countries: [
                { name: 'Australia', code: 'AUS' },
                { name: 'Bangladesh', code: 'BD' },
                { name: 'Canada', code: 'CA' },
                { name: 'India', code: 'IND' },
                { name: 'Kenya', code: 'KE' },
                { name: 'Pakistan', code: 'PK' },
                { name: 'United Kingdom', code: 'UK' },
                { name: 'United States', code: 'USA' },
            ],
            availability: [
                'Anytime',
                'Daily',
                'Weekly',
                'Monthly',
            ],
            open: false,
            postdata: {
                module: "task",
                type: "seek"
            },
            skills: [],
            loading: false,
            time: '',
            form: {
                chips: '',
                post_type: 'seek',
                category: null,
                title: '',
                details: '',
                moduleId: 3,
                selectedskill: [],
                location: '',
                lat: null,
                lng: null,
                currency: this.$store.getters.user.currency,
                country: '',
                hour_available: 1,
                preferred_gender: '',
                details: '',
                date: null,
                time: null,
                amount: '',
            },
            gender: ['Male',
                'Female',
                'Any'
            ],
            provideNidInfo: false,
            title: '',
        }
    },
    computed: {
        categories() {
            return this.$store.getters.categories
        },

        verified() {
            return this.$store.getters.user.status == 'verified'
        },
        usercurrency() {
            return this.$store.getters.user.currency
        },
        usercountry() {
            return this.$store.getters.user.country
        },
        queryString() {
            return Object.keys(this.postdata)
                .map(k => `${k}=${this.postdata[k]}`)
                .join('&');
        },

    },
    created() {
        if (this.$store.getters.categories.length == 0) {
            this.getCategories();
        }
    },
    mounted() {
        if (this.usercountry == 'USA') {
            this.currencychanged = true
            this.form.country = 'USA'
        }
        EventBus.$on('SeekTaskRepost', (info) => {
            this.form.title = info.title
            this.form.details = info.description
            this.form.category = info.category
            this.form.location = info.location
            this.form.selectedskill = info.skills
            this.form.hour_available = info.hour
            this.form.amount = info.amount

        })


        EventBus.$on('infoSubmitted', () => {
            this.provideNidInfo = false
            this.submit()
        })

        document.getElementsByClassName('con-chips--input')[0].setAttribute('readonly', true);
        this.$gmapApiPromiseLazy().then(() => {
            this.directionsService = new google.maps.DirectionsService()
        })


    },

    methods: {
        handleClose() {
            this.open = false;
        },
        handleOpenChange(open) {
            this.open = open;
        },
        disabledDate(current) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return current < today;
        },
        disabledHours() {
            const today = new Date()
            if (new Date(this.form.date).toDateString() == today.toDateString()) {
                var hours = [];
                for (var i = 0; i < moment().hour(); i++) {
                    hours.push(i);
                }
                return hours;
            }

        },
        disabledMinutes(selectedHour) {
            const today = new Date()
            if (new Date(this.form.date).toDateString() == today.toDateString()) {
                var minutes = [];
                if (selectedHour === moment().hour()) {
                    for (var i = 0; i < moment().minute(); i++) {
                        minutes.push(i);
                    }
                }
                return minutes;
            }
        },
        ...mapActions("task",
            ['getCategories']),

        handleAddr(data) {
            if (data.field == "Task seeking location") {
                this.form.location = data.address
                this.form.lat = data.latitude
                this.form.lng = data.longitude
            }
        },
        disabledBeforeToday(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today || date > new Date(today.setMonth(today.getMonth() + 3))
        },


        remove(item) {
            this.form.selectedskill.splice(this.form.selectedskill.indexOf(item), 1)
        },
        openSkill() {
            this.skill = true;
            this.loading = true;
            this.$axios.get('category')
                .then(res => {
                    this.skills = res.data.data
                    this.loading = false;
                })
        },
        submit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.loading = true
                    this.$axios.post('task', this.form)
                        .then((res) => {
                            EventBus.$emit('CloseRepost')
                            this.loading = false
                            Toast.fire({
                                type: 'success',
                                text: 'Your "Want a task" has been posted successfully',
                            })

                            const clear = async () => {
                                this.form.title = ''
                                this.form.details = ''
                                this.form.category = null
                                this.form.location = ''
                                this.form.lat = null
                                this.form.lng = null
                                this.form.selectedskill = []
                                this.form.details = ''
                                this.form.chips = ''
                                this.form.date = ''
                                this.form.hour_available = 1
                                this.time = ''
                                this.form.amount = ''
                            }
                            clear().then(() => {
                                this.$validator.reset()
                            })
                            EventBus.$emit('removedata')
                            EventBus.$emit('updateSeekTask')

                        })
                        .catch(error => {
                            this.loading = false
                            if (error.response.status == 400) {
                                this.provideNidInfo = true
                                this.title = error.response.data.error.message
                            }
                            if (error.response.status == 403) {
                                Swal.fire({
                                    position: 'center',
                                    type: 'error',
                                     html: '<p style="text-align:center;">Update E-wallet Balance</p>',
                                    text: error.response.data.message,
                                    showConfirmButton: true,

                                })
                            }
                            if (error.response.status == 422) {
                                this.$vs.notify({
                                    title: 'Error',
                                    text: 'Oops,something went wrong.Please check again',
                                    position: 'top-right',
                                    color: 'danger'
                                })
                            }

                        });
                }
            })


        }
    },
    watch: {
        'form.currency': function(val) {
            if (val == 'USD') {
                this.currencychanged = true
                if (this.usercountry == 'AUS') {
                    this.countries.splice(0, 1)
                } else if (this.usercountry == 'BD') {
                    this.countries.splice(1, 1)
                } else if (this.usercountry == 'CA') {
                    this.countries.splice(2, 1)
                } else if (this.usercountry == 'IND') {
                    this.countries.splice(3, 1)
                } else if (this.usercountry == 'KE') {
                    this.countries.splice(4, 1)
                } else if (this.usercountry == 'PK') {
                    this.countries.splice(5, 1)
                } else if (this.usercountry == 'UK') {
                    this.countries.splice(6, 1)
                } else if (this.usercountry == 'USA') {
                    this.countries.splice(7, 1)
                }
            } else {
                this.currencychanged = false
                this.form.currency = this.usercurrency
                this.form.country = this.usercountry
            }
        },
        'time': function(val) {
            this.form.time = moment(val, "h:mm A").format("HH:mm:ss")
        }
    }

}
</script>
<style scoped>
.mx-datepicker {
    position: relative;
    display: inline-block;
    max-width: 100%;
    width: 100% !important;
}

.button.info-btn:hover {
    color: #fff !important;
}

.loading {
    height: auto;
    max-width: 25%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: none !important;
}

.vs-divider--text {
    font-weight: 600;
    color: #2d3436;
}

.skills {
    margin-top: -20px;
}

.con-vs-chip {
    border-radius: 4px;
    background: #fafafa;
    border: 1px solid #d9d9d9;
}

.con-vs-checkbox {
    justify-content: start;
}

.button.light-raised:hover {
    box-shadow: 0 3px 10px 4px rgba(0, 0, 0, 0.04);
}

.vs-chip--text {
    font-size: 1.1em;
}

.textarea {
    margin-top: -10px;
}

.restrict {
    font-size: 1em;
}

.centerx .checkbox {
    margin-right: 10px;
}
.con-chips {
    padding-right: 50px;
}
</style>