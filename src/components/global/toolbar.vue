<template>
    <div class="reader-mode">
        <vs-sidebar parent="body" id="sidebar" default-index="1" color="primary" class="sidebarx" spacer v-bind:style="{ 'display': active }">
            <div class="header-sidebar" slot="header">
                <vs-avatar size="70px" style="float:left" />
                <div class="con-colors" style="overflow:hidden">
                    <ul style="padding-left:10px">
                        <li style="font-size: 21px;color: rgb(36, 33, 69);font-weight:700">
                            <h4>
                                {{name}}
                            </h4>
                        </li>
                        <li>
                        </li>
                    </ul>
                </div>
            </div>
            <vs-sidebar-item index="1" to="/trip" icon="question_answer">
                Trip
            </vs-sidebar-item>
            <vs-sidebar-item index="2" to="/ship" icon="gavel">
                Ship
            </vs-sidebar-item>
            <vs-sidebar-item index="3" to="/task" icon="gavel">
                Task
            </vs-sidebar-item>
            <!--   <vs-divider icon="person" to="task" position="left">
        Task -->
            <div class="footer-sidebar" slot="footer">
                <vs-button icon="reply" color="danger" type="flat" @click="logout">log out</vs-button>
            </div>
        </vs-sidebar>
        <nav class="navbar dashboard-nav has-shadow" role="navigation" aria-label="main navigation">
            <div class="container is-fluid">
                <div class="navbar-brand" style="float:left">
                    <div class="navbar-item">
                        <h3>TripShipTask</h3>
                    </div>
                </div>
                
                <div class="navbar-menu">
                    <div class="navnar-start">
                        <router-link to="/trip">
                            <vs-button color="success" type="line" style="font-size: 17px;"> Trip</vs-button>
                        </router-link>
                        <router-link to="/ship">
                            <vs-button type="line" style="font-size: 17px;">Ship</vs-button>
                        </router-link>
                        <router-link to="/task">
                            <vs-button color="danger" type="line" style="font-size: 17px;">Task</vs-button>
                        </router-link>
                        <!--   <vs-button color="success"  @click="trip" type="line">Trip -->
                    </div>
                    <div class="navbar-end" style="padding-right: 42px;">
                        <div class="navbar-item drop-pop is-centered nav-icon" v-for="item in items" :key="item.title" style="margin-left:-20px;">
                            <a class="nav-inner">
                                <router-link :to="item.to">
                                    {{item.title}}
                                </router-link>
                            </a>
                        </div>
                        <div class="navbar-item drop-pop is-centered nav-icon" style="    margin-left:1px;margin-right:-25px;">
                            <app-notification></app-notification>
                        </div>
                        <div class="navbar-item drop-pop is-centered nav-icon" style="    margin-right: -10px;">
                            <div class="deal-meta">
                                <div class="deal-owner">
                                    <div class="dropdown">
                                        <div class="button" @click="dropdown">
                                            <img :src="photo" style="margin-right: -6px;">
                                            <div class="owner-meta">
                                                <span>{{name}}</span>
                                                <span style="color:#444343">{{balance}} Tk</span>
                                            </div>
                                            <div class="is-right">
                                                <span class="material-icons" v-if="menu">
                                                    keyboard_arrow_up
                                                </span>
                                                <span class="material-icons" v-else>
                                                    keyboard_arrow_down</span>
                                            </div>
                                        </div>
                                        <div class="dropdown-menu is-text-bigger has-text-left" role="menu" v-if="menu" style="display:block">
                                            <div class="dropdown-content">
                                                <router-link to="/profile">
                                                    <a class="dropdown-item" @click="submenu">
                                                        Profile
                                                    </a>
                                                </router-link>
                                                <router-link :to="{name:'myaccount'}">
                                                    <a class="dropdown-item">My account</a>
                                                </router-link>
                                                <a class="dropdown-item">FAQ</a>
                                                <a class="dropdown-item">Support</a>
                                                <a class="dropdown-item" @click="logout">
                                                    Logout
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="is-hidden-desktop nav-mobile">
                    <div class="mobile-navbar-end">
                    <app-notification></app-notification>
                    <div id="mobile-dashboard-trigger" @click="active='block'">
                        <span class="menu-toggle">
                            <span class="icon-box-toggle">
                                <span class="rotate">
                                    <i class="icon-line-top"></i>
                                    <i class="icon-line-center"></i>
                                    <i class="icon-line-bottom"></i>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
