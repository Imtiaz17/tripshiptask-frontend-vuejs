<template>
    <div class="parentx-static desktopsidebar">
        <vs-sidebar static-position default-index="1" color="primary" class="sidebarx" spacer>
            <i class="vs-icon notranslate icon-scale material-icons null grp-icon">store</i>
            <vs-sidebar-group title="Trip">
                <vs-sidebar-item index="1.1" icon="store" :to="{name:'trip'}">
                    Post a Trip
                </vs-sidebar-item>
                <vs-sidebar-item index="1.2" icon="store" :to="{name:'mytrip'}">
                    My Trips
                </vs-sidebar-item>
                <vs-sidebar-item index="1.3" icon="store" :to="{name:'mytripoffers'}">
                    My Trip Offers
                </vs-sidebar-item>
            </vs-sidebar-group>
            <i class="vs-icon notranslate icon-scale material-icons null grp-icon">store</i>
            <vs-sidebar-group title="Ship">
                <vs-sidebar-item index="2.1" icon="store" :to="{name:'ship'}">
                    Post a Ship
                </vs-sidebar-item>
                <vs-sidebar-item index="2.2" icon="store" :to="{name:'myship'}">
                    My Ship
                </vs-sidebar-item>
                 <vs-sidebar-item index="3.3" icon="store" :to="{name:'myshipoffers'}">
                    My Ship Offers
                </vs-sidebar-item>
            </vs-sidebar-group>
            <i class="vs-icon notranslate icon-scale material-icons null grp-icon">store</i>
            <vs-sidebar-group title="Task">
                <vs-sidebar-item index="3.1" icon="store" :to="{name:'task'}">
                    Post a Task
                </vs-sidebar-item>
                <vs-sidebar-item index="3.2" icon="store" :to="{name:'mytask'}">
                    My Tasks
                </vs-sidebar-item>
                 <vs-sidebar-item index="3.2" icon="store" :to="{name:'mytaskoffers'}">
                    My Task Offers
                </vs-sidebar-item>
            </vs-sidebar-group>
            <vs-sidebar-item index="4.1" icon="store" :to="{name:'referral'}">
                Referral
            </vs-sidebar-item>
            <vs-sidebar-item index="5.1" icon="store" :to="{name:'mytransactions'}">
                My Transactions
            </vs-sidebar-item>
            <vs-sidebar-item index="6.1" icon="store" :to="{name:'paymentmethods'}">
                Payment Method
            </vs-sidebar-item>
            <vs-sidebar-item index="7.1" icon="store" :to="{name:'ewallet'}">
                E-Wallet
            </vs-sidebar-item>
            <vs-sidebar-item index="8.1" icon="store">
                Ratings & Reviewes
            </vs-sidebar-item>
           
            <vs-sidebar-item index="10.1" icon="store">
                Support
            </vs-sidebar-item>
        </vs-sidebar>
    </div>
</template>
<script>
import Vue from 'vue';
import {
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup
} from 'element-ui';

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
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
.vs-sidebar--items .grp-icon {
    position: relative;
    top: 14px;
    float: left;
    left: 7px;
    z-index: 99999;
    color: #d6d9dd;
}

.vs-sidebar-group h4 {
    padding-left: 25px;
}
</style>