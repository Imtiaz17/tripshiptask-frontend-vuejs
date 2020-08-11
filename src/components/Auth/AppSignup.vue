<template>
    <main>
        <vue-headful title="Sign Up | TripShipTask" description="Sign Up" />
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
                <div class="message-body">
                    <button class="delete" aria-label="delete" @click="closeerrmsg"></button>
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
                        <section class="fstlevel">
                            <div class="body">
                                <form @submit.prevent="signup">
                                    <div class="field">
                                        <div class="control">
                                            <float-label label="Full name">
                                                <input type="text" class="input is-primary-focus" v-model="form.full_name" v-validate="'required'" name="full_name">
                                            </float-label>
                                            <span v-show="errors.has('full_name')" class="help is-danger">Full name is required</span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control phn">
                                            <float-label :dispatch="false" label="Phone number" fixed>
                                                <vue-tel-input v-model="form.mobile" class="input" v-bind="bindProps" v-on:country-changed="countryChanged" name="phone" v-validate="'required'"></vue-tel-input>
                                            </float-label>
                                            <span style="margin-left:11px;" v-show="errors.has('phone')" class="help is-danger">Phone number is required</span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <float-label label="Email">
                                                <input type="text" class="input is-primary-focus" ref="email" v-model="form.email" v-validate="'required|email'" data-vv-validate-on="abc" @change="onChange" name="email">
                                            </float-label>
                                            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                                        </div>
                                    </div>
                                    <div class="field gender">
                                        <div class="control">
                                            <float-label :dispatch="false" label="Gender">
                                                <div class="select" :class="errors.has('gender')?'mb-20':''">
                                                    <select v-model="form.gender" name="gender" v-validate="'required'">
                                                        <option v-for="gender in gender" :value="gender">{{gender}}</option>
                                                    </select>
                                                </div>
                                            </float-label>
                                            <span v-show="errors.has('gender')" class="help is-danger">Gender is required</span>
                                        </div>
                                    </div>
                                    <div class="field gender" v-if="customgender">
                                        <div class="control">
                                            <float-label :dispatch="false" label="What is your gender?" v-show="customgender">
                                                <input type="text" class="input is-primary-focus" v-model="custgender" name="gender" v-validate="'required'">
                                            </float-label>
                                        </div>
                                    </div>
                                    <div class="field" :style="errors.has('password')?'':'margin-bottom:0rem'">
                                        <div class="control">
                                            <float-label :dispatch="false" label="Password">
                                                <input :type="pwdType" class="input is-primary-focus" v-model="form.password" name="password" v-validate="'required|min:8'" ref="password">
                                            </float-label>
                                            <span class="icon is-small is-right" @click="pwdcheck">
                                                <img v-if="pwdType=='password'" src="../../assets/images/tst/close-eye.png">
                                                <img v-else src="../../assets/images/tst/open-eye.png">
                                            </span>
                                            <span v-show="errors.has('password')" class="help is-danger">Make your password strong. Use 8 or more characters with a mix of letters, numbers & symbols</span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <float-label :dispatch="false" label="Retype password">
                                                <input class="input is-primary-focus" name="password_confirmation" v-validate="'required|confirmed:password'" data-vv-as="password" :type="repwdType">
                                            </float-label>
                                            <span class="icon is-small is-right" @click="repwdcheck">
                                                <img v-if="repwdType=='password'" src="../../assets/images/tst/close-eye.png">
                                                <img v-else src="../../assets/images/tst/open-eye.png">
                                            </span>
                                            <span v-show="errors.has('password_confirmation')" class="help is-danger">Password does not match</span>
                                        </div>
                                    </div>
                                    <button v-bind:class="(isLoading)?'button is-info is-small is-loading':'button is-info is-small'">Sign Up</button>
                                    <p class="tdpc">By signing up, you agree to our Terms, Privacy Policy, Data Policy and Cookies Policy.</p>
                                </form>
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
        <app-footer></app-footer>
    </main>
