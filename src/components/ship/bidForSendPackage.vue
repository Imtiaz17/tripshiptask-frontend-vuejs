<template>
    <section>
        <div class="columns is-vcentered">
            <div class="column is-4">
                <div class="field has-addons">
                    <div class="control">
                        <float-label label="Amount">
                            <input type="number" v-model="form.bidamount" name="amount" class="input is-primary-focus">
                        </float-label>
                    </div>
                    <div class="control">
                        <span class="select">
                            <select>
                                <option>{{data.currency}}</option>
                            </select>
                        </span>
                    </div>
                </div>
            </div>
            <span class="infotext">Put in the amount only if you want to negotiate</span>
        </div>
        <div class="columns">
            <div class="column is-three-quarters">
                <div class="control">
                    <float-label label="Short Message (optional)">
                        <textarea class="textarea is-primary-focus" v-model="form.message" rows="4"></textarea>
                    </float-label>
                </div>
            </div>
        </div>
        <div class="has-text-center">
            <button @click="submit" class="button info-btn raised">
                Submit
            </button>
        </div>
    </section>
</template>
<script>
export default {
    props: ['data'],
    data() {
        return {
            form: {
                message: '',
                bidamount: '',
                ship_id: this.data.id,
            }
        }
    },
    methods: {
        submit() {
            EventBus.$emit('closeSendingBid')
            this.$axios.post('shipbids', this.form)
                .then((res) => {
                    setTimeout(() => {
                        this.$axios.get('getShip/' + this.data.slug)
                            .then(res => {
                                EventBus.$emit('Sendingbid', res.data.data)
                            })
                    }, 0)

                })



        }
    }
}
</script>
<style scoped>
.con-vs-popup .vs-popup {
    width: 50%;
}
</style>