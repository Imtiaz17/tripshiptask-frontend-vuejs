<template>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
    <div v-if="task" class="vld-parent">
        <show-task :data=task>
        </show-task>
    </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import ShowTask from './ShowTask'
import EditTask from './EditTask'
import Vue from 'vue'

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo)
export default {

    components: { Loading, ShowTask, EditTask },

    data() {
        return {
            isLoading: false,
            task: '',
            username: this.$route.params.slug

        }
    },
    created() {

        this.getTask()
    },

    methods: {
        getTask() {
            this.isLoading=true
            axios.get('/api/task/' + this.username)
                .then(res => {
                     this.isLoading=false
                    this.task = res.data.data
                })
                .catch(error => console.log(error.response.data))
        },

        edit() {
            this.editTask = true
        },
        bidIt() {
            this.bid = true;

        },
        updateSlug() {
            this.isLoading = true
            this.username = this.$route.params.slug
            axios.get('/api/task/' + this.username)
                .then(res => {
                    this.isLoading = false

                    this.task = res.data.data
                })
                .catch(error => console.log(error.response.data))
        }

    },
    watch: {
        $route: 'updateSlug',
        immediate: true

    }
}

</script>
<style>
</style>