</template>
<script>
import Vue from 'vue';
import VueTelInput from 'vue-tel-input'
Vue.component('vue-tel-input', VueTelInput.VueTelInput)
Vue.use(VueTelInput)
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate)
import appFooter from "../../components/global/AppFooter";
VeeValidate.Validator.extend("verify_password", {
    getMessage: field => "Make your password strong. Use 8 or more characters with a mix of letters, numbers & symbols",
    validate: value => {

        var strongRegex = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        return strongRegex.test(value);
    }
});
import { Validator } from 'vee-validate';
const dictionary = {
    custom: {
        email: {
            required: 'Email is required',
            email: 'The field must contain a valid Email'
        },
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
        components: {appFooter },
    data() {
        return {
            pwdType: 'password',
            repwdType: 'password',
            isActive: false,
            openmodal: false,
            errormessage: false,
            isLoading: false,
            fstlevel: true,
            secondlevel: false,
            error: [],
            loading: false,
            sitekey: "6Le8TekUAAAAAO7Qf7rYfvIEoV2t8fmWYSD_AyfJ",
            countryCode: 'CA',
            form: {
                full_name: '',
                email: "",
                password: "",
                mobile: '',
                countryname: '',
                gender: null,
                referral: this.$route.query.referral_acc,
            },
            isActive: false,

            gender: [
                'Male',
                'Female',
                'Rather not say',
                'Custom'
            ],
            custgender: null,
            customgender: false,
            infomsg: '',
            bindProps: {
                placeholder: "",
                invalidMsg: 'Invalid Number',
                inputOptions: {
                    showDialCode: true
                }
            }
            // bindProps: {
            //     mode: "international",
            //     defaultCountry: '',
            //     disabledFetchingCountry: false,
            //     disabled: false,
            //     disabledFormatting: false,
            //     placeholder: "Phone number",
            //     required: false,
            //     enabledCountryCode: false,
            //     enabledFlags: true,
            //     preferredCountries: [],
            //     ignoredCountries: [],
            //     autocomplete: "off",
            //     name: "telephone",
            //     maxLen: 25,
            //     invalidMsg: 'Invalid Number',
            //     wrapperClasses: "",
            //     inputClasses: "",
            //     dropdownOptions: {
            //         disabledDialCode: false
            //     },
            //     inputOptions: {
            //         showDialCode: true
            //     }
            // },


        };
    },

    created() {

    },

    methods: {
        onChange() {
            this.$emit('abc'); // vue events
            this.$refs.email.dispatchEvent(
                new Event('abc')
            );
        },

        pwdcheck() {
            if (this.pwdType === 'password') {
                this.pwdType = 'text';
            } else {
                this.pwdType = 'password';
            }
        },
        repwdcheck() {
            if (this.repwdType === 'password') {
                this.repwdType = 'text';
            } else {
                this.repwdType = 'password';
            }
        },
        quesmodel() {
            this.openmodal = true
            this.infomsg = "Security question is to add an extra layer of certainty to identify you when you have forgotten your password, entered the wrong credentials too many times, or tried to log in from an unfamiliar device or location."
        },
        whyneed() {
            this.openmodal = true
            this.infomsg = "<p>The following information will not be visible to other users except profession.</p><p> We require you to provide this information for your own safety and security.</p><p>Each member of TripShipTask is therefore a verified user. We verify your government issued id, contact number, Bank account details  to prevent unauthorized access to your account and to prevent/avoid unpleasant experience while interacting with another user as each member is held responsible for his/her unwanted actions.</p><p>Security question is to add an extra layer of certainty to identify you when you have forgotten your password, entered the wrong credentials too many times, or tried to log in from an unfamiliar device or location.</p>"
        },
        closeerrmsg() {
            this.error = []
            this.errormessage = false
        },


        countryChanged(country) {
            this.form.countryname = country.iso2
            // if (country.iso2 == "BD" || country.iso2 == "IN" || country.iso2 == "PK") {
            //     this.nidrequired = true
            //     this.dlrequired = false
            // } else {
            //     this.nidrequired = false
            //     this.dlrequired = true
            // }
        },

        async signup() {
            const results = Promise.all([
                this.$validator.validate('full_name'),
                this.$validator.validate('email'),
                this.$validator.validate('phone'),
                this.$validator.validate('gender'),
                this.$validator.validate('password'),
                this.$validator.validate('password_confirmation'),
            ]);
            const areValid = (await results).every(isValid => isValid);
            if (areValid) {
                this.isLoading = true
                this.$axios.post('auth/signup', this.form)
                    .then((result) => {
                        this.isLoading = false
                        if (result.response = 200) {
                            this.$router.push('/')
                            Swal.fire({
                                position: 'top',
                                title: 'Sign Up Successful!',
                                html: '<p style="text-align:center;font-size: 22px;font-weight: 600;">Please check your email to verify.</p>',
                                showConfirmButton: true,
                                imageUrl: 'https://dev.tripshiptask.com/assets/images/success.png',
                                imageWidth: 80,
                                imageHeight: 80,
                                imageAlt: 'success',
                                animation: true

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


    },
    watch: {
        'form.gender': function(val) {
            if (val == 'Custom') {
                this.customgender = true
            }
            if (val == 'Male') {
                this.customgender = false
            }
            if (val == 'Female') {
                this.customgender = false
            }
            if (val == 'Rather not say') {
                this.customgender = false
            }
        },
        'custgender': function(val) {
            if (val) {
                this.form.gender = val
            }
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
    width: 100px;
    height: 100px;
    margin-top: 10px;
}

.auth-outer .auth-box .side-box {
    background: #f4f6fb;
}

.auth-box .vfl-label {
    opacity: 1 !important;
    padding: 8px 10px !important;
    color: rgba(var(--f52, 142, 142, 142), 1) !important;
}

.label {
    margin-top: 5px;
}

.focused {
    top: -18px !important;
}

.focused span {
    background-color: #fff;
}

.ques {
    position: relative;
    top: -15px;
    right: -111px;
    cursor: pointer;
}


.login {
    background-color: #fff;
    background-color: rgba(var(--d87, 255, 255, 255), 1);
    border: 1px solid #dbdbdb;
    border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
    border-radius: 1px;
}

.is-thalf {
    padding-right: 2px;
    padding-left: 4px;
    width: 29.2%;
}

.is-thalf-right {
    padding-right: 0px;
    width: 29.2%;
    padding-left: 3px;
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
    margin-bottom: 0.7rem;
}

.title {
    margin: 22px auto 12px;
    font-size: 1.7em !important
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
    font-size: 0.2em;
    padding: 6px;
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

.item-list {
    margin-top: 0px !important
}

.auth-outer .auth-box .form-wrapper {
    position: relative;
    min-height: 480px;
    overflow: hidden;
    max-width: 400px;
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

.side-box img {
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

.help.is-danger {
    color: #f14668;
    width: 290px;
}

.loginfb .loginfbtext {
    margin-top: 2px;
    color: #385185;
    margin-left: 5px;
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

ul li {
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



.columns.is-gapless:not(:last-child) {
    margin-bottom: calc(1.5rem - 1.4rem) !important;
}

.select:not(.is-multiple) {
    height: 2em;
}

.input:active,
.input:focus {
    border-color: #b1aaaa !important;
}

.select select {
    background: #fafafa !important;
}

.gender {
    width: 73%;
}

@media only screen and (max-width:768px) {
    .gender {
        width: 85%;
    }

}

.icon img {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.icon.is-right {
    float: right;
    position: relative;
    top: -27px;
    width: 22px;
    right: 4px;
}

.pb-10 {
    padding-top: 10px;
}
</style>