<template>
    <section>
        <div class="hero-body" style="padding-top:20px">
            <div class="container">
                <div class="columns is-centered is-mobile" style="text-align:center;">
                    <div class="column is-12">
                        <router-link to="/">
                        <img class="featured-drawing" src="../../assets/images/tst/tst-logo.jpg" alt="" width="150px">
                    </router-link>
                    </div>
                </div>
                <div class="columns is-centered is-desktop">
                    <div class="column is-4">
                        <h3 class="title is-spaced is-2" style="text-align:center">Reset Password
                        </h3>
                        <div class="card">
                            <div class="card-content">
                                <div class="columns">
                                    <div class="column">
                                        <div class="control">
                                            <float-label>
                                                <input type="text" class="input is-primary-focus" name="email" v-model="form.email" readonly>
                                            </float-label>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <div class="control">
                                            <float-label>
                                                <input type="password" class="input is-primary-focus" name="password" v-validate="'required|min:6'" ref="password" v-model="form.password" placeholder="New password">
                                            </float-label>
                                            <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <div class="control">
                                            <float-label>
                                                <input type="password" class="input is-primary-focus" name="password_confirmation" v-validate="'confirmed:password'" data-vv-as="password" v-model="form.password_confirmation" placeholder="Retype password">
                                            </float-label>
                                            <span v-show="errors.has('password_confirmation')" class="help is-danger">Password does not match</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <p class="control" style="text-align:center">
                                            <button @click="reset" v-bind:class="(loading)?'button button-cta primary-btn is-bold is-loading rounded raised no-lh ':'button button-cta primary-btn btn-outlined is-bold rounded raised no-lh'">
                                                Reset password
                                            </button>
                                        </p>
                                    </div>
                                </div>
                                <!-- <div class="columns">
                                <div class="column is-offset-3 resend">
                                    <router-link :to="{name:'resendvlink'}">
                                        Resend verification link
                                    </router-link>
                                </div>
                            </div> -->
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
import guestHeader from '@/components/global/guestheader'
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 6000,
    timerProgressBar: true,
})
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from 'vee-validate';
const dictionary = {
    custom: {
        password: {
            required: 'Password is required',
            min: 'Password must be at least 6 characters',
        },
    }

};
Validator.localize('en', dictionary);

export default {
    components: {
        guestHeader
    },
    data() {
        return {
            loading: false,
            form: {
                email: '',
                password: '',
                password_confirmation: '',
                token: ''
            },

        };
    },
    methods: {
        reset() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.loading = true
                    this.$axios.post('auth/password/reset', this.form)
                        .then(res => {
                            if (res.status == 200) {
                                this.loading = false
                                Toast.fire({
                                    type: 'success',
                                    text: res.data.success.message,
                                })
                                this.$router.push({ name: 'root' })
                            } else {
                                this.loading = false
                            }

                        })
                        .catch(error => {
                            this.loading = false
                            Toast.fire({
                                type: 'error',
                                text: error.response.data.errors.message,
                            })
                        })
                }
            })

        }
    },
    created() {
        this.form.email = this.$route.query.email
        this.form.token = this.$route.params.token

    },


}
</script>
<style scoped>
.resend a {
    text-align: center;
}

.select select {
    font-size: 0.9rem;
    height: 2.2rem;
    min-width: 100% !important;
    line-height: 1.2;
}

.con-select {
    width: 100%;
    clear: both;
}

select {
    padding: 0.2rem 1rem;
}

.select {
    width: 100%;
}

.button.button-cta {
    padding: 11px 40px !important;
    width: 200px;
}

.is-right {
    float: right;
}

.field.lg .field-input {
    height: 2.2rem !important;
    min-height: 2.4rem !important;
    font-size: 0.9rem !important;
}

.title.is-2 {
    font-size: 1.2rem;
}
</style>