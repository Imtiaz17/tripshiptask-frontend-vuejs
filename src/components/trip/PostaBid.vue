<template>
    <vs-popup class="holamundo" title="Offer" :active.sync="bid">
        <div class="columns" v-if="content.post_type=='seek'">
            <div class="column is-4">
                <div class="field mt-5">
                    <div class="control">
                        <float-label :dispatch="false" label="Vehicle type">
                            <div class="select">
                                <select name="vehicle_type" v-on:change="loadV" v-model="form.vehicle_type" v-validate="'required'">
                                    <option v-for="(item,index) in voptions" :key="index" :value="item">{{item}}</option>
                                </select>
                            </div>
                        </float-label>
                        <span v-show="errors.has('vehicle_type')" class="help is-danger">Vehicle type is required</span>
                    </div>
                </div>
            </div>
            <div class="column is-4" v-if="own">
                <label class="label">Do you own this vehicle?</label>
                <div class="control">
                    <ul class="leftx" style="display: inline-flex;">
                        <li style="margin-left:10px;">
                            <vs-radio vs-name="radios1" vs-value="yes" @change="yes">Yes</vs-radio>
                        </li>
                        <li style="margin-left:10px;">
                            <vs-radio vs-name="radios1" vs-value="no" @change="no">No</vs-radio>
                        </li>
                    </ul>
                </div>
                <input type="" v-model="radio" type="hidden" v-validate="'required'" name="vehicle">
                <span v-show="errors.has('vehicle')" class="help is-danger">Please select an option</span>
            </div>
            <div class="column is-4" v-if="ownCar">
                <div class="control" v-if="myVehicles.length>0">
                    <select v-on:change="loadV" v-model="form.vehicle">
                        <option :value="null" disabled selected>Select vehicle</option>
                        <option v-for="(item,index) in myVehicles" :key="index" :value="item">{{item}}</option>
                    </select>
                </div>
                <div class="control" v-else-if="myVehicles.length==0">
                    <span style="color:red">No vehicles found</span>
                </div>
            </div>
        </div>
        <div class="columns is-vcentered">
            <div class="column is-4">
                <div class="field has-addons">
                    <div class="control">
                        <float-label label="Amount">
                            <input type="number" v-model="form.amount" name="amount" class="input is-primary-focus">
                        </float-label>
                    </div>
                    <div class="control">
                        <span class="select">
                            <select>
                                <option>{{content.currency}}</option>
                            </select>
                        </span>
                    </div>
                </div>
            </div>
            <span class="infotext">Put in the amount only if you want to negotiate</span>
        </div>
        <div class="columns" v-if="content.post_type=='offer'">
            <div class="column is-4">
                <div class="control">
                    <float-label :dispatch="false" label="How many of you">
                        <div class="select">
                            <select name="passenger number" v-model="form.vehicle_seat" v-validate="'required'">
                                <option v-for="(item,index) in vseat" :key="index" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </float-label>
                    <span v-show="errors.has('passenger number')" class="help is-danger">Number of passengers is required</span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-three-quarters">
                <div class="field">
                    <div class="control">
                        <float-label label="Short Message (optional)">
                            <textarea class="textarea is-primary-focus" v-model="form.message" rows="4"></textarea>
                        </float-label>
                    </div>
                </div>
            </div>
        </div>
        <vs-button @click="submit">Submit</vs-button>
    </vs-popup>
</template>
<script>
export default {
    props: ['content'],
    data() {
        return {
            bid: true,
            voptions: [
                'Car',
                'Mini van',
                'Motorcycle',
                'Electric Scooter',
                'CNG',
                'Rickshaw',
                'Bicycle'
            ],
            radio: '',
            ownCar: false,
            rentCar: false,
            myVehicles: [],
            vseat:[],
            form: {
                vehicle_type: '',
                vehicle: '',
                message: '',
                amount: '',
                trip_id: this.content.id,
                vehicle_seat:'',
            },
        }
    },
    computed: {
        // vseat() {
        //     if (this..vehicle_type == 'Car') {
        //         return [1, 2, 3, 4]
        //     } else if (this.content.vehicle_type == 'Mini Van/Micro') {
        //         return [1, 2, 3, 4, 5, 6, 7]
        //     } else if (this.content.vehicle_type == 'Motorcycle') {
        //         return [1]
        //     } else if (this.content.vehicle_type == 'Electric Scooter') {
        //         return [1]
        //     } else if (this.content.vehicle_type == 'CNG') {
        //         return [1, 2, 3]
        //     }

        // },
    },
    created() {
    	for (let i = 1; i<=this.content.seats_available; i++) {
    		this.vseat.push(i)
    	}

    },
    mounted() {

    },
    methods: {
        submit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.bid = false
                    EventBus.$emit('bidPosting')
                    this.$axios.post('tripbids', this.form)
                        .then((res) => {
                            EventBus.$emit('bidPosted')
                        })
                        .catch(error => {
                        	EventBus.$emit('bidFailed')
                            console.log(error.res.data)
                        })
                }
            })
        },
        yes() {
            this.radio = "true"
            this.ownCar = true
            this.rentCar = false
        },
        no() {
            this.radio = "true"
            this.ownCar = false
        },
        loadV() {
            this.$axios.post(`vehicles/${this.authId}`, {
                    ve: this.form.vehicle_type,
                    id: this.id
                })
                .then(res => {
                    this.myVehicles = res.data;

                })
                .catch(error => console.log(error.res.data))
        },
    },
    watch: {
        'form.vehicle_type': function(val) {
            this.myVehicles = []
            this.own = true
            this.loadV()

        }
    }
};
</script>
<style scoped>
</style>