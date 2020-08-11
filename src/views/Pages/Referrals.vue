<template>
    <section>
         <vue-headful title="Refer Someone | TripShipTask" />
       <h3 class="has-text-centered">You need to log into your account to refer someone.</h3>
       <br>
       <div class="login has-text-centered">
        <router-link to="/">
            <a class="button is-info is-bold raised no-lh'">Log in</a>
        </router-link>
            
       </div>
    </section>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
    watch: {

    }
};

</script>
<style scoped>
section
{
    padding:150px;
}
section h3
{
    font-size: 2rem;
}
section p
{
    font-size: 20px;
    color: #8a8a8a;
}
</style>