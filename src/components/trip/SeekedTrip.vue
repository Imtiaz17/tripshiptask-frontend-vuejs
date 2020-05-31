<template>
    <section>
        <div v-if="data.length>0">
            <table class="responsive-table is-accent fixed_header ">
                <thead>
                    <tr>
                        <th style="width:43% ;text-align:center">Title</th>
                        <th style="width:24%;text-align:center">Date</th>
                        <th style="width:28%;text-align:center">Amount</th>
                        <th style="text-align:center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in data" :key="index">
                        <td data-th="Title" style="width:43%;text-align:left">
                            {{item.title}}
                        </td>
                        <td data-th="Date" style="width:24%;text-align:center">
                            {{moment(data.date).format('DD/MM/YYYY')}}
                        </td>
                        <td data-th="Amount" style="width:27%;text-align:center">
                            {{item.amount}}
                        </td>
                        <td data-th="Action" style="text-align:center">
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
    </section>

</template>
<script>
import moment from 'moment'
export default {

    props: ['data'],
    data() {
        return {
            moment: moment,

        }
    },

}
</script>
<style scoped>
table th {
    background-color: #fff !important;
}

</style>
