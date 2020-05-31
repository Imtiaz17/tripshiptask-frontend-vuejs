<template>
    <div class="maincolumns">
        <app-trip></app-trip>
    </div>
</template>
<script>
export default {
    components: {
        AppTrip:() => import('@/components/trip/AppTrip')},
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }

}
</script>
<style scoped>
.maincolumns {

    padding-left: 13px;
    padding-right: 13px;
    padding-bottom: 35px;
}

.tabs:not(:last-child) {
    margin-bottom: -0.5rem;
}

.tab {
    height: 43px;
    width: 67px;
    font-size: 15px;
}
</style>