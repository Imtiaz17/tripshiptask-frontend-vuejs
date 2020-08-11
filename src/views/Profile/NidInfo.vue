<template>
    <section>
        <vue-headful title="Profile | Nid Info" />
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    Nid Info
                </p>
                <p class="subtitle">
                    For your safety and security, we want to verify each member of TripShipTask. So for better results, upload your government issued id to prevent unauthorized access to your account and to prevent/avoid unpleasant experience while interacting with another user as each member is held responsible for his/her unwanted actions.
                </p>
            </header>
            <div class="card-content">
                <div class="content">
                    <div class="columns is-mobile">
                        <div class="column">
                            <div class="info-item">
                                <div class="columns is-mobile">
                                    <div class="column is-2-desktop is-6-mobile">
                                        <div class="info-title">
                                            Date of Birth
                                        </div>
                                    </div>
                                    <div class="column is-3-desktop is-6-mobile">
                                        <div class="info-description">
                                            {{moment(data.dob).format("ll")}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns is-mobile">
                        <div class="column">
                            <div class="info-item">
                                <div class="columns is-mobile">
                                    <div class="column is-2-desktop is-6-mobile">
                                        <div class="info-title">
                                            Govt ID/Nid
                                        </div>
                                    </div>
                                    <div class="column is-3-desktop is-6-mobile">
                                        <div class="info-description">
                                            <div class="control" v-if="status=='unverified'">
                                                <input class="input is-primary-focus" v-model="data.identity_no" type="number">
                                            </div>
                                            <div v-else class="info-description">
                                            {{data.identity_no}}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns is-mobile">
                        <div class="column is-3">
                            <div class="info-title">
                                NID: Front Photo
                            </div>
                            <div class="info-description">
                                <figure class="image is-5by4">
                                    <img :src="getIdenityFrontPhoto(data.identity_img_front)">
                                </figure>
                            </div>
                            <br>
                            <div class="file has-name">
                                <label class="file-label">
                                    <input class="file-input" type="file" v-on:change="onNidFrotChange">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <span class="material-icons">publish</span>
                                        </span>
                                        <span class="file-label">
                                            Choose
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div class="column is-3">
                            <div class="info-title">
                                NID: Back Photo
                            </div>
                            <div class="info-description">
                                <figure class="image is-5by4">
                                    <img :src="getIdenityBackPhoto(data.identity_img_back)">
                                </figure>
                            </div>
                            <br>
                            <div class="file has-name">
                                <label class="file-label">
                                    <input class="file-input" type="file" v-on:change="onNidBackChange">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <span class="material-icons">publish</span>
                                        </span>
                                        <span class="file-label">
                                            Choose
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="has-text-right" v-if="status=='unverified'">
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
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
})
import moment from 'moment'
export default {
    data() {
        return {
            isLoading: false,
            nid_front: '',
            nid_back: '',
            moment: moment,
        }
    },
    computed: {
        data() {
            return this.$store.state.user
        },
        status()
        {
            return this.$store.getters.user.status
        }

    },
    created() {


    },
    mounted() {

    },
    methods: {
        getIdenityFrontPhoto(pic) {
            let frontPic = (this.nid_front.length > 200) ? this.nid_front : pic
            return frontPic;
        },
        getIdenityBackPhoto(pic) {
            let backPic = (this.nid_back.length > 200) ? this.nid_back : pic
            return backPic;
        },
        onNidFrotChange(e) {
            let file = e.target.files[0];
            //this.form.idname = file.name
            let reader = new FileReader();
            reader.onload = (file) => {
                this.nid_front = reader.result;
            }
            reader.readAsDataURL(file);
        },
        onNidBackChange(e) {
            let file = e.target.files[0];
            //this.form.idname = file.name
            let reader = new FileReader();
            reader.onload = (file) => {
                this.nid_back = reader.result;
            }
            reader.readAsDataURL(file);
        },
        update() {
            this.isLoading = true
            this.$axios.patch(`auth/update/${this.data.id}`, {
                    identity_no: this.data.identity_no,
                    nid_front: this.nid_front,
                    nid_back: this.nid_back
                })
                .then((result) => {
                    this.nid_front = ''
                    this.nid_back = ''
                    this.$store.dispatch('getInfo')
                    this.isLoading = false
                    Toast.fire({
                        type: 'success',
                        title: 'Nid Info successfuly updated'
                    })
                })
                .catch(error => console.log(error.res.data))


        }

    },
    watch: {

    }
};
</script>
<style scoped>
.card-header {
    padding: 16px;
    font-weight: 500;
}

.info-title {
    font-weight: 500;
}

.content figure {
    margin-top: 20px;
}
</style>