<template>
    <div class="maincolumns">
        <div class="container">
            <div class="columns">
                <div class="column is-4">
                    <div class="flex-card light-bordered">
                        <div class="card-body">
                            <div class="content">
                                <form>
                                    <label class="label">Choose Module</label>
                                    <div class="field">
                                        <div class="control">
                                            <div class="select cat">
                                                <select name="Module" v-validate="'required'" data-vv-as="Module" :class="{'input': true, 'is-danger': errors.has('Module') }" v-model="form.module_id">
                                                    <option value="1">Trip</option>
                                                    <option value="2">Ship</option>
                                                    <option value="3">Task</option>
                                                </select>
                                            </div>
                                            <span v-show="errors.has('Module')" class="help is-danger">{{ errors.first('Module') }}</span>
                                        </div>
                                    </div>
                                    <label class="label">Category:</label>
                                    <div class="field">
                                        <div class="control">
                                            <input class="input" v-model.trim="form.name" name="category" v-validate="'required'" data-vv-as="category" :class="{'input': true, 'is-danger': errors.has('category') }" type="text" placeholder=" Category*">
                                            <span v-show="errors.has('category')" class="help is-danger">{{ errors.first('category') }}</span>
                                        </div>
                                    </div>
                                </form>
                                <div class="mt-10 has-text-right">
                                    <button class="button btn-align raised success-btn" @click="update" v-show="editSlug">update
                                    </button>
                                    <button class="button btn-align  raised primary-btn" @click="create" v-show="!editSlug">create
                                    </button>
                                    <button class="button btn-align  raised info-btn" @click="cancel" v-show="editSlug">cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-8 ">
                    <table class="responsive-table is-accent">
                        <tbody>
                            <tr>
                                <th>Module</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                            <tr v-for="(category,index) in categories" :key="category.id">
                                <td data-th="Module">{{ category.module }}</td>
                                <td data-th="Category">{{ category.name }}</td>
                                <td data-th="Actions">
                                    <button @click="edit(index)" class="button is-small btn-align primary-btn raised rounded btn-outlined"><i class="fa fa-pencil-square-o"></i>Edit
                                    </button>
                                    <button @click="destroy(category.id,index)" class="button is-small btn-align danger-btn raised rounded btn-outlined"><i class="fa fa-trash-o"></i>Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
// import ChosenJs from 'chosen-js';
// Vue.use(ChosenJs);
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
export default {
    data() {
        return {
            isShowModal: false,
            placeholder: "Select Module",
            form: {
                name: null,
                module_id:3
            },
            modules: {},
            categories: {},
            editSlug: null,
        }
    },
    mounted() {

        this.$axios.get('category')
            .then(res => this.categories = res.data.data)
            .catch(error => console.log(error.res.data))
    },
    methods: {
        cancel() {
            this.$validator.validateAll();
            this.form.name = null;
            this.form.module_id = null;
            this.editSlug = null;
            // this.categories.unshift(data);
        },
        // submit() {
        //     this.editSlug ? this.update() : this.create()
        // },
        create() {
            if (this.$validator.validateAll()) {
                this.$axios.post('category', this.form)
                    .then(res => {
                        this.$validator.validateAll()
                        this.categories.unshift(res.data);
                        this.form.name = null;
                    })
            }
        },
        edit(index) {
            this.form.module_id = this.categories[index].module_id
            this.form.name = this.categories[index].name
            this.editSlug = this.categories[index].id
            this.categories.splice(index, 1)
        },
        update() {
            this.$axios.patch(`category/${this.editSlug}`, this.form)
                .then(res => {
                    this.$validator.validateAll();
                    this.categories.unshift(res.data);
                    this.form.name = null;
                    this.form.module_id = null;
                    this.editSlug = null;
                })
        },
        destroy(id, index) {
            this.$axios.delete(`category/${id}`)
                .then(res => this.categories.splice(index, 1))
        }
    }
}

</script>
<style scoped>
.modal-background {
    background-color: grey !important;
}

.cat {
    width: 100%;
}

.maincolumns {
    padding-top: 75px;
}

.responsive-table {
    margin: auto;
    min-width: 72%;
    margin-top: 0px;
    max-width: 100%;
    border-collapse: collapse;
    color: #333;
    border-radius: .2em;
    overflow: hidden;
    box-shadow: -1px 3px 10px 0 rgba(0, 0, 0, 0.06);
}

</style>
