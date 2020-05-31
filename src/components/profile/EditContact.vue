<template>


    <div class="content">
        <div class="columns mt-10">
            <div class="column">
                <label class="label">Personal number:</label>
                <input class="input is-medium" type="text" v-model="data.mobile">
            </div>
            <div class="column">
                <label class="label">Home Contact Numbe:</label>
                <input class="input is-medium" type="text" v-model="data.home_contact">
            </div>
            <div class="column">
                <label class="label">SkypeId:</label>
                <input class="input is-medium" type="text" v-model="data.skype">
            </div>
        </div>
        <div class="columns mt-30">
            <div class="column">
                <label class="label">Email:</label>
                <input class="input is-medium" type="text" v-model="data.email">
            </div>

            <div class="column">
                <label class="label">Emmergency Contact Number:</label>
                <input class="input is-medium" type="text" v-model="data.emergency_number">
            </div>
            <div class="column"></div>
        </div>
        <div class="columns mt-30">
            <div class="column">
                <label class="label">Facebook Friends Id:</label>
                <input class="input is-medium" type="text" v-model="data.friends_fblink">
            </div>
            <div class="column">
                <label class="label">Facebook Id::</label>
                <input class="input is-medium" type="text" v-model="fblink">
            </div>
            <div class="column">
                <label class="label">Person Who reffered:</label>
                <input class="input is-medium" type="text" v-model="data.referred_person">
            </div>

        </div>
        <div class="columns" style="bottom-top:10%;">
            <div class="column"></div>
            <div class="column"></div>
            <div class="column is-offset-4">
                <div class="field is-grouped">
                    <div class="control">
                        <a class="button  is-success raised" @click="update">
                                    <span class="icon is-medium">
                                                <i class="fa fa-check-square-o"></i>
                                                </span>
                            <span>Update</span>

                        </a>
                    </div>
                    <div class="control">
                        <a class="button is-info raised" @click="cancel">
                            <span class="icon is-medium">
                                                <i class="fa fa-close"></i>
                                                </span>
                            <span>Cancel</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>

<script>
    import contactInfo from './ContactInfo'

    export default {
        components: {contactInfo},
        props: ['data'],
        data() {
            return {
                fblink:'https://www.facebook.com/'+ this.data.fblink
            }
        },
        methods: {
            cancel: function () {
                this.$emit('cancelEdit')
            },

            update() {
                axios.patch(`/api/auth/update/${this.data.id}`, {
                    mobile: this.data.mobile,
                    home_contact: this.data.home_contact,
                    skype: this.data.skype,
                    fbid: this.data.fbid,
                    emergency_number: this.data.emergency_number,
                    friends_fblink: this.data.friends_fblink,
                    referred_person: this.data.referred_person,
                })
                    .then(res => this.cancel())
                    .catch(error => console.log(error.res.data))
            }
        }
    }
</script>

<style>

</style>
