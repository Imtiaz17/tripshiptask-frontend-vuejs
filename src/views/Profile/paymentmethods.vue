<template>
    <div class="section-wrapper">
        <vue-headful title="Payment methods" />
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    Payment method
                </p>
                <p class="subtitle">
                    Please enter your preferred payment method information so you can withdraw your earnings to your preferred account
                </p>
            </header>
            <div class="paymentcontent">
                <div class="columns">
                    <div class="column is-3">
                        <h3>Bkash</h3>
                        <div class="columns">
                            <div class="column is-10">
                                <div class="control">
                                    <float-label fixed label="Number">
                                        <input type="text" class="input is-primary-focus" v-model="form.paypalid">
                                    </float-label>
                                </div>
                            </div>
                        </div>
                        <vs-radio v-model="default_method" vs-name="default_method" vs-value="paypal">Preferred default method</vs-radio>
                    </div>
                    <div class="column is-3">
                        <h3>UCash</h3>
                        <div class="columns">
                            <div class="column is-10">
                                <div class="control">
                                    <float-label fixed label="Number">
                                        <input type="text" class="input is-primary-focus" v-model="form.paypalid">
                                    </float-label>
                                </div>
                            </div>
                        </div>
                        <vs-radio v-model="default_method" vs-name="default_method" vs-value="paypal">Preferred default method</vs-radio>
                    </div>
                    <div class="column is-3">
                        <h3>Rocket</h3>
                        <div class="columns">
                            <div class="column is-10">
                                <div class="control">
                                    <float-label fixed label="Number">
                                        <input type="text" class="input is-primary-focus" v-model="form.paypalid">
                                    </float-label>
                                </div>
                            </div>
                        </div>
                        <vs-radio v-model="default_method" vs-name="default_method" vs-value="paypal">Preferred default method</vs-radio>
                    </div>
                    <div class="column is-3">
                        <h3>MPesa</h3>
                        <div class="columns">
                            <div class="column is-10">
                                <div class="control">
                                    <float-label fixed label="Number">
                                        <input type="text" class="input is-primary-focus" v-model="form.paypalid">
                                    </float-label>
                                </div>
                            </div>
                        </div>
                        <vs-radio v-model="default_method" vs-name="default_method" vs-value="paypal">Preferred default method</vs-radio>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-3">
                        <h3>Paypal</h3>
                        <div class="columns">
                            <div class="column is-10">
                                <div class="control">
                                    <float-label fixed label="Paypal Id">
                                        <input type="text" class="input is-primary-focus" v-model="form.paypalid">
                                    </float-label>
                                </div>
                            </div>
                        </div>
                        <vs-radio v-model="default_method" vs-name="default_method" vs-value="paypal">Preferred default method</vs-radio>
                    </div>
                    <div class="column is-6">
                        <h3>Bank</h3>
                        <div class="columns">
                            <div class="column is-4">
                                <div class="control">
                                    <float-label fixed label="Account Name">
                                        <input type="text" class="input is-primary-focus" v-model="form.b_acc_name">
                                    </float-label>
                                </div>
                            </div>
                            <div class="column is-4">
                                <div class="control">
                                    <float-label fixed label="Bank Name">
                                        <input type="text" class="input is-primary-focus" v-model="form.b_name">
                                    </float-label>
                                </div>
                            </div>
                            <div class="column is-4">
                                <div class="control">
                                    <float-label fixed label="Account Number">
                                        <input type="text" class="input is-primary-focus" v-model="form.b_acc_number">
                                    </float-label>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-4">
                                <float-label fixed label="Bank Branch">
                                    <input type="text" class="input is-primary-focus" v-model="form.b_branch">
                                </float-label>
                            </div>
                            <div class="column is-4">
                                <div class="control">
                                    <float-label fixed label="Swift Code or Routing number">
                                        <input type="text" class="input is-primary-focus" v-model="form.b_routing_number">
                                    </float-label>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <vs-radio v-model="default_method" vs-name="default_method" vs-value="bank">Preferred default method</vs-radio>
                            </div>
                        </div>
                    </div>
                    <div class="column is-3">
                        <h3>Payoneer</h3>
                        <div class="columns">
                            <div class="column is-10">
                                <div class="control">
                                    <float-label fixed label="Email address">
                                        <input type="text" class="input is-primary-focus" v-model="form.paypalid">
                                    </float-label>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-10">
                                <div class="control">
                                    <float-label fixed label="Payoneer Id">
                                        <input type="text" class="input is-primary-focus" v-model="form.paypalid">
                                    </float-label>
                                </div>
                            </div>
                        </div>
                        <vs-radio v-model="default_method" vs-name="default_method" vs-value="paypal">Preferred default method</vs-radio>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-3">
                        <h3>Skrill</h3>
                        <div class="columns">
                            <div class="column is-10">
                                <div class="control">
                                    <float-label fixed label="Paypal Id">
                                        <input type="text" class="input is-primary-focus" v-model="form.paypalid">
                                    </float-label>
                                </div>
                            </div>
                        </div>
                        <vs-radio v-model="default_method" vs-name="default_method" vs-value="paypal">Preferred default method</vs-radio>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-4">
                        <button class="button button-cta info-btn is-bold rounded raised">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'paymentmethods',
    data() {
        return {
            isLoading: false,
            default_method: '',
            methods: false,
            month: '04',
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
            year: '',
            paymethod: null,
            pmethods: [
                { text: 'Credit/debit card', value: 'card' },
                { text: 'Paypal', value: 'paypal' },
                { text: 'Bank', value: 'bank' },
            ],
            form: {
                card_number: '',
                security_code: '',
                paypalid: '',
                b_acc_name: '',
                b_name: '',
                b_acc_number: '',
                b_branch: '',
                b_routing_number: ''
            }
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
        saveCard() {
            this.$axios.post('paymentmethod', {
                paymethod: this.paymethod,
                card_number: this.form.card_number,
                month: this.month,
                year: this.year,
                security_code: this.form.security_code,
            })
        },
        savePaypal() {
            this.$axios.post('paymentmethod', {
                paymethod: this.paymethod,
                paypalid: this.form.paypalid
            })

        },
        saveBank() {
            this.$axios.post('paymentmethod', {
                paymethod: this.paymethod,
                b_acc_name: this.form.b_acc_name,
                b_name: this.form.b_name,
                b_acc_number: this.form.b_acc_number,
                b_branch: this.form.b_branch,
                b_routing_number: this.form.b_routing_number
            })

        }

    },
    watch: {

    }
};
</script>
<style scoped>
.add_payment {
    display: inline-flex;
}

.con-vs-radio {
    float: left;
}

.add_payment span {
    margin-right: 4px;
}

.con-vs-checkbox {
    margin: 14px;
}

.add_payment .material-icons {
    cursor: pointer;
}

.methods .vs-tabs--li {
    width: 50% !important;
}

.select {
    width: 100%;
}

.paymentcontent {
    padding: 20px;
}

.paymentcontent h3 {
    font-size: 1.4em;
    font-weight: 600;
    padding-bottom: 10px;

}

select {
    width: 100% !important;
}

h2 {
    font-size: 30px;
}

.button {
    margin-right: 5px;
}
</style>