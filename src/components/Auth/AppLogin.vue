<template>
    <main>
        <vue-headful title="Login | TripShipTask" description="Login" />
        <div class="auth-outer">
            <article class="message is-danger" v-show="errormessage">
                <div class="message-header">
                    <p>Login failed!</p>
                    <button class="delete" aria-label="delete" @click="errormessage=false"></button>
                </div>
                <div class="message-body">
                    <p>{{error}}</p>
                </div>
            </article>
            <div class="auth-box">
                <div class="side-box">
                    <div class="carosal-wrapper">
                        <carousel :items="1" :dots="false" :nav="false" :autoplay="true">
                            <img class="featured-drawing" src="../../assets/images/tst/trip_mobile.png" alt="" width="100px">
                            <img class="featured-drawing" src="../../assets/images/tst/ship_mobile.png" alt="" width="100px">
                            <img class="featured-drawing" src="../../assets/images/tst/task_mobile.png" alt="" width="100px">
                        </carousel>
                    </div>
                </div>
                <div class="form-wrapper">
                    <div class="login">
                        <div class="item-list">
                            <img class="featured-drawing" src="../../assets/images/tst/tstlogo.png" alt="" width="100px">
                        </div>
                        <div class="body">
                            <form @submit.prevent="login">
                                <div class="field">
                                    <div class="control">
                                        <float-label label="Email">
                                            <input type="text" class="input" v-model="form.email" name="email" v-validate="'required'" :class="{ 'is-danger': errors.has('email') }" />
                                        </float-label>
                                    </div>
                                    <span v-show="errors.has('email')" class="help is-danger">Email is required</span>
                                </div>
                                <div class="field">
                                    <div class="control">
                                        <float-label label="Password">
                                            <input :type="pwdType" class="input" v-model="form.password" name="password" v-validate="'required'" :class="{ 'is-danger': errors.has('password') }" />
                                        </float-label>
                                        <span class="icon is-small is-right" @click="pwdcheck">
                                              <img v-if="pwdType=='password'" src="../../assets/images/tst/close-eye.png">
                                                <img v-else src="../../assets/images/tst/open-eye.png">
                                        </span>
                                    </div>
                                    <span v-show="errors.has('password')" class="help is-danger">Password is required</span>
                                </div>
                                <button type="submit" v-bind:class="(loading)?'button is-info is-small is-loading':'button is-info is-small'">Login</button>
                                <vs-divider>OR</vs-divider>
                                <div class="loginfb">
                                    <button type="button">
                                        <span><img src="https://img.icons8.com/color/48/000000/facebook.png" /></span>
                                        <span class="loginfbtext">Login with Facebook</span>
                                    </button>
                                </div>
                                <router-link :to="{name:'forgotpassword'}" class="forgot-password">Forgot Password?</router-link>
                            </form>
                        </div>
                    </div>
                    <div class="signupbox">
                        <div class="body">
                            <span>Don't have an account?
                                <router-link to="/signup" style="font-weight:600">
                                    <span>Sign up</span>
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
import carousel from "vue-owl-carousel";
import appFooter from "../../components/global/AppFooter";
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate)
export default {
    components: { carousel,appFooter },

    data() {
        return {
            pwdType: 'password',
            errormessage: false,
            error: '',
            loading: false,
            sitekey: "6Le8TekUAAAAAO7Qf7rYfvIEoV2t8fmWYSD_AyfJ",
            form: {
                email: "",
                password: "",
                recaptcha: ""
            }
        };
    },
    directives: {
        carousel: {
            inserted: function(el) {
                $(el).owlCarousel({
                    loop: true,
                    margin: 20,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 3
                        }
                    }
                }).trigger('to.owl.carousel', app.items.length)
                console.log("crousel inserted")
            },
        }
    },
    methods: {
        pwdcheck() {
            if (this.pwdType === 'password') {
                this.pwdType = 'text';
            } else {
                this.pwdType = 'password';
            }
        },
        onVerify(response) {
            this.form.recaptcha = response;
        },
        login() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.loading = true;
                    this.$axios
                        .post("auth/login", this.form)
                        .then(res => {
                            this.$store.dispatch("saveToken", {
                                token: res.data.access_token
                            });
                        })
                        .catch(error => {
                            this.loading = false
                            this.errormessage = true
                            this.error = error.response.data.message
                            // if (error.response.status == 422) {
                            //     this.error.push("Please enter valid Email or Password");
                            // } else {
                            //     this.error.push("error,try again");
                            // }
                        });
                }
            });
        }
    }
};
</script>
<style scoped>
.auth-outer .auth-box .form-wrapper .login .body button[type=submit] {
    height: 40px !important;
}

.item-list img {
    width: 100px;
    height: 100px;
}

.auth-outer .auth-box .side-box {
    background: #f4f6fb;
    width: 550px;
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
    padding: 8px 0 7px 8px !important;
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

.auth-outer .auth-box .form-wrapper {
    position: relative;
    min-height: 480px;
    overflow: hidden;
    max-width: 350px;
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
    border: 0;
}

.loginfb img {
    width: 25px;
}

.loginfb .loginfbtext {
    margin-top: 2px;
    color: #385185;
    margin-left: 5px;
}

.forgot-password {
    color: #00376b;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
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

.side-box img {
    margin-left: 89px;
    margin-top: -26px;
}

.applink img {
    margin-right: 7px;
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

.carosal-wrapper {

    max-width: 417px;

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

.side-box img {
    width: 380px !important;
    height: auto;

}
</style>