<template>
    <section>
        <vue-headful title="Profile | Change Password" />
        <div class="card">
            <header class="card-header">
                Change Password
            </header>
            <div class="card-content">
                <div class="content">
                    <div class="columns is-mobile">
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
                                        <input type="password" name="password_confirmation" :class="{'input': true, 'is-danger': errors.has('password_confirmation') }" v-model="form.password_confirmation" data-vv-as="password" v-validate="'required|confirmed:password'">
                                        <span v-show="errors.has('password_confirmation')" class="help is-danger">{{ errors.first('password_confirmation') }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="has-text-right">
                        <a @click="update" v-bind:class="(isLoading)?'button is-success raised is-loading':'button is-success raised'" class=" ">
                            Update
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 5000,
    showCloseButton: true,
    heightAuto: false
});
export default {
    props: ['data'],
    data() {
        return {
            isLoading: false,
            form: {
                current: '',
                password: '',
                password_confirmation: ''
            },
        }
    },
    methods: {
        update() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.isLoading = true
                    this.$axios.patch('auth/updatePassword', this.form)
                        .then((res) => {
                            if (res.response = 200) {
                                this.isLoading = false
                                const clear = async () => {
                                    this.form.current = ''
                                    this.form.password = ''
                                    this.form.password_confirmation = ''
                                }
                                clear().then(() => {
                                    this.$validator.reset()
                                })
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
                            this.isLoading = false
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
                }
            })


        },
    }
}
</script>
<style scoped>
.card-header {
    padding: 16px;
    font-weight: 500;
}

.info-title {
    font-weight: 500;
}
</style>