<template>
    <section>
         <div class="columns">
            <div class="column is-3">
                <div class="control">
                    <float-label :dispatch="false" label="Status" fixed>
                        <div class="select">
                            <select v-model="status">
                                <option v-for="(item,index) in statuses" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                </div>
            </div>
        </div>
        <div v-if="data.length>0" class="fixed_header">
            <table class="table is-accent">
                <thead>
                    <tr>
                        <th style="width:30%">Title</th>
                        <th>Task Id</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in results" :key="index">
                        <td>
                            {{item.title}}
                        </td>
                        <td>
                            {{item.task_id}}
                        </td>
                        <td>
                            {{moment(item.date).format('DD/MM/YYYY')}}
                        </td>
                        <td>
                            {{item.amount}} {{currency}}
                        </td>
                        <td>
                            <span v-if="today>item.date" class="tag is-danger">Expired</span>
                            <span v-else class="tag is-success">Live</span>
                        </td>
                        <td>
                            <button @click="seektask(item)" v-if="today>item.date" class="button is-small info-btn raised rounded btn-left">Repost</button>
                            <router-link :to="item.path">
                                <button class="button is-small btn-align accent-btn raised rounded btn-outlined">view</button>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <div style="padding:20px;margin-top:48px;">
                <p style="font-size:26px;text-align:center;color:#ccc">No records found</p>
            </div>
        </div>
        <vs-popup class="holamundo" title="title" :active.sync="popupActivo">
            <seek-task></seek-task>
        </vs-popup>
    </section>
</template>
<script>
import moment from 'moment'
export default {
    components: {
        seekTask: () => import('@/components/task/SeekTask'),
    },

    props: ['data'],
    data() {
        return {
            popupActivo: false,
            moment: moment,
            today: moment().format('YYYY-MM-DD'),
            statuses: ['All', 'Live', 'Expired'],
            status: 'All'
        }
    },
    mounted()
    {
        EventBus.$on('CloseRepost', () => {
             this.popupActivo = false
        })
    },
    computed: {
        currency() {
            return this.$store.getters.user.currency
        },
        results() {
            return this.data.filter(task => {
                if (this.status == 'Live') {
                    return task.date > this.today
                }
                if (this.status == 'All') {
                    return task
                }
                if (this.status == 'Expired') {
                    return task.date < this.today
                }
            })
        }
    },
    methods: {
        seektask(info) {
            this.popupActivo = true
            EventBus.$emit('SeekTaskRepost', info)
        }
    },


}
</script>
<style scoped>
table td button {
    margin-right: 4px;
}
</style>