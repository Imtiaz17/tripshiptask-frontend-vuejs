<template>
    <div>
        <div slot="header" class="searchheader">
            <h3 style="font-weight: 500;">
                Seeking a Ride
            </h3>
        </div>
        <vs-table stripe :data="data" :hoverFlat="true">
            <template slot="header">
                <div class="columns is-mobile" style="padding: 7px 0px;width: 100%;font-weight: 600;">
                    <div class="column is-2" style="margin-left:20px;">
                        Start Point
                    </div>
                    <div class="column is-3" style="text-align:center">
                        Destination
                    </div>
                    <div class="column is-2" style="text-align:center;">
                        Amount
                    </div>
                    <div class="column is-2" style="margin-left: 27px;
                                    ">
                        Vehicle
                    </div>
                    <div class="column" style="text-align:center;margin-left:-13px;">
                        Bids
                    </div>
                    <div class="column is-2" style="margin-left: 83px;">
                        Action
                    </div>
                </div>
            </template>
            <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data" style="font-size:14px;">
                    <vs-td :data="data[indextr].start_point" style="width:26%">
                        {{data[indextr].start_point}}
                    </vs-td>
                    <vs-td :data="data[indextr].destination" style="width:26%">
                        {{data[indextr].destination}}
                    </vs-td>
                    <vs-td :data="data[indextr].pay" style="width:15%;padding-left:0px">
                        {{data[indextr].pay}}
                    </vs-td>
                    <vs-td :data="data[indextr].vehicle_type" style="width:15%">
                        {{data[indextr].vehicle_type}}
                    </vs-td>
                    <vs-td :data="data[indextr].bids_count" style="width:15%">
                        {{data[indextr].bids_count}}
                    </vs-td>
                    <vs-td :data="data[indextr].path">
                        <router-link :to="data[indextr].path">
                            <vs-button type="line">View</vs-button>
                        </router-link>
                    </vs-td>
                </vs-tr>
            </template>
        </vs-table>
        <div style="margin-top:10px;text-align: center;">
            <button :class="isload?'is-loading':''" class="button primary-btn" style="">Load More...</button>
        </div>
    </div>
</template>
<div style="margin-top: -33px;
    text-align: center;">
    <button @click="loadMore" :class="isload?'is-loading':''" class="button primary-btn" style="">Load More...</button>
</div>
</div>
</template>
<script>
export default {
    props: ['data'],
    data() {
        return {
            isload: false,
            page: 1,
        }
    },
    methods: {
        loadMore: function() {
            this.isload = true
            this.$axios.get('trip?page=' + this.page)
                .then(response => {
                    this.data.push(...response.data.data);
                    this.page += 1
                    this.isload = false
                })
        }
    }
}

</script>
