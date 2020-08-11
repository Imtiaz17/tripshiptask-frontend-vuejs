<template>
    <section id="main">
        <vue-headful title="Dashboard" description="Dashboard" />
        <div class="dashboard-wrapper section-wrapper">
            <div class="container">
                <div id="basic-layout" class="columns dashboard-columns">
                    <!-- Tile -->
                    <div class="column is-3">
                        <div class="flex-card card-overflow light-bordered light-raised">
                            <div class="icon-header">
                                <i class="material-icons primary">account_balance_wallet</i>
                            </div>
                            <div class="content">
                                <div class="card-title is-tile is-styled">
                                    <span>Trip</span>
                                    <div class="card-stat primary">Give a ride posted <span style="color:46c93a">{{data.give_ride_posted}}</span>
                                    </div>
                                    
                                    <div class="card-stat primary">Get a ride posted <span style="color:46c93a">{{data.get_ride_posted}}</span></div>
                                    <div class="card-stat primary">Give a ride completed <span style="color:46c93a">{{data.give_ride_completed}}</span></div>
                                    <div class="card-stat primary">Get a ride completed <span style="color:46c93a">{{data.get_ride_completed}}</span></div>

                                </div>
                            </div>
                            <div class="more">
                                <a class="primary" href="#">See all</a>
                            </div>
                        </div>
                    </div>
                    <!-- Tile -->
                    <div class="column is-3">
                        <div class="flex-card card-overflow light-bordered light-raised">
                            <div class="icon-header">
                                <i class="material-icons primary">account_balance</i>
                            </div>
                            <div class="content">
                                <div class="card-title is-tile is-styled">
                                    <span>Ship</span>
                                      <div class="card-stat primary">Send a package posted <span style="color:46c93a">{{data.sendpackage_posted}}</span>
                                    </div>
                                    
                                    <div class="card-stat primary">Carry a package posted <span style="color:46c93a">{{data.carrypackage_posted}}</span></div>
                                    <div class="card-stat primary">Send package completed <span style="color:46c93a">{{data.sendpackage_completed}}</span></div>
                                    <div class="card-stat primary">Carry package completed <span style="color:46c93a">{{data.carrypackage_completed}}</span></div>
                                </div>
                            </div>
                            <div class="more">
                                <a class="primary" href="#">Open</a>
                            </div>
                        </div>
                    </div>
                    <!-- Tile -->
                    <div class="column is-3">
                        <div class="flex-card card-overflow light-bordered light-raised">
                            <div class="icon-header">
                                <i class="material-icons primary">work</i>
                            </div>
                            <div class="content">
                                <div class="card-title is-tile is-styled">
                                    <span>Task</span>
                                     <div class="card-stat primary">Offer a task posted <span style="color:46c93a">{{data.offertask_posted}}</span>
                                    </div>
                                    
                                    <div class="card-stat primary">Want a task posted <span style="color:46c93a">{{data.wanttask_posted}}</span></div>
                                    <div class="card-stat primary">Offer task completed <span style="color:46c93a">{{data.offertask_completed}}</span></div>
                                    <div class="card-stat primary">Want task completed <span style="color:46c93a">{{data.wanttask_completed}}</span></div>
                                </div>
                            </div>
                            <div class="more">
                                <a class="primary" href="#">See all</a>
                            </div>
                        </div>
                    </div>
                    <!-- Tile -->
                    <div class="column is-3">
                        <div class="flex-card card-overflow light-bordered light-raised">
                            <div class="icon-header">
                                <i class="material-icons primary">account_balance_wallet</i>
                            </div>
                            <div class="content">
                                <div class="card-title is-tile is-styled">
                                    <span>Transactions</span>
                                    <div class="card-stat primary">Give a ride posted <span style="color:46c93a">{{data.give_ride_posted}}</span>
                                    </div>
                                    
                                    <div class="card-stat primary">Get a ride posted <span style="color:46c93a">{{data.get_ride_posted}}</span></div>
                                    <div class="card-stat primary">Give a ride completed <span style="color:46c93a">{{data.give_ride_completed}}</span></div>
                                    <div class="card-stat primary">Get a ride completed <span style="color:46c93a">{{data.get_ride_completed}}</span></div>
                                </div>
                            </div>
                            <div class="more">
                                <a class="primary" href="#">See all</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="pricing-wrapper">
                    <div id="solo" class="pricing-container is-active">
                        <div class="container-inner">
                            <div class="solo-plans">
                                
                                <router-link :to="{name:'trip'}" class="solo-plan">
                                    <div>
                                        <div class="header">
                                            <img src="" alt="">
                                            <span>Trip</span>
                                        </div>
                                        <div class="module-wrap">
                                            <img src="../assets/images/tst/Trip.png">
                                        </div>
                                    </div>
                                </router-link>
                                
                                <router-link :to="{name:'ship'}" class="solo-plan">
                                    <div>
                                        <div class="header">
                                            <img src="" alt="">
                                            <span>Ship</span>
                                        </div>
                                        <div class="module-wrap">
                                            <img src="../assets/images/tst/Ship.png">
                                        </div>
                                    </div>
                                </router-link>
                                
                                <router-link :to="{name:'task'}" class="solo-plan">
                                    <div>
                                        <div class="header">
                                            <img src="" alt="">
                                            <span>Task</span>
                                        </div>
                                        <div class="module-wrap">
                                            <img src="../assets/images/tst/Task.png">
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            data:''
        }
    },
    computed: {

    },
    created() {
        this.$axios.get('/userdashboard')
        .then(res=>{
            this.data=res.data.data
        })
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
.module-wrap img {
    width: 300px;
    height: auto;
    cursor: pointer;
}

.pricing-wrapper {
    padding-bottom: 0px !important;
}
.dashboard-wrapper .flex-card .icon-header i.primary {
    background-color: #00D1B2;
    box-shadow: 0 14px 26px -12px rgba(0,209,178,0.42),0 4px 23px 0px rgba(0,0,0,0.12),0 8px 10px -5px rgba(0,209,178,0.2) !important;
}
.dashboard-wrapper .flex-card .content .card-title.is-tile .card-stat.primary {
    color: #737373;
}
.dashboard-wrapper .flex-card .icon-header i {
    padding: 22px;
    font-size: 24px;
    font-weight: normal;
    color: #fff;
    border-radius: 3px;
    position: absolute;
    right: 10px;
    top: -20px;
}
.dashboard-wrapper .flex-card .content {
   padding: 10px !important;
    margin-bottom: 1    em;
}
.dashboard-wrapper .flex-card .content .card-title.is-tile {
    font-size: 1.45rem;
    color: #464646c7;
    font-weight: 500;
    margin-top: 15px;
    position: relative;
}
.dashboard-wrapper .flex-card .content .card-title.is-tile .card-stat {
    font-size: 1rem;
    font-weight: 500;
    position: relative;
    margin-top: 5px;
    font-size: 15px;
}
.dashboard-wrapper .flex-card .more a.primary {
    color: #A9ABAC;
}
.dashboard-wrapper .flex-card .more a {
    font-weight: 500;
    position: absolute;
    bottom: 10px;
    right: 20px;
    transition: color 0.4s;
}
</style>