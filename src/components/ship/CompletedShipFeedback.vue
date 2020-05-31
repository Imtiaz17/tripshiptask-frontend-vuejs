<template>

    <div style="margin-top:-13px;">
        <div v-if="data && data.length>0">
            <table class="table is-accent" style="width:100%;margin-top:7px;">
                <thead>
                    <tr>
                        <th width="40%">Ship</th>
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
                            <p style="color:#1e90ff;font-size:13px;">{{item.shipby}}</p>
                        </td>
                        <td data-th="Rating">
                            <star-rating :show-rating=true :star-size="20" style="font-size:17px;margin-top: 0px;" :increment="0.5" v-model="item.rating"></star-rating>
                            
                            <!-- <el-rate v-model="item.rating" allow-half show-score disabled text-color="#ff9900" score-template="{value}"></el-rate> -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <div style="padding:20px">
                <p style="font-size:18px;text-align:center;color:#ccc">No Feedbacks</p>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import ReadMore from 'vue-read-more';
Vue.use(ReadMore);
import StarRating from 'vue-star-rating'
export default {
    components: { StarRating },
    props: ['data'],
}

</script>
<style scoped>
table th {
    background-color: #4fc1ea !important;
}


</style>
