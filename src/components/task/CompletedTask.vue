<template>
    <section>
        <div v-if="data.length>0" class="fixed_header">
            <table class="table is-accent">
                <thead>
                    <tr>
                        <th style="width:30%">Title</th>
                        <th>Task Id</th>
                        <th>Amount</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in data" :key="index">
                        <td>
                            {{item.title}}
                        </td>
                        <td>
                            {{item.task_id}}
                        </td>
                        <td>
                            {{item.amount}}
                        </td>
                        <td>
                            <span class="rating">
                                <star-rating :show-rating=false :star-size="17" :read-only="true" :increment="0.1" :rating="item.task_rating"></star-rating>
                                <small class="rate">{{item.task_rating}}</small>
                            </span>
                        </td>
                        <td>
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
import StarRating from 'vue-star-rating'
export default {
    components: { StarRating },

    props: ['data'],
    data() {
        return {
            isLoading: false,
            moment: moment,
            form: '',
        }
    },

    methods: {
        currency() {
            return this.$store.getters.user.currency
        },
    }

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
    display: inline-flex;
}
</style>