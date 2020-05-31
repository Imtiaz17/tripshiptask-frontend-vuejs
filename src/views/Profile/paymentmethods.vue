<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                Payment method
            </p>
        </header>
        <div class="card-content">
            <div class="content">
                <div class="add_payment">
                    <span class="material-icons">
                        add_circle_outline
                    </span>
                    <span>Add a new payment methods</span>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="control">
                        <div v-for="item in pmethods">
                            <ul style="display:inline-flex">
                                <li>
                                    <vs-radio v-model="paymethod" vs-name="pm" :vs-value="item.value">{{item.text}}</vs-radio>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="paymentcontent" v-show="paymethod=='card'">
            <div class="columns">
                <div class="column pb-10">
                    <img src="https://pay.skype.com/static/3.20/commerce.payment.psp.card.capture.pci/frame-2.3/images/method_list.svg" alt="">
                </div>
            </div>
            <div class="columns">
                <div class="column is-4">
                    <float-label>
                        <input type="text" class="input is-primary-focus" name="offer amount" placeholder="Card number">
                    </float-label>
                </div>
            </div>
            <div class="columns">
                <div class="column is-3">
                    <float-label :dispatch="false">
                        <div class="select is-select">
                            <select name="Select vehicle" v-model="month">
                                <option :value="null" disabled selected>Month</option>
                                <option>January</option>
                                <option>February</option>
                            </select>
                        </div>
                    </float-label>
                </div>
                <div class="column is-3">
                    <float-label :dispatch="false">
                        <div class="select is-select">
                            <select v-model="year">
                                <option :value="null" disabled selected>year</option>
                                <option>2020</option>
                                <option>2011</option>
                                <option>2022</option>
                            </select>
                        </div>
                    </float-label>
                </div>
            </div>
            <div class="columns">
                <div class="column is-3">
                    <float-label :dispatch="false">
                        <input type="text" class="input is-primary-focus" name="Security code" placeholder="Security code">
                    </float-label>
                </div>
            </div>
            <button class="button button-cta primary-btn is-bold rounded raised no-lh">
                Add
            </button>
        </div>
        <div class="paymentcontent" v-show="paymethod=='paypal'">
            <h2>Paypal</h2>
            <p>Select "Pay now" to complete your purchase. You will be redirected to the PayPal checkout.</p>
            <p>
                Sign in using your PayPal username and password to complete your purchase using your preferred payment option. Or create a PayPal account if you don't have one.
            </p>
            <br>
            <p>
                By clicking "Pay now", you agree to the Microsoft Services Agreement and Privacy and Cookies policy, and you authorize Skype to store your payment details.
            </p>
            <br>
            <button class="button button-cta primary-btn is-bold rounded raised no-lh">
                Pay now
            </button>
            <button class="button button-cta primary-btn btn-outlined is-bold rounded raised no-lh">
                Cancel order
            </button>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    name: 'paymentmethods',
    data() {
        return {
            methods: false,
            month: null,
            year: null,
            paymethod: null,
            pmethods: [
                { text: 'Credit/debit card', value: 'card' },
                { text: 'Paypal', value: 'paypal' },
            ],
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
    watch: {

    }
};
</script>
<style scoped>
.add_payment {
    display: inline-flex;
}

.add_payment span {
    margin-right: 4px;
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
.paymentcontent
{
    padding: 20px;
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