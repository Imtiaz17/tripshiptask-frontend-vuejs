<template>
    <section>
        <vue-headful title="Profile | Vehicle Info" />
        <div class="card">
            <header class="card-header">
                Vehicle Info
            </header>
            <div class="card-content">
                <div class="content">
                    <div class="columns is-mobile">
                        <div class="column is-3-desktop is-5-mobile">
                            <div class="info-title">
                                Have a reliable vehicle?
                            </div>
                        </div>
                        <div class="column is-2-desktop is-4-mobile">
                            <div class="control">
                                <ul class="leftx" style="display: inline-flex;">
                                    <li>
                                        <vs-radio vs-name="radios1" vs-value="yes" v-model="haveVehicle">Yes</vs-radio>
                                    </li>
                                    <li style="margin-left: 10px;">
                                        <vs-radio vs-name="radios1" vs-value="no" v-model="haveVehicle">No</vs-radio>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="column is-3-desktop is-3-mobile" style="margin-top: -7px;">
                            <vs-button @click="addRow" type="gradient">Add Vehicle</vs-button>
                        </div>
                    </div>
                    <div class="columns is-mobile vehicles">
                        <div class="column is-4" v-for="(row,index) in rows" :key="index">
                            <vs-row vs-justify="center">
                                <vs-col type="flex" vs-justify="center" vs-align="left" vs-w="12">
                                    <vs-card>
                                        <input type="hidden" v-model="row.id">
                                        <div class="columns">
                                            <div class="column">
                                                <div class="control">
                                                    <input type="hidden" v-model="row.id">
                                                    <float-label label="Vehicle Type" :fixed='row.type?true:false'>
                                                        <div class="select">
                                                            <select :disabled="haveVehicle=='no'" v-model="row.type" name="type" >
                                                                <option v-for="(item,index) in voptions" :key="index" :value="item">{{item}}</option>
                                                            </select>
                                                        </div>
                                                    </float-label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="columns">
                                            <div class="column">
                                                <div class="control">
                                                    <float-label label="Model" :fixed='row.model?true:false'>
                                                        <input :disabled="haveVehicle=='no'" name="model"  class="input" v-model="row.model" type="text">
                                                    </float-label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="columns">
                                            <div class="column">
                                                <div class="control">
                                                    <float-label label="Vin Number" :fixed='row.vin_number?true:false'>
                                                        <input :disabled="haveVehicle=='no'" class="input  is-primary-focus" v-model="row.vin_number" type="text">
                                                    </float-label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="columns">
                                            <div class="column">
                                                <div class="control">
                                                    <float-label :dispatch="false" label="Color" :fixed='row.color?true:false'>
                                                        <div class="select">
                                                            <select :disabled="haveVehicle=='no'" v-model="row.color">
                                                                <option v-for="(item,index) in colors" :key="index" :value="item">{{item}}</option>
                                                            </select>
                                                        </div>
                                                    </float-label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="columns">
                                            <div class="column">
                                                <div class="control">
                                                    <float-label label="Driving Licence" :fixed='row.licence_number?true:false'>
                                                        <input :disabled="haveVehicle=='no'" class="input  is-primary-focus" v-model="row.licence_number" type="text">
                                                    </float-label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="columns">
                                            <div class="column">
                                                <div class="info-title">
                                                    Drivers Licence :
                                                </div>
                                            </div>
                                            <div class="column">
                                                <div class="file has-name">
                                                    <label class="file-label">
                                                        <input :disabled="haveVehicle=='no'" class="file-input" type="file" @change="onDlChnage($event,index)" name="image_field">
                                                        <span class="button is-small accent-btn raised rounded btn-outlined">
                                                            <span class="file-label">
                                                                Select photo
                                                            </span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="columns">
                                            <div class="column">
                                                <figure v-if="row.dl" class="image is-5by4" style="margin-top:2px;">
                                                    <img :src="getDlPhoto(index,row.dl)">
                                                </figure>
                                            </div>
                                        </div>
                                        <div class="columns">
                                            <div class="column">
                                                <div class="info-title">
                                                    Registration Document :
                                                </div>
                                            </div>
                                            <div class="column">
                                                <div class="file has-name">
                                                    <label class="file-label">
                                                        <input :disabled="haveVehicle=='no'" class="file-input" type="file" @change="onRegChnage($event,index)" name="image_field">
                                                        <span class="button is-small accent-btn raised rounded btn-outlined">
                                                            <span class="file-label">
                                                                Select photo
                                                            </span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="columns">
                                            <div class="column">
                                                <figure v-if="row.document" class="image is-5by4" style="margin-top:2px;">
                                                    <img :src="getLicencePhoto(index,row.document)">
                                                </figure>
                                            </div>
                                        </div>
                                        <div slot="footer">
                                            <vs-row vs-justify="flex-end">
                                                <vs-button @click="deleteRow(index,row.id)" type="gradient" color="danger" icon="delete"></vs-button>
                                            </vs-row>
                                        </div>
                                    </vs-card>
                                </vs-col>
                            </vs-row>
                        </div>
                    </div>
                    <div class="has-text-right">
                        <button @click="update" :disabled="haveVehicle=='no'"   v-bind:class="(isLoading)?'button is-success raised is-loading':'button is-success raised'" class=" ">
                            Save
                        </button>
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
export default {
    data() {
        return {
            isLoading: false,
            voptions: [
                'Car',
                'Mini van',
                'Motorcycle',
                'Electric Scooter',
                'CNG',
                'Rickshaw',
                'Bicycle',
            ],
            colors: ['White', 'Black', 'Gray', 'Red', 'Green', 'Blue', 'Silver', 'Brown'],
            rows: [{
                'id': '',
                'type': '',
                'model': '',
                'licence_number': '',
                'vin_number': '',
                'color': '',
                'regname': '',
                'dl': '',
                'document': ''
            }],
            vehicleoptions: [
                'Sedan Car',
                'MicroBus',
                'CNG',
                'Rickshaw',
            ],
            vehicleinfo: [],
            haveVehicle: 'no',
            vehicle: '',

        }
    },
    computed: {
        data() {
            return this.$store.state.user
        },

    },
    created() {

        this.$axios.get(`getvehiclesinfo?user=${this.data.id}`)
            .then(res => {
                if (res.data) {
                    this.haveVehicle = "yes"
                    this.rows = res.data.data
                }
            })

    },
    mounted() {

    },
    methods: {
        getLicencePhoto(index, pic) {
            let photo = (this.rows[index].document.length > 200) ? this.rows[index].document : pic
            return photo;
        },
        getDlPhoto(index, pic) {
            let photo = (this.rows[index].dl.length > 200) ? this.rows[index].dl : pic
            return photo;
        },


        addRow: function() {
            this.rows.push({
                'id': '',
                'type': '',
                'model': '',
                'licence_number': '',
                'vin_number': '',
                'color': '',
                'regname': '',
                'dl': '',
                'document': ''
            });
        },
        deleteRow(index, id) {

            if (id) {
                this.$axios.delete(`vehicle/${id}`)
                    .then(
                        this.rows.splice(index, 1),
                        Toast.fire({
                            type: 'success',
                            title: 'Vehicle successfully deleted'
                        })
                    )
            }
            this.rows.splice(index, 1);
        },
        yes() {
            this.haveVehicle = true
        },
        no() {
            this.haveVehicle = false
        },
        onRegChnage(e, index) {
            let file = e.target.files[0];
            this.rows[index].regname = file.name
            let reader = new FileReader();
            reader.onload = (file) => {
                this.rows[index].document = reader.result;
            }
            reader.readAsDataURL(file);
        },
        onDlChnage(e, index) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (file) => {
                this.rows[index].dl = reader.result;
            }
            reader.readAsDataURL(file);
        },
        update() {
            this.isLoading = true
            this.$axios.patch(`auth/update/${this.data.id}`, {
                    rows: this.rows,
                })
                .then((result) => {
                    this.$store.dispatch('getInfo')
                    this.isLoading = false
                    Toast.fire({
                        type: 'success',
                        title: 'Vehicle Info successfuly updated'
                    })
                })
                .catch(error =>
                    this.isLoading = false
                )


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

.vehicles {
    flex-direction: row;
    flex-wrap: wrap;
}
</style>