<template>
    <div>
        <edit-profile v-if="gediting" :data="data"></edit-profile>
        <div v-else style="margin-bottom: 5%;">
            <div class="border-card">
                <vs-tabs>
                    <vs-tab label="General & Contact Info">
                        <div class="columns is-mobile">
                            <div class="column is-5-desktop is-6-mobile">
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-6">
                                            <div class="info-title">
                                                Full name
                                            </div>
                                        </div>
                                        <div class="column is-6">
                                            <div class="info-description highlighted">
                                                {{data.full_name}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-6">
                                            <div class="info-title">
                                                Education
                                            </div>
                                        </div>
                                        <div class="column is-6">
                                            <div class="info-description">
                                                {{data.education}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-6">
                                            <div class="info-title">
                                                Profession
                                            </div>
                                        </div>
                                        <div class="column is-6">
                                            <div class="info-description">
                                                {{data.profession}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-6">
                                            <div class="info-title">
                                                Date of Birth
                                            </div>
                                        </div>
                                        <div class="column is-6">
                                            <div class="info-description">
                                                {{data.dob}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-6">
                                            <div class="info-title">
                                                Blood Group
                                            </div>
                                        </div>
                                        <div class="column is-6">
                                            <div class="info-description">
                                                {{data.blood_group}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-6">
                                            <div class="info-title">
                                                Age
                                            </div>
                                        </div>
                                        <div class="column is-6">
                                            <div class="info-description" v-if="data.dob">
                                                <!-- <span>{{  data.dob| moment("from", "now", true) }}</span> -->
                                                <span>{{moment().diff(data.dob, 'years') }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-6">
                                            <div class="info-title">
                                                Gender
                                            </div>
                                        </div>
                                        <div class="column is-6">
                                            <div class="info-description">
                                                {{data.gender}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-6">
                                            <div class="info-title">
                                                Language
                                            </div>
                                        </div>
                                        <div class="column is-6">
                                             <div class="info-description">
                                            {{data.language}}
                                               </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-2-desktop is-0-mobile">
                                
                            </div>
                            <div class="column is-5-desktop is-6-mobile">
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-6">
                                            <div class="info-title">
                                                Email
                                            </div>
                                        </div>
                                        <div class="column is-6">
                                            <div class="info-description">
                                                {{data.email}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-6">
                                            <div class="info-title">
                                                Personal Number
                                            </div>
                                        </div>
                                        <div class="column is-6">
                                            <div class="info-description">
                                                {{data.mobile}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-6">
                                            <div class="info-title">
                                                Location
                                            </div>
                                        </div>
                                        <div class="column is-6">
                                            <div class="info-description">
                                                {{data.residance_area}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                               
                                
                               
                               
                                <div class="info-item">
                                    <div class="columns is-mobile">
                                        <div class="column is-6">
                                            <div class="info-title">
                                                Facebook profile link
                                            </div>
                                        </div>
                                        <div class="column is-6">
                                            <div class="info-description">
                                                {{data.fblink}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns pt-10">
                            
                            <div class="column is-9">
                                <div class="info-title">
                                    Vehicles
                                </div>
                                <vs-row vs-justify="left">
                                    <vs-col type="flex" vs-justify="left" vs-align="left" vs-w="4" v-for="item in vehicles" :key="item.id" style="padding:10px;">
                                        <vs-card class="cardx" fixedHeight>
                                            <div class="columns">
                                                <div class="column">
                                                    <span class="title">Model:</span>
                                                    <span style="font-size:14px">{{item.model}}</span>
                                                </div>
                                            </div>
                                            <div class="columns">
                                                <div class="column">
                                                    <span class="title">Color:</span>
                                                    <span style="font-size:14px">{{item.color}}</span>
                                                </div>
                                            </div>
                                            <div class="columns">
                                                <div class="column">
                                                    <span class="title">Licence Number:</span>
                                                    <span style="font-size:14px">{{item.licence_number}}</span>
                                                </div>
                                            </div>
                                            <div class="columns">
                                                <div class="column">
                                                    <span class="title">Vin Number:</span>
                                                    <span style="font-size:14px">{{item.vin_number}}</span>
                                                </div>
                                            </div>
                                            <div class="columns">
                                                <div class="column">
                                                    <span class="title"> Registration Document:</span>
                                                    <img :src="document_photo(item.document)">
                                                </div>
                                            </div>
                                        </vs-card>
                                    </vs-col>
                                </vs-row>
                            </div>
                        </div>
                        <div class="lifetime-wrapper">
                            <div class="has-text-right">
                                <a @click="edit" class="button btn-dash primary-btn btn-dash raised ripple">Edit Profile</a>
                            </div>
                        </div>
                    </vs-tab>
                    <vs-tab label="Change password">
                        <security-Info></security-Info>
                    </vs-tab>
                </vs-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import editProfile from './editprofile'
import securityInfo from './SecurityInfo'
import moment from 'moment'
import { mapActions } from 'vuex';

export default {
    components: { editProfile, securityInfo },
    props: ['data'],
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

    },
    created() {
        if (this.$store.getters.vehicles.length == 0) {
            this.getVehicleInfo()
        }
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
            return require('../../assets/images/'+this.data.profile_picture)
        },
        getIdentityPhoto() {
            return require('../../assets/images/'+ this.data.nid)

        },
    }


}

</script>
<style scoped>
.info-title {
    font-weight: 600;
}


img {
    width: 200px;
    height: 125px;
}

.border-card {
    background: #FFF;
    border: 1px solid #DCDFE6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}
.info-title::after { 
  content: ":";
  float:right;
}
.title {
    font-family: 'Segoe UI', sans-serif;
    font-size: 14px;
}
.info-description
{
    word-wrap: break-word
}
</style>
