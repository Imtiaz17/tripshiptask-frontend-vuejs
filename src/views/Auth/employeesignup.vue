<template>
    <main>
        <div class="modal" :class="openmodal?'is-active':''">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <article class="media">
                        <div class="media-content">
                            <button class="delete" aria-label="close" @click="openmodal=false"></button>
                            <div class="content">
                                <p v-html="infomsg"></p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
        <div class="auth-outer">
            <article class="message is-danger" v-show="errormessage">
                <div class="message-header">
                    <p>Please fill up all the required fields</p>
                    <button class="delete" aria-label="delete" @click="closeerrmsg"></button>
                </div>
                <div class="message-body">
                    <p v-for="(err,index) in error[0]" :key="index">{{ err[0] }}</p>
                </div>
            </article>
            <div class="auth-box">
                  <div class="side-box">
                    <div class="headline">
                        <p>TripShipTask helps you connect with others to</p>
                        <ul>
                            <li>give or get rides</li>
                            <li>send or receive any goods</li>
                            <li>give or get tasks</li>
                        </ul>
                        <p style="margin-left: 15px;">and make money while you are at it.</p>
                    </div>
                    <img class="featured-drawing" src="../../assets/images/tst/people.png" alt="" width="400px">
                </div>
                <div class="form-wrapper">
                    <div class="login">
                        <div class="item-list">
                            <img class="featured-drawing" src="../../assets/images/tst/tstlogo.png" alt="" width="300px">
                        </div>
                        <div class="field" v-show="secondlevel" style="text-align:center">
                            <label class="label whyneed" @click="whyneed">
                                Why do I need to provide the following information?</label>
                        </div>
                        <section class="fstlevel" v-show="fstlevel">
                            <div class="body">
                                <form @submit.prevent="signup">
                                    <div class="field" style="width:68%">
                                        <div class="control">
                                            <div class="select" :class="errors.has('gender')?'mb-20':''">
                                                <select v-model="form.gender" name="gender" v-validate="'required'">
                                                    <option value="null" selected disabled hidden>Gender</option>
                                                    <option v-for="gender in gender" :value="gender">{{gender}}</option>
                                                </select>
                                                <span v-show="errors.has('gender')" class="help is-danger">Gender is required</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <input type="password" class="input" placeholder="Password" v-model="form.password" name="password" v-validate="'required|min:6'" ref="password" />
                                            <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <input class="input" name="password_confirmation" v-validate="'required|confirmed:password'" data-vv-as="password" placeholder="Retype password" type="password">
                                            <span v-show="errors.has('password_confirmation')" class="help is-danger">Password does not match</span>
                                        </div>
                                    </div>
                                    <button v-bind:class="(isLoading)?'button is-info is-small':'button is-info is-small'" @click="signup">Sign Up</button>
                                    <p class="tdpc">By signing up, you agree to our Terms, Privacy Policy, Data Policy and Cookies Policy.</p>
                                </form>
                            </div>
                        </section>
                        <section class="secondlevel" v-show="secondlevel">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="field">
                                        <div class="control">
                                            <input type="text" class="input" placeholder="National ID" name="identity" v-validate="'required'" v-model="form.identity_no" />
                                            <span v-show="errors.has('identity')"  class="help is-danger">
                                                NID is required
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-3" style="padding-right:0px">
                                    <div class="field">
                                        <div class="control">
                                            <label class="file-label">
                                                <input class="file-input" :disabled="ndisabled==1" type="file" accept="image/*" @change="onIdentityChnage">
                                                <span class="file-cta" style="width:95%;">
                                                    <span class="file-icon">
                                                        <span class="material-icons">publish</span>
                                                    </span>
                                                    <span class="file-label">
                                                        NID Front
                                                    </span>
                                                  
                                                </span>
                                            </label>
                                            <input type="hidden" name="nidpic" v-model="identityname" v-validate="'required'">
                                            <span v-show="errors.has('nidpic')" class="help is-danger">NID photo is required</span>
                                            
                                            <span v-if="ndisabled==1" class="help is-danger">Only two photos allowed</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-3" style="padding-right:0px">
                                    <div class="field">
                                        <div class="control">
                                            <label class="file-label">
                                                <input class="file-input" :disabled="ndisabled==1" type="file" accept="image/*" @change="onIdentityChnage">
                                                <span class="file-cta" style="width:95%;">
                                                    <span class="file-icon">
                                                        <span class="material-icons">publish</span>
                                                    </span>
                                                    <span class="file-label">
                                                        NID Back
                                                    </span>
                                                    
                                                </span>
                                            </label>
                                            <input type="hidden" name="nidpic" v-model="identityname" v-validate="'required'">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns" v-if="identityname.length>0">
                                <div class="column">
                                    <vs-chip @click="remove(index,chip)" v-for="(chip,index) in identityname" :key="index" closable>
                                        {{ chip }}
                                    </vs-chip>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="field">
                                        <div class="control">
                                            <div class="select">
                                                <select v-model="form.profession" name="profession" v-validate="'required'">
                                                    <option value="null" selected disabled hidden>Profession</option>
                                                    <option v-for="profession in professions" :value="profession">{{profession}}</option>
                                                </select>
                                                <span v-show="errors.has('profession')" class="help is-danger">Profession is required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-3" style="padding-right:0px">
                                    <div class="field">
                                        <div class="control">
                                            <label class="file-label">
                                                <input class="file-input" type="file" :disabled="jdisabled==1" accept="image/*" @change="onJobChnage">
                                                <span class="file-cta">
                                                    <span class="file-icon">
                                                        <span class="material-icons">publish</span>
                                                    </span>
                                                    <span class="file-label">
                                                        Job ID front
                                                    </span>
                                                </span>
                                            </label>
                                            <span v-if="jdisabled==1" class="help is-danger">Only two photos allowed</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-3" style="padding-right:0px">
                                    <div class="field">
                                        <div class="control">
                                            <label class="file-label">
                                                <input class="file-input" type="file" :disabled="jdisabled==1" accept="image/*" @change="onJobChnage">
                                                <span class="file-cta">
                                                    <span class="file-icon">
                                                        <span class="material-icons">publish</span>
                                                    </span>
                                                    <span class="file-label">
                                                        Job ID back
                                                    </span>
                                                </span>
                                            </label>
                                            <span v-if="jdisabled==1" class="help is-danger">Only two photos allowed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns" v-if="jobname.length>0">
                                <div class="column">
                                    <vs-chip @click="removejobid(index,chip)" v-for="(chip,index) in jobname" :key="index" closable>
                                        {{ chip }}
                                    </vs-chip>
                                </div>
                            </div>
                            <div class="columns" :class="errors.has('profession')?'select-error':''">
                                <div class="column is-4-desktop is-3-mobile">
                                    <label class="label">Education:</label>
                                </div>
                                <div class="column is-8">
                                    <div class="field">
                                        <div class="control">
                                            <div class="select">
                                                <select v-model="form.educational_qualification" name="education" v-validate="'required'">
                                                    <option v-for="edu in education" :value="edu">{{edu}}</option>
                                                </select>
                                                <span v-show="errors.has('education')" class="help is-danger">Educational qualification is required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns is-mobile">
                                <div class="column is-4-desktop is-3-mobile" style="padding-right: 0px;">
                                    <label class="label">Security Question: <img @click="quesmodel" class="ques" src="https://img.icons8.com/small/16/000000/help.png" /></label>
                                </div>
                                <div class="column is-8">
                                    <div class="field">
                                        <div class="control">
                                            <div class="select">
                                                <select v-model="form.security_ques" name="sq" v-validate="'required'">
                                                    <option v-for="sq in squestion" :value="sq">{{sq}}</option>
                                                </select>
                                                <span v-show="errors.has('sq')" class="help is-danger">Security question is required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-12">
                                    <div class="field">
                                        <div class="control">
                                            <div class="columns is-mobile">
                                                <div class="column is-4-desktop is-3-mobile">
                                                    <label class="label">Security Answer: </label>
                                                </div>
                                                <div class="column is-8">
                                                    <input type="text" class="input" placeholder="" name="sa" v-validate="'required'" v-model="form.security_ans" />
                                                    <span v-show="errors.has('sa')" class="help is-danger">Security answer is required</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column">
                                    <div class="field">
                                        <div class="control">
                                            <div class="columns is-mobile is-gapless">
                                                <div class="column" style="margin-right:25%">
                                                    <label class="label">Birthday: </label>
                                                </div>
                                                <div class="column">
                                                    <div class="select">
                                                        <select v-model="day">
                                                            <option v-for="day in days" :value="day">{{day}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="column">
                                                    <div class="select">
                                                        <select v-model="month">
                                                            <option v-for="month in months" :value="month.num">{{month.month}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="column">
                                                    <div class="select">
                                                        <select v-model="year">
                                                            <option v-for="year in years" :value="year">{{year}}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="hidden" name="dob" v-model="form.dob" v-validate="'required'">
                                            <span v-show="errors.has('dob')" class="help is-danger">Date of birth is required</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns is-vcentered is-mobile" :class="errors.has('education')?'edu-error':''">
                                <div class="column is-8">
                                    <button v-bind:class="(isLoading)?'button is-info is-small is-loading':'button is-info is-small'" style="width:100px;font-size:14px;float: right;" @click="submit">Submit</button>
                                </div>
                                <div class="column is-4">
                                    <button class="goback" @click="back">Go Back</button>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="signupbox">
                        <div class="body">
                            <span>Have an account?
                                <router-link to="/" style="font-weight:600">
                                    <span>Login</span>
                                </router-link>
                            </span>
                        </div>
                    </div>
                    <div class="appbox">
                        <p>Get the app.</p>
                        <div class="applink">
                            <img src="../../assets/images/tst/pay.svg">
                            <img src="../../assets/images/tst/play-market.svg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate)
import { Validator } from 'vee-validate';
const dictionary = {
    custom: {
        password: {
            required: 'Password is required',
            min: 'Password must be at least 6 characters',
        },
        password_confirmation: {
            required: 'Retype password',
        }
    }

};
Validator.localize('en', dictionary);
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
export default {

    data() {
        return {
            infomsg:'',
            openmodal: false,
            errormessage: false,
            ndisabled: 0,
            jdisabled: 0,
            isLoading: false,
            fstlevel: true,
            secondlevel: false,
            error: [],
            loading: false,
            sitekey: "6Le8TekUAAAAAO7Qf7rYfvIEoV2t8fmWYSD_AyfJ",
            identityimg: [],
            jobimg: [],
            identityname: [],
            jobname: [],
            nidrequired: false,
            dlrequired: false,
            countryCode: 'CA',
            form: {
                password: "",
                dob: '',
                identity_no: '',
                security_ques: '',
                security_ans: '',
                countryname: '',
                profession: null,
                educational_qualification: null,
                gender: null
            },
            id:this.$route.params.id,
            query: {
                expires: '',
                signature: ''
            },
            id_type:'NID',
            education: [
                'High School Incomplete',
                'Completed High School or equivalent',
                'Bachelor Degree or equivalent',
                'Master Degree or equivalent',
                'Doctoral Degree or equivalent',
            ],
            professions: [
                'Business/Self Employed',
                'Government Job',
                'Private Job',
                'Student',
                'Retired',
                'Driving'
            ],
            squestion: [
                'What Is your favorite book?',
                'If you win a million dollars, what would you buy first?',
                'Who was your crush in high school?',
                'Who was your favorite colleague at the first company you worked at?',
                'Who was your favorite teacher in high school?',
                'Who was your favorite teacher at the University?',
                'Where is your favorite place to vacation?',
                'Where did you meet your spouse?',
                'Where were you on New Year\'s Eve in 2000?',
            ],
            gender: [
                'Male',
                'Female',
                'Other'
            ],
            years: [],
            days: [],
            day: 25,
            year: 1980,
            month: '04',
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

        };
    },
    created() {
        this.query.expires = this.$route.query.expires
        this.query.signature = this.$route.query.signature

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
    computed: {
       queryString() {
            return Object.keys(this.query)
                .map(k => `${k}=${this.query[k]}`)
                .join('&');
        }
    },

    methods: {
        quesmodel() {
            this.openmodal = true
            this.infomsg = "Security question is to add an extra layer of certainty to identify you when you have forgotten your password, entered the wrong credentials too many times, or tried to log in from an unfamiliar device or location."
        },
        whyneed() {
            this.openmodal = true
            this.infomsg = "<p>The following information will not be visible to other users except profession.</p><p> We require you to provide this information for your own safety and security.</p> <p>Each member of TripShipTask is therefore a verified user. We verify your government issued id, contact number, Bank account details  to prevent unauthorized access to your account and to prevent/avoid unpleasant experience while interacting with another user as each member is held responsible for his/her unwanted actions.</p><p>Security question is to add an extra layer of certainty to identify you when you have forgotten your password, entered the wrong credentials too many times, or tried to log in from an unfamiliar device or location.</p>"
        },
        closeerrmsg() {
            this.error = []
            this.errormessage = false
        },
        remove(index, chip) {
            this.identityname.splice(this.identityname.indexOf(chip), 1)
            this.identityimg.splice(this.identityimg.indexOf(index), 1)
            this.ndisabled = 0
        },
        removejobid(index, chip) {
            this.jobname.splice(this.jobname.indexOf(chip), 1)
            this.jobimg.splice(this.jobimg.indexOf(index), 1)
            this.jdisabled = 0

        },
        countryChanged(country) {
            this.form.countryname = country.iso2
            if (country.iso2 == "BD" || country.iso2 == "IN" || country.iso2 == "PK") {
                this.nidrequired = true
                this.dlrequired = false
            } else {
                this.nidrequired = false
                this.dlrequired = true
            }
        },

        async signup() {
            const results = Promise.all([
                this.$validator.validate('gender'),
                this.$validator.validate('password'),
                this.$validator.validate('password_confirmation'),
            ]);
            const areValid = (await results).every(isValid => isValid);
            if (areValid) {
                this.fstlevel = false
                this.secondlevel = true
            }

        },
        async submit() {
            const results = Promise.all([
                this.$validator.validate('dob'),
                this.$validator.validate('identity'),
                this.$validator.validate('nidpic'),
                this.$validator.validate('profession'),
                this.$validator.validate('education'),
                this.$validator.validate('sq'),
                this.$validator.validate('sa'),
            ]);
            const areValid = (await results).every(isValid => isValid);
            if (areValid) {
                this.isLoading = true
                this.$axios.put(`admin/employeeinfo/${this.id}?${this.queryString}`,{
                        id: this.id,
                        dob: this.form.dob,
                        profession: this.form.profession,
                        educational_qualification: this.form.educational_qualification,
                        password: this.form.password,
                        jobimg: this.jobimg,
                        identityimg: this.identityimg,
                        identity_no: this.form.identity_no,
                        identity_type: this.id_type,
                        security_ques: this.form.security_ques,
                        security_ans: this.form.security_ans,
                        gender: this.form.gender
                    })
                    .then((result) => {
                        this.isLoading = false
                        if (result.response = 200) {
                            this.$router.push('/')
                            Swal.fire({
                                position: 'center',
                                type: 'success',
                                title: 'Sign Up Successful!',
                                text: 'Thank you for your submission. Your supervisor will walk you through from here.',
                                showConfirmButton: true,

                            })
                        }

                    })
                    .catch(error => {
                        this.isLoading = false
                        this.error.push(error.response.data.errors)
                        this.errormessage = true
                    })


            }

        },
        back() {
            this.fstlevel = true
            this.secondlevel = false
        },
        onIdentityChnage(e) {
            if (this.identityimg.length >= 2) {
                this.ndisabled = 1
            } else {
                let file = e.target.files[0];
                this.identityname.push(file.name)
                let reader = new FileReader();
                reader.onload = (file) => {
                    this.identityimg.push(reader.result);
                }
                reader.readAsDataURL(file);
            }

        },
        onJobChnage(e) {
            if (this.jobimg.length >= 2) {
                this.jdisabled = 1
            } else {
                let file = e.target.files[0];
                this.jobname.push(file.name)
                let reader = new FileReader();
                reader.onload = (file) => {
                    this.jobimg.push(reader.result);
                }
                reader.readAsDataURL(file);
            }
        },
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

};
</script>
<style scoped>
.auth-outer .auth-box {
    justify-content: center;
}

.auth-outer .auth-box .side-box {
    background: #f4f6fb;
    width: 1050px;
    padding-right: 20px;
}
.item-list img {
    width: 120px;
    margin-top: 10px;
}

.auth-outer .auth-box .side-box {
    background: #f4f6fb;
}

.label {
    margin-top: 5px;
}

.ques {
    position: relative;
    top: -15px;
    right: -111px;
    cursor: pointer;
}

.auth-outer {
    background: #f4f6fb;
    align-items: inherit;
    margin: 50px auto 0;
    max-width: 935px;
    padding-bottom: 44px;
}

.login {
    background-color: #fff;
    background-color: rgba(var(--d87, 255, 255, 255), 1);
    border: 1px solid #dbdbdb;
    border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
    border-radius: 1px;
}

.control input {
    height: 2.9em !important;
    border-radius: 3px !important;
    padding: 7px 0 7px 8px !important;
    font-size: 12px !important;
    background: #fafafa !important;
}

.auth-outer .auth-box .form-wrapper .login .body {
    margin-top: 20px !important;
    margin-bottom: 20px;
}

.body button {
    margin-top: 5px !important;
    font-size: 14px;
    border-radius: 4px;
}

.field:not(:last-child) {
    margin-bottom: .35rem;
}

.title {
    margin: 22px auto 12px;
    font-size: 1.7em !important
}

.item-list {
    margin-top: 0px !important
}

.auth-outer .auth-box .form-wrapper {
    position: relative;
    min-height: 480px;
    overflow: hidden;
    max-width: 430px;
    width: 100%;
    height: 100%;
}

.vs-divider {
    width: 80%;
    color: #8e8e8e;
    font-size: 13px;
}

.loginfb button {
    background: transparent;
    display: inline-flex;
    text-align: center;
    justify-content: center;
    font-weight: 600;
}
.side-box img
{
    margin-top: 10px;
}

.edu-error {
    margin-top: 5px;
}

.select-error {
    margin-top: 5px;
}

.loginfb img {
    width: 25px;
}

.loginfb .loginfbtext {
    margin-top: 2px;
    color: #385185;
    margin-left: 5px;
}

.goback {
    background: transparent;
    text-align: center;
    justify-content: center;
    font-weight: 600 !important;
    color: #0095f6 !important;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    margin-top: 5px;
    border: 0;
    float: right;
    cursor: pointer;
}

@media only screen and (min-width:768px) {
    .columns.is-gapless {
        margin-left: 0px;
        margin-right: 50px !important;
        margin-top: 0;
    }
}

.signupbox {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #dbdbdb;
    border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
    border-radius: 1px;
    margin-top: 10px;
}

.signupbox .body {
    margin: 20px 0px;
    text-align: center;
}

.appbox {
    text-align: center;
    margin: 20px 0px;
}

.applink {
    margin-top: 15px;
}

.applink img {
    margin-right: 7px;
}

.headline p {
    color: #4e4b4b;
    font-weight: 600;
    font-size: 18px;
}
ul li{
    color: #4e4b4b;
    font-size: 18px;
}

ul {
    list-style: circle !important;
    margin: 0px 35px;
}


.tdpc {
    color: rgba(var(--f52, 142, 142, 142), 1);
    font-size: 12px;
    line-height: 16px;
    margin: 10px 47px;
    text-align: center;
}

::-webkit-input-placeholder {
    /* Edge */
    color: #8e8e8e;
}

:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #8e8e8e;
}

::placeholder {
    color: #8e8e8e;
}

.is-gapless .column {
    margin-right: 8px;
}

.secondlevel {
    margin: 10px 20px;
}

.select select {
    font-size: 0.8em !important;
}

.whyneed {
    cursor: pointer;
    color: #0095f6;
}

.file-label .file-cta {
    padding: 2px;
    font-size: 1em;
    height: 2.5em;
    margin-top: 3px;
    padding-right: 5px;
    padding-left: 5px;
}

.file-icon {
    font-size: 0.3em;
    padding: 8px;
}

.file-name {
    margin-left: 3px;
    padding: 0.4em;
    border-width: 1px 1px 1px 1px;
    margin-top: 2px;
    font-size: 0.6rem;
}

.material-icons {
    font-size: 1rem;
}

.file-label {
    font-size: 0.7rem;
}

.columns.is-gapless:not(:last-child) {
    margin-bottom: calc(1.5rem - 1.4rem) !important;
}

.columns:not(:last-child) {
    margin-bottom: calc(1.5rem - 1.4rem) !important;
}

.select:not(.is-multiple) {
    height: 2em;
}

.input:active,
.input:focus {
    border-color: #b1aaaa !important;
}
.modal-content
{
    width: calc(100% - 820px) !important;
}
.select select
{
background: #fafafa!important;
}
</style>