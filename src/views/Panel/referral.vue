<template>
    <section>
         <vue-headful title="Referral" description="referral" />
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered is-desktop">
                    <div class="column is-10">
                        <h3 class="title is-spaced is-2" style="text-align:center">Add your friend, family, colleague or whoever you would like to invite to this platform <br>to get incentives offered by TripShipTask.
                        </h3>
                        <div class="card">
                            <div class="card-header">
                                <div class="columns">
                                    <div class="column is-12">
                                        <button class="button is-small btn-align accent-btn raised rounded btn-outlined" @click="popupActivo=true">Refer through E-mail</button>
                                    </div>
                                </div>
                                <input type="hidden" v-model="message">
                                <div class="columns is-mobile is-centered">
                                    <div class="column is-half">
                                        <button type="button" class="button is-small btn-align info-btn raised rounded " v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError">Click to copy this Invitation link</button>
                                    </div>
                                </div>
                            </div>
                            <div class="card-content">
                                <div v-if="isLoading">
                                    <img class="loading" src="../../assets/images/roaling.gif">
                                </div>
                                <div v-else-if="referrals.length>0" class="fixed_header">
                                <table class="table is-accent ">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Signed Up?</th>
                                            <th>Last invitation date</th>
                                            <th>Invitation Counter</th>
                                            <th> Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index) in referrals" :key="index">
                                            <td>
                                                {{item.email}}
                                            </td>
                                            <td v-if="item.signup==0">
                                                No
                                            </td>
                                            <td v-else-if="item.signup==1">
                                                Yes
                                            </td>
                                            <td>
                                                {{moment(item.updated_at).format('DD/MM/YYYY')}}
                                            </td>
                                            <td>
                                                {{item.mail_counter}}/5
                                            </td>
                                            <td>
                                                <button v-if="item.signup==0" v-bind:class="(btnindex==index)?'button is-small btn-align is-loading info-btn raised rounded':'button is-small btn-align accent-btn raised rounded btn-outlined'" @click="resend(item.email,index)">Resend invitation</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                                <div v-else>
                                    <div style="padding:20px;">
                                        <p style="font-size:26px;text-align:center;color:#ccc">You have no referrals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <vs-popup class="holamundo" :title="title" :active.sync="popupActivo">
                        <div class="columns">
                            <div class="column">
                                <div class="control">
                                    <float-label label="Email address" fixed>
                                        <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" class="input is-primary-focus" name="email" v-model="email">
                                    </float-label>
                                    <span v-show="errors.has('email')" class="help is-danger">Email is required</span>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-offset-9">
                                <p class="control">
                                    <button v-bind:class="(loading)?'button info-btn is-bold is-loading rounded raised':'button info-btn btn-outlined is-bold rounded raised'" @click="submit">
                                        Submit
                                    </button>
                                </p>
                            </div>
                        </div>
                    </vs-popup>
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
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(VueSweetalert2);
Vue.use(VeeValidate);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 6000,
    timerProgressBar: true,
})
import moment from 'moment'
export default {
    components: {

    },
    data() {
        return {
            message: `https://app.tripshiptask.com/signup?referral_acc=${this.$store.getters.user.accno}`,
            rsndloading: false,
            isLoading: false,
            moment: moment,
            title: 'Add an email address to send an invitation',
            loading: false,
            email: '',
            popupActivo: false,
            referrals: [],
            btnindex: null
        }
    },
    computed: {},
    created() {
        this.getReferralsList()
    },
    mounted() {

    },
    methods: {
        getReferralsList() {
            this.isLoading = true
            this.$axios.get('myreferrals')
                .then(res => {
                    this.isLoading = false
                    this.referrals = res.data
                })
        },


        onCopy: function(e) {
            alert('Invitation link is copied to your clipboard.')
        },
        onError: function(e) {
            alert('Failed to copy texts')
        },
        resend(email, index) {
            this.btnindex = index
            this.$axios.put('resendreferralLink', { email: email })
                .then(res => {
                    Toast.fire({
                        type: 'success',
                        text: res.data.success.message,
                    })
                    this.btnindex = null
                    this.getReferralsList()
                    
                })
                .catch(error => {
                    this.btnindex = null
                    Toast.fire({
                        type: 'error',
                        text: error.response.data.error.message,
                    })
                });
        },
        submit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.loading = true
                    this.$axios.post('referral', { email: this.email })
                        .then(res => {
                            this.loading = false
                            this.popupActivo = false
                            this.getReferralsList()
                            this.email = ''
                                Toast.fire({
                                type: 'success',
                                text: res.data.success.message,
                            })
                        })
                        .catch(error => {
                            this.email = ''
                            this.loading = false
                            this.popupActivo = false
                            Toast.fire({
                                type: 'error',
                                text: error.response.data.error.message,
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

.card-header {
    padding: 10px;
    justify-content: center;
    display: block !important;
    text-align: center;
}
.card-content {
    background-color: transparent;
    padding:0rem;
}
.title.is-2 {
    font-size: 1.1rem;
    line-height: 1.4em;
}

.button.btn-align {
    padding: 5px 13px 6px;
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

</style>