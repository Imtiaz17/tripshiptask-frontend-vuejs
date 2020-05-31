<template>
    <div class="hero is-default is-alt is-bold">
        <nav :class="scrolled?'is-active':''" class="navbar navbar-wrapper is-cloned">
            <div class="container is-fluid">
                <!-- Brand -->
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                        TripShipTask
                    </a>
                    <!-- Responsive toggle -->
                    <div class="custom-burger" data-target="is-cloned">
                        <a class="responsive-btn" @click="isOpen = !isOpen">
                            <span class="menu-toggle">
                                <span class="icon-box-toggle">
                                    <span class="rotate">
                                        <i class="icon-line-top"></i>
                                        <i class="icon-line-center"></i>
                                        <i class="icon-line-bottom"></i>
                                    </span>
                                </span>
                            </span>
                        </a>
                    </div>
                    <!-- /Responsive toggle -->
                </div>
                <!-- Navbar menu -->
                <div id="is-cloned" class="navbar-menu" v-bind:class="{'is-active': isOpen}">
                    <!-- Navbar end -->
                    <div class="navbar-end">
                        <a class="navbar-item is-slide is-centered-tablet">
                            <router-link to="/login">
                                Login
                            </router-link>
                        </a>
                        <!-- Signup button -->
                        <div class="navbar-item is-button is-centered-tablet">
                            <router-link to="/register">
                                <a id="#signup-btn" class="button button-cta is-bold btn-align secondary-btn raised rounded">
                                    Sign up
                                </a>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <nav class="navbar navbar-wrapper is-transparent is-static">
            <div class="container is-fluid">
                <!-- Brand -->
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                        <p>TripShipTask</p>
                    </a>
                    <!-- Sidebar Trigger -->
                    <!-- Responsive toggle -->
                    <div class="custom-burger" data-target="is-static">
                        <a class="responsive-btn" @click="isStatic = !isStatic">
                            <span class="menu-toggle">
                                <span class="icon-box-toggle">
                                    <span class="rotate">
                                        <i class="icon-line-top"></i>
                                        <i class="icon-line-center"></i>
                                        <i class="icon-line-bottom"></i>
                                    </span>
                                </span>
                            </span>
                        </a>
                    </div>
                    <!-- /Responsive toggle -->
                </div>
                <!-- Navbar menu -->
                <div id="is-static" class="navbar-menu is-opaque" v-bind:class="{'is-active': isStatic}">
                    <!-- Navbar end -->
                    <div class="navbar-end">
                        <!-- Navbar item -->
                        <a class="navbar-item is-slide">
                            <router-link to="/login">
                                Login
                            </router-link>
                        </a>
                        <!-- Signup button -->
                        <div class="navbar-item is-button is-centered-tablet">
                            <router-link to="/register">
                                <a id="#signup-btn-double" class="button button-cta is-bold btn-align secondary-btn rounded raised">
                                    Sign up
                                </a>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            isStatic: false,
            isOpen: false,
            scrolled: false,
        }
    },
    computed: {

    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() {
        
    },
    methods: {
    	handleScroll() {
            this.scrolled = (window.scrollY > 0)
        },

    },
    watch: {

    }
};
</script>
<style scoped>
span {
    font-style: inherit;
    font-weight: inherit;
    font-size: 17px;
}

.title {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important
}

.subtitle {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important
}

.is-active {
    -webkit-transform: translateY(0);
    transform: translateY(0);
}
</style>