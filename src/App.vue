<template>
  <div id="app">
  	<toolbar v-if="check!==false" :data="form"></toolbar>
    <router-view/>
  </div>
</template>
<script>
import toolbar from './components/global/toolbar'

export default {
    components: { toolbar },
    data() {
        return {
            show: false

        }
    },
    computed: {
        check() {
            return this.$store.state.tokenExist
        },
        form() {
            return this.$store.getters.user
        }
    },
    created() {
        // if (this.check!==null) {
        //     this.getUserInfo
        // }

    },
    methods: {
        getUserInfo() {
            this.$axios.post('auth/me', this.form)
                .then(res => this.form = res.data)
                .catch(error => console.log(error.res.data))
        },
    }

}

</script>
<style>
</style>


