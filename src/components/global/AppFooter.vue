<template>
    <section>
        <footer class="footer">
            <div class="columns">
                <div class="column is-3">
                    <span class="cprt">© 2020 Tripshiptask</span>
                </div>
                <div class="column is-9">
                    <div class="content">
                        <ul>
                            <li> <router-link :to="{ name: 'faq'}" target="_blank">FAQ</router-link></li>
                            <li> <router-link :to="{ name: 'termsc'}" target="_blank">Terms & Condition</router-link></li>
                            <li> <router-link :to="{ name: 'privacyp'}" target="_blank">Privacy & Policy</router-link></li>
                            <li> <router-link :to="{ name: 'datap'}" target="_blank">Data Policy</router-link></li>
                            <li> <router-link :to="{ name: 'cookiep'}" target="_blank">Cookie Policy</router-link></li>
                                      
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
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
.content ul {
    list-style: none;
    display: inline-flex;
    float: right;
    padding-right: 100px;
}
</style>