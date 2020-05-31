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
                        <label class="label ">Title</label>
                        <div class="control">
                            <float-label>
                                <input class="input is-small is-primary-focus " type="text" v-model="data.title" name="title" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('title') }" placeholder="Title">
                            </float-label>
                            <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
                        </div>
                    </div>
                </div>
                <div class="columns mt-5">
                    <div class="column">
                        <label class="label ">Category</label>
                        <div class="control">
                            <float-label :dispatch="false">
                                <div class="select is-select">
                                    <select name="category" v-model="data.category" v-validate="'required'">
                                        <option :value="null" disabled selected>Select a category</option>
                                        <option v-for="(cat,index) in categories" :key="index" :value="cat.name">{{cat.name}}</option>
                                    </select>
                                </div>
                            </float-label>
                            <!--  <el-select v-on:change="loadSkills" v-validate="'required'" name="category type" size="small" v-model="data.category" placeholder="Select Category" style="width: 100%;">
                                    <el-option v-for="(cat,index) in categories" :key="index" :label="cat.name" :value="cat.id">
                                    </el-option>
                                </el-select> -->
                            <span v-show="errors.has('category')" class="help is-danger">{{ errors.first('category') }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <label class="label">Task Skills</label>
                        <div class="control">
                            <div class="control">
                                <vs-chips color="rgb(145, 32, 159)" placeholder="Skills required for this task" v-model="data.skills">
                                    <vs-chip :key="chip" @click="remove(chip)" v-for="chip in form.selectedskill" closable>
                                        {{ chip }}
                                    </vs-chip>
                                    <div class="ax-global con-chips--remove-all" @click="open"><i class="vs-icon notranslate icon-scale material-icons null">add</i></div>
                                </vs-chips>
                                <span v-show="errors.has('skill')" class="help is-danger">Skillset is required</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <label class="label">Date</label>
                        <div class="control">
                            <VueCtkDateTimePicker id="OfferDatePicker" label="Date of the assignment" :no-label="true" color="#6BA3FF" input-size="sm" v-model="data.date_time" format="DD-MM-YYYY" formatted="ll" output-format="YYYY-MM-DD" :no-header="true" :only-date="true" :no-button="true" :auto-close="true" v-validate="'required'" name="date" />
                            <span v-show="errors.has('date')" class="help is-danger">{{ errors.first('date') }}</span>
                        </div>
                    </div>
                    <div class="column">
                        <label class="label">Time:</label>
                        <VueCtkDateTimePicker id="OfferTimePicker" color="#6BA3FF" input-size="sm" v-model="data.date_time" label="Time of the assignment" :no-label="true" format="hh:mm a" output-format="HH:mm" formatted="LT" :only-time="true" v-validate="'required'" name="time" />
                        <!-- <flat-pickr class="input is-primary-focus " v-validate="'required'" name="time" :config="config1" placeholder="Select time" :class="{'input': true, 'is-danger': errors.has('time') }" v-model="data.date_time"></flat-pickr> -->
                        <span v-show="errors.has('time')" class="help is-danger">{{ errors.first('time') }}</span>
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label class="label ">Task Location</label>
                            <div class="control">
                                <float-label>
                                    <input type="text" class="input is-primary-focus" id="taskin" v-model="data.location" v-validate="'required'" name="location" placeholder="Assignment location">
                                </float-label>
                                <!--   <input class="input is-small is-primary-focus " type="text" v-model="data.location" name="location" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('location') }"> -->
                                <span v-show="errors.has('location')" class="help is-danger">{{ errors.first('location') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <label class="label ">Offered Amount</label>
                        <div class="control">
                            <float-label>
                                <input type="text" class="input is-primary-focus" name="offer amount" v-model="data.amount" v-validate="'required'" placeholder="Offering amount">
                            </float-label>
                            <!--                             <input class="input is-small is-primary-focus " type="text" v-model="data.amount" name="amount" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('amount') }"> -->
                            <span v-show="errors.has('amount')" class="help is-danger">{{ errors.first('amount') }}</span>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-half">
                        <div class="field">
                            <label class="label">Task Details</label>
                            <div class="control">
                                <float-label>
                                    <textarea class="textarea is-primary-focus" rows="5" v-model="data.description" name="details" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('details') }"></textarea>
                                </float-label>
                            </div>
                            <span v-show="errors.has('details')" class="help is-danger">{{ errors.first('details') }}</span>
                        </div>
                    </div>
                </div>
                <div class="columns" style="margin-top:10px;margin-bottom:5px;">
                    <div class="column is-5"></div>
                    <div class="column is-5"></div>
                    <div class="column is-2">
                        <vs-button color="success" type="filled" @click="update">Update</vs-button>
                        <vs-button color="danger" type="filled" @click="cancel">cancel</vs-button>
                    </div>
                </div>
            </vs-card>
        </vs-col>
    </vs-row>
</template>
<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.use(VeeValidate);
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
export default {
    props: ['data'],

    data() {
        return {
            config: {
                altInput: true,
                enableTime: false,
                dateFormat: "Y-m-d",
            },
            config1: {
                altInput: true,
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
            },
            categories: [],
            skills: [],
            moduleId: 3,


        }
    },
    created() {
        axios.get(`api/skills/${this.data.category}`)
            .then(res => {

                this.skills = res.data;
            })


        axios.get(`api/categories/${this.moduleId}`)
            .then(res => {
                this.categories = res.data;
            })
            .catch(error => console.log(error.res.data), )
    },
    methods: {

        cancel() {
            EventBus.$emit('cancelTask')
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
            axios.patch(`api/task/${this.data.slug}`, this.data, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                })
                .then((res) => {
                    if (res.response = 200) {
                        Swal.fire({
                            position: 'center',
                            type: 'success',
                            title: 'Task post successfully updated',
                            showConfirmButton: false,
                            timer: 1500
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
</style>