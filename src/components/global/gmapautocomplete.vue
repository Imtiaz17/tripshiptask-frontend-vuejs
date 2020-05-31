<template>
        <gmap-autocomplete @place_changed="handleChange" :selectFirstOnEnter="true" v-if="premium">
            <template v-slot:input="slotProps">
                <float-label v-if="placeholder=='Start point'||placeholder=='Pick up point'" :label="placeholder" fixed >
                    <input type="text" ref="input" :value="start_formatted_address" v-on:listeners="slotProps.listeners" v-on:attrs="slotProps.attrs" class="input is-primary-focus">
                </float-label>
                  <float-label v-else :label="placeholder" fixed>
                    <input type="text" ref="input" :value="end_formatted_address" v-on:listeners="slotProps.listeners" v-on:attrs="slotProps.attrs" class="input is-primary-focus">
                </float-label>
            </template>
        </gmap-autocomplete>
</template>
<script>

export default {
    props: {
        placeholder: {
            type: String,
            required: true
        },
        premium:{
        	type:Boolean,
        	required: true
        },
        start_point:{
            type: String,
            required: false
        },
        destination:{
            type: String,
            required: false
        },
    },
    data() {
        return {
            start_formatted_address: "",
            end_formatted_address:""
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {
        EventBus.$on('removedata', () => {
            this.start_formatted_address = null
            this.end_formatted_address = null
        })
        this.start_formatted_address = this.start_point
        this.end_formatted_address = this.destination
    },
    methods: {
        handleChange(place) {
            if (!place || place == undefined || !place.geometry) {
                this.$emit('no-result-found', place);
                return false;
            }
            if (place.address_components !== undefined) {
                let returnData = {};
                returnData['field'] = this.placeholder;
                returnData['latitude'] = place.geometry.location.lat();
                returnData['longitude'] = place.geometry.location.lng();
                returnData['address'] = place.name+","+place.formatted_address;

                this.$emit('address_res', returnData)
            } else {
                this.$emit('no-result-found', place);
            }
        }
    },
    watch: {

    }
};
</script>
<style scoped>
</style>