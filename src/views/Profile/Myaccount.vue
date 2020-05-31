<template>
    <div class="maincolumns">
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <ul class="list-block bordered">
                        <li class="is-active"><a>My account</a></li>
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
                        <router-link :to="{name:'billinginfo'}">
                            <li>
                                <a>Billing information</a>
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
}

.list-block li:hover {
    background-color: #EFF4F7;
}
.router-link-exact-active li
{
	background-color: #EFF4F7;
}
</style>