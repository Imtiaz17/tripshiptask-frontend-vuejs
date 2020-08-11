<template>
    <section>
         <vue-headful
            :title="title"
            :description="title"
        />
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
	<div v-if="trip">
    <show-trip :data=trip>
    </show-trip>
    </div>
    </section>

</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Vue from 'vue'
export default {
     components: {showTrip: () => import('@/components/trip/ShowTrip'),Loading},
    data() {
        return {
            title:'',
            isLoading:false,
            trip: '',
            slug: this.$route.params.slug
        }
    },
    created() {
        this.getTrip()
    },
    methods: {
        getTrip() {
            this.isLoading=true
            this.$axios.get('trip/' + this.slug)
                .then(res => {
                    this.isLoading=false
                    this.trip = res.data.data
                    this.title = res.data.data.title
                })
                .catch(error => console.log(error.response.data))
        },
    }
}

</script>
<style scoped>
body
{
    background-color: #f4f6fb;
}

</style>
