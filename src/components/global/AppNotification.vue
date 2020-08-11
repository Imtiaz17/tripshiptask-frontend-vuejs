<template>
    <div>
        <a class="nav-inner" @click="bell">
            <img src="https://img.icons8.com/material/24/000000/filled-appointment-reminders.png" />
            <span v-if="unreadCount>9" class="new-circle gelatine">
                <small style="margin: 0 3px;">{{unreadCount}}</small>
            </span>
            <span v-else class="new-circle gelatine">
                <small>{{unreadCount}}</small>
            </span>
        </a>
        <div class="drop-wrapper notifications-drop" style="display:block" v-show="notify">
            <div class="notifications-body" style="overflow:auto;">
                <vs-list>
                    <vs-list-header :title="unreadTitle"></vs-list-header>
                    <div class="single" v-for="item in unread" :key="item.id" @click="hasread(item)" style="background: #E5EAF2;">
                        <router-link :to="item.path" >
                            <vs-list-item  :title="item.message" :subtitle="item.date"></vs-list-item>
                        </router-link>
                    </div>
                </vs-list>
                <vs-list>
                    <div class="single" v-for="item in read" :key="item.id">
                        <router-link :to="item.path" @click="readed">
                            <vs-list-item :title="item.message" :subtitle="item.date"></vs-list-item>
                        </router-link>
                    </div>
                </vs-list>
            </div>
            <!--   <div class="notifications-header has-text-left">
                <h3 v-if="unreadCount==0">No notification</h3>
                <h3 v-else>You have {{unreadCount}} unread notifications</h3>
            </div>
            <div class="notifications-body" style="overflow:auto;">
                <ul class="notifications-list">
                    <li v-for="item in unread" :key="item.id">
                        <div class="notification-content">
                            <div class="notification-text">
                                <div class="text" @click="hasread(item)">
                                    <router-link :to="item.path" style="color:grey">
                                        <span>{{item.message}}</span>
                                    </router-link>
                                </div>
                                <div class="timestamp">
                                    {{item.date}}
                                </div>
                            </div>
                        </div>
                    </li>
                    <li v-for="item in read" :key="item.id">
                        <router-link :to="item.path" style="color:grey">
                            <span class="material-icons" style="margin-left: 5px;margin-top:5px">
                                chat
                            </span>
                            <div class="notification-content">
                                <div class="notification-text">
                                    <div style="margin-top:16px;margin-left:-11px;" class="text is-read" @click="readed">
                                        <span>{{item.message}}</span>
                                    </div>
                                    <div class="timestamp">
                                        {{item.date}}
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="notification-footer has-text-center">
                <router-link to="/Alllnotifications">
                    <p @click=notification>All notifications</p>
                </router-link>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            notify: false,
            read: {},
            unread: {},
            unreadCount: 0,
        }
    },
    computed: {
        unreadTitle() {
            return 'You have ' + this.unreadCount + ' unread notifications'
        },

    },
    created() {
        this.$axios.get('notifications')
            .then(res => {
                this.read = res.data.read
                this.unread = res.data.unread
                this.unreadCount = res.data.unread.length
            })
        let self = this;
        window.addEventListener('click', function(e) {
            // close dropdown when clicked outside
            if (!self.$el.contains(e.target)) {
                self.notify = false
            }
        })
    },
    methods: {
        notification() {
            this.notify = false
        },
        bell() {
            this.notify = !this.notify
        },
        getNotification() {
            this.$axios.get('notifications')
                .then(res => {
                    this.read = res.data.read
                    this.unread = res.data.unread
                    this.unreadCount = res.data.unread.length
                })
        },
        hasread(notification) {
            this.$axios.post('markAsRead', { id: notification.id })
                .then(res => {
                    this.unread.splice(notification, 1)
                    this.read.push(notification)
                    this.unreadCount--
                    this.notify = false
                })
        },
        readed() {
            this.notify = false
        }

    }
}
</script>
<style scoped>
.notification-footer {
    padding: 6px;
    background: #fff;
    border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
    position: fixed;
    z-index: 999999999;
    width: 320px;
}

nav.dashboard-nav .navbar-item .new-circle {
    width: 23px;
    height: 22px;
    left: 22px;
    top: 1px;
    position: absolute;
    border-radius: 50px;
    border: 2px solid white;
    background-color: #eb2f06;
}

small {
    font-size: 0.7em;
    color: white;
    position: relative;
    left: 6px;
    top: -4px;
}

.has-text-center {
    text-align: center;
}

.notifications-drop .notifications-body {
    background: #fff;
    padding: 3px 0px;
    margin-left: 0px;
    min-height: 100px;
    max-height: 300px;
}

.notifications-drop .notifications-body .notifications-list .notification-content .notification-text .text {
    font-size: 1rem;
    color: #999;
}

.drop-pop .drop-wrapper {
    position: absolute;
    top: 66px;
    right: 0;
    border-radius: 3px 3px 5px 5px;
    background: #fff;
    min-width: 320px;
    max-height: 300px;
    display: none;
    transition: opacity 0.3s;
    -webkit-animation-duration: 0.2s;
    animation-duration: 0.2s;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    z-index: 99;
}

.notification-footer {
    box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
}

/* width */
::-webkit-scrollbar {
    width: 7px;
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


.drop-pop .drop-wrapper .drop-inner ul {
    padding: 10px 1px;
    margin-top: -21px;
    margin-bottom: -40px;
}

.notifications-drop .notifications-body .notifications-list li {
    margin-bottom: -3px;
    position: relative;
    cursor: pointer;
}

.notifications-drop .notifications-body .notifications-list .notification-content {
    margin-left: 0px;
    margin-top: 0px;
}

.notifications-drop .notifications-body .notifications-list li:hover {
    background: #f1f2f6;
}

.notifications-drop {
    position: relative;
    width: 320px;
    right: 70px;
    top: 17px;
}

.vs-list .single a {
    color: #464646;
}

.vs-list .single a:hover {
    color: #3273dc;
}
</style>