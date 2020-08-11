<template>
    <GmapMap :center="{lat:10, lng:10}" ref="xyz" :zoom="12" map-type-id="terrain" style="width:100%; min-height:330px"> </GmapMap>
</template>
<script>
export default {
    props: ['data'],
    data() {
        return {}
    },
    mounted() {
        if (this.data.start_point) {
            this.$refs.xyz.$mapPromise.then(() => {
                this.directionsService = new google.maps.DirectionsService()
                this.directionsDisplay = new google.maps.DirectionsRenderer()
                this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
                var vm = this
                var waypts = []
                var midpoint = this.data.via
                if (midpoint) {
                    waypts.push({
                        location: midpoint,
                        stopover: true
                    })
                };

                vm.directionsService.route({
                    origin: this.data.start_point,
                    destination: this.data.destination,
                    travelMode: 'DRIVING',
                    waypoints: waypts
                }, function(response, status) {
                    if (status === 'OK') {
                        vm.directionsDisplay.setDirections(response)
                    } else {
                        console.log('Directions request failed due to ' + status)
                    }
                });
            }, 2000);
        } else if (this.data.pickup){
            this.$refs.xyz.$mapPromise.then(() => {
                this.directionsService = new google.maps.DirectionsService()
                this.directionsDisplay = new google.maps.DirectionsRenderer()
                this.directionsDisplay.setMap(this.$refs.xyz.$mapObject)
                var vm = this
                vm.directionsService.route({
                    origin: this.data.pickup,
                    destination: this.data.dropoff,
                    travelMode: 'DRIVING',
                }, function(response, status) {
                    if (status === 'OK') {
                        vm.directionsDisplay.setDirections(response)
                    } else {
                        console.log('Directions request failed due to ' + status)
                    }
                });
            }, 2000);
        }
    }
}

</script>
