<template>
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
                <div v-if="isLoading" style="margin-top:-45px;">
                    <img class="loading" src="../../assets/images/roaling.gif">
                </div>
                <div v-else>
                    <tr v-for="(item,index) in data" :key="index" v-if="item.type=='paid'">
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
                </div>
            </tbody>
        </table>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    props: ['data'],
    data() {
        return {
            moment: moment

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