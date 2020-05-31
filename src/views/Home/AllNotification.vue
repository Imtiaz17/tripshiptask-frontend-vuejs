<template>
    <div class="maincolumns">
        <div class="container">
            <ul class="list-block bordered" style="background: #fff;">
                <li class="is-active header">
                    <p>All Notifications</p>
                </li>
                <div v-for="item in unread" :key="item.id">
                    <router-link :to="item.path">
                        <li>
                            <p style="color:#2f3542; font-weight:500"><span>{{item.bidby}}</span> has bid on your task <span>{{item.task}}</span></p>
                            <div class="timestamp">
                                {{item.date}}
                            </div>
                        </li>
                    </router-link>
                </div>
                <div v-for="item in read" :key="item.id">
                    <router-link :to="item.path">
                        <li>
                            <p style="color:grey"><span>{{item.bidby}}</span> has bid on your task <span>{{item.task}}</span></p>
                            <div class="timestamp">
                                {{item.date}}
                            </div>
                        </li>
                    </router-link>
                </div>
            </ul>
            <!-- <pagination  :data="meta"   @pagination-change-page="getResults">
  
</pagination> -->
        </div>
    </div>
</template>
<script>
import moment from 'moment-timezone'
export default {

    data() {
        return {
            moment: moment,
            all: {},
            read: {},
            unread: {},

        }
    },
    created() {
            this.getNotification()
    },
    methods: {
        getNotification() {
            this.$axios.get('notifications')
                .then(res => {
                    this.read = res.data.read
                    this.unread = res.data.unread
                    this.all = res.data.all

                })
        },

    }

}

</script>
<style scoped>
.timestamp {
    color: #999;
}

.maincolumns {
    padding-top: 80px;
    padding-bottom: 80px;
}

.header {
    font-size: 27px;
    font-weight: 600;
    text-align: center;
}

</style>
