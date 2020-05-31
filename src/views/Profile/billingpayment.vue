<template>
    <section class="billing">
        <vs-tabs>
      <vs-tab label="All Transection">
        <div>
          <all-transection :data="data"></all-transection>
        </div>
      </vs-tab>
      <vs-tab label="Received Amount">
        <div>
          <recieved-amount :data="data"></recieved-amount>
        </div>
      </vs-tab>
      <vs-tab label="Pending Amount">
        <div>
          <pending-amount :data="data"></pending-amount>
        </div>
      </vs-tab>
        <vs-tab label="Paid Amount">
        <div>
          <paid-amount :data="data"></paid-amount>
        </div>
      </vs-tab>
    </vs-tabs>
    </section>
</template>
<script>
import allTransection from '../../components/profile/AllTransection'
import recievedAmount from '../../components/profile/recievedAmount'
import paidAmount from '../../components/profile/paidAmount'
import  pendingAmount from '../../components/profile/pendingAmount'
import { mapActions } from 'vuex';
export default {

    name: "billingpayment",
    components: { allTransection,recievedAmount,paidAmount,pendingAmount },
    data() {
        return {

        }
    },
    computed: {
        data() {
            return this.$store.getters.transactions.data
        }
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

</style>