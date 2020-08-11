<template>
    <div class="maincolumns">
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <div class="stats-card flex-card light-bordered light-raised">
                        <div class="img-header">
                            <div class="img-block has-text-centered">
                                <img :src="getProfilePhoto(propic)">
                                <div class="profilename">
                                    <div class="name"><b>{{user.full_name}}</b>
                                    </div>
                                    <div class="verified" v-if="user.status=='verified'">
                                        <span class="material-icons">
                                            verified
                                        </span>
                                        <span>Govt Id Verified</span>
                                    </div>
                                </div>
                                <div class="file has-name">
                                    <label class="file-label">
                                        <input class="file-input" type="file" v-on:change="onPhotoChnage">
                                        <span class="button is-small btn-align accent-btn raised rounded btn-outlined">
                                            <span class="file-label">
                                                Change profile picture
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="card-body" style="padding:5px 1px;">
                            <div class="inline-stats has-text-centered">
                                <div class="stats-item">
                                    <div class="stat-name">
                                        Income
                                    </div>
                                    <div class="stat-data">
                                        {{user.received}} {{currency}}
                                    </div>
                                </div>
                                <div class="stats-item">
                                    <div class="stat-name">
                                        Spent
                                    </div>
                                    <div class="stat-data">
                                        {{user.spent}} {{currency}}
                                    </div>
                                </div>
                                <div class="stats-item">
                                    <div class="stat-name">
                                        Balance
                                    </div>
                                    <div class="stat-data">
                                        {{user.balance}} {{currency}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <aside class="menu">
                        <ul class="menu-list">
                            <li>
                                <router-link :to="{name:'generalinfo'}">
                                    General & Contact Info
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'nidinfo'}">
                                    NID Info
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'vehicleinfo'}">
                                    Vehicle Info
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'changepassword'}">
                                    Change Password
                                </router-link>
                            </li>
                        </ul>
                    </aside>
                    <!-- <div class="columns is-vcentered is-mobile">
                        <div class="column is-12">
                            
                        <router-link :to="{name:'billingpayment'}">
                            <span>NID Info</span>
                        </router-link>
                        <router-link :to="{name:'paymentmethods'}">
                            <span>Vehicle Info</span>
                        </router-link>
                
                            
                        </div>
                    </div> -->
                </div>
                <div class="column is-9">
                    <router-view></router-view>
                    <!--  <edit-profile v-if="gediting" :data="user"></edit-profile>
                    <security-info v-else-if="sediting" :data="user"></security-info>
                
                    <my-profile v-else :data="user"></my-profile> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
})
export default {
    data() {
        return {
            isLoading: false,
            myProfile: true,
            completedTask: false,
            postedTask: false,
            gediting: false,
            sediting: false,
            form: '',
            photo: "",
            provideNidInfo: false,

        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        data() {
            return this.$store.getters.transactions.data
        },
        propic() {
            return this.$store.getters.user.profile_picture
        },
        currency() {
            return this.$store.getters.user.currency
        },
    },


    mounted() {
        EventBus.$on('change', this.getUserTransaction)
    },
    methods: {
        editProfile() {
            //this.gediting=true
            EventBus.$emit('startEditing')
        },
        editNid() {
            this.provideNidInfo = true
        },
        onPhotoChnage(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (file) => {
                this.photo = reader.result;
            }
            reader.readAsDataURL(file);
            setTimeout(() => {
                this.$axios.patch(`auth/update/${this.user.id}`, { photo: this.photo })
                    .then(res => {
                        if (res.status == 200) {
                            this.$store.dispatch('getInfo')
                            Toast.fire({
                                type: 'success',
                                title: 'Profile picyure successfuly updated'
                            })
                        }

                    })
            }, 500)
        },
        getProfilePhoto(pic) {
            let photo = (this.photo.length > 200) ? this.photo : pic
            return photo;
        },



    },
}
</script>
<style scoped>
.maincolumns {
    padding-top: 20px;
}

.label {
    display: inline;
    font-size: 14px;
    margin-right: 10px;
}

.stats-card .img-header .img-block .verified img {
    border: 0px;
    padding: 0px;
    box-shadow: none;
}

a.link {
    color: #009CDA;
    cursor: pointer;
}

.profilename {
    display: flex;
    justify-content: center;
    margin: 10px;
}


.header-title {
    font-size: 30px;
    font-weight: 600
}

.file {
    justify-content: center !important;
}

.editor-link {
    float: right;
}

.is-contact-info .single-contact-tabs .tabs {
    margin-bottom: -11px;
}


.name {
    padding-bottom: 5px;
}

.router-link-exact-active {
    background-color: #EFF4F7;
}

stats-card .img-header {
    min-height: 220px;
    width: 100%;
    background: #fff !important;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
}

.stats-card .img-header .img-block img {
    max-height: 150px;
    border-radius: 2% !important;
    border: 1px solid #4FC1EA;
    padding: 7px;
    -webkit-box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.41);
    -moz-box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.41);
    box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.41);

}

.is-vcentered {
    text-align: center;
}

.img-header {
    min-height: 150px;
    padding-top: 10px;
    margin-bottom: 5px;
}

.button.btn-align {
    padding: 5px 13px 6px;
}

.menu {
    background: #fff;
    padding: 10px;
    box-shadow: 0 3px 10px 4px rgba(0, 0, 0, .04);
}

.stat-data {
    font-weight: bold;
    font-size: 1.1rem !important;
}

.inline-stats {
    display: flex;
    justify-content: center;
    font-weight: 500;
}

.stats-item {
    margin: 0px 20px;
}
</style>