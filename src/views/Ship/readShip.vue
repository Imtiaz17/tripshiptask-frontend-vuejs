<template>
    <section>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
	<div v-if="ship">
    <show-ship :data=ship>
    </show-ship>
    </div>
</section>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Vue from 'vue'
export default {
     components: {showShip:() => import('@/components/ship/showShip'),
        Loading},
    data() {
        return {
            isLoading: false,
            ship: '',
            slug: this.$route.params.slug
        }
    },
    created() {
        this.getShip()
    },
    methods: {
        getShip() {
            this.isLoading=true
            this.$axios.get('ship/' + this.slug)
                .then(res => {
                    this.isLoading=false
                    this.ship = res.data.data
                })
                .catch(error => console.log(error.response.data))
        },
    }
}

</script>
<style scoped>

</style>
