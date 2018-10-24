<template>
  <div>
    <v-layout row style="background-color: red;">
      <v-flex>
        <h3 class="display-2 mb-3">#letsdothis <span class="headline grey--text">for Carter</span></h3>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      numOfSliderVal: 0,
      numberOfSelectOptions: [0,1,2,3,4,5,6],
      paymentSelectOptions: ["Cash in Person","Check","Paypal","Vinmo"]
    }
  }
}
</script>
