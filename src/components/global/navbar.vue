<template>
    <section>
        <nav :class="scrolled?'is-active':''" class="navbar navbar-wrapper is-cloned">
                <div class="container is-fluid">
                    <!-- Brand -->
                    <div class="navbar-brand">
                       <router-link to="/">
                              <img src="../../assets/tstlogo.png" alt="" width="150px">
                          </router-link>
                        
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
                    <div id="is-cloned" class="navbar-menu" v-bind:class="{'is-active': isOpen}" style="margin-top:2px">
                        <!-- Navbar end -->
                        <div class="navbar-end">
                            <app-login />
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
                </div>
            </nav>
    </section>
</template>
<script>
export default {
	 components: {
        appLogin: () => import('@/components/Auth/AppLogin'),
    },
    data() {
        return {
        	isStatic: false,
            isOpen: false,
            scrolled: true,

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
</style>