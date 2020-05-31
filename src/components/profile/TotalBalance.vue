<template>
    <div class="">
    <vs-tabs>
      <vs-tab label="All Transection">
        <div>
          <all-transection :data="data"></all-transection>
        </div>
      </vs-tab>
      <vs-tab label="Uploaded Amount">
        <div>

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
      <vs-tab label="Withdraw Amount">
        <div>

        </div>
      </vs-tab>
    </vs-tabs>

    </div>
</template>
<script>
import allTransection from './AllTransection'
import recievedAmount from './recievedAmount'
import paidAmount from './paidAmount'
import pendingAmount from './pendingAmount'
export default {
    //  path: "/profile",
    // component: recievedAmount,
    // alias: ["/route2"],

    props: ['data'],

    components: { allTransection, recievedAmount, paidAmount,pendingAmount},

    data() {
        return {

            first: true,
            second: false,
            third: false,
            fourth: false,
            fifth: false,
            sixth: false,

        }

    },
    created() {
        //  axios.get('api/transection', {
        //         headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        //     })
        //     .then(res => this.data=res.data.data)
        //         .catch(error => console.log(error.res.data))

    },
    methods: {
        transection() {
            this.sixth = false
            this.first = true
            this.fourth = false
            this.second = false
            this.third = false
            this.fifth = false
        },
        uploaded() {
            this.sixth = false
            this.second = true
            this.first = false
            this.first = false
            this.third = false
            this.fifth = false
        },
        recieved() {
            this.sixth = false
            this.third = true
            this.first = false
            this.second = false
            this.fourth = false
            this.fifth = false
        },
        payout() {
            this.sixth = false
            this.fourth = true
            this.first = false
            this.second = false
            this.third = false
            this.fifth = false
        },
        paid() {
            this.sixth = false
            this.fifth = true
            this.fourth = false
            this.first = false
            this.second = false
            this.third = false

        },
        pending() {
            this.sixth = true
            this.fifth = false
            this.fourth = false
            this.first = false
            this.second = false
            this.third = false

        }


    }

}

</script>
<style scoped>
.flex-card .tabs {
    padding: 0px;
}

.tabs ul li:hover a {
    border-bottom-color: #039BE5 !important
}

.is-activee {
    background-color: #4FC1EA !important;
    border-bottom-color: #4FC1EA !important;

}

/* width */
::-webkit-scrollbar {
    width: 7px;
    height: 3px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #039BE5;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #35AFEA;
}

</style>
