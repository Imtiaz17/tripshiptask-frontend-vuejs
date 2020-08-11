<template>
    <div id="app">
        <toolbar v-if="check!==false" :data="form"></toolbar>
        <div class="modal" :class="progressinfo?'is-active':''">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <article class="media">
                        <div class="media-content">
                            <div class="content">
                                <h2 class="has-text-centered">Welcome to TripShipTask</h2>
                                <p class="notification">TripShipTask is in the process of verifying the provided information. Please allow a maximum of 12 hours for TripShipTask to verify the information and activate your account. You will receive an email when the verification process is complete.
                                    <br>
                                    Thank you.
                                </p>
                                <br>
                                <vs-button class="logout" @click="logout">Logout</vs-button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
        <div class="container is-fluid">
            <div class="columns">
                <div class="column is-1 leftside" v-if="check!==false">
                    <left-sidebar></left-sidebar>
                </div>
                <div :class="check?'column is-11 rightside':'column'">
                    <div v-if="$root.loading">
                        <h3 class="has-text-centered">Loading router</h3>
                    </div>
                    <router-view v-else />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import toolbar from './components/global/toolbar'
import leftSidebar from './components/global/leftsidebar'
import Cookies from 'js-cookie'
export default {
    components: { toolbar, leftSidebar },
    data() {
        return {
            show: false
        }
    },
    computed: {
        check() {
            return this.$store.state.tokenExist
        },
        form() {
            return this.$store.getters.user
        },
        progressinfo() {
            return this.$store.state.progressinfo
        }
    },

    created() {
        if (this.$store.getters.user !== null) {
            if (this.$store.getters.user.status == 'unverified') {
                this.$store.commit('show_progressinfo')
            }
        }

    },
    methods: {
        close() {
            this.$store.commit('Close_Progressbar')
        },
        logout() {
            this.$axios.post('auth/logout')
                .then(() => {
                    Cookies.remove('token', { path: '/', domain: '.tripshiptask.com' })
                    Cookies.remove('token');
                    this.$store.commit('Remove_User')
                    this.$store.commit('Close_Progressbar')
                    this.$router.push('/')
                })

        }
    },
    watch: {
        // 'progressinfo': function(val) {
        //     this.progressinfo = val
        // },

    }

}
</script>
<style>
.media .media-content .content p {
    font-size: 1.2em !important
}

.media .media-content p {
    font-size: 1.1em !important;
}

.progress {
    margin-top: 10px;
    margin-bottom: 0px !important;
}

.progress-wrapper {
    position: relative;
}

.progress-value {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: calc(1rem / 1.5);
    line-height: 1rem;
    font-weight: bold;
}

.progress.is-small+.progress-value {
    font-size: calc(0.75rem / 1.5);
    line-height: 0.75rem;
}

.progress.is-medium+.progress-value {
    font-size: calc(1.25rem / 1.5);
    line-height: 1.25rem;
}

.progress.is-large+.progress-value {
    font-size: calc(1.5rem / 1.5);
    line-height: 1.5rem;
}

.logout {
    float: right;
}

.modal .media button {
    position: relative !important;
    top: 0px;
    right: 0px !important;
}

.modal-card,
.modal-content {
    position: absolute;
    top: 10px;
}

.media .notification {
    padding: 1rem;
}
</style>