<template>
    <section>
    <vue-headful title="Profile | General & Contact Info"/>
        <edit-profile v-if="gediting" :data="data"></edit-profile>
        <div v-else style="margin-bottom: 5%;">
            <div class="card">
                <header class="card-header">
                    General & Contact Info
                </header>
                <div class="card-content">
                    <div class="content">
                        <div class="columns is-mobile">
                            <div class="column is-6-desktop is-6-mobile">
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-4-desktop is-6-mobile">
                                            <div class="info-title">
                                                Full name
                                            </div>
                                        </div>
                                        <div class="column is-8-desktop is-6-mobile">
                                            <div class="info-description highlighted">
                                                {{data.full_name}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-4-desktop is-6-mobile">
                                            <div class="info-title">
                                                Education
                                            </div>
                                        </div>
                                        <div class="column is-8-desktop is-6-mobile">
                                            <div class="info-description">
                                                {{data.education}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-4-desktop is-6-mobile">
                                            <div class="info-title">
                                                Profession
                                            </div>
                                        </div>
                                        <div class="column is-8-desktop is-6-mobile">
                                            <div class="info-description">
                                                {{data.profession}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-4-desktop is-6-mobile">
                                            <div class="info-title">
                                                Date of Birth
                                            </div>
                                        </div>
                                        <div class="column is-8-desktop is-6-mobile">
                                            <div class="info-description">
                                                {{moment(data.dob).format("ll")}}
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-4-desktop is-6-mobile">
                                            <div class="info-title">
                                                NID No:
                                            </div>
                                        </div>
                                        <div class="column is-8-desktop is-6-mobile">
                                            <div class="info-description">
                                                {{data.identity_no}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-4-desktop is-6-mobile">
                                            <div class="info-title">
                                                Blood Group
                                            </div>
                                        </div>
                                        <div class="column is-8-desktop is-6-mobile">
                                            <div class="info-description">
                                                {{data.blood_group}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-4-desktop is-6-mobile">
                                            <div class="info-title">
                                                Age
                                            </div>
                                        </div>
                                        <div class="column is-8-desktop is-6-mobile">
                                            <div class="info-description" v-if="data.dob">
                                                <span>{{moment().diff(data.dob, 'years') }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-4-desktop is-6-mobile">
                                            <div class="info-title">
                                                Gender
                                            </div>
                                        </div>
                                        <div class="column is-8-desktop is-6-mobile">
                                            <div class="info-description">
                                                {{data.gender}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-4-desktop is-6-mobile">
                                            <div class="info-title">
                                                Language
                                            </div>
                                        </div>
                                        <div class="column is-8-desktop is-6-mobile">
                                            <div class="info-description">
                                                {{data.language}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--  <div class="column is-1-desktop is-0-mobile">
                            </div> -->
                            <div class="column is-6-desktop is-6-mobile">
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-5-desktop is-6-mobile">
                                            <div class="info-title">
                                                Email
                                            </div>
                                        </div>
                                        <div class="column is-7-desktop is-6-mobile">
                                            <div class="info-description">
                                                {{data.email}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-5-desktop is-6-mobile">
                                            <div class="info-title">
                                                Personal Number
                                            </div>
                                        </div>
                                        <div class="column is-7-desktop is-6-mobile">
                                            <div class="info-description">
                                                {{data.mobile}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-5-desktop is-6-mobile">
                                            <div class="info-title">
                                                Residence Area
                                            </div>
                                        </div>
                                        <div class="column is-7-desktop is-6-mobile">
                                            <div class="info-description">
                                                {{data.residance_area}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-5-desktop is-6-mobile">
                                            <div class="info-title">
                                                Emergency contact number
                                            </div>
                                        </div>
                                        <div class="column is-7-desktop is-6-mobile">
                                            <div class="info-description">
                                                {{data.emergency_contact_number}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-5-desktop is-6-mobile">
                                            <div class="info-title">
                                                Emergency contact person name
                                            </div>
                                        </div>
                                        <div class="column is-7-desktop is-6-mobile">
                                            <div class="info-description">
                                                {{data.emergency_contact_person_name}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-5-desktop is-6-mobile">
                                            <div class="info-title">
                                                Facebook profile link
                                            </div>
                                        </div>
                                        <div class="column is-7-desktop is-6-mobile">
                                            <div class="info-description">
                                                {{data.fblink}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="has-text-right">
                    <a @click="edit" class="button info-btn raised ripple">Edit Profile</a>
                </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import editProfile from '../../components/profile/editprofile'
import moment from 'moment'
import { mapActions } from 'vuex';

export default {
    components: { editProfile },
    data() {
        return {
            birthday: '',
            moment: moment,
            first: true,
            second: false,
            sediting: false,
            gediting: false,


        }

    },
    computed: {
        id() {
            return this.$store.getters.id
        },
        vehicles() {
            return this.$store.getters.vehicles
        },
        licence() {
            return this.$store.getters.user.licence
        },
        data() {
            return this.$store.getters.user
        }

    },
    created() {
        this.getVehicleInfo()
        // axios.get(`api/getvehiclesinfo/${this.id}`)
        //     .then(res => {
        //         this.vehicles = res.data;
        //     })

        // this.birthday = this.data.email
    },
    mounted() {
        EventBus.$on('cancelEditing', () => {
            this.gediting = false

        })
        EventBus.$on('startEditing', () => {
            this.gediting = true

        })


    },
    methods: {
        ...mapActions("trip",
            ['getVehicleInfo']),

        document_photo(pic) {
            return pic
        },
        edit() {
            this.gediting = true
        },
        general() {
            this.first = true,
                this.second = false
        },
        security() {
            this.first = false,
                this.second = true
        },
        getProfilePhoto() {
            return require('../../assets/images/' + this.data.profile_picture)
        },
        getIdentityPhoto() {
            return require('../../assets/images/' + this.data.nid)

        },
    }


}
</script>
<style scoped>
.card-header {
    padding: 16px;
    font-weight: 500;
}

img {
    width: 200px;
    height: 125px;
}

.info-title::after {
    content: ":";
    float: right;
}

.info-title {
    font-weight: 500;
}
.title {
    font-family: 'Segoe UI', sans-serif;
    font-size: 14px;
}

.info-description {
    word-wrap: break-word
}
</style>