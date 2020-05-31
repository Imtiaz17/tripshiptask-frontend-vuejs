<template>
    <div>
        <div class="columns">
            <div class="column">
                <div class="info-item">
                    <div class="columns">
                        <div class="column is-3">
                            <div class="info-title">
                                Existing password :
                            </div>
                        </div>
                        <div class="column is-3">
                            <input type="password" name="password" class="input is-primary-focus" v-model="form.current" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('password') }">
                            <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                        </div>
                    </div>
                </div>
                <div class="info-item">
                    <div class="columns">
                        <div class="column is-3">
                            <div class="info-title">
                                New password :
                            </div>
                        </div>
                        <div class="column is-3">
                            <input type="password" name="new password" class="input is-primary-focus" v-model="form.password" v-validate="'required'" ref="password" :class="{'input': true, 'is-danger': errors.has('new password') }">
                            <span v-show="errors.has('new password')" class="help is-danger">{{ errors.first('new password') }}</span>
                        </div>
                    </div>
                </div>
                <div class="info-item">
                    <div class="columns">
                        <div class="column is-3">
                            <div class="info-title">
                                Retype password :
                            </div>
                        </div>
                        <div class="column is-3">
                            <input type="password" name="password_confirmation" class="input  is-primary-focus" v-model="form.password_confirmation" data-vv-as="password" v-validate="'required|confirmed:password'">
                            <span v-show="errors.has('password_confirmation')" class="help is-danger">{{ errors.first('password_confirmation') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <a @click="submit" class="button  is-primary btn-dash raised  has-icon">
                    <i class="fa fa-pencil-square-o"></i>Update
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';

Vue.use(VueSweetalert2);
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 5000,
    showCloseButton: true,
    heightAuto: false
});
export default {
    components: {
        VeeValidate
    },
    props: ['data'],
    data() {
        return {
            form: {
                current: '',
                password: '',
                password_confirmation: ''
            },
        }
    },
    methods: {
        submit() {
            this.$validator.validateAll()
            this.$axios.patch('auth/updatePassword')
                .then((res) => {
                    if (res.response = 200) {
                        Swal.fire({
                            position: 'center',
                            type: 'success',
                            title: 'Password Successfully Updated',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }

                })
                .catch(error => {
                    if (error.response.status == 422) {
                        Toast.fire({
                            type: 'error',
                            title: 'Please check again !',
                            text: 'There have some error in your input '

                        })
                    } else {
                        console.log('hello')
                    }
                })


        },
    }
}
</script>
<style>
</style>