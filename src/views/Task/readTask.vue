<template>
    <section>
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
        <div v-if="task">
            <show-task :data=task>
            </show-task>
        </div>
    </section>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Vue from 'vue'
export default {
    components: { showTask: () => import('@/components/task/ShowTask'), Loading },
    data() {
        return {
            isLoading: false,
            task: '',
            slug: this.$route.params.slug
        }
    },
    created() {
        this.getTask()
    },
    methods: {
        getTask() {
            this.isLoading = true
            this.$axios.get('task/' + this.slug)
                .then(res => {
                    this.isLoading = false
                    this.task = res.data.data
                })
                .catch(error => console.log(error.response.data))
        },
    }
}
</script>
<style scoped>
</style>