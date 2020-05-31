<template>
        <div style="margin-top:-13px;">
         <table class="table " style="width:100%;margin-top:24px;">
            <thead>
                <tr>
                    <th width="40%">Task</th>
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
                        <p style="color:#1e90ff;font-size:13px;">{{item.taskby}}</p>
                    </td>
                    <td data-th="Rating">
                          <star-rating :show-rating=true :star-size="20" style="font-size:17px;margin-top: 0px;" :increment="0.5" v-model="item.rating"></star-rating>
                    </td>
                </tr>
            </tbody>
        </table>
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
.rate {
   font-size: 14px;
    color: #4A4A4A;
    margin-left:-20px;
}
table th {
    background-color: #4fc1ea !important;
}

</style>   