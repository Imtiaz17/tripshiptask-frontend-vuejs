<template>
    <section class="ewallet">
        <vue-headful title="E-Wallet" />
        <div class="section-wrapper">
            <div class="container">
                <div class="pricing-wrapper">
                    <div id="solo" class="pricing-container is-active">
                        <div class="container-inner">
                            <div class="solo-plans">
                                <!--Plan-->
                                <div class="solo-plan">
                                    <div class="header">
                                        <span>Total Upload</span>
                                    </div>
                                    <div class="body">
                                        <span>0 BDT</span>
                                    </div>
                                </div>
                                <!--Plan-->
                                <div class="solo-plan">
                                    <div class="header">
                                        <span>Current Balance</span>
                                    </div>
                                    <div class="body">
                                        <span>0 BDT</span>
                                    </div>
                                </div>
                                <!--Plan-->
                                <div class="solo-plan">
                                    <div class="header">
                                        <span>Total Withdrawn</span>
                                    </div>
                                    <div class="body">
                                        <span>0 BDT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="upload-wrapper">
            <div class="container">
                <span>UPLOAD:</span>
                <div class="upload-options">
                    <vs-button color="primary" type="border">Bkash</vs-button>
                    <vs-button color="primary" type="border">UCash</vs-button>
                    <vs-button color="primary" type="border">Rocket</vs-button>
                    <vs-button color="primary" type="border">Sheba</vs-button>
                    <vs-button color="primary" type="border">Bank Account</vs-button>
                </div>
            </div>
        </div>
        <div class="section-wrapper">
            <div class="container">
                <div class="card">
                    <div class="card-content">
                        <div class="fixed_header">
                            <table class="table is-accent">
                                <thead>
                                    <tr>
                                        <th>Date & Time</th>
                                        <th>Upload Method</th>
                                        <th>Amunt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            12/1/2020 2:45pm
                                        </td>
                                        <td>
                                            Bkash
                                        </td>
                                        <td>
                                            1200 BDT
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {}
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
.upload-wrapper {
    padding: 0px 40px;
}

.upload-wrapper .container {
    display: flex;
    align-items: baseline;
}

.upload-wrapper span {
    font-size: 1em;
    font-weight: 600;
}

.upload-options button {
    margin: 0px 10px;
}

.pricing-wrapper {
    padding-bottom: 0px;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .02);
    background-color: #fff;

}

.pricing-wrapper .pricing-container .container-inner {
    padding: 0px;
}

.pricing-wrapper .pricing-container .container-inner .solo-plans .solo-plan {
    width: 33.3%;
    min-height: 124px;
    border-right: 1px solid #e3e3e3;
    padding: 29px 15px;
    justify-content: space-evenly;
}

header {
    font-size: 1em;
    color: #363636;
    font-weight: 600;
    line-height: 1.3;
}

.body {
    font-size: 1.1em;
    color: #363636;
    font-weight: 600;
    line-height: 1.3;
}

.pricing-wrapper .pricing-container .container-inner .solo-plans .solo-plan .header span {
    font-size: 14px;
}

.pricing-wrapper .pricing-container .container-inner .solo-plans .solo-plan .body span {
    font-size: 1.1em;
}
</style>