// import Vue from 'vue'
// var VueScrollTo = require('vue-scrollto');
// Vue.use(VueScrollTo)
// var options = {
//     easing: 'ease-in',
//     offset: -60,
//     force: true,
// }
import Cookies from 'js-cookie'
import AppNotification from './AppNotification'
export default {
    components: { AppNotification },
    props: ['data'],

    data() {
        return {
            colorx: '#c72a75',
            isOpen: false,
            menu: false,
            active: 'none',


            items: [
                { title: 'Home', show: this.$store.getters.check, to: '/trip' },

                { title: 'My Trip', to: '/mytrip', data: this.data },
                { title: 'My Ship', to: '/myship', data: this.data },
                { title: 'My Task', to: '/mytask', data: this.data },

                // { title: 'Category',show: this.$store.getters.check, to: '/category' },
                // { title: 'Skill',show: this.$store.getters.check, to: '/skill' },

            ],

            drops: [
                { title: 'Profile', to: '/profile' },
                { title: 'Logout', to: '/logout' },
            ],

        }
    },
    created() {
        window.addEventListener('click', this.close)
    },

    beforeDestroy() {
        window.removeEventListener('click', this.close)
    },
    computed: {
        auth() {
            return this.$store.getters.check
        },
        name() {
            return this.$store.getters.user.full_name
        },
        balance() {
            return this.$store.getters.user.balance
        },
        photo() {
            return this.$store.getters.user.profile_picture
        },

    },

    methods: {
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.active = 'none'
                this.menu = false
            }
        },
        seektrip() {
            EventBus.$emit('seekingtrip')
        },
        task() {
            EventBus.$emit('taskactive')
        },
        trip() {
            EventBus.$emit('tripactive')
        },
        defaultPhoto() {
            let photo = "images/avatar.png";
            return photo;
        },

        getPhoto() {
            return require('../../assets/images/' + this.data.profile_picture)
        },
        dropdown() {
            this.menu = !this.menu;

        },
        submenu() {
            this.menu = false
        },
        logout() {
            this.active = 'none'
            this.$axios.post('auth/logout')
                .then(() => {
                    Cookies.remove('token');
                    this.$store.commit('Remove_User')
                    this.$router.push('/')
                })

        }

    },
    watch: {
        '$route'() {
            this.active = 'none'
            this.menu = false
        }
    }



}
</script>
<style scoped>
.dropdown-menu {
    display: none;
    min-width: 8rem;
    padding-top: 13px !important;
    position: absolute;
    top: 100%;
    z-index: 20;
    left: -48px !important;
}

.navnar-start .router-link-exact-active .vs-button-line {
    border-bottom-width: 2px !important;

}

.nav-inner .router-link-exact-active {
    background-color: #E5F2F8;
    padding: 7px;
    color: #000;
    border-radius: 5px;
}

.navbar {
    z-index: 10 !important;
}

.dropdown-item {
    font-size: 1rem;
}

a.dropdown-item,
button.dropdown-item {
    text-align: left;
}

.vs-button-line {
    padding: 7px 29px;
    border-radius: 30px;
    border-bottom-width: 4px !important;
}

.vs-button-line:hover {
    border-bottom-width: 2px !important;
}


.deal-meta .deal-owner {
    margin-top: -44px;
}

.button i {
    margin-left: 6px;
}


.vs-sidebar--item a {
    padding: 10px;
    -webkit-transition: all .25s ease;
    transition: all .25s ease;
    display: block;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: inherit;
    opacity: .8;
    font-size: 1.2rem !important;
    ;
    text-decoration: none;
}

a {
    color: #000;
}

.nav-inner a:not(.router-link-active):hover {
    margin-top: 2px;
    color: #536dfe;
    padding: .5rem 0px;
    border-bottom: 1px solid #536dfe;
}

a.navbar-item:hover {
    background-color: #FFFFFF !important;
}

.navnar-start {
    margin-left: 32%;
    margin-top: 10px;
}

nav.dashboard-nav .container.is-fluid {
    margin: 0;
    height: 56px !important;
}

.showsidebar {
    display: block;
}

.hidesidebar {
    display: none;
}

nav.dashboard-nav .nav-icon {
    width: 95px !important;
    height: 52px !important;
}

.dropdown-content {
    padding-bottom: 0.2rem !important;
    padding-top: 0.2rem !important;
}

.vs-button-line {
    overflow: hidden;
}

</style>