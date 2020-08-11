<template>
    <section class="billing">
        <vue-headful title="My Transactions" />
        <div class="section-wrapper">
            <div class="container">
                <div class="pricing-wrapper">
                    <div id="solo" class="pricing-container is-active">
                        <div class="container-inner">
                            <div class="solo-plans">
                                <!--Plan-->
                                <div class="solo-plan">
                                    <div class="header">
                                        <span>Total Income</span>
                                    </div>
                                    <div class="body">
                                        <span>  {{user.received}} {{currency}}</span>
                                    </div>
                                </div>
                                <!--Plan-->
                                <div class="solo-plan">
                                    <div class="header">
                                        <span>Total Spent</span>
                                    </div>
                                    <div class="body">
                                        <span>  {{user.spent}} {{currency}}</span>
                                    </div>
                                </div>
                                <!--Plan-->
                                <div class="solo-plan">
                                    <div class="header">
                                        <span>Withdrawn</span>
                                    </div>
                                    <div class="body">
                                        <span>0 BDT</span>
                                    </div>
                                </div>
                                <div class="solo-plan">
                                    <div class="header">
                                        <span>Account Balance</span>
                                    </div>
                                    <div class="body">
                                        <span> {{user.balance}} {{currency}}</span>
                                    </div>
                                </div>
                                <div class="solo-plan">
                                    <div class="header">
                                        <span style="text-align: center;">Money owed to TripShipTask</span>
                                    </div>
                                    <div class="body">
                                        <span> {{user.money_owed}} {{currency}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="withdrawn-wrapper">
            <div class="container">
                <span>WITHDRAW:</span>
                <div class="withdrawn-options">
                <vs-button color="primary" type="border" >Bkash(Personal Account)</vs-button>
                <vs-button color="primary" type="border" >UCash</vs-button>
                <vs-button color="primary" type="border" >Rocket</vs-button>
                <vs-button color="primary" type="border" >Sheba</vs-button>
                <vs-button color="primary" type="border" >Bank Account</vs-button>
                </div>
            </div>
        </div>
        <div class="section-wrapper">
            <div class="container">
                <div class="card">
                    <div class="card-content">
                        <all-transection :data="data" v-if="data"></all-transection>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import allTransection from '../../components/profile/AllTransection'
import { mapActions } from 'vuex';
export default {
    name: "billingpayment",
    components: { allTransection },
    data() {
        return {

        }
    },
    computed: {
        data() {
            return this.$store.getters.transactions.data
        },
        user() {
            return this.$store.getters.user
        },
         currency() {
            return this.$store.getters.user.currency
        },
    },

    created() {
        this.getUserTransaction();
    },
    mounted() {

    },
    methods: {
        ...mapActions("transaction",
            ['getUserTransaction']),

    },
    watch: {

    }
};
</script>
<style scoped>
.pricing-wrapper {
    padding-bottom: 0px;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .02);
    background-color: #fff;

}

.pricing-wrapper .pricing-container .container-inner {
    padding: 0px;
}

.pricing-wrapper .pricing-container .container-inner .solo-plans .solo-plan {
    width: 20%;
    min-height: 124px;
    border-right: 1px solid #e3e3e3;
    padding: 29px 15px;
    justify-content: space-evenly;
}

.header {
    font-size: 1em;
    color: #363636;
    font-weight: 600;
    line-height: 1.3;
}

.body {
    font-size: 1.1em;
    color: #363636;
    font-weight: 600;
    line-height: 1.3;
}

.pricing-wrapper .pricing-container .container-inner .solo-plans .solo-plan .header span {
    font-size: 1em;
}

.pricing-wrapper .pricing-container .container-inner .solo-plans .solo-plan .body span {
    font-size: 1.1em;
}

.withdrawn-wrapper {
    padding: 0px 40px;
}
.withdrawn-wrapper .container
{
  display: flex;
  align-items: baseline;
}

.withdrawn-wrapper span {
    font-size: 1em;
    font-weight: 600;
}
.withdrawn-options button
{
  margin:0px 10px;

}
</style>