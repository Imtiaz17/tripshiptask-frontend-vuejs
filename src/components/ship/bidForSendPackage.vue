<template>
    <section>
        <div class="columns">
            <div class="column is-three-quarters">
                <div class="field">
                    <label class="label">Short Message</label>
                    <div class="control">
                        <textarea class="textarea" rows="5" v-model="form.message"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-half">
                <div class="field">
                    <label class="label">Bid Amount</label>
                    <div class="control">
                        <input type="number" name="amount" v-model="form.bidamount" placeholder="put bid amount only if you want to negotiate or else leave it blank" class="input is-primary-focus">
                    </div>
                </div>
            </div>
        </div>
        <div class="has-text-center">
            <button @click="submit" class="button btn-align info-btn raised">
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
                        this.$axios.get('getShip/' + this.data.id)
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