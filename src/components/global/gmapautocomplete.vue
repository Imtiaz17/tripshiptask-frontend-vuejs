<template>
    <gmap-autocomplete :options="autocompleteOptions" @place_changed="handleChange" :selectFirstOnEnter="true" v-if="verified">
        <template v-slot:input="slotProps">
            <float-label v-if="label=='Start point'||label=='Pick up Point'" :fixed='start_formatted_address?true:false' :label="label">
                <input type="text" ref="input" :value="start_formatted_address" v-on:listeners="slotProps.listeners" placeholder="" v-on:attrs="slotProps.attrs" class="input is-primary-focus">
            </float-label>
            <float-label v-else :label="label" :fixed='end_formatted_address?true:false'>
                <input type="text" ref="input" :value="end_formatted_address" v-on:listeners="slotProps.listeners" placeholder="" v-on:attrs="slotProps.attrs" class="input is-primary-focus">
            </float-label>
        </template>
    </gmap-autocomplete>
    <gmap-autocomplete :selectFirstOnEnter="false" v-else>
        <template v-slot:input="slotProps">
            <float-label v-if="label=='Start point'||label=='Pick up point'" :label="label">
                <input type="text" class="input is-primary-focus">
            </float-label>
            <float-label v-else :label="label" fixed>
                <input type="text" class="input is-primary-focus">
            </float-label>
        </template>
    </gmap-autocomplete>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            required: true
        },
        start_point: {
            type: String,
            required: false
        },
        destination: {
            type: String,
            required: false
        },
    },
    data() {
        return {
            autocompleteOptions: {
                componentRestrictions: {
                    country: [
                        'us','bd','ca','uk','aus','ind','ke','pk'
                    ],
                },
            },
            start_formatted_address: "",
            end_formatted_address: ""
        }

    },
    computed: {

    },
    created() {

    },
    mounted() {
        EventBus.$on('removedata', () => {
            this.start_formatted_address = ""
            this.end_formatted_address = ""
        })
        EventBus.$on('setstartlocation', (data) => {
            this.start_formatted_address = data
        })
        EventBus.$on('setendlocation', (data) => {
            this.end_formatted_address = data
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
                returnData['field'] = this.label;
                returnData['latitude'] = place.geometry.location.lat();
                returnData['longitude'] = place.geometry.location.lng();
                returnData['address'] = place.name + "," + place.formatted_address;

                this.$emit('address_res', returnData)
            } else {
                this.$emit('no-result-found', place);
            }
        }
    },
    watch: {
        start_point: function(val) {
            this.start_formatted_address = val
        },
        destination: function(val) {
            this.end_formatted_address = val
        },

    }
};
</script>
<style scoped>
</style>