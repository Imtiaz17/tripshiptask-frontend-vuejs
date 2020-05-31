<template>
    <section>
        <guestHeader />
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered is-desktop">
                    <div class="column is-5">
                        <h3 class="title is-spaced is-2" style="text-align:center">Provide email address
                        </h3>
                        <div class="card">
                            <div class="card-content">
                                <div class="columns">
                                    <div class="column">
                                        <div class="control">
                                            <float-label>
                                                <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" class="input is-primary-focus" name="email" v-model="email" placeholder="Email address">
                                            </float-label>
                                             <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column is-offset-8">
                                        <p class="control">
                                            <button v-bind:class="(loading)?'button button-cta primary-btn is-bold is-loading rounded raised no-lh':'button button-cta primary-btn btn-outlined is-bold rounded raised no-lh'" @click="submit">
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
import guestHeader from '@/components/global/guestheader'
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
        guestHeader
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
                    this.$axios.post('auth/resend', { email: this.email })
                        .then(res => {
                            this.loading = false
                            Toast.fire({
                                type: 'success',
                                text: res.data.success.message,
                            })
                            this.email = ''
                            this.$router.push({ name: 'home' })
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
</style>