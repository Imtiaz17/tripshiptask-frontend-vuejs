<template>
    <section>
        <table class="responsive-table is-accent fixed_header ">
            <thead>
                <tr>
                    <th style="width:43% ;text-align:center">Type</th>
                    <th style="width:24%;text-align:center">Amunt</th>
                    <th style="width:28%;text-align:center">Date</th>
                    <th style="text-align:center">Status</th>
                </tr>
            </thead>
            
            <tbody>
                <tr v-for="(item,index) in data" :key="index">
                    <td data-th="Title" style="width:43%;text-align:left">
                        {{item.type}}
                    </td>
                    <td data-th="Amount" style="width:27%;text-align:center">
                        {{item.amount}}
                    </td>
                    <td data-th="Date" style="width:24%;text-align:center">
                        {{moment(item.date).format('DD/MM/YYYY')}}
                    </td>
                    <td data-th="Amount" style="width:27%;text-align:center">
                        {{item.status}}
                    </td>
                </tr>
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
            moment: moment,
        }

    },
    mounted() {


    },
    methods: {

    }

}
</script>
<style scoped>
.table {
    margin: auto;
    min-width: 100%;
    margin-top: -27px;
    max-width: 100%;

}

.table th {
    width: 30%;
}

.notask {
    text-align: center
}

.notask span {
    font-size: 23px;
    color: grey;
}

table th {
    background-color: #fff !important;
}
</style>