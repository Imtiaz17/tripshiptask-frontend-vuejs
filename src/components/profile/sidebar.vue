<template>
    <div class="inner">
        <div class="contact-block">
            <div class="stats-card flex-card light-bordered light-raised">
                <div class="img-header" style="min-height:150px;padding-top:10px;     margin-bottom:0px;">
                    <div class="img-block has-text-centered">
                        <div>
                            <img :src="getProfilePhoto()"></div>
                        <div class="name"><b>{{data.first_name}}</b></div>
                    </div>
                </div>
                <div class="card-body" style="padding: 10px 26px;">
                    
                    <div class="inline-stats has-text-centered">
                        <div class="stats-item">
                            <div class="stat-name">
                                Income
                            </div>
                            <div class="stat-data">
                                {{data.receive}}
                            </div>
                        </div>
                        <div class="stats-item">
                            <div class="stat-name">
                                Spent
                            </div>
                            <div class="stat-data">
                                {{data.spent}}
                            </div>
                        </div>
                        <div class="stats-item">
                            <div class="stat-name">
                                Balance
                            </div>
                            <div class="stat-data">
                                {{data.balance}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="side" style="border:none;margin-top:1px">
                <li @click="myProfile" :class="fourth?'active':''" class="main"><a>My Profile</a></li>
                <li @click="myCredit" class="main" :class="third?'active':''">
                    <a <router-link :to="{name:'alltransection'}">My Credit</a></router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import StarRating from 'vue-star-rating'
export default {
    components: { StarRating },
    props: ['data'],
    data() {
        return {
            active: false,
            third: false,
            fourth: true
        }
    },
    methods: {

        myProfile() {
            this.third = false
            this.fourth = true
            EventBus.$emit('profile')
        },
        myCredit() {
            this.fourth = false
            this.third = true
            EventBus.$emit('credit')

        },

    }

}
</script>
<style scoped>
.active {
    background-color: #4FC1EA
}

.stats-card .img-header {
    min-height: 220px;
    width: 100%;
    background: #fff !important;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
}

.stats-card .img-header .img-block img {
    max-height: 150px;
    border-radius: 2% !important;
    border: 1px solid #4FC1EA;
    padding: 7px;
    -webkit-box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.41);
    -moz-box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.41);
    box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.41);

}

.rate {
    color: #fff;
    background-color: #4FC1EA;
    border-radius: 3px;
    display: flex;
    font-size: 15px;
    padding: 0 3px;
}

.main {
    font-weight: 600;

}

.side li {
    padding: 5px;
}

.side li a {
    color: #4A4A4A;
}

.stat-data {
    font-weight: bold;
    font-size: 1.1rem !important;
}
</style>