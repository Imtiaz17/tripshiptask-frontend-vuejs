<template>
    <section>
        <div class="hero-body" style="padding-top:50px">
            <div class="container">
                <div class="columns is-centered is-mobile" style="text-align:center;">
                    <div class="column is-12">
                        <router-link to="/">
                        <img class="featured-drawing" src="../../assets/images/tst/tst-logo.jpg" alt="" width="150px">
                    </router-link>
                    </div>
                </div>
                <div class="columns is-centered is-desktop">
                    <div class="column is-5">
                        <div class="card">
                            <div class="card-content">
                                <p>You are being redirected to <router-link to='/'>login</router-link> page after successful verification. If not, click on Login to continue.</p>
                            </div>
                        </div>
                     <!--    <div class="card">
                            <div class="card-content">
                                <div class="columns">
                                    <div class="column">
                                        <div class="control">
                                            <float-label>
                                                <input type="text" class="input is-primary-focus" name="nid" v-model="form.nid" placeholder="National Id/Driving licence no">
                                            </float-label>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <div class="control">
                                            <float-label :dispatch="true">
                                                <div class="select is-select">
                                                    <select name="blood_group" v-model="form.blood_group">
                                                        <option :value="null" disabled selected>Select blood group</option>
                                                        <option v-for="(item,index) in bgroup" :key="index" :value="item">{{item}}</option>
                                                    </select>
                                                </div>
                                            </float-label>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <div class="control">
                                            <label class="label">Language I am proficient in</label>
                                            <div v-for="item in langs" style="display:inline-flex">
                                                <label class="checkbox">
                                                    <input type="checkbox" :value="item.value" v-model="form.language">{{item.text}} </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <div class="control">
                                            <float-label>
                                                <input type="text" class="input is-primary-focus" name="address" v-model="form.address" placeholder="Physical address (optional)">
                                            </float-label>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <div class="control">
                                            <float-label>
                                                <input type="text" class="input is-primary-focus" name="area" v-model="form.area" placeholder="Area where you reside (for ex. Minneapolis, Dhanmondi etc)">
                                            </float-label>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <div class="control">
                                            <float-label :dispatch="true">
                                                <div class="select is-select">
                                                    <select name="education" v-model="form.education">
                                                        <option :value="null" disabled selected>Last education completed</option>
                                                        <option v-for="(edu,index) in education" :key="index" :value="edu">{{edu}}</option>
                                                    </select>
                                                </div>
                                            </float-label>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column is-offset-4">
                                        <p class="control">
                                            <button @click="verify" v-bind:class="(loading)?'button button-cta primary-btn is-bold is-loading rounded raised no-lh ':'button button-cta primary-btn btn-outlined is-bold rounded raised no-lh'">
                                                Verify
                                            </button>
                                        </p>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column is-offset-3 resend">
                                        <router-link :to="{name:'resendvlink'}">
                                            Resend verification link
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div> -->
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
export default {
    components: {
        guestHeader
    },
    data() {
        return {
            loading: false,
            bgroup: ['A+', 'O+', 'B+', 'B-', 'A-'],
            langs: [
                { text: 'English', value: 'English' },
                { text: 'Bangla', value: 'Bangla' },
                { text: 'Arabic', value: 'Arabic' },
                { text: 'Chinese', value: 'Chinese' },
                { text: 'Spanish', value: 'Spanish' },
            ],
            form: {
                nid: '',
                blood_group: null,
                area: '',
                address: '',
                education:null,
                language: []
            },
            education: [
                'PHD',
                'Masters',
                'Bachelors',
                'High School Graduate',
                'High School Incomplete',
                'Didnt attend school'
            ],
            query: {
                expires: '',
                signature: ''
            }

        };
    },
    computed: {
        queryString() {
            return Object.keys(this.query)
                .map(k => `${k}=${this.query[k]}`)
                .join('&');
        },

    },

    created()
    {
        this.query.expires = this.$route.query.expires
        this.query.signature = this.$route.query.signature
        this.$axios.post(`auth/verification/verify/${this.$route.params.id}?${this.queryString}`)
         .then(res => {
                    if (res.status == 200) {
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
                    Toast.fire({
                        type: 'error',
                        text: error.response.data.errors.message,
                    })
                    this.$router.push({ name: 'root' })
                })

    },

    methods: {

        // verify() {
        //     this.loading = true
        //     this.$axios.post(`auth/verification/verify/${this.$route.params.id}?${this.queryString}`, this.form)
        //         .then(res => {
        //             if (res.status == 200) {
        //                 this.loading = false
        //                 Toast.fire({
        //                     type: 'success',
        //                     text: res.data.success.message,
        //                 })
        //                 this.$router.push({ name: 'login' })
        //             } else {
        //                 this.loading = false
        //             }

        //         })
        //         .catch(error => {
        //             this.loading = false
        //             Toast.fire({
        //                 type: 'error',
        //                 text: error.response.data.errors.message,
        //             })
        //         })

        // }
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
    width: 100px;
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

.checkbox {
    margin-right: 13px;
}

.checkbox input {
    cursor: pointer;
    margin-right: 2px;
}
</style>