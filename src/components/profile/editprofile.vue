<template>
    <section>
        <vs-tabs>
            <vs-tab label="General & Contact Info">
                <div class="columns is-mobile">
                    <div class="column is-6">
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Full name :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <input class="input  is-primary-focus" v-model="data.full_name" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Location :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <input class="input  is-primary-focus" v-model="data.residance_area" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Education :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <input class="input  is-primary-focus" v-model="data.education" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Profession :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <input class="input  is-primary-focus" v-model="data.profession" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Date of Birth :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <date-picker v-model="data.dob" valueType="format" placeholder="Date of birth" name="date" v-validate="'required'"></date-picker>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Blood Group :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <div class="select is-select">
                                            <select name="Blood group" v-model="data.blood_group" v-validate="'required'">
                                                <option :value="null" disabled selected>Select blood group</option>
                                                <option v-for="(item,index) in bloodgroups" :key="index" :value="item">{{item}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Sex :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <div class="select is-select">
                                            <select name="sex" v-model="data.sex" v-validate="'required'">
                                                <option :value="null" disabled selected>Select sex</option>
                                                <option v-for="(item,index) in sex" :key="index" :value="item.value">{{item.label}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        language :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <div v-for="item in langs" style="display:inline-flex">
                                            <label class="checkbox">
                                                <input type="checkbox" :value="item.value" v-model="data.language">{{item.text}} </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-6">
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Email :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <input class="input  is-primary-focus" v-model="data.email" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Personal Number :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <input class="input  is-primary-focus" v-model="data.mobile" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Home contact number :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <input class="input  is-primary-focus" v-model="data.home_contact" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Emergency contact number:
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <input class="input  is-primary-focus" v-model="data.emergency_number" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Emergency contact person name:
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <div class="info-description">
                                            <input class="input  is-primary-focus" v-model="data.emergency_contact_name" type="text">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Skype:
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <input class="input  is-primary-focus" v-model="data.skype" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Facebook profile link :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <input class="input  is-primary-focus" v-model="data.fblink" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item" v-if="data.vehicle==0">
                            <div class="columns">
                                <div class="column is-6">
                                    <div class="info-title">
                                        Have a reliable vehicle?
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <ul class="leftx" style="display: inline-flex;">
                                            <li>
                                                <vs-radio vs-name="radios1" vs-value="yes" @change="yes">Yes</vs-radio>
                                            </li>
                                            <li style="margin-left: 10px;">
                                                <vs-radio vs-name="radios1" vs-value="no" @change="no">No</vs-radio>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-item" v-if="haveVehicle">
                            <div class="haveVehicle" v-for="(row,index) in rows" :key="index">
                                <vs-row vs-justify="center">
                                    <vs-col type="flex" vs-justify="center" vs-align="left" vs-w="12">
                                        <vs-card>
                                            <input type="hidden" v-model="row.id">
                                            <div class="columns">
                                                <div class="column is-6">
                                                    <div class="info-title">
                                                        Vehicle Type :
                                                    </div>
                                                </div>
                                                <div class="column is-6">
                                                    <div class="control">
                                                        <input type="hidden" v-model="row.id">
                                                        <div class="select is-select">
                                                            <select v-model="row.type">
                                                                <option v-for="(item,index) in voptions" :key="index" :value="item">{{item}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="columns" style="margin-top:-20px">
                                                <div class="column is-6">
                                                    <div class="info-title">
                                                        Model :
                                                    </div>
                                                </div>
                                                <div class="column is-6">
                                                    <div class="control">
                                                        <input class="input  is-primary-focus" v-model="row.model" type="text">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="columns" style="margin-top:-20px">
                                                <div class="column is-6">
                                                    <div class="info-title">
                                                        Licence Number:
                                                    </div>
                                                </div>
                                                <div class="column is-6">
                                                    <div class="control">
                                                        <input class="input  is-primary-focus" v-model="row.licence_number" type="text">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="columns" style="margin-top:-20px">
                                                <div class="column is-6">
                                                    <div class="info-title">
                                                        Vin number :
                                                    </div>
                                                </div>
                                                <div class="column is-6">
                                                    <div class="control">
                                                        <input class="input  is-primary-focus" v-model="row.vin_number" type="text">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="columns" style="margin-top:-20px">
                                                <div class="column is-6">
                                                    <div class="info-title">
                                                        Color :
                                                    </div>
                                                </div>
                                                <div class="column is-6">
                                                    <div class="control">
                                                        <div class="select is-select">
                                                            <select v-model="row.color">
                                                                <option v-for="(item,index) in colors" :key="index" :value="item">{{item}}</option>
                                                            </select>
                                                        </div>
                                                        <!--  <el-select size="small" v-model="row.color" placeholder="select vehicle color">
                                                        <el-option v-for="item,index in colors" :key="index" :label="item" :value="item">
                                                        </el-option>
                                                    </el-select> -->
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="columns" style="margin-top:-20px">
                                                <div class="column is-6">
                                                    <div class="info-title">
                                                        Registration document :
                                                    </div>
                                                </div>
                                                <div class="column is-6">
                                                    <div class="file has-name">
                                                        <label class="file-label">
                                                            <input type="file" v-validate="'image'" data-vv-as="image" data-vv-delay="100" @change="onRegChnage($event,index)" name="image_field">
                                                        </label>
                                                    </div>
                                                    <span class="error">{{ errors.first('image_field') }}</span>
                                                    <figure v-if="row.document" class="image is-5by4" style="width:200px;height:200px;margin-top:2px;">
                                                        <img :src="getLicencePhoto(index,row.document)">
                                                    </figure>
                                                </div>
                                            </div>
                                            <div slot="footer">
                                                <vs-row vs-justify="flex-end">
                                                    <vs-button @click="deleteRow(index,row.id)" type="gradient" color="danger" icon="delete"></vs-button>
                                                </vs-row>
                                            </div>
                                        </vs-card>
                                    </vs-col>
                                </vs-row>
                            </div>
                            <vs-button @click="addRow" type="gradient">Add vehicle</vs-button>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="columns pt-10">
                    <div class="column is-6">
                        <div class="info-item">
                            <div class="columns ">
                                <div class="column is-7">
                                    <div class="info-title">
                                        Profile Picture
                                    </div>
                                    <div class="info-description">
                                        <figure class="image is-5by4">
                                            <img :src="getProfilePhoto(data.profile_picture)">
                                        </figure>
                                    </div>
                                    <br>
                                    <div class="file has-name">
                                        <label class="file-label">
                                            <input class="file-input" type="file" v-on:change="onPhotoChnage">
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <span class="material-icons">publish</span>
                                                </span>
                                                <span class="file-label">
                                                    Upload
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-6">
                        <div class="info-item">
                            <div class="columns ">
                                <div class="column is-7">
                                    <div class="info-title">
                                        Identity
                                    </div>
                                    <div class="info-description">
                                        <figure class="image is-5by4">
                                            <img :src="getIdenityPhoto(data.licence)">
                                        </figure>
                                    </div>
                                    <br>
                                    <div class="file has-name">
                                        <label class="file-label">
                                            <input class="file-input" type="file" v-on:change="onIdChange">
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <span class="material-icons">publish</span>
                                                </span>
                                                <span class="file-label">
                                                    Upload
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns pb-10">
                    <div class="column">
                        <div class="form-group" style="float:right">
                            <a @click="update" class="button primary-btn btn-dash raised has-icon">
                                <span class="material-icons">save</span>
                            </a>
                            <a @click="cancel" class="button  is-primary btn-dash raised  has-icon">
                                <span class="material-icons">clear</span>
                            </a>
                        </div>
                    </div>
                </div>
            </vs-tab>
            <vs-tab label="Change password">
                <security-Info></security-Info>
            </vs-tab>
        </vs-tabs>
    </section>
</template>
<script>
import Vue from 'vue';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
})
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import securityInfo from './SecurityInfo'
import sideBar from './sidebar'

export default {
    components: { sideBar, securityInfo, DatePicker },
    props: ['data'],
    data() {

        return {
            id: '',
            idtypes: [
                'National Id',
                'Passport',
                'Driving licence',
            ],
            voptions: [
                'Car',
                'Mini van',
                'Motorcycle',
                'Electric Scooter',
                'CNG',
                'Rickshaw',
                'Bicycle',
            ],
            langs: [
                { text: 'English', value: 'English' },
                { text: 'Bangla', value: 'Bangla' },
                { text: 'Arabic', value: 'Arabic' },
                { text: 'Chinese', value: 'Chinese' },
                { text: 'Spanish', value: 'Spanish' },
            ],
            bloodgroups: [
                'A+',
                'A-',
                'B+',
                'B-',
                'O+',
                'O-',
                'AB+',
                'AB-',
            ],
            colors: ['White', 'Black', 'Gray', 'Red', 'Green', 'Blue', 'Silver', 'Brown'],
            sex: [{
                value: 'Male',
                label: 'Male'
            }, {
                value: 'Female',
                label: 'Female'
            }],
            rows: [{
                'id': '',
                'user_id': '',
                'type': '',
                'model': '',
                'licence_number': '',
                'vin_number': '',
                'color': '',
                'regname': '',
                'document': ''
            }],

            langoptions: [
                'English',
                'Bangla',
                'Arabic',
                'Chinese',
                'Spanish',

            ],
            vehicleoptions: [
                'Sedan Car',
                'MicroBus',
                'CNG',
                'Rickshaw',
            ],
            vehicleinfo: [],
            haveVehicle: false,
            select2: [],
            language: [],
            vehicle: '',
            first: true,
            second: false,
            change: false,
            nid: this.data.nid,
            profile_photo: this.data.profile_picture,
            config: {
                altInput: true,
                enableTime: false,
                dateFormat: "Y-m-d",
            },
            form: {
                identification: '',
                photo: ''
            },

        }
    },
    computed: {
        users() {
            return this.$store.state.user
        },
        // getProfilePhoto()
        // {
        //     return this.$store.getters.user.profile_picture
        // },

    },
    created() {
        this.data.language = this.data.language.toString().split(",");
        // this.$store.dispatch('getUserInfo');
        this.$axios.get(`getvehiclesinfo/${this.data.id}`)
            .then(res => {
                this.rows = res.data.data

            })
        this.id = this.data.id
    },

    methods: {
        addRow: function() {
            this.rows.push({
                'user_id': this.id,
                'id': '',
                'type': '',
                'model': '',
                'licence_number': '',
                'vin_number': '',
                'color': '',
                'regname': '',
                'document': ''
            });
        },
        deleteRow(index, id) {

            if (id) {
                this.$axios.delete(`vehicle/${id}`)
                    .then(
                        this.rows.splice(index, 1),
                        Toast.fire({
                            type: 'success',
                            title: 'Vehicle successfully deleted'
                        })
                    )
            }
            this.rows.splice(index, 1);
        },

        onSelectChange() {
            this.change = true
            this.form.idname = "Choose Id"
        },
        yes() {
            this.haveVehicle = true
        },
        no() {
            this.haveVehicle = false
        },
        general() {
            this.first = true,
                this.second = false
        },
        security() {
            this.first = false,
                this.second = true
        },
        cancel() {
            this.$router.push('/profile')
            EventBus.$emit('cancelEditing')
        },
        getIdenityPhoto(pic) {
            let idenity = (this.form.identification.length > 200) ? this.form.identification : pic
            return idenity;
        },
        getProfilePhoto(pic) {
            let photo = (this.form.photo.length > 200) ? this.form.photo : pic
            return photo;
        },
        getLicencePhoto(index, pic) {
            let photo = (this.rows[index].document.length > 200) ? this.rows[index].document : pic
            return photo;
        },

        onIdChange(e) {
            let file = e.target.files[0];
            //this.form.idname = file.name
            let reader = new FileReader();
            reader.onload = (file) => {
                this.form.identification = reader.result;
            }
            reader.readAsDataURL(file);
        },

        onPhotoChnage(e) {
            let file = e.target.files[0];
            //this.form.filename = file.name

            let reader = new FileReader();
            reader.onload = (file) => {
                this.form.photo = reader.result;
            }
            reader.readAsDataURL(file);
        },
        onRegChnage(e, index) {
            let file = e.target.files[0];
            this.rows[index].regname = file.name
            let reader = new FileReader();
            reader.onload = (file) => {
                this.rows[index].document = reader.result;
            }
            reader.readAsDataURL(file);
        },
        update() {
            if (this.$validator.validateAll()) {
                this.$axios.patch(`auth/update/${this.data.id}`, {
                        user_id: this.data.id,
                        first_name: this.data.first_name,
                        middle_name: this.data.middle_name,
                        last_name: this.data.last_name,
                        email: this.data.email,
                        education: this.data.education,
                        sex: this.data.sex,
                        blood_group: this.data.blood_group,
                        residance_area: this.data.residance_area,
                        profession: this.data.profession,
                        identification: this.form.identification,
                        photo: this.form.photo,
                        language: this.data.language,
                        rows: this.rows,
                        dob: this.data.dob,
                        fbid: this.data.fblink,
                        friends_fbid: this.data.friends_fblink,
                        mobile: this.data.mobile,
                        home_number: this.data.home_contact,
                        emergency_number: this.data.emergency_number,
                        emergency_contact_name: this.data.emergency_contact_name,
                        skype: this.data.skype,
                        referred_person: this.data.reffered_person,
                        disability: this.data.disability
                    })
                    .then(
                        // this.$router.push('/profile'),
                        Toast.fire({
                            type: 'success',
                            title: 'Profile successfuly updated'
                        }),


                    )
                    .catch(error => console.log(error.res.data))
            }
        }


    },
    watch: {
        'data.id_type': function(val) {
            this.onSelectChange()

        }
    }
}
</script>
<style scoped>
section {
    margin-bottom: 7%;
}

.info-title {
    font-weight: 600;
}

.select {
    width: 100%;
}

.select select {
    font-size: 0.9rem;
    height: 2rem;
    min-width: 100% !important;
    line-height: 1.2;
}


.error {
    color: red;
}

.haveVehicle {
    margin-top: 10px;
}

.haveVehicle .columns {
    font-size: 14px;
}


.form-group a {
    margin-right: 5px;
}

.label {
    display: inline;
    font-size: 14px;
    margin-right: 10px;
}

.upload {
    margin-top: 20px;
}

::-webkit-input-placeholder {
    /* Edge */
    color: #62646a;
}

:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #62646a;
}

::placeholder {
    color: #62646a;
}
</style>