<template>
    <section>
        <div class="columns" style="margin-top:10px;">
            <div class="column is-12">
                <div class="control">
                    <float-label :dispatch="false" label="Select a category" fixed>
                        <div class="select">
                            <select name="category" v-model="form.category" v-validate="'required'">
                                <option v-for="(cat,index) in category" :key="index" :value="cat.name">{{cat.name}}</option>
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
                    <float-label label="Title of the task you are seeking" fixed>
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
                        <div class="ax-global con-chips--remove-all" @click="open"><i class="vs-icon notranslate icon-scale material-icons null">add</i></div>
                    </vs-chips>
                    <span v-show="errors.has('skill')" class="help is-danger">Skillset is required</span>
                </div>
            </div>
        </div>
        <div class="columns" style="margin-bottom:0px;">
            <div class="column is-6">
                <div class="control">
                    <float-label label="Date of the task" fixed>
                        <date-picker v-model="form.date" valueType="format" v-validate="'required'" name="date"></date-picker>
                    </float-label>
                    <span v-show="errors.has('date')" class="help is-danger">Task date is required</span>
                </div>
            </div>
            <div class="column is-6">
                <div class="control">
                    <float-label label="Time of the task" fixed>
                        <date-picker format="hh:mm a" v-model="time" type="time" valueType="format" v-validate="'required'" name="time"></date-picker>
                    </float-label>
                </div>
                <span v-show="errors.has('time')" class="help is-danger">Task time is required</span>
            </div>
        </div>
        <div class="columns" style="margin-top:0px;">
            <div class="column is-7">
                <div class="control">
                    <gmap-autocomplete @address_res="handleAddr" placeholder="Task seeking location" :premium="premium"></gmap-autocomplete>
                    <input type="hidden" v-model="form.location" v-validate="'required'" name="location">
                    <span v-show="errors.has('location')" class="help is-danger">Task location is required</span>
                </div>
            </div>
            <div class="column is-5">
                <div class="control">
                    <float-label label="Expected amount" fixed>
                        <input type="number" min="0" class="input is-primary-focus" name="expected amount" v-model="form.amount" v-validate="'required'">
                    </float-label>
                    <span v-show="errors.has('expected amount')" class="help is-danger">Expected amount is required</span>
                </div>
            </div>

        </div>
        <div class="columns">
            <div class="column">
                <div class="control">
                    <float-label label="Note" fixed>
                        <textarea class="textarea is-primary-focus" v-model="form.details" rows="4"></textarea>
                    </float-label>
                </div>
            </div>
        </div>
        <div class="mt-10 has-text-right">
            <button @click="submit" v-bind:class="(loading)?'button btn-align info-btn raised is-loading':'button btn-align info-btn raised'">Submit
            </button>
        </div>
        <vs-popup title="Add skills" :active.sync="skill" id="spopup">
            <div class="columns">
                <div v-if="loading" class="column is-12">
                    <img class="loading" src="../../assets/images/roaling.gif">
                </div>
                <div v-else>
                    <div class="column is-12 skills">
                        <div v-for="skill,index in skills" :key="index">
                            <vs-divider position="left">
                                {{skill.name}}
                            </vs-divider>
                            <ul class="centerx" style="display:inline-flex">
                                <el-checkbox-group v-model="form.selectedskill">
                                    <el-checkbox v-for="sk in skill.skills" :label="sk.name" :key="sk.id">{{sk.name}}</el-checkbox>
                                </el-checkbox-group>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </vs-popup>
    </section>
</template>
<script>
import Vue from 'vue';
import moment from "moment";
import { Checkbox, CheckboxGroup } from 'element-ui';
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
import 'element-ui/lib/theme-chalk/index.css';
import VeeValidate from 'vee-validate';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
Vue.use(VeeValidate);
import gmapAutocomplete from '../global/gmapautocomplete'
export default {
    components: {
        gmapAutocomplete,
        DatePicker
    },
    props: ['category'],
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
            availability: [
                'Anytime',
                'Daily',
                'Weekly',
                'Monthly',
            ],
            categories: [],
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
                details: '',
                date: '',
                time: '',
                amount: ''
            }
        }
    },
    mounted() {
      document.getElementsByClassName('con-chips--input')[0].setAttribute('readonly', true);
        this.$gmapApiPromiseLazy().then(() => {
            this.directionsService = new google.maps.DirectionsService()
        })


    },

    methods: {
        handleAddr(data) {
            if (data.field == "Task seeking location") {
                this.form.location = data.address
            }
        },


        remove(item) {
            this.form.selectedskill.splice(this.form.selectedskill.indexOf(item), 1)
        },


        open() {
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
                            this.loading = false
                            this.$vs.notify({
                                title: 'Success',
                                text: 'Your "Want a task" has been posted successfully',
                                position: 'top-right',
                                color: 'success'
                            })
                            this.$router.push(res.data.path)

                        })
                        .catch(error => {
                            this.loading = false
                            this.$vs.notify({
                                title: 'Error',
                                text: 'Oops,something went wrong.Please check again',
                                position: 'top-right',
                                color: 'danger'
                            })

                        });
                }
            })


        }
    },
    watch: {
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

.con-chips .con-vs-chip {
    margin: 4px 1px 2px 1px !important;
}

.vs-chip--text {
    font-size: 1.1em;
}
</style>