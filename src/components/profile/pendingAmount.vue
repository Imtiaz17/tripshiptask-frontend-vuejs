<template>
    <section>
      <table class="table is-accent fixed_header ">
            <thead>
                <tr>
                    <th width="25%" style="text-align:center">Type</th>
                    <th width="25%" style="text-align:center">Amount</th>
                    <th width="45%" style="text-align:center">Date</th>
                    <th width="35%"  style="text-align:center">Status</th>
                </tr>
            </thead>
            <tbody>
                <div v-if="isLoading" style="margin-top:-45px;">
                    <img class="loading" src="../../assets/images/roaling.gif">
                </div>
                <div v-else>
                    <tr v-for="(item,index) in data" :key="index" v-if="item.type=='pending'">
                        <td data-th="Type" width="25%" style="text-align:center">
                            {{item.type}}
                        </td>
                        <td data-th="Amount" width="25%" style="text-align:center">
                            {{item.amount}}
                        </td>
                        <td data-th="Date" width="45%"  style="text-align:center">
                            {{moment(item.date).format('lll')}}
                        </td>
                        <td data-th="Status" width="35%" style="text-align:center">
                            {{item.status}}
                        </td>
                        
                    </tr>
                </div>
            </tbody>
        </table>
    </section>
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