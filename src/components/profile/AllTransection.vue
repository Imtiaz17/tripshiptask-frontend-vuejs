<template>
    <section>
        <div class="columns">
            <div class="column is-3">
                <div class="control">
                    <float-label :dispatch="false" label="Transaction Status" fixed>
                        <div class="select">
                            <select v-model="status">
                                <option v-for="(item,index) in statuses" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                </div>
            </div>
        </div>
        <div class="fixed_header">
            <table class="table is-accent">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in results" :key="index">
                        <td>
                            {{item.type}}
                        </td>
                        <td>
                            {{item.amount}}
                        </td>
                        <td>
                            {{moment(item.date).format('lll')}}
                        </td>
                        <td>
                            {{item.status}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
<script>
import moment from 'moment'
export default {
    props: ['data'],
    data() {
        return {
            moment: moment,
            status:'All',
            statuses:['All','Recieved','Withdrawn','Paid']
        }


    },
    computed:{
          results() {
            return this.data.filter(data => {
                if (this.status == 'All') {
                    return data
                }
                if (this.status == 'Recieved') {
                    return data.status=='received'
                }
                if (this.status == 'Withdrawn') {
                    return data.status=='withdrawn'
                }
                if (this.status == 'Paid') {
                    return data.status=='sent'
                }
            })
        }
    },
    mounted() {


    },
    methods: {

    }

}
</script>
<style scoped>
</style>