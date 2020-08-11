<template>
    <div class="card">
        <header class="card-header">
            Update General & Contact Info
        </header>
        <div class="card-content">
            <div class="content">
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
                                        Residance Area :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <input class="input is-primary-focus" v-model="data.residance_area" type="text">
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
                                        <div class="select">
                                            <select v-model="data.education" name="education" v-validate="'required'">
                                                <option v-for="edu in education" :value="edu">{{edu}}</option>
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
                                        Profession :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <div class="select">
                                            <select v-model="data.profession" name="education" v-validate="'required'">
                                                <option v-for="profession in professions" :value="profession">{{profession}}</option>
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
                                        Gender :
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <div class="select is-select">
                                            <select name="sex" v-model="data.gender" v-validate="'required'">
                                                <option :value="null" disabled selected>Select Dender</option>
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
                                        <div v-for="item in langs" class="languages">
                                            <label class="checkbox" v-if="data.language!==null">
                                                <input type="checkbox" :value="item.value" v-model="data.language">{{item.text}} </label>
                                            <label class="checkbox" v-else>
                                                <input type="checkbox" :value="item.value" v-model="userlang">{{item.text}} </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="info-item">
                            <div class="columns ">
                                <div class="column is-6">
                                  
                                   
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="column is-6">
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
                                        Emergency contact number:
                                    </div>
                                </div>
                                <div class="column is-6">
                                    <div class="control">
                                        <input class="input  is-primary-focus" v-model="data.emergency_contact_number" type="text">
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
                                            <input class="input  is-primary-focus" v-model="data.emergency_contact_person_name" type="text">
                                        </div>
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
                    </div>
                </div>
                <hr>
                <div class="columns pb-10">
                    <div class="column">
                        <div class="form-group" style="float:right">
                            <a @click="update" v-bind:class="(isLoading)?'button is-success raised is-loading':'button is-success raised'" class=" ">
                            Update
                        </a>
                            <a @click="cancel" class="button  is-primary btn-dash raised">
                                Cancel
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
export default {
    components: { DatePicker },
    props: ['data'],
    data() {

        return {
            id: '',
            idtypes: [
                'National Id',
                'Passport',
                'Driving licence',
            ],

            langs: [
                { text: 'English', value: 'English' },
                { text: 'Bangla', value: 'Bangla' },
                { text: 'Arabic', value: 'Arabic' },
                { text: 'Chinese', value: 'Chinese' },
                { text: 'Spanish', value: 'Spanish' },
            ],
            userlang: [],
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

            sex: [{
                value: 'Male',
                label: 'Male'
            }, {
                value: 'Female',
                label: 'Female'
            }],

            education: [
                'High School Incomplete',
                'Completed High School or equivalent',
                'Bachelor Degree or equivalent',
                'Master Degree or equivalent',
                'Doctoral Degree or equivalent',
            ],
            professions: [
                'Business/Self Employed',
                'Government Job',
                'Private Job',
                'Student',
                'Retired',
                'Driving'
            ],
            langoptions: [
                'English',
                'Bangla',
                'Arabic',
                'Chinese',
                'Spanish',

            ],
            isLoading: false,
            select2: [],
            language: [],
            profile_photo: this.data.profile_picture,
            config: {
                altInput: true,
                enableTime: false,
                dateFormat: "Y-m-d",
            },

        }
    },
    computed: {
        checkArray() {
            return Array.isArray(this.data.identity_img)
        },
        users() {
            return this.$store.state.user
        },

    },
    created() {
        this.data.language = this.data.language.toString().split(",");
        // this.$store.dispatch('getUserInfo');

    },

    methods: {



        onSelectChange() {
            this.change = true
            this.form.idname = "Choose Id"
        },

        cancel() {
            EventBus.$emit('cancelEditing')
        },

        getProfilePhoto(pic) {
            let photo = (this.form.photo.length > 200) ? this.form.photo : pic
            return photo;
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

        update() {
            this.isLoading=true
            this.$axios.patch(`auth/update/${this.data.id}`, {
                    full_name: this.data.full_name,
                    education: this.data.education,
                    gender: this.data.gender,
                    blood_group: this.data.blood_group,
                    residance_area: this.data.residance_area,
                    profession: this.data.profession,
                    language: this.data.language,
                    dob: this.data.dob,
                    fblink: this.data.fblink,
                    mobile: this.data.mobile,
                    emergency_contact_number: this.data.emergency_contact_number,
                    emergency_contact_person_name: this.data.emergency_contact_person_name,
                })
                .then((result) => {
                    this.isLoading=false
                    this.$store.dispatch('getInfo')
                    EventBus.$emit('cancelEditing')
                    Toast.fire({
                        type: 'success',
                        title: 'Profile successfuly updated'
                    })
                })
                .catch(error => console.log(error.res.data))

        }


    },
    watch: {
        'data.id_type': function(val) {
            this.onSelectChange()

        },
        userlang() {
            this.data.language = this.userlang
        }
    }
}
</script>
<style scoped>
section {
    margin-bottom: 7%;
}

.checkbox input {
    margin-right: 3px;
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

.card-header {
    padding: 16px;
    font-weight: 500;
}


.error {
    color: red;
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

.button.btn-align {
    padding: 5px 13px 6px;
}
</style>