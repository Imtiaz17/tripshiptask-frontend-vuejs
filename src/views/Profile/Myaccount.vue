<template>
    <div class="maincolumns">
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <ul class="list-block bordered">
                        <router-link :to="{name:'billingpayment'}">
                            <li>
                                <a>Billings & Payment</a>
                            </li>
                        </router-link>
                        <router-link :to="{name:'paymentmethods'}">
                            <li>
                                <a>Payment methods</a>
                            </li>
                        </router-link>
                        <router-link :to="{name:'ewallet'}">
                            <li>
                                <a>E-wallet</a>
                            </li>
                        </router-link>
                    </ul>
                </div>
                <div class="column is-9">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

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
.maincolumns {
    padding-top: 20px;
}

.list-block {
    background-color: #fff;
    border: 1px solid #ededed;
    box-shadow: -1px 3px 10px 0 rgba(0,0,0,0.06);
}

.list-block.bordered li:not(last-child) {
    border-bottom: 1px solid #ededed;
}
.list-block li {
    padding: 10px 20px;
}
.list-block li a {
    color: #444;
}
.list-block li:hover {
    background-color: #EFF4F7;
}

</style>