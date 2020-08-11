<template>
    <div class="maincolumns">
        <vue-headful title="Ship" description="Ship" />
        <app-ship></app-ship>
    </div>
</template>
<script>
export default {
    components: {
        appShip: () => import('@/components/ship/AppShip'),
    },
}
</script>
<style scoped>
.tabs:not(:last-child) {
    margin-bottom: -0.5rem;
}

.tab {
    height: 43px;
    width: 67px;
    font-size: 15px;
}
</style>