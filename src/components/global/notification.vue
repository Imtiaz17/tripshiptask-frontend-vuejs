<template>
    <section>
        <article class="message" :class="show? classname : ' ' " v-show="show">
            <div class="message-header">
                <p>{{classname}}</p>
                <button class="delete" aria-label="delete" @click="show=false"></button>
            </div>
            <div class="message-body">
            	{{text}}
                <router-link v-if="link" :to="link">{{link}}</router-link>
            </div>
        </article>
    </section>
</template>
<script>
export default {
	 name: 'noti',
    data() {
        return {
        	show:false,
        	classname:'',
        	text:'',
        	link:''
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {
    	 EventBus.$on('closenotification', () => {
            this.show = false
        })
    	 EventBus.$on('opennotification',(classname) => {
            this.show = true
            this.classname=classname.classname
            this.text=classname.text
            this.link=classname.link
   
        })
    },
    methods: {

    },
    watch: {

    }
};
</script>
<style>
.message
{
	position: fixed;
    top: 2%;
    left: 32%;
    width: 500px;
    z-index: 99999999 !important;
    box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);
}
</style>