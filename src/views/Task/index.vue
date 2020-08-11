<template>
    <div class="maincolumns">
        <vue-headful title="Task" description="Task" />
        <app-task></app-task>
    </div>
</template>
<script>
export default {
    components: {
        appTask: () => import('@/components/task/AppTask')
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