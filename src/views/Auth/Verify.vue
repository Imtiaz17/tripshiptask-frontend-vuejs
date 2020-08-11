<template>
    <section>
        <vue-headful title="Verify" />
        <div class="modal" :class="openmodal?'is-active':''">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <article class="media">
                        <div class="media-content">
                            <button class="delete" aria-label="close" @click="openmodal=false"></button>
                            <div class="content">
                                <p v-html="errmsg"></p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
        <div class="heading has-text-centered">
            <h2>E-mail Verification</h2>
        </div>
        <div class="auth-outer">
            <article class="message is-danger" v-show="errormessage">
                <div class="message-body">
                    <button class="delete" aria-label="delete" @click="closeerrmsg"></button>
                    <p v-for="(err,index) in error[0]" :key="index">{{ err[0] }}</p>
                </div>
            </article>
            <div class="auth-box">
                <div class="form-wrapper">
                    <div class="login">
                        <div class="item-list">
                            <img class="featured-drawing" src="../../assets/images/tst/tstlogo.png" alt="" width="300px">
                        </div>
                        <div class="field" v-show="thirdlvl">
                            <h3 @click="resetmsg">Optional Information</h3>
                        </div>
                        <div class="field" v-show="secondlevel">
                            <h3 @click="resetmsg">Why do I need to provide the following information?</h3>
                        </div>
                        <figure class="image profilepic">
                            <label class="overlay">
                                <label class="file-label">
                                    <input class="file-input" ref="propic" type="file" v-on:change="onChange">
                                    <span class="file-cta">
                                        Choose profile picture
                                    </span>
                                </label>
                            </label>
                            <img :src="profile_pic" v-if="profile_pic">
                            <img v-else src="https://pkreddy.github.io/images/thumbs/businessman.png">
                        </figure>
                        <input type="hidden" name="propic" v-validate="'required'" v-model="profile_pic">
                        <span v-show="errors.has('propic')" class="help is-danger has-text-centered"> Profile picture is required</span>

                        <section class="secondlevel" v-show="secondlevel">
                            <div class="body">
                                <div class="columns is-desktop">
                                    <div class="column is-5-desktop is-12-mobile" style="padding-right:0px">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Govt id/NID/Passport/DL">
                                                    <input @focus="infomsg = 'We require you to provide Government id/National id information for your own safety and security. A verified user means pleasant experience. It is to prevent/avoid unpleasant experience while interacting with another user as each member is held responsible for his/her unwanted actions. For passport photos, in the front photo and back photo tabs, please upload your passport page containing your photo and the page following that respectively.', heading='Why do I need to provide Govt id/NID/Passport information?'" name="identity" v-validate="'required'" v-model="form.identity_no" type="number" class="input is-primary-focus">
                                                </float-label>
                                                <span v-show="errors.has('identity')" class="help is-danger">Govt id/ NID is required</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-3 is-6-mobile is-thalf">
                                        <div class="field">
                                            <div class="control">
                                                <label class="file-label">
                                                    <input class="file-input" type="file" accept="image/*,application/pdf" ref="nidfront" @change="onNidFrotChange()">
                                                    <span class="file-cta">
                                                        <span class="file-icon">
                                                            <span class="material-icons">publish</span>
                                                        </span>
                                                        <span class="file-label">
                                                            Front Photo
                                                        </span>
                                                    </span>
                                                </label>
                                                <input type="hidden" name="nidfront" v-validate="'required'" v-model="nidfrontname">
                                                <span v-show="errors.has('nidfront')" class="help is-danger">Govt id/ NID front photo is required</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-3 is-6-mobile is-thalf-right">
                                        <div class="field">
                                            <div class="control">
                                                <label class="file-label">
                                                    <input class="file-input" type="file" accept="image/*,application/pdf" ref="nidback" @change="onNidBackChange()">
                                                    <span class="file-cta">
                                                        <span class="file-icon">
                                                            <span class="material-icons">publish</span>
                                                        </span>
                                                        <span class="file-label">
                                                            Back Photo
                                                        </span>
                                                    </span>
                                                </label>
                                                <input type="hidden" name="nidback" v-validate="'required'" v-model="nidbackname">
                                                <span v-show="errors.has('nidback')" class="help is-danger">Govt id/ NID back photo is required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns files" v-if="nidfrontname || nidbackname">
                                    <div class="column is-5"></div>
                                    <div class="column is-3 is-6-mobile is-thalf">
                                        <vs-chip v-if="nidfrontname" closable @click="removenidfront">
                                            {{nidfrontname}}
                                        </vs-chip>
                                    </div>
                                    <div class="column is-3 is-6-mobile is-thalf-right">
                                        <vs-chip v-if="nidbackname" closable @click="removenidback">
                                            {{nidbackname}}
                                        </vs-chip>
                                    </div>
                                </div>
                                <div class="columns is-desktop">
                                    <div class="column is-5 is-12-mobile" style="padding-right:0px">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Profession">
                                                    <div class="select">
                                                        <select @focus="infomsg = 'Your profession is visible to others for a better peer to peer connectivity.',heading='Why do I need to provide information about my profession?'" v-model="form.profession" name="profession" v-validate="'required'">
                                                            <option v-for="profession in professions" :value="profession">{{profession}}</option>
                                                        </select>
                                                    </div>
                                                </float-label>
                                                <span v-show="errors.has('profession')" class="help is-danger">Profession is required</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-3 is-6-mobile is-thalf">
                                        <div class="field">
                                            <div class="control">
                                                <label class="file-label">
                                                    <input class="file-input" ref="jobimgf" type="file" accept="image/*,application/pdf" @change="onJobFrontChange()">
                                                    <span class="file-cta">
                                                        <span class="file-icon">
                                                            <span class="material-icons">publish</span>
                                                        </span>
                                                        <span class="file-label">
                                                            ID front (optional)
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-3 is-6-mobile is-thalf-right">
                                        <div class="field">
                                            <div class="control">
                                                <label class="file-label">
                                                    <input class="file-input" ref="jobimgb" type="file" accept="image/*,application/pdf" @change="onJobBackChange()">
                                                    <span class="file-cta">
                                                        <span class="file-icon">
                                                            <span class="material-icons">publish</span>
                                                        </span>
                                                        <span class="file-label">
                                                            ID back (optional)
                                                        </span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns files" v-if="jobfrontname || jobbackname">
                                    <div class="column is-5"></div>
                                    <div class="column is-3 is-6-mobile is-thalf">
                                        <vs-chip v-if="jobfrontname" closable @click="jobfrontname='',form.jobfrontimg=''">
                                            {{jobfrontname}}
                                        </vs-chip>
                                    </div>
                                    <div class="column is-3 is-6-mobile is-thalf-right">
                                        <vs-chip v-if="jobbackname" closable @click="jobbackname='',form.jobbackimg=''">
                                            {{jobbackname}}
                                        </vs-chip>
                                    </div>
                                </div>
                                <div class="columns is-desktop" v-show="job_holder">
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Designation">
                                                    <input type="text" class="input is-primary-focus" v-model="form.designation" name="designation" v-validate="pvtjobreq">
                                                </float-label>
                                                <span v-show="errors.has('designation')" class="help is-danger">Designation is required</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Company Name">
                                                    <input type="text" class="input is-primary-focus" v-model="form.company_name" name="company_name" v-validate="pvtjobreq">
                                                </float-label>
                                                <span v-show="errors.has('company_name')" class="help is-danger">Company name is required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-desktop" v-show="govt_job_holder">
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Designation">
                                                    <input type="text" class="input is-primary-focus" v-model="form.designation" name="designation" v-validate="govjobeq">
                                                </float-label>
                                                <span v-show="errors.has('designation')" class="help is-danger">Designation is required</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Which Sector">
                                                    <input type="text" class="input is-primary-focus" v-model="form.sector" name="company_name" v-validate="govjobeq">
                                                </float-label>
                                                <span v-show="errors.has('company_name')" class="help is-danger">Sector name is required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-desktop" v-show="student">
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label=" Major/Subject">
                                                    <input type="text" class="input is-primary-focus" v-model="form.study_subject" name="subject" v-validate="studentreq">
                                                </float-label>
                                                <span v-show="errors.has('subject')" class="help is-danger">Major/Subject is required</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Institution Name">
                                                    <input type="text" class="input is-primary-focus" v-model="form.institution_name" name="institution_name" v-validate="studentreq">
                                                </float-label>
                                                <span v-show="errors.has('institution_name')" class="help is-danger">Institution name is required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-desktop" v-show="retired">
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Former Designation">
                                                    <input type="text" class="input is-primary-focus" v-model="form.designation" name="designation" v-validate="retiredreq">
                                                </float-label>
                                                <span v-show="errors.has('designation')" class="help is-danger">Former Designation is required</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Former Company Name">
                                                    <input type="text" class="input is-primary-focus" v-model="form.company_name" name="company_name" v-validate="retiredreq">
                                                </float-label>
                                                <span v-show="errors.has('company_name')" class="help is-danger">Company name is required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-desktop" v-show="driver">
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Type of Vehicle">
                                                    <input type="text" class="input is-primary-focus" v-model="form.vehicle_type" name="vehicle_type" v-validate="driverreq">
                                                </float-label>
                                                <span v-show="errors.has('vehicle_type')" class="help is-danger">Type of Vehicle is required</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label=" Company Name/Self">
                                                    <input type="text" class="input is-primary-focus" v-model="form.company_name" name="company_name" v-validate="driverreq">
                                                </float-label>
                                                <span v-show="errors.has('company_name')" class="help is-danger">Company name is required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-mobile">
                                    <div class="column is-12-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Education">
                                                    <div class="select">
                                                        <select @focus="infomsg = 'Knowing user\'s education level helps you make better decisions.',heading='Why do I need to provide my education?'" v-model="form.educational_qualification" name="education" v-validate="'required'">
                                                            <option v-for="edu in education" :value="edu">{{edu}}</option>
                                                        </select>
                                                    </div>
                                                </float-label>
                                                <span v-show="errors.has('education')" class="help is-danger">Educational qualification is required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-mobile">
                                    <div class="column is-12-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label label="Security Question">
                                                    <div class="select">
                                                        <select @focus="infomsg = 'Security question is to add an extra layer of certainty to identify you when you have forgotten your password, entered the wrong credentials too many times, or tried to log in from an unfamiliar device or location.',heading='Why do I need to provide a security question?'" v-model="form.security_ques" @change="sqchange" name="sq" v-validate="'required'">
                                                            <option v-for="sq in squestion" :value="sq">{{sq}}</option>
                                                        </select>
                                                    </div>
                                                </float-label>
                                                <span v-show="errors.has('sq')" class="help is-danger">Security question is required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-mobile">
                                    <div class="column is-12-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Security Answer">
                                                    <input @focus="infomsg = 'Security answer is to ensure your identity when you have forgotten your password, entered the wrong credentials too many times, or tried to log in from an unfamiliar device or location.',heading='Why do I need to provide a security answer?'" type="text" class="input" placeholder="" name="sa" v-validate="'required|'" v-model="form.security_ans" />
                                                </float-label>
                                                <span v-show="errors.has('sa')" class="help is-danger">Security answer is required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column">
                                        <div class="field">
                                            <div class="control">
                                                <div class="columns is-mobile is-gapless">
                                                    <div class="column">
                                                        <float-label :dispatch="false" label="Day">
                                                            <div class="control">
                                                                <div class="select">
                                                                    <select @focus="infomsg = 'Your birthday is not visible to others. users only get to see the age to make better decisions while connecting for trip, ship or tasks. Learn more about age requirements in FAQ section.',heading='Why do I need to provide my date of birth?'" v-model="day">
                                                                        <option v-for="day in days" :value="day">{{day}}</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </float-label>
                                                    </div>
                                                    <div class="column">
                                                        <float-label :dispatch="false" label="Month">
                                                            <div class="control">
                                                                <div class="select">
                                                                    <select @focus="infomsg = 'Your birthday is not visible to others. users only get to see the age to make better decisions while connecting for trip, ship or tasks. Learn more about age requirements in FAQ section.',heading='Why do I need to provide my date of birth?'" v-model="month">
                                                                        <option v-for="month in months" :value="month.num">{{month.month}}</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </float-label>
                                                    </div>
                                                    <div class="column">
                                                        <div class="control">
                                                            <div class="select">
                                                                <float-label :dispatch="false" label="Year">
                                                                    <select @focus="infomsg = 'Your birthday is not visible to others. users only get to see the age to make better decisions while connecting for trip, ship or tasks. Learn more about age requirements in FAQ section.',heading='Why do I need to provide my date of birth?'" v-model="year">
                                                                        <option v-for="year in years" :value="year">{{year}}</option>
                                                                    </select>
                                                                </float-label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="columns">
                                                    <div class="column">
                                                        <input type="hidden" name="dob" v-model="form.dob" v-validate="'required|date_format:dd-MM-yyyy'">
                                                        <span v-show="errors.has('dob') && nextstep" class="help is-danger">Date of birth is required</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-vcentered is-mobile" :class="errors.has('education')?'edu-error':''">
                                    <div class="column is-8">
                                        <button v-bind:class="(loading)?'button is-info is-small is-loading':'button is-info is-small'" style="width:100px;font-size:14px;float: right;" @click="next">Next</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="thirdlvl" v-show="thirdlvl">
                            <div class="body">
                                <div class="columns is-desktop">
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Blood Group">
                                                    <div class="select">
                                                        <select @focus="infomsg='This data is kept safe and secure and may be used for your benefit if and when necessary in any medical emergency and never shared with any other user.',heading='Why should I provide my blood group information?'" name="Blood group" v-model="form.blood_group">
                                                            <option v-for="(item,index) in bloodgroups" :key="index" :value="item">{{item}}</option>
                                                        </select>
                                                    </div>
                                                </float-label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Your residence area">
                                                    <input @focus="infomsg='This helps you get better results in connecting with trips, shipments and tasks and hence improves your chances of making more money.',heading='Why should I provide my residence area?'" type="text" class="input is-primary-focus" v-model="form.location">
                                                </float-label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-desktop">
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Emergency contact persons name">
                                                    <input @focus="infomsg='This data is kept safe and secure and may be used for your advantage if and when necessary in any emergency and never shared with any other user.',heading='Why should I provide an emergency contact person\'s name?'" type="text" class="input is-primary-focus" v-model="form.emergency_person_name">
                                                </float-label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column is-6-desktop is-12-mobile">
                                        <div class="field">
                                            <div class="control">
                                                <float-label :dispatch="false" label="Emergency contact number">
                                                    <input type="text" @focus="infomsg='This data is kept safe and secure and may be used for your advantage if and when necessary in any emergency and never shared with any other user.',heading='Why should I provide an emergency contact person\'s contact number?'" class="input is-primary-focus" v-model="form.emergency_contact_no">
                                                </float-label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="columns is-vcentered is-mobile" :class="errors.has('education')?'edu-error':''">
                                    <div class="column is-4">
                                        <button class="goback" @click="goback">Back</button>
                                    </div>
                                    <div class="column is-4">
                                        <button v-bind:class="(loading)?'button is-info is-small is-loading':'button is-info is-small'" style="width:100px;" @click="verify">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="infosection">
                <label class="label whyneed" v-show="secondlevel">
                    <span v-html="heading"></span>
                </label>
                <label class="label whyneed" v-show="thirdlvl">
                    <span v-html="heading"></span>
                </label>
                <figcaption v-html="infomsg"></figcaption>
            </div>
        </div>
    </section>
</template>
<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate)
import guestHeader from '@/components/global/guestheader'
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
Vue.use(VueSweetalert2);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: true,
    timerProgressBar: true,
})
export default {
    components: {
        guestHeader
    },
    data() {
        return {
            secondlevel: true,
            thirdlvl: false,
            isLoading: false,
            openmodal: false,
            infomsg: 'For a better peer to peer connectivity and to help make better decisions while trying to connect with another user, profession and education level is made visible to other users. Any other personal information is kept private and will not be visible to others.',
            heading: '',
            errmsg: '',
            loading: false,
            jdisabled: 0,
            ndisabled: 0,
            errormessage: false,
            error: [],
            profile_pic:null,
            form: {
                profile_pic:null,
                identity_no: '',
                profession: null,
                dob: '',
                educational_qualification: null,
                security_ques: null,
                security_ans: null,
                jobfrontimg: '',
                jobbackimg: '',
                nid_front: '',
                nid_back: '',
                designation: '',
                company_name: '',
                vehicle_type: '',
                blood_group: null,
                fblink: null,
                location: '',
                study_subject: '',
                sector: '',
                institution_name: '',
                emergency_person_name: '',
                emergency_contact_no: ''
            },
            nidfrontname: '',
            nidbackname: '',
            jobfrontname: '',
            jobbackname: '',
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
            govt_job_holder: false,
            student: false,
            retired: false,
            driver: false,
            job_holder: true,
            nidname: [],
            years: [],
            days: [],
            nextstep: false,
            day: '',
            year: '',
            month: '',
            months: [
                { num: "01", month: "January" },
                { num: "02", month: "February" },
                { num: "03", month: "March" },
                { num: "04", month: "April" },
                { num: "05", month: "May" },
                { num: "06", month: "June" },
                { num: "07", month: "July" },
                { num: "08", month: "August" },
                { num: "09", month: "September" },
                { num: "10", month: "October" },
                { num: "11", month: "November" },
                { num: "12", month: "December" }
            ],
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
                'Professional Driver'
            ],

            squestion: [
                'What Is your favorite book?',
                'If you win a million dollars, what would you buy first?',
                'Who was your crush in high school?',
                'Who was your favorite colleague at the first company you worked at?',
                'Who was your favorite teacher in high school?',
                'Who was your favorite teacher at the University?',
                'Where is your favorite place to vacation?',
                'Where did you meet your spouse?',
                'Where were you on New Year\'s Eve in 2000?',
            ],
            id: this.$route.params.id,
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
        studentreq() {
            return this.student == true ? "required" : ""
        },
        govjobeq() {
            return this.govt_job_holder == true ? "required" : ""
        },
        pvtjobreq() {
            return this.job_holder == true ? "required" : ""
        },
        retiredreq() {
            return this.retired == true ? "required" : ""
        },
        driverreq() {
            return this.driver == true ? "required" : ""
        }


    },

    created() {
        var d = new Date();
        var currenty = d.getFullYear();
        let from = currenty - 75
        let to = currenty - 18
        for (let i = from; i <= to; i++) {
            this.years.push(i);
        }
        for (let i = 1; i < 32; i++) {
            if (i < 10) {
                i = ('0' + i).slice(-2)
            }
            this.days.push(i);
        }
        this.query.expires = this.$route.query.expires
        this.query.signature = this.$route.query.signature

    },

    methods: {
        resetmsg() {
            this.heading = ''
            this.infomsg = "For a better peer to peer connectivity and to help make better decisions while trying to connect with another user, profession and education level is made visible to other users.Any other personal information is kept private and will only be used where necessary for your own security or advantage. Government id/National id verified user means that the person is responsible for his/her actions."
        },
        next() {

            this.nextstep = true
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.nextstep = false
                    this.secondlevel = false
                    this.thirdlvl = true
                    this.heading = ''
                    this.infomsg = "For a better peer to peer connectivity and to help make better decisions while trying to connect with another user, profession and education level is made visible to other users.Any other personal information is kept private and will only be used where necessary for your own security or advantage. Government id/National id verified user means that the person is responsible for his/her actions."
                }


            })
        },
        goback() {
            this.secondlevel = true
            this.thirdlvl = false
            this.heading = ''
            this.infomsg = 'For a better peer to peer connectivity and to help make better decisions while trying to connect with another user, profession and education level is made visible to other users. Any other personal information is kept private and will not be visible to others.'
        },
        sqchange() {

        },

        closeerrmsg() {
            this.error = []
            this.errormessage = false
        },
        removenidfront() {
            this.nidfrontname = ""
            this.form.nid_front = ""
        },
        removenidback() {
            this.nidbackname = ""
            this.form.nid_back = ""
        },
        onNidFrotChange(e) {
            let file = this.$refs.nidfront.files[0]
            this.form.nid_front = file
            const type = file.type.split(/[/]/)[1]
            this.nidfrontname = file.name.substring(0, 5).concat('.' + type);

            // let file = e.target.files[0];
            // const ext = file.name.split('.').pop()
            // const fname = file.name.split(/[\s.jpg .png]+/)[0].substring(0, 5)
            // this.nidfrontname = fname.concat('.' + ext)
            // let reader = new FileReader();
            // reader.onload = (file) => {
            //     this.form.nid_front = reader.result;
            // }
            // reader.readAsDataURL(file);
        },
        onNidBackChange(e) {
            let file = this.$refs.nidback.files[0]
            this.form.nid_back = file
            const type = file.type.split(/[/]/)[1]
            this.nidbackname = file.name.substring(0, 5).concat('.' + type);
        },
        removejobid(index, chip) {
            this.jobname.splice(this.jobname.indexOf(chip), 1)
            this.form.jobimg.splice(this.form.jobimg.indexOf(index), 1)
            this.jdisabled = 0

        },
        onJobFrontChange() {
            let file = this.$refs.jobimgf.files[0]
            this.form.jobfrontimg = file
            const type = file.type.split(/[/]/)[1]
            this.jobfrontname = file.name.substring(0, 5).concat('.' + type);


        },
        onJobBackChange() {
            let file = this.$refs.jobimgb.files[0]
            this.form.jobbackimg = file
            const type = file.type.split(/[/]/)[1]
            this.jobbackname = file.name.substring(0, 5).concat('.' + type);
        },
        onChange(e) {
            let image = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (image) => {
                this.profile_pic = reader.result;
            }
            reader.readAsDataURL(image);
            let file = this.$refs.propic.files[0]
            this.form.profile_pic = file
        },

        verify() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.loading = true
                    let formData = new FormData();
                    formData.append('profile_pic', this.form.profile_pic);
                    formData.append('identity_no', this.form.identity_no);
                    formData.append('profession', this.form.profession);
                    formData.append('nid_front', this.form.nid_front);
                    formData.append('nid_back', this.form.nid_back);
                    formData.append('dob', this.form.dob);
                    formData.append('educational_qualification', this.form.educational_qualification);
                    formData.append('security_ques', this.form.security_ques);
                    formData.append('security_ans', this.form.security_ans);
                    if (this.form.jobfrontimg) {
                        formData.append('jobid_front', this.form.jobfrontimg);
                    }
                    if (this.form.jobbackimg) {
                        formData.append('jobid_back', this.form.jobbackimg);
                    }
                    formData.append('designation', this.form.designation);
                    formData.append('company_name', this.form.company_name);
                    formData.append('vehicle_type', this.form.vehicle_type);
                    formData.append('blood_group', this.form.blood_group);
                    formData.append('location', this.form.location);
                    formData.append('study_subject', this.form.study_subject);
                    formData.append('sector', this.form.sector);
                    formData.append('institution_name', this.form.institution_name);
                    formData.append('emergency_person_name', this.form.emergency_person_name);
                    formData.append('emergency_contact_no', this.form.emergency_contact_no);
                    this.$axios.post(`verify/${this.id}?${this.queryString}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(res => {
                            if (res.status == 200) {
                                this.loading = false
                                Toast.fire({
                                    type: 'success',
                                    html: '<p>Email verification is successful.</p><p>Please allow a maximum of 12 hours for TripShipTask to verify the information<br>and activate your account.</p><p>You can log in to your account and get the status update.</p>'
                                })
                                this.$router.push({ name: 'root' })
                            } else {
                                this.loading = false
                            }

                        })
                        .catch(error => {
                            this.loading = false
                            if (error.response.status == 422) {
                                if (error.response.data.errors.status == 'verified') {
                                    Toast.fire({
                                        type: 'error',
                                        text: error.response.data.errors.message
                                    })
                                } else {
                                    this.error.push(error.response.data.errors)
                                    this.errormessage = true

                                }
                            }
                            if (error.response.status == 400) {
                                Swal.fire({
                                    title: "Verification link expired. Click on 'Resend Verification Link'",
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Resend verification link',
                                    imageUrl: 'https://img.icons8.com/office/40/000000/error.png',
                                    imageWidth: 60,
                                    imageHeight: 60,
                                    imageAlt: 'warning',
                                    animation: true

                                }).then((result) => {
                                    if (result.value) {
                                        this.$axios.post('auth/resend', { email: error.response.data.errors.email })
                                            .then(res => {
                                                Swal.fire({
                                                    title: 'Verification link sent!',
                                                    html: '<p style="text-align:center;"> Successful! A verification link has been sent to your email.</p>',
                                                    imageUrl: 'https://dev.tripshiptask.com/assets/images/success.png',
                                                    imageWidth: 80,
                                                    imageHeight: 80,
                                                    imageAlt: 'success',
                                                    animation: true

                                                })
                                            })
                                    } else(
                                        result.dismiss === Swal.DismissReason.cancel
                                    )

                                })
                            }
                            this.$router.push({ name: 'root' })
                        })
                }
            })

        }
    },
    watch: {
        'jobname': function(val) {
            this.jobname = val
        },
        'form.jobimg': function(val) {
            this.form.jobimg = val
        },
        'form.nid_front': function(val) {
            this.form.nid_front = val
        },
        'form.profession': function(val) {
            if (val == 'Government Job') {
                this.job_holder = false
                this.student = false
                this.retired = false
                this.driver = false
                this.govt_job_holder = true
                this.form.study_subject = ''
                this.form.designation = ''
                this.form.company_name = ''
                this.form.institution_name = ''
                this.form.vehicle_type = ''
            } else if (val == 'Student') {
                this.job_holder = false
                this.student = true
                this.retired = false
                this.driver = false
                this.govt_job_holder = false
                this.form.study_subject = ''
                this.form.designation = ''
                this.form.company_name = ''
                this.form.institution_name = ''
                this.form.sector = ''
                this.form.vehicle_type = ''
            } else if (val == 'Retired') {
                this.job_holder = false
                this.student = false
                this.retired = true
                this.driver = false
                this.govt_job_holder = false
                this.form.study_subject = ''
                this.form.designation = ''
                this.form.company_name = ''
                this.form.institution_name = ''
                this.form.sector = ''
                this.form.vehicle_type = ''
            } else if (val == 'Professional Driver') {
                this.job_holder = false
                this.student = false
                this.retired = false
                this.driver = true
                this.govt_job_holder = false
                this.form.study_subject = ''
                this.form.designation = ''
                this.form.company_name = ''
                this.form.institution_name = ''
                this.form.sector = ''
                this.form.vehicle_type = ''
            } else {
                this.job_holder = true
                this.student = false
                this.retired = false
                this.driver = false
                this.govt_job_holder = false
                this.form.study_subject = ''
                this.form.designation = ''
                this.form.company_name = ''
                this.form.institution_name = ''
                this.form.sector = ''
                this.form.vehicle_type = ''
            }
        },
        'form.nid_back': function(val) {
            this.form.nid_back = val
        },
        'day': function(val) {
            this.form.dob = this.day + "-" + this.month + "-" + this.year;
        },
        'month': function(val) {
            this.form.dob = this.day + "-" + this.month + "-" + this.year;
        },
        'year': function(val) {
            this.form.dob = this.day + "-" + this.month + "-" + this.year;
        }
    }




}
</script>
<style scoped>
.auth-outer .auth-box {
    justify-content: flex-end;
}

.auth-outer .auth-box .side-box {
    background: #f4f6fb;
    width: 1050px;
    padding-right: 20px;
}

.item-list img {
    width: 100px;
    height: 100px;
    margin-top: 10px;
}

.auth-outer .auth-box .side-box {
    background: #f4f6fb;
}

.label {
    margin-top: 5px;
}

.ques {
    position: relative;
    top: -15px;
    right: -111px;
    cursor: pointer;
}


.login {
    background-color: #fff;
    background-color: rgba(var(--d87, 255, 255, 255), 1);
    border: 1px solid #dbdbdb;
    border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
    border-radius: 1px;
}

.is-thalf {
    padding-right: 0px;
    padding-left: 18px;
    width: 29.2%;
}

.is-thalf-right {
    padding-right: 0px;
    width: 26.5%;
    padding-left: 3px;
}

.control input {
    height: 2.9em !important;
    border-radius: 3px !important;
    padding: 7px 0 7px 8px !important;
    font-size: 12px !important;
    background: #fafafa !important;
}

.auth-outer .auth-box .form-wrapper .login .body {
    display: block;
    margin-top: 0px;
}

.body button {
    margin-top: 10px !important;
    font-size: 14px;
    border-radius: 4px;
}

.field:not(:last-child) {
    margin-bottom: .35rem;
}

.title {
    margin: 22px auto 12px;
    font-size: 1.7em !important
}

.profilepic .file-label .file-cta {
    padding: 2px;
    font-size: 1.3em;
    height: 2.5em;
    margin-top: 3px;
    padding-right: 5px;
    padding-left: 5px;
    width: 100%;
}

.profilepic .file-icon {
    font-size: 0.2em;
    padding: 6px;
}

.file-name {
    margin-left: 3px;
    padding: 0.4em;
    border-width: 1px 1px 1px 1px;
    margin-top: 2px;
    font-size: 0.6rem;
}

.material-icons {
    font-size: 1rem;
}

.file-label {
    font-size: 0.7rem;
}

.item-list {
    margin-top: 0px !important
}

.auth-outer {
    background: #f4f6fb;
    margin: 0 auto !important;
    max-width: 1200px;
    padding-bottom: 0px;
}

.auth-outer .auth-box .form-wrapper {
    position: relative;
    min-height: 480px;
    overflow: hidden;
    max-width: 490px;
    width: 100%;
    height: 100%;
}

.vs-divider {
    width: 80%;
    color: #8e8e8e;
    font-size: 13px;
}


.side-box img {
    margin-top: 10px;
}

.edu-error {
    margin-top: 5px;
}

.select-error {
    margin-top: 5px;
}

.signupbox {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #dbdbdb;
    border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
    border-radius: 1px;
    margin-top: 10px;
}

.signupbox .body {
    margin: 20px 0px;
    text-align: center;
}

.headline p {
    color: #4e4b4b;
    font-weight: 600;
    font-size: 18px;
}

.files {
    margin-top: -24px;
}

.heading {
    padding: 20px;
}

.heading h2 {
    font-size: 20px;
    font-weight: 500;
    color: #484848e6;
}

.tdpc {
    color: rgba(var(--f52, 142, 142, 142), 1);
    font-size: 12px;
    line-height: 16px;
    margin: 10px 47px;
    text-align: center;
}

@media only screen and (max-width:768px) {
    .is-thalf-right {
        width: 50%;
        padding-left: 12px;
    }

    .is-thalf {
        width: 50%;
        padding-left: 12px;
    }


}

.is-gapless .column {
    margin-right: 8px;
}

.secondlevel {
    margin: 10px 20px;
}

.thirdlvl {
    margin: 10px 20px;
}

.select select {
    font-size: 0.8em !important;
}

input.input {
    height: 2.6em;
    background: #fafafa !important;
}

.whyneed {
    color: #0095f6;
    font-size: 14px !important;
}

.columns.is-gapless:not(:last-child) {
    margin-bottom: calc(1.5rem - 1.4rem) !important;
}

.select:not(.is-multiple) {
    height: 2em;
}

.input:active,
.input:focus {
    border-color: #b1aaaa !important;
}

.select select {
    background: #fafafa !important;
}

.infosection {
    margin: 122px 5px 0px 45px;
    text-align: left;
    width: 499px;

}

.select select {
    height: 2.6em;
}

.control input {
    width: 100% !important;
}

.is-6-desktop:first-child {
    padding-right: 0px;
}

.image {
    width: 150px;
    height: 150px;
    display: flex;
    margin: 0 auto;
    justify-content: center;
}

.image img {
    display: block;
    border-radius: 50%;
    z-index: 1;
}


.overlay {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: .5s ease;
    background: rgb(0 0 0 / 32%);
    content: "\f030";
    color: #fff;
    border-radius: 50%;
    z-index: 99;
    margin: 0 auto;
}

.file-label .file-cta
{
    padding: 2px;
    font-size: 1em;
    height: 2.5em;
    margin-top: 3px;
    padding-right: 5px;
    padding-left: 5px;
    width: 100%;
}
.profilepic .file-label {
    top: 55px;
    left: 0px;
}

.file-label:active .file-cta {
    background-color: transparent;
    color: #fff;
}

.profilepic .file-cta {
    background-color: transparent;
    color: #fff;
    border-color: transparent;
}

.file-icon {
    font-size: .2em;
    padding: 6px;
}

.icon {
    cursor: pointer;
}

.down .file-cta {
    background-color: #24a6d5;
    color: #fff;
    border-color: #fff;
}

.down {
    justify-content: center;
    top: 10px;
}

.down .file-label {
    color: #fff;
    top: 0;
    left: 0;
}

.down .file-label:hover {
    background: #1f8ab1
}

.field h3 {
    font-weight: 500;
    color: #3298dc;
    text-align: center;
    cursor: pointer;
}

.goback {
    background: transparent;
    text-align: center;
    justify-content: center;
    font-weight: 600 !important;
    color: #0095f6 !important;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    margin-top: 5px;
    border: 0;
    cursor: pointer;
    width: 10px !important;
}

.con-vs-chip {
    border-radius: 4px;
    background: #fafafa;
    border: 1px solid #d9d9d9;
}


@media only screen and (max-width:480px) {
    .auth-outer {
        display: inline-grid;
    }

    .auth-outer .auth-box {
        justify-content: center;
    }

    .auth-outer .auth-box {
        max-width: 418px;
    }

    .infosection {
        margin: 0px;
        text-align: left;
        width: auto;
        padding: 23px 51px 7px 16px;
    }

    .auth-outer .auth-box .form-wrapper {
        padding: 0px 54px 4px 12px;
    }

    .is-6-desktop:first-child {
        padding-right: 10px;
    }


}
</style>