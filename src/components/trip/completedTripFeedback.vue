<template>
    <table class="table is-accent ">
        <thead>
            <tr>
                <th width="40%">Trip</th>
                <th width="40%">Review</th>
                <th width="20%">Rating</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in data" :key="index">
                <td data-th="Ship">
                    {{item.title}}
                </td>
                <td data-th="Review">
                    <read-more more-str="read more" :text="item.review" less-str="read less" :max-chars="100"></read-more>
                    <p style="color:#1e90ff;font-size:13px;">{{item.reviewedby}}</p>
                </td>
                <td data-th="Rating">
                    <a-rate :default-value="item.rating" disabled allow-half />

                   <!--  <star-rating :show-rating=false :star-size="20" :read-only="true" :increment="0.1" :rating="item.rating" style="float:left"> </star-rating> -->
                   
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import Vue from 'vue'
import ReadMore from 'vue-read-more';
Vue.use(ReadMore);
import { Rate } from 'ant-design-vue';
import 'ant-design-vue/lib/rate/style/index.css'
Vue.use(Rate);
export default {
    props: ['data'],
}
</script>
<style scoped>
.rate {
    font-size: 14px;
    color: #4A4A4A;
    margin-left: -20px;
}

table th {
    background-color: #4fc1ea !important;
}
</style>