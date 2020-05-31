<template>
    <div class="maincolumns">
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <div class="stats-card flex-card light-bordered light-raised">
                        <div class="img-header" style="min-height:150px;padding-top:10px;     margin-bottom:0px;">
                            <div class="img-block has-text-centered">
                                <div>
                                    <img :src="photo"></div>
                                <div class="name"><b>{{user.full_name}}</b></div>
                            </div>
                        </div>
                        <div class="card-body" style="padding:5px 1px;">
                            <div class="inline-stats has-text-centered">
                                <div class="stats-item">
                                    <div class="stat-name">
                                        Income
                                    </div>
                                    <div class="stat-data">
                                        {{user.receive}}
                                    </div>
                                </div>
                                <div class="stats-item">
                                    <div class="stat-name">
                                        Spent
                                    </div>
                                    <div class="stat-data">
                                        {{user.spent}}
                                    </div>
                                </div>
                                <div class="stats-item">
                                    <div class="stat-name">
                                        Balance
                                    </div>
                                    <div class="stat-data">
                                        {{user.balance}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-9">
                    <edit-profile v-if="gediting" :data="user"></edit-profile>
                    <security-info v-else-if="sediting" :data="user"></security-info>
                    <total-balance v-else-if="totalBalance" :data="data"></total-balance>
                    <div v-else>
                        <my-profile v-if="myProfile" :data="user"></my-profile>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import myProfile from '../../components/profile/MyProfile'
import editProfile from '../../components/profile/editprofile'
import securityInfo from '../../components/profile/SecurityInfo'
import totalBalance from '../../components/profile/TotalBalance'
import { mapActions } from 'vuex';
export default {
    components: { myProfile, totalBalance, editProfile, securityInfo },
    data() {
        return {
            isLoading: false,
            myProfile: true,
            totalBalance: false,
            completedTask: false,
            postedTask: false,
            gediting: false,
            sediting: false,
            form: '',

        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        data() {
            return this.$store.getters.transactions.data
        },
        photo() {
            return this.$store.getters.user.profile_picture
        },
    },


    mounted() {
       this.$axios.get('auth/profile')

        EventBus.$on('change', this.getUserTransaction)

        EventBus.$on('credit', () => {
            this.myProfile = false,
                this.completedTask = false
            this.postedTask = false
            this.totalBalance = true
        })
        EventBus.$on('profile', () => {
            this.myProfile = true,
                this.completedTask = false
            this.postedTask = false
            this.totalBalance = false
        })
        EventBus.$on('complete', () => {
            this.myProfile = false,
                this.completedTask = true
        })
        EventBus.$on('posting', () => {
            this.myProfile = false,
                this.completedTask = false,
                this.postedTask = true
        })
    },
    methods: {
       
        listen() {
            EventBus.$on('profileEdit', () => {
                this.gediting = true
            })
            EventBus.$on('cancelEditing', () => {
                this.gediting = false
            })
            EventBus.$on('contact', () => {
                this.general = false
                this.contact = true
                this.security = false
            })
            EventBus.$on('security', () => {
                this.general = false
                this.contact = false
                this.security = true
            })
        },
        getUserInfo() {


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


a.link {
    color: #009CDA;
    cursor: pointer;
}

.header-title {
    font-size: 30px;
    font-weight: 600
}

.editor-link {
    float: right;
}

.is-contact-info .single-contact-tabs .tabs {
    margin-bottom: -11px;
}

.info-title {
    font-weight: 600;
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

.stat-data {
    font-weight: bold;
    font-size: 1.1rem !important;
}
.inline-stats
{
    display:inline-flex;
}
.stats-item
{
    margin: 0px 20px;
}
</style>