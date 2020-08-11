<template>
    <vs-row vs-justify="center">
        <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <vs-card>
                <div slot="header" class="editheader">
                    <h3 style="margin-bottom:0em">
                        Edit your Offered Task
                    </h3>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="control">
                            <float-label label="Title" fixed>
                                <input class="input is-primary-focus " type="text" v-model="data.title" name="title" v-validate="'required'">
                            </float-label>
                            <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <div class="control">
                            <float-label :dispatch="false" label="Select a category" fixed>
                                <div class="select">
                                    <select name="category" v-model="data.category" v-validate="'required'">
                                        <option v-for="(cat,index) in categories" :key="index" :value="cat.name">{{cat.name}}</option>
                                    </select>
                                </div>
                            </float-label>
                            <span v-show="errors.has('category')" class="help is-danger">{{ errors.first('category') }}</span>
                        </div>
                    </div>
                </div>
                <div class="columns mt-5">
                    <div class="column is-6">
                        <div class="control">
                            <div class="control">
                                <vs-chips color="rgb(145, 32, 159)" placeholder="Skills required for this task" v-model="data.skills">
                                    <vs-chip :key="chip" @click="remove(chip)" v-for="chip in data.skills" closable>
                                        {{ chip }}
                                    </vs-chip>
                                    <div class="choose-skill" @click="openSkill"><i class="vs-icon notranslate icon-scale material-icons null">add</i></div>
                                </vs-chips>
                                <span v-show="errors.has('skill')" class="help is-danger">Skillset is required</span>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="control">
                            <float-label label="Date of the task" :fixed="data.date==null?false:true">
                                <a-date-picker v-model="data.date" valueFormat="YYYY-MM-DD" placeholder="" :disabled-date="disabledDate" v-validate="'required'" name="date" />
                            </float-label>
                            <span v-show="errors.has('date')" class="help is-danger">{{ errors.first('date') }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <div class="control">
                            <float-label label="Time of the task" :fixed="data.time==null?false:true">
                                <a-time-picker use12-hours placeholder="" :disabled-hours="disabledHours" valueFormat="HH:mm:ss" :disabled-minutes="disabledMinutes" format="h:mm a" v-model="data.time" v-validate="'required'" name="time">
                                    <vs-button slot="addon" slot-scope="panel" color="primary" type="filled" @click="handleClose">Ok</vs-button>
                                </a-time-picker>
                            </float-label>
                        </div>
                        <span v-show="errors.has('time')" class="help is-danger">{{ errors.first('time') }}</span>
                    </div>
                </div>
                <div class="columns mt-5">
                    <div class="column is-6">
                        <div class="field">
                            <div class="control">
                                <float-label label="Task Location">
                                    <input type="text" class="input is-primary-focus" id="taskin" v-model="data.location" v-validate="'required'" name="location">
                                </float-label>
                                <span v-show="errors.has('location')" class="help is-danger">{{ errors.first('location') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="field has-addons">
                            <div class="control">
                                <float-label label="Offering amount">
                                    <input type="number" min="0" class="input is-primary-focus" name="offer amount" v-model="data.amount" v-validate="'required'">
                                </float-label>
                            </div>
                            <div class="control">
                                <span class="select">
                                    <select v-model="data.currency">
                                        <option :value="data.currency">{{data.currency}}</option>
                                        <option v-if="data.currency !=='USD'" value="USD">USD</option>
                                    </select>
                                </span>
                            </div>
                        </div>
                        <span v-show="errors.has('amount')" class="help is-danger">{{ errors.first('amount') }}</span>
                    </div>
                    <div class="column ">
                        <div class="control">
                            <float-label :dispatch="false" fixed label="Prefer to give task to">
                                <div class="select">
                                    <select name="preferred_gender" v-model="data.preferred_gender" v-validate="'required'">
                                        <option v-for="(item,index) in gender" :key="index" :value="item">{{item}}</option>
                                    </select>
                                </div>
                            </float-label>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-6" v-if="data.type=='offer'">
                        <div class="control">
                            <float-label label="No of hours needed to carry out the task (by default 1 hr)" fixed>
                                <input type="number" min="1" class="input is-primary-focus" name="" v-model="data.hour_need">
                            </float-label>
                        </div>
                    </div>
                     <div class="column is-6" v-else>
                        <div class="control">
                            <float-label label="No of hours I am available for this task (by default 1 hr)" fixed>
                                <input type="number" min="1" class="input is-primary-focus" name="" v-model="data.hour_available">
                            </float-label>
                        </div>
                    </div>
                    <div class="column ">
                        <div class="field">
                            <div class="control">
                                <float-label label="Task details">
                                    <textarea class="textarea is-primary-focus" rows="5" v-model="data.note" name="details"></textarea>
                                </float-label>
                            </div>
                            <span v-show="errors.has('details')" class="help is-danger">{{ errors.first('details') }}</span>
                        </div>
                    </div>
                </div>
                <div class="columns" style="margin-top:10px;margin-bottom:5px;">
                    <div class="column is-8"></div>
                    <div class="column is-4">
                        <vs-button type="gradient" style="float:right" @click="cancel">Cancel</vs-button>
                        <vs-button color="success" type="gradient" style="float:right;margin-right: 13px" @click="update">Update</vs-button>
                    </div>
                </div>
            </vs-card>
        </vs-col>
    </vs-row>
</template>
<script>
import Vue from 'vue'
import moment from "moment";
import VeeValidate from 'vee-validate';
import { DatePicker } from 'ant-design-vue';
import { TimePicker } from 'ant-design-vue';
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(VeeValidate);
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    closeButton: 'close-button-class'
})
import { mapActions } from 'vuex';
export default {
    props: ['data'],

    data() {
        return {
            moment: moment,
            skills: [],
            moduleId: 3,
            gender: ['Male',
                'Female',
                'Any'
            ],

        }
    },
    computed: {
        categories() {
            return this.$store.getters.categories
        },
    },
    created() {
        if (this.$store.getters.categories.length == 0) {
            this.getCategories();
        }

        // this.$axios.get('category')
        //     .then(res => {
        //         this.categories = res.data;
        //     })
        //     .catch(error => console.log(error.res.data), )
    },
    methods: {
        ...mapActions("task",
            ['getCategories']),

        disabledDate(current) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return current < today;
        },
        disabledHours() {
            const today = new Date()
            if (new Date(this.data.date).toDateString() == today.toDateString()) {
                var hours = [];
                for (var i = 0; i < moment().hour(); i++) {
                    hours.push(i);
                }
                return hours;
            }

        },
        disabledMinutes(selectedHour) {
            const today = new Date()
            if (new Date(this.data.date).toDateString() == today.toDateString()) {
                var minutes = [];
                if (selectedHour === moment().hour()) {
                    for (var i = 0; i < moment().minute(); i++) {
                        minutes.push(i);
                    }
                }
                return minutes;
            }
        },
        cancel() {
            EventBus.$emit('cancelTask')
        },
        openSkill() {

        },
        loadSkills() {
            axios.get(`api/skills/${this.data.category}`)
                .then(res => {
                    this.placeholder = " ";
                    this.skills = res.data;
                })
                .catch(error => console.log(error.res.data))
        },
        update() {
            this.$axios.patch(`task/${this.data.slug}`, this.data)
                .then((res) => {
                    if (res.response = 200) {
                        Toast.fire({
                            type: 'success',
                            title: 'Task post successfully updated'
                        })


                        this.cancel()
                    }

                })


        }
    }

}
</script>
<style scoped>
.editheader {
    text-align: center;
    padding: 9px !important;
    font-size: 14px;
    color: #2d3436;
    background-color: #FFFFFF;
    margin-bottom: 4px;
}

.vs-button {
    padding: 8px 9px;
}

.con-vs-chip {
    border-radius: 4px;
    background: #fafafa;
    border: 1px solid #d9d9d9;
}

.vs-chip--text {
    font-size: 1.1em;
}

.centerx .checkbox {
    margin-right: 10px;
    font-size: 1.1em;
    font-weight: 500;
    color: #5d5d5d;
}
.con-chips {
    padding-right: 50px;
}
</style>