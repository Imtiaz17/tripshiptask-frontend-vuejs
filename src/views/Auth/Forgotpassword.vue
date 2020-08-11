<template>
    <section>
         <vue-headful title="Forgotten Password | TripShipTask" />
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered is-mobile" style="text-align:center;">
                    <div class="column is-12">
                        <router-link to="/">
                        <img class="featured-drawing" src="../../assets/images/tst/tstlogo.png" alt="" width="150px">
                    </router-link>
                    </div>
                </div>
                <div class="columns is-centered is-desktop forgotpassword">
                    <div class="column is-5">
                        <h3 class="title is-spaced is-2" style="text-align:center">Trouble Logging In?
                        </h3>
                        <h4>Enter your email and we'll send you a link to get back into your account.</h4>
                         
                        <div class="card">
                            <div class="card-content">
                                <div class="columns">
                                    <div class="column">
                                        <div class="control">
                                            <float-label label="Email address">
                                                <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" class="input is-primary-focus" name="email" v-model="email">
                                            </float-label>
                                             <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column is-offset-8">
                                        <p class="control">
                                            <button v-bind:class="(loading)?'button button-cta info-btn is-bold is-loading rounded raised no-lh':'button button-cta info-btn btn-outlined is-bold rounded raised no-lh'" @click="submit">
                                                Submit
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
import VeeValidate from 'vee-validate';
Vue.use(VueSweetalert2);
Vue.use(VeeValidate);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 6000,
    timerProgressBar: true,
})
export default {
    components: {
        
    },
    data() {
        return {
            loading: false,
            email: ''
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
        submit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.loading = true
                    this.$axios.post('auth/forgotpassword', { email: this.email })
                        .then(res => {
                            this.loading = false
                            Toast.fire({
                                type: 'success',
                                text: res.data.success.message,
                            })
                            this.email = ''
                            this.$router.push({ name: 'root' })
                        })
                        .catch(error => {
                            this.loading = false
                            Toast.fire({
                                type: 'error',
                                text: error.response.data.errors.message,
                            })
                        });
                }
            })
        }
    },
    watch: {

    }
};
</script>
<style scoped>
.title.is-2 {
    font-size: 1.2rem;
}

.button.button-cta {
    padding: 11px 40px !important;
    width: 100px;
}
.title-divider {
    margin: 0 auto;
    width: 80px;
    height: 3px;
    background: #039be5;
    margin-bottom: 5px;
}
.forgotpassword h3
{
    margin-bottom: 0.8em !important;
}
.forgotpassword h4
{
    padding-bottom: 10px;
    text-align: center;
    font-size: 15px;
    color: #8e8e8e;
}
</style>