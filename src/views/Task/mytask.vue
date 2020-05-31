<template>
    <div class="maincolumns">
        <div class="columns">
            <div class="column is-10 is-offset-1">
                <vs-tabs class="multiple">
                    <vs-tab label="Posted Tasks">
                        <div v-if="isTLoading">
                            <img class="loading" src="../../assets/images/roaling.gif">
                        </div>
                        <div v-else>
                            <offered-task v-if="mytasks" :data="mytasks.offer_tasks"></offered-task>
                        </div>
                    </vs-tab>
                    <vs-tab label="Seeked Tasks">
                        <seeked-task v-if="mytasks" :data="mytasks.seeked_tasks"></seeked-task>
                    </vs-tab>
                    <vs-tab label="Completed Tasks">
                        <completed-task v-if="mytasks" :data="mytasks.bids"></completed-task>
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
        offeredTask: () => import('@/components/task/OfferedTask'),
        seekedTask: () => import('@/components/task/SeekedTask'),
        completedTask: () => import('@/components/task/CompletedTask')
    },
    data() {
        return {
            isLoading: false,
            first: true,
            second: false,
        }
    },
    computed: {
        id() {
            return this.$store.getters.id
        },
        mytasks() {
            return this.$store.getters.mytasks.data
        },
        isTLoading() {
            return this.$store.getters.isTLoading
        }
    },



    created() {
        if (this.$store.getters.mytasks.length == 0) {
            this.myTasks();
        }
    },
    methods: {
        ...mapActions("task",
            ['myTasks']),

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
        //     axios.get(`api/mytask/${this.auth}`)
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

.is-activee {
    background-color: #039BE5 !important;
    border-bottom-color: #039BE5 !important;

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

.maincolumns {
    padding-top: 20px;
}

.main {
    font-weight: 500;

}

.side li {
    padding: 5px;
}

.side li a {
    color: #4A4A4A;
}

.vs-tabs--content {
    min-height: 200px !important;
}
</style>