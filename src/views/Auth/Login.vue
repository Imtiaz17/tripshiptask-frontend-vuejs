<template>
    <div style="height:100vh">
        <div class="login-wrapper columns is-gapless">
            <!-- Image section (hidden on mobile) -->
            <div class="column login-column is-7 is-hidden-mobile hero-banner side-img">
                    
            </div>
            <!-- /Image section -->
            <!-- Form section -->
            <div class="column is-5">
                <div class="hero is-fullheight">
                    <div class="hero-heading">
                        <!-- Logo -->
                        <div class="section has-text-centered">
                            <router-link to="/">
                                <h1>TripShipTask</h1>
                            </router-link>

                        </div>
                        <!-- Don't have an account yet -->
                        <div class="no-account-link has-text-centered">
                            <p style="color:#A9ABAC;">Login to start your session </p>
                        </div>
                    </div>
                    <div class="hero-body">
                        <div class="container">
                            <div class="columns">
                                <div class="column"></div>
                                <div class="column is-7">
                                    <ul v-if="error.length>0" v-show="error.length=1">
                                        <li class="help is-danger" v-for="errors in error">{{ errors }}</li>
                                    </ul>
                                    <form @submit.prevent="login">
                                        <div id="signin-form" class="login-form animated preFadeInLeft fadeInLeft">
                                            <!-- Input -->
                                            <div class="field pb-10">
                                                <div class="control">
                                                    <input class="input is-primary-focus" v-model="form.email" name="email" v-validate="'required|email'" data-vv-as="email" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="email *">
                                                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                                                </div>
                                            </div>
                                            <!-- Input -->
                                            <div class="field pb-30">
                                                <div class="control">
                                                    <input class="input is-primary-focus" v-model="form.password" name="password" v-validate="'required'" ref="password" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="Password *">
                                                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                                                </div>
                                                <p style="float:right">
                                                <router-link :to="{name:'forgotpassword'}">Forgot password?</router-link>
                                             </p>
                                            </div>
                                                
                                             <div class="columns">
                                              <div class="column is-12">
                                                <!-- <div class="control">
                                                  <vue-recaptcha
                                                    name="recaptcha"
                                                    v-validate="'required'"
                                                    v-model="form.recaptcha"
                                                    ref="recaptcha"
                                                    @verify="onVerify"
                                                    :sitekey="sitekey"
                                                  ></vue-recaptcha>
                                                  <span
                                                    v-show="errors.has('recaptcha')"
                                                    class="help is-danger"
                                                  >{{ errors.first('recaptcha') }}</span>
                                                </div> -->
                                              </div>
                                            </div>

                                           
                                            <p class="control login">
                                                <button v-bind:class="(loading)?'button button-cta primary-btn is-bold is-fullwidth rounded raised no-lh is-loading':'button button-cta primary-btn btn-outlined is-bold is-fullwidth rounded raised no-lh'">
                                                    Log in
                                                </button>
                                            </p>
                                        </div>
                                    </form>
                                    <!-- /Login Form -->
                                    <!-- Reset Form -->
                                    

                                    <!-- /Reset Form -->
                                    <!-- Toggles -->
                                    <!-- <div id="recover" class="section forgot-password animated preFadeInLeft fadeInLeft">
                                        <p class="has-text-centered">
                                                <router-link :to="{name:'forgotpassword'}">Forgot password?</router-link>
                                        </p> -->
                                        <!-- <p class="has-text-centered pt-20">
                                           <a> <router-link to="/register">Register a new account</router-link> </a>
                                       </p> -->
                                    <!-- </div> -->
                                    <!-- /Toggles -->
                                </div>
                                <div class="column"></div>
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
import VeeValidate from 'vee-validate';
import VueRecaptcha from 'vue-recaptcha';
Vue.use(VeeValidate);
Vue.component("vue-recaptcha", VueRecaptcha);
export default {

    data() {
        return {
            status: '',
            sitekey: '6LdQDKMUAAAAAMdResAK8raXyVlKrm4aDpyfJUGR',
            dismissSecs: 5,
            dismissCountDown: 0,
            showDismissibleAlert: false,
            alert: '',
            error: [],
            form: {
                email: null,
                password: null,
                recaptcha: null
            },

            loading: false
        }

    },
    components: { alert, VeeValidate },
    created() {
        // if (this.$route.query.alert) {
        //     this.alert = this.$route.query.alert;
        // }

        // if (User.loggedin()) {
        //     this.$router.go(-1)
        // }
        
    },
    methods: {
        onVerify(response) {
            this.form.recaptcha = response;
        },
        login() {
            // EventBus.$emit('opennotification',{
            //     'classname':'is-warning',
            //     'text':'Done, go this here',
            //     'link':'register'
            // })
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.loading = true;
                    this.$axios.post('auth/login', this.form)
                        .then(res => {
                            this.$store.dispatch('saveToken', {
                                token: res.data.access_token,
                            }, )
                             
                        })

                        .catch(error => {
                            this.loading = false;
                            this.$vs.notify({
                                title: 'Error',
                                time: 6000,
                                text: error.response.data.message,
                                position: 'top-right',
                                color: 'danger',
                                icon: 'error'
                            })
                        })
                }
            })

        }
    }
}

</script>
<style scoped>
.hero.is-fullheight {
    min-height: 80vh;
}
.side-img
{
    background-image:url('../../assets/images/login.png');
    background-size: cover;
    background-repeat: no-repeat;
    position: relative
}
.button-cta
{
    padding:17px !important;
}

body {
    font-size: 1rem;
}

h1 {
    font-size: 50px;
}
.hero-body {
    flex-grow: 1;
    flex-shrink: 0;
    padding: 1rem 3rem 1.5rem;
}
.section {
    padding:3rem 1rem 1.5rem;
}

</style>
