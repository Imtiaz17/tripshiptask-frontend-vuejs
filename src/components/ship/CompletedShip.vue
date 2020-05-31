<template>
    <section>
        <div v-if="data.length>0">
            <table class="responsive-table is-accent fixed_header ">
                <thead>
                    <tr>
                        <th style="width:43% ;text-align:center">Title</th>
                        <th style="width:25%;text-align:center">Amount</th>
                        <th style="width:27%;text-align:center">Rating</th>
                        <th style="text-align:center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in data" :key="index" v-if="item.paid==1">
                        <td data-th="Title" style="width:43%;text-align:left">
                            {{item.title}}
                        </td>
                        <td data-th="Date" style="width:25%;text-align:center">
                            {{item.amount}}
                        </td>
                        <td data-th="Rating" style="width:27%;text-align:center">
                             <span class="rating">
                            <star-rating :show-rating=false :star-size="17" :read-only="true" :increment="0.1" :rating="item.rating"></star-rating>
                            <small class="rate">{{item.rating}}</small>
                        </span>
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
import StarRating from 'vue-star-rating'
export default {
  components: { StarRating },
    props: ['data'],
    data() {
        return {
           
        }
    },


    methods: {
        onChange(page) {

            EventBus.$emit('change', page)

        }
    },


}

</script>
<style scoped>

.rate {
  color: #00B289;
    margin-top: 1px;
    margin-left: 3px;
    font-size: 14px;
}

.rating {
    width: 100%;
    display: inline-flex;
    margin-left: 85px;
}
table th {
    background-color: #fff !important;
}
</style>
