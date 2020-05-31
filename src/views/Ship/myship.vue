<template>
    <div class="maincolumns">
        <div class="columns">
            <div class="column is-10 is-offset-1">
                <vs-tabs class="multiple">
                    <vs-tab label="My Send package">
                        <div v-if="isSLoading">
                            <img class="loading" src="../../assets/images/roaling.gif">
                        </div>
                        <div v-else>
                            <send-package v-if="myships" :data="myships.my_send_package"></send-package>
                        </div>
                    </vs-tab>
                    <vs-tab label="My Carry package">
                        <carry-package v-if="myships" :data="myships.my_carry_package"></carry-package>
                    </vs-tab>
                    <vs-tab label="My completed shipments">
                        <completed-ship v-if="myships" :data="myships.bids"></completed-ship>
                    </vs-tab>
                </vs-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        sendPackage: () => import('@/components/ship/MySendPackage'),
        carryPackage: () => import('@/components/ship/MyCarryPackage'),
        completedShip: () => import('@/components/ship/CompletedShip')
    },
    data() {
        return {
            first: true,
            second: false,
        }
    },

    created() {
        if (this.$store.getters.myships.length == 0) {
            this.myShips();
        }
    },
    computed: {
        id() {
            return this.$store.getters.id
        },
        myships() {
            return this.$store.getters.myships.data
        },
        isSLoading() {
            return this.$store.getters.isSLoading
        }
    },


    methods: {
        ...mapActions("ship",
            ['myShips']),

        posted() {
            this.first = true,
                this.second = false

        },
        completed() {
            this.second = true,
                this.first = false
        },
        // onChange() {
        //     this.isLoading = true
        //     axios.get(`api/myship/${this.auth}`)
        //         .then(res => {
        //             this.data = res.data.data
        //             this.isLoading = false

        //         })
        //         .catch(error => console.log(error.res))
        // },
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


.active {
    color: #039BE5 !important;

}

.loading {
    height: auto;
    max-width: 50%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.is-activee {
    background-color: #039BE5 !important;
    border-bottom-color: #039BE5 !important;

}


.maincolumns {
    padding-top: 20px;
}

.main {
    font-weight: 500;

}

.el-tabs--border-card>.el-tabs__content {
    padding: 0px !important;
}

.side li {
    padding: 5px;
}

.side li a {
    color: #4A4A4A;
}

.height {
    position: absolute;
    left: 50%;
    top: 10%;
    bottom: 10%;
    border-left: 1px solid white;
}

.loading {
    height: auto;
    max-width: 50%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: none !important;
}
</style>