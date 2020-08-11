<template>
    <vs-popup class="holamundo" :title="title" :active.sync="popupActive">
        <div class="vld-parent">
        	<loading :active.sync="isSubmitted" :can-cancel="false" :is-full-page="false"></loading>
            <vs-divider>
                Nid details
            </vs-divider>
            <div class="columns is-mobile">
                <div class="column is-6">
                    <div class="control">
                        <float-label label="Nid No" fixed>
                            <input type="number" min="0" name="identity_no" v-validate="'required'" v-model="form.identity_no" class="input is-primary-focus">
                        </float-label>
                        <span v-show="errors.has('identity_no')" class="help is-danger">
                            Nid No is required
                        </span>
                    </div>
                </div>
                <div class="column is-2" style="padding-right:0px">
                    <div class="field">
                        <div class="control">
                            <label class="file-label">
                                <input class="file-input" type="file" accept="image/*" @change="onIdentityChnage">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <span class="material-icons">publish</span>
                                    </span>
                                    <span class="file-label">
                                        NID Front
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="column is-2" style="padding-right:0px">
                    <div class="field">
                        <div class="control">
                            <label class="file-label">
                                <input class="file-input" type="file" accept="image/*" @change="onIdentityChnage">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <span class="material-icons">publish</span>
                                    </span>
                                    <span class="file-label">
                                        NID Back
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns is-mobile" style="margin-top:-35px;" v-show="errors.has('nidpic')">
                <div class="column is-6">
                </div>
                <div class="column is-6">
                    <input type="hidden" name="nidpic" v-model="identityname" v-validate="'required'">
                    <span class="help is-danger">NID photo is required</span>
                </div>
            </div>
            <div class="columns is-mobile" v-if="identityname.length>0">
                <div class="column">
                    <vs-chip @click="remove(index,chip)" v-for="(chip,index) in identityname" :key="index" closable>
                        {{ chip }}
                    </vs-chip>
                </div>
            </div>
            <vs-divider>
                Bank account details
            </vs-divider>
            <div class="paymentcontent">
                <div class="columns is-mobile">
                    <div class="column is-4">
                        <div class="control">
                            <float-label fixed label="Account Name">
                                <input type="text" v-validate="'required'" name="b_acc_name" class="input is-primary-focus" v-model="form.b_acc_name">
                            </float-label>
                            <span v-show="errors.has('b_acc_name')" class="help is-danger">
                                Account Name is required
                            </span>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="control">
                            <float-label fixed label="Bank Name">
                                <input type="text" v-validate="'required'" v-model="form.b_name" name="b_name" class="input is-primary-focus" >
                            </float-label>
                            <span v-show="errors.has('b_name')" class="help is-danger">
                                Bank name is required
                            </span>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="control">
                            <float-label fixed label="Account Number">
                                <input type="text" v-validate="'required'" name="b_acc_number" class="input is-primary-focus" v-model="form.b_acc_number">
                            </float-label>
                            <span v-show="errors.has('b_acc_number')" class="help is-danger">
                                Account number is required
                            </span>
                        </div>
                    </div>
                </div>
                <div class="columns is-mobile">
                    <div class="column is-4" style="">
                        <div class="control">
                            <float-label fixed label="Bank Branch">
                                <input type="text" v-validate="'required'" name="b_branch" class="input is-primary-focus" v-model="form.b_branch">
                            </float-label>
                            <span v-show="errors.has('b_branch')" class="help is-danger">
                                Branch is required
                            </span>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="control">
                            <float-label fixed label="Swift Code or Routing number">
                                <input type="text" v-validate="'required'" name="b_routing_number" class="input is-primary-focus" v-model="form.b_routing_number">
                            </float-label>
                            <span v-show="errors.has('b_routing_number')" class="help is-danger">
                                Routing number is required
                            </span>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-12">
                        <div class="control">
                            <p class="bankinfo-text">For cash transactions, system will track and keep records and will send what we owe to your bank account every week. Similarly, if you owe any balance to the system, the amount will be deducted from your account every week. If for any reason, the transaction is failed, the account will be put on hold until the issue is resolved.</p>
                        </div>
                    </div>
                </div>
                <div class="control">
                    <ul class="leftx" style="display: inline-flex;">
                        <li style="margin-left:10px;">
                            <vs-radio vs-name="bankinfo" v-model="isagree" vs-value="agree">I Agree</vs-radio>
                        </li>
                        <li style="margin-left:10px;">
                            <vs-radio vs-name="bankinfo" v-model="isagree" vs-value="disagree">I Disagree</vs-radio>
                        </li>
                    </ul>
                    <input type="hidden" name="isagree" v-model="isagree">
                    <span v-show="errors.has('isagree')" class="help is-danger">
                        You have to agree with the terms
                    </span>
                </div>
            </div>
            <br>
            <div class="columns">
                <div class="column">
                    <vs-button @click="infoSubmit">Submit</vs-button>
                </div>
            </div>
        </div>
    </vs-popup>
</template>
<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
	components: {
        Loading
    },
    props:['title'],
    data() {
        return {
            popupActive: true,
            isSubmitted:false,
            identityname: [],
            isagree: '',
            form: {
                identity_no: '',
                b_acc_name: '',
                b_acc_number: '',
                b_branch: '',
                b_name: '',
                b_routing_number: '',
                identityimg: []

            },
        }
    },
    computed: {
        id() {
            return this.$store.getters.user.id
        }
    },
    methods: {
        async infoSubmit() {
            const results = Promise.all([
                this.$validator.validate('nidpic'),
                this.$validator.validate('identity_no'),
                this.$validator.validate('b_acc_name'),
                this.$validator.validate('b_acc_number'),
                this.$validator.validate('b_branch'),
                this.$validator.validate('b_name'),
                this.$validator.validate('b_routing_number')

            ]);
            const areValid = (await results).every(isValid => isValid);
            if (areValid) {
                this.isSubmitted=true
                this.$axios.patch(`auth/update/${this.id}`, this.form)
                .then(res=>{
                	EventBus.$emit('infoSubmitted')
                	this.isSubmitted=false
                })
            }
        },
        onIdentityChnage(e) {
            let file = e.target.files[0];
            this.identityname.push(file.name)
            let reader = new FileReader();
            reader.onload = (file) => {
                this.form.identityimg.push(reader.result);
            }
            reader.readAsDataURL(file);
        },
        remove(index, chip) {
            this.identityname.splice(this.identityname.indexOf(chip), 1)
            this.form.identityimg.splice(this.form.identityimg.indexOf(index), 1)
        },
    },
    watch: {

    }
};
</script>
<style scoped>
.file-label .file-cta {
    padding: 2px;
    font-size: 1em;
    height: 2.5em;
    margin-top: 3px;
    padding-right: 5px;
    padding-left: 5px;
}

.file-icon {
    font-size: 0.3em;
    padding: 8px;
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

.vs-radio--label,
.bankinfo-text {
    font-size: 14px;
}
.vs-popup--title h3
{
    font-size: 1em !important;
}
.paymentcontent .column
{
    padding-right: 4px;
}
</style>