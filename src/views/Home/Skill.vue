<template>
    <div class="maincolumns">
        <div class="container">
            <div class="columns">
                <div class="column is-4">
                    <div class="flex-card light-bordered">
                        <div class="card-body">
                            <div class="content">
                                <form>
                                    <label class="label">Choose Category</label>
                                    <div class="field">
                                        <div class="control">
                                            <div class="select cat">
                                                <select name="Category" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('Category') }" v-model="form.category_id">
                                                    <option v-for="category in categories" v-bind:value="category.id" :key="category.id">{{ category.name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <span v-show="errors.has('Category')" class="help is-danger">{{ errors.first('Category') }}</span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <label class="label">Skill:</label>
                                            <input class="input" v-model="form.name" name="Skill" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('Skill') }" type="text" placeholder=" Skill*">
                                            <span v-show="errors.has('Skill')" class="help is-danger">{{ errors.first('Skill') }}</span>
                                        </div>
                                    </div>
                                </form>
                                <div class="mt-10 has-text-right">
                                    <button class="button btn-align  raised success-btn" @click="update" v-show="editSlug">update
                                    </button>
                                    <button class="button btn-align raised primary-btn" @click="create" v-show="!editSlug">create
                                    </button>
                                    <button class="button btn-align  raised info-btn" @click="cancel" v-show="editSlug">cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Demo section -->
                <div class="column is-8">
                    <table class="responsive-table is-primary">
                        <tbody>
                            <tr>
                                <th>Category</th>
                                <th>Skill</th>
                                <th>Actions</th>
                            </tr>
                            <tr v-for="(skill,index) in skills" :key="skill.id">
                                <td data-th="Category">{{ skill.category }}</td>
                                <td data-th="Skill">{{ skill.name }}</td>
                                <td data-th="Actions">
                                    <button @click="edit(index)" class="button is-small btn-align primary-btn raised rounded btn-outlined"><i class="fa fa-pencil-square-o"></i>Edit
                                    </button>
                                    <button @click="destroy(skill.id,index)" class="button is-small btn-align danger-btn raised rounded btn-outlined"><i class="fa fa-trash-o"></i>Delete
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
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate)
export default {

    data() {
        return {
            form:{
                name: '',
                category_id: ''
            },
            categories: [],
            skills: [],
            editSlug: null,

        }

    },
    mounted() {

        this.$axios.get('category')
            .then(res => this.categories = res.data.data)


        this.$axios.get('skill')
            .then(res => this.skills = res.data.data)

    },
    methods: {
        formatter(d) {
            return d.toLocaleDateString()
        },

        create() {
            if (this.$validator.validateAll()) {
                this.$axios.post('skill',this.form)
                    .then(res => {
                        this.$validator.validateAll()
                        this.skills.unshift(res.data);
                        this.form.category_id = null;
                        this.form.name = null;
                    })
                    .catch(() => {})
            }
        },
        cancel() {
            this.$validator.validateAll();
            this.form.name = null;
            this.form.category_id = null;
            this.editSlug = null;
            this.$router.go()

        },
        edit(index) {
            this.form.category_id = this.skills[index].cat_id
            this.form.name = this.skills[index].name
            this.editSlug = this.skills[index].id
            this.skills.splice(index, 1)
        },
        update() {
            this.$axios.patch(`skill/${this.editSlug}`, this.form)
                .then(res => {
                    this.$validator.validateAll();
                    this.skills.unshift(res.data);
                    this.form.name = null;
                    this.form.category_id = null;
                    this.editSlug = null;
                })
        },
        destroy(id, index) {
            this.$axios.delete(`skill/${id}`)
                .then(res => this.skills.splice(index, 1))
        }
    }
}

</script>
<style scoped>
.maincolumns {
    padding-top: 75px;
}

.cat {
    width: 100%;
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
