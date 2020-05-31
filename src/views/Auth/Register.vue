<template>
    <div class="root">
        <div class="login-wrapper columns is-gapless">
            <!-- Form section -->
            <div class="column login-column is-6 is-hidden-mobile hero-banner">
                <div class="hero signup-hero is-fullheight is-relative">
                    <div class="columns has-text-centered">
                        <div class="column">
                            <h1 class="title is-2 light-text">
                                TripShipTask
                            </h1>
                            <div class="flex-card clean-signup-info padding-20">
                                <h2 class="has-text-centered clean-text" style="font-size:20px">Get started</h2>
                                <div class="feature">
                                    <img src="../../assets/images/illustrations/icons/landing-v1/business-ready.svg" alt="">
                                    <div class="feature-text">Lorem ipsum dolor sit amet, cu has blandit intellegat, qui ludus consequuntur ad.</div>
                                </div>
                                <div class="feature">
                                    <img src="../../assets/images/illustrations/icons/landing-v1/credit-card.svg" alt="">
                                    <div class="feature-text">Lorem ipsum dolor sit amet, cu has blandit intellegat, qui ludus consequuntur ad.</div>
                                </div>
                                <div class="feature">
                                    <img src="../../assets/images/illustrations/icons/landing-v1/components.svg" alt="">
                                    <div class="feature-text">Lorem ipsum dolor sit amet, cu has blandit intellegat, qui ludus consequuntur ad.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Image section (hidden on mobile) -->
            <div class="column  is-6 ">
                <!-- Header -->
                <div class="intro-section has-text-centered pb-10">
                </div>
                <!-- Body -->
                <div class="hero-body" style="margin-top:-50px">
                    <div class="container">
                        <div class="columns">
                            <div class="column">
                                <!-- Sign up form -->
                                <form @submit.prevent="signup">
                                    <div id="signup-form" class="login-form animated preFadeInLeft fadeInLeft">
                                        <div class="columns pb-8">
                                            <div class="column is-4">
                                                <div class="field">
                                                    <div class="control">
                                                        <input class="input is-primary-focus" v-model="form.first_name" name="first name" v-validate="'required'" type="text" placeholder="First name *">
                                                        <span v-show="errors.has('first name')" class="help is-danger">{{ errors.first('first name') }}</span>
                                                        <span v-if="error.first_name" class="help is-danger">{{ error.first_name[0]}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="column is-4">
                                                <div class="field">
                                                    <div class="control">
                                                        <input class="input is-primary-focus" v-model="form.middle_name" type="text" placeholder="M Initial (optional)">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="column is-4">
                                                <div class="field ">
                                                    <div class="control">
                                                        <input class="input is-primary-focus" v-model="form.last_name" name="last name" v-validate="'required'" type="text" placeholder="Last name *">
                                                        <span v-show="errors.has('last name')" class="help is-danger">{{ errors.first('last name') }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid-system is-large">
                                            <div class="columns pb-10">
                                                <div class="column is-4">
                                                    <div class="field">
                                                        <div class="control">
                                                            <vue-tel-input v-model="form.phone" v-bind="bindProps" v-on:country-changed="countryChanged" name="phone" v-validate="'required'"></vue-tel-input>
                                                            <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="column is-4">
                                                    <div class="field">
                                                        <div class="control">
                                                            <input class="input is-primary-focus" v-model="form.email" name="email" data-vv-as="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email *">
                                                            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                                                            <span v-if="error.email" class="help is-danger">{{ error.email[0]}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid-system is-large">
                                            <div class="columns pb-10">
                                                <div class="column is-4">
                                                    <div class="field">
                                                        <div class="control">
                                                            <input class="input is-primary-focus" v-model="form.password" name="password" v-validate="'required'" ref="password" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="Password *">
                                                            <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="column is-4">
                                                    <div class="field">
                                                        <div class="control">
                                                            <input class="input is-primary-focus" name="password_confirmation" v-validate="'confirmed:password'" data-vv-as="password" :class="{'input': true, 'is-danger': errors.has('password_confirmation') }" type="password" placeholder="Retype Password*">
                                                            <span v-show="errors.has('password_confirmation')" class="help is-danger">{{ errors.first('password_confirmation') }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid-system is-large">
                                            <div class="columns pb-10">
                                                <div class="column is-6">
                                                    <div class="control" style="display:inline-flex;">
                                                        <label class="label" style="margin-right:5px;margin-top:5px;">Birthday: </label>
                                                        <div class="columns is-mobile is-gapless">
                                                            <div class="column">
                                                                <div class="select is-select">
                                                                    <select v-model="year">
                                                                        <option v-for="year in years" :value="year">{{year}}</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="column">
                                                                <div class="select is-select">
                                                                    <select v-model="month">
                                                                        <option v-for="month in months" :value="month.num">{{month.month}}</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="column">
                                                                <div class="select is-select">
                                                                    <select v-model="day">
                                                                        <option v-for="day in days" :value="day">{{day}}</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input type="hidden" name="dob" v-model="form.dob" v-validate="'required'">
                                                    <span v-show="errors.has('dob')" class="help is-danger">Date of birth is required</span>
                                                </div>
                                                <div class="column is-6">
                                                    <div class="control" style="display:inline-flex;margin-top:5px;">
                                                        <label class="label pb-5" style="margin-right:5px">Gender: </label>
                                                        <label class="radio">
                                                            <input type="radio" value="Male" v-model="form.sex" v-validate="'required'" name="gender">Male
                                                        </label>
                                                        <label class="radio">
                                                            <input type="radio" value="Female" v-model="form.sex" v-validate="'required'" name="gender">Female
                                                        </label>
                                                        <label class="radio">
                                                            <input type="radio" value="Others" v-model="form.sex" v-validate="'required'" name="gender">others
                                                        </label>
                                                    </div>
                                                    <span v-show="errors.has('gender')" class="help is-danger" style="margin-top:-5px">Gender is required</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid-system is-large">
                                            <div class="columns pb-10">
                                                <div class="column is-4">
                                                    <div class="field">
                                                        <div class="control">
                                                            <input class="input is-primary-focus" v-model="form.nid" name="nidno" type="text" placeholder=" National Id/Driving licence Id" v-validate="'required'">
                                                            <span v-show="errors.has('nidno')" class="help is-danger">NID number is required</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="column is-8">
                                                    <label class="file-label">
                                                        <input class="file-input" multiple type="file" accept="image/*" @change="onNidChnage">
                                                        <span class="file-cta">
                                                            <span class="file-icon">
                                                                <span class="material-icons">publish</span>
                                                            </span>
                                                            <span class="file-label">
                                                                Choose NID photo
                                                            </span>
                                                        </span>
                                                        <span class="file-name" v-for="(name,index) in nidname" :key="index">
                                                            {{name}}
                                                        </span>
                                                        <input type="hidden" name="nidpic" v-model="nidname" v-validate="'required'">
                                                    </label>
                                                    <span v-show="errors.has('nidpic')" class="help is-danger">NID photo is required</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid-system is-large">
                                            <div class="columns pb-10">
                                                <div class="column is-4">
                                                    <div class="field">
                                                        <div class="select is-select">
                                                            <select v-model="form.profession" name="profession" v-validate="'required'">
                                                                <option :value="null" disabled>Select profession</option>
                                                                <option value="Job Holder">Job Holder</option>
                                                                <option value="Business">Business</option>
                                                                <option value="Freelancer">Freelancer</option>
                                                                <option value="free">Dont have any job</option>
                                                            </select>
                                                            <span v-show="errors.has('profession')" class="help is-danger">Profession is required</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="column is-6">
                                                    <label class="file-label">
                                                        <input class="file-input" multiple="" type="file" accept="image/*"  @change="onJobChnage">
                                                        <span class="file-cta">
                                                            <span class="file-icon">
                                                                <span class="material-icons">publish</span>
                                                            </span>
                                                            <span class="file-label">
                                                                Choose Job Id
                                                            </span>
                                                        </span>
                                                        <span class="file-name" v-for="(name,index) in jobname" :key="index">
                                                            {{name}}
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid-system is-large">
                                            <div class="columns pb-10">
                                                <div class="column">
                                                    <div class="control" style="display:inline-flex;" :style="errors.has('language')?'margin:21px 0px':''">
                                                        <label class="label" style="margin-right:5px">Language I am proficient in: </label>
                                                        <div v-for="item in langs" style="display:inline-flex">
                                                            <label class="checkbox">
                                                                <input type="checkbox" :value="item.value" v-model="form.language" v-validate="'required'" name="language">{{item.text}} </label>
                                                        </div>
                                                    </div>
                                                    <span v-show="errors.has('language')" class="help is-danger" style="margin-top:-10px;">Language is required</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid-system is-large">
                                            <div class="columns  pb-20">
                                                <div class="column is-4">
                                                    <div class="select is-select">
                                                        <select name="education" v-model="form.education" v-validate="'required'">
                                                            <option :value="null" disabled selected>Last education completed</option>
                                                            <option v-for="(edu,index) in education" :key="index" :value="edu">{{edu}}</option>
                                                        </select>
                                                        <span v-show="errors.has('education')" class="help is-danger">Last education is required</span>
                                                    </div>
                                                </div>
                                                <div class="column is-4">
                                                    <div class="field">
                                                        <div class="control">
                                                            <input class="input is-primary-focus" v-model="form.fbid" type="text" placeholder="Facebook profile link (optional) ">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid-system is-large">
                                            <div class="intro-sub pb-20" style="margin-top:10px;color:#A9ABAC">
                                                <p>By clicking Sign Up, you have read and agree to our <a style="color:#039BE5" @click="myFunction()">Privacy Policy and Service Terms</a></p>
                                            </div>
                                        </div>
                                        <!-- <div class="columns">
                                            <div class="column is-6 ">
                                                <div class="field pb-10  ">
                                                    <div class="control">
                                                        <vue-recaptcha name="recaptcha" v-model="form.recaptcha" v-validate="'required'" ref="recaptcha" @verify="onVerify" :sitekey="sitekey"></vue-recaptcha>
                                                        <span v-show="errors.has('recaptcha')" class="help is-danger">{{ errors.first('recaptcha') }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                        <div class="grid-system is-large">
                                            <p class="control login">
                                                <button v-bind:class="(isLoading)?'button button-cta primary-btn btn-align-lg is-bold rounded raised no-lh is-loading':'button button-cta primary-btn btn-align-lg btn-outlined is-bold rounded raised no-lh'">
                                                    Sign up
                                                </button>
                                            </p>
                                        </div>
                                        <!-- <p class="control login">
                                            <button :class="isLoading?'button is-loading primary-btn rounded':''" class="button button-cta primary-btn btn-align-lg btn-outlined is-bold rounded raised no-lh">
                                                Sign up
                                            </button>

                                        </p> -->
                                    </div>
                                </form>
                                <div class="already-account animated preFadeInLeft fadeInLeft pt-10">
                                    <a style=":hover{color:#039BE5;}">
                                        <span style="color:#A9ABAC;">Already have an account? click to</span>
                                        <router-link to="/login"> Login
                                        </router-link>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';

import VueTelInput from 'vue-tel-input'
import VeeValidate from 'vee-validate';
Vue.component('vue-tel-input', VueTelInput.VueTelInput)
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import VueRecaptcha from 'vue-recaptcha';
Vue.component("vue-recaptcha", VueRecaptcha);
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
Vue.use(VueTelInput)
Vue.use(VeeValidate);

export default {
    components: {
        DatePicker
    },

    data() {
        return {
            error: '',
            isLoading: false,
            status: '',
            sitekey: '6LdQDKMUAAAAAMdResAK8raXyVlKrm4aDpyfJUGR',
            years: [],
            days: [],
            langs: [
                { text: 'English', value: 'English' },
                { text: 'Bangla', value: 'Bangla' },
                { text: 'Arabic', value: 'Arabic' },
                { text: 'Chinese', value: 'Chinese' },
                { text: 'Spanish', value: 'Spanish' },
            ],
            months: [
                { num: "01", month: "January" },
                { num: "02", month: "February" },
                { num: "03", month: "March" },
                { num: "04", month: "April" },
                { num: "05", month: "May" },
                { num: "06", month: "June" },
                { num: "07", month: "July" },
                { num: "08", month: "August" },
                { num: "09", month: "September" },
                { num: "10", month: "October" },
                { num: "11", month: "November" },
                { num: "12", month: "December" }
            ],
            education: [
                'PHD',
                'Masters',
                'Bachelors',
                'High School Graduate',
                'High School Incomplete',
                'Didnt attend school'
            ],
            day: 25,
            year: 1980,
            month: '04',
            nidimg: [],
            jobimg: [],
            nidname: [],
            jobname: [],
            form: {
                first_name: '',
                middle_name: '',
                last_name: '',
                email: '',
                dob: '',
                nid: '',
                fbid: '',
                profession: null,
                sex: null,
                phone: '',
                language: [],
                education: null,
                password: '',
                countryname: '',
                recaptcha: null
            },
            config: {
                altInput: true,
                enableTime: false,
                dateFormat: "Y-m-d",
            },
            bindProps: {
                mode: "international",
                defaultCountry: "US",
                disabledFetchingCountry: false,
                disabled: false,
                disabledFormatting: false,
                placeholder: "Enter a phone number",
                required: false,
                enabledCountryCode: false,
                enabledFlags: true,
                preferredCountries: ["US", "BD"],
                onlyCountries: [],
                ignoredCountries: [],
                autocomplete: "off",
                name: "telephone",
                maxLen: 25,
                invalidMsg: 'Invalid Number',
                wrapperClasses: "",
                inputClasses: "",
                dropdownOptions: {
                    disabledDialCode: false
                },
                inputOptions: {
                    showDialCode: false
                }
            }
        }
    },
    computed: {
        birthdate() {
            return this.day + "-" + this.month + "-" + this.year;
        }
    },
    created() {
        for (let i = 1900; i < 2021; i++) {
            this.years.push(i);
        }
        for (let i = 1; i < 32; i++) {
            if (i < 10) {
                i = ('0' + i).slice(-2)
            }
            this.days.push(i);
        }
    },
    methods: {
        countryChanged(country) {
            //console.log(country.iso2)
            this.form.countryname = country.iso2
        },
        myFunction: function() {
            window.open("https://google.com", "_blank");
        },

        onVerify(response) {
            this.form.recaptcha = response;
        },
        myFunction: function() {
            window.open("https://google.com", "_blank");
        },
        onNidChnage(e) {
            let file = e.target.files[0];
            this.nidname.push(file.name)
            let reader = new FileReader();
            reader.onload = (file) => {
                this.nidimg.push(reader.result);
            }
            reader.readAsDataURL(file);
        },
        onJobChnage(e) {
            let file = e.target.files[0];
            this.jobname.push(file.name)
            let reader = new FileReader();
            reader.onload = (file) => {
                this.jobimg.push(reader.result);
            }
            reader.readAsDataURL(file);
        },
        signup() {
            this.$validator.validateAll().then((result) => {
                if (result){
                    this.isLoading = true
                this.$axios.post('auth/signup', {
                        first_name: this.form.first_name,
                        middle_name: this.form.middle_name,
                        last_name: this.form.last_name,
                        phone: this.form.phone,
                        email: this.form.email,
                        countryname: this.form.countryname,
                        dob: this.form.dob,
                        profession: this.form.profession,
                        nid: this.form.nid,
                        fbid: this.form.fbid,
                        language: this.form.language,
                        education: this.form.education,
                        sex: this.form.sex,
                        password: this.form.password,
                        nid_photo: this.nidimg,
                        jobid: this.jobimg,
                    })
                    .then((result) => {
                        this.isLoading = false
                        if (result.response = 200) {
                            Swal.fire({
                                position: 'center',
                                type: 'success',
                                title: 'Successfully registered!',
                                text: ' We have sent a verification link, Please check your email and verify to login',
                                showConfirmButton: true,

                            })
                            this.$router.push('/login')
                        }

                    })
                    .catch(error => {
                        this.isLoading = false
                        this.error = error.response.data.errors
                        this.$vs.notify({
                            title: 'Error',
                            time: 6000,
                            text: error.response.data.errors.errors,
                            position: 'top-right',
                            color: 'danger',
                            icon: 'error'
                        })
                    })
                }

            })



        }
    },
    watch: {
        'nidname': function(val) {
            this.nidname = val
        },
        'jobname': function(val) {
            this.jobname = val
        },
        'nidimg': function(val) {
            this.nidimg = val
        },
        'jobimg': function(val) {
            this.jobimg = val
        },
        'day': function(val) {
            this.form.dob = this.year + "-" + this.month + "-" + this.day;
        },
        'month': function(val) {
            this.form.dob = this.year + "-" + this.month + "-" + this.day;
        },
        'year': function(val) {
            this.form.dob = this.year + "-" + this.month + "-" + this.day;
        }
    }
}
</script>
<style scoped>
.root {
    height: 100vh;
}

@media only screen and (max-width: 780px) {
    .root {
        height: 100%;
    }
}

.label {
    font-size: 14px !important;
}

select {
    width: 100%;
}

.hero-banner {
    background-color: #039be5;
}

.select select {
    font-size: 0.9rem;
    height: 2.3em;

}

.input {
    height: 2.3em !important;
}

select {
    padding: 0.2rem 1rem;
}

input.input {
    padding: 5px;
}

.select {
    width: 100%;
}

.clean-signup-info .feature img {
    height: 60px !important;
    width: 60px !important;
}

.clean-signup-info .feature {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 30px;
}

.clean-signup-info .feature .feature-text {
    margin-left: 20px;
    color: #999;
}

.flex-card {
    width: auto;
    margin: 20px;
}

h1 {
    font-size: 40px;
}

.vue-tel-input {
    height: 2.12rem;
}

.vue-tel-input:focus-within {
    box-shadow: none;
}

.checkbox input {
    cursor: pointer;
    margin-right: 2px;
}

.checkbox {
    margin-right: 7px;
}

.intro-section {
    margin: 15px 0px;
}

.column {
    padding: 0.4rem;
}
</style>