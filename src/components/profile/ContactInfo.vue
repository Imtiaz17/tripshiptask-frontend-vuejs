<template>
    <div class="flex-card light-bordered mt-30">
        <div class="flex-card-header ">
            <div class="header-info ">
                <div class="header-title">
                    Contact Info
                </div>
            </div>
        </div>
        <div class="card-body">
            <edit-contact :data="data" v-if="editing" v-on:cancelEdit="updateEdit($event)"></edit-contact>
            <div class="content" v-else>
                <div class="columns mt-10">
                    <div class="column">
                        <label class="label">Personal number:</label>
                        <label>{{data.mobile}}</label>
                    </div>
                    <div class="column">
                        <label class="label">Home Contact Numbe:</label>
                        <label>{{data.home_contact}}</label>
                    </div>
                    <div class="column">
                        <label class="label">SkypeId:</label>
                        <label>{{data.skype}}</label>
                    </div>
                </div>
                <div class="columns mt-30">
                    <div class="column">
                        <label class="label">Email:</label>
                        <label>{{data.email}}</label>
                    </div>

                    <div class="column">
                        <label class="label">Emmergency Contact Number:</label>
                        <label>{{data.emergency_number}}</label>
                    </div>
                    <div class="column"></div>
                </div>
                <div class="columns mt-30">
                    <div class="column">
                        <label class="label">Facebook Friends Id:</label>
                        <label>{{data.friends_fblink }}</label>
                    </div>
                    <div class="column">
                        <label class="label">Facebook Id::</label>
                        <label>{{data.fblink}}</label>
                    </div>
                    <div class="column">
                        <label class="label">Person Who reffered:</label>
                        <label>{{data.reffered_person }}</label>
                    </div>

                </div>
                <div class="columns" style="bottom-top:10%;">
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column is-offset-4">
                        <a class="button btn-align no-lh raised info-btn" @click="editContact">
                                                <span class="icon is-medium">
                                                <i class="fa fa-pencil-square-o"></i>
                                                </span>
                            <span>Edit</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import editContact from './EditContact'

    export default {
        components: {editContact},


        props: ['data'],
        data() {
            return {
                editing: false,

            }
        },

        methods: {
            updateEdit: function (e) {
                this.editing = false;
            },


            editContact() {
                this.editing = true
            }

        }
    }


</script>

<style>
    
</style>
