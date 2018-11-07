<template>
  <div>
    <v-layout row>
      <v-flex>
        <h3 class="display-2 mb-3">#letsdothis <span class="headline grey--text">for Carter</span></h3>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex>
        <v-img
            src="/carter_pic.jpg"
            max-width="300"
            class="mx-auto mb-3"></v-img>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex>
        <p>On May 14, 2018, Carter Cummins was admitted into Memorial Children's Hospital to undergo several long days and restless nights of tests to determine the underlying cause of his unexplained weight loss. With great shock and dismay, the test results provided answers that no parent could ever prepare for and that no child should ever have to experience. With these results, Carter was diagnosed with Diencephalic Syndrome which is a very rare disorder caused by a brain tumor.</p>
        <p>Since May 14, Carter has undergone numerous CT scans, sedated MRIs, surgeries, chemo therapy treatments, a shunt implant and even a 9 hour brain surgery! He's also since celebrated his 2nd birthday - making him the strongest 2 year old most will ever know in their lifetime! Strength that is much like his parents, Erin and Joey.</p>
        <p>Carter's original chemo therapy regimen was called off after an MRI during an ER visit following Carter's fourth treatment showed that the chemo was not producing the results his doctors expected to see. Carter's case was recently referred to the Children's Hospital of Atlanta where he will be participating in a clinical trial of MEK inhibitors.</p>
        <p>Carter has a long road ahead of him and we hope that these bracelets will allow each of you to help spread the word of his story and show support for his family. The bracelets represent Carter's favorite saying ("lets do this") and his favorite thing in the world, besides his mommy, Mickey Mouse.</p>
        <p>We're asking for $5 per bracelet but additional donations are welcome. 100% of the proceeds are going to Carter and his parents.</p>
        <p>We can't thank you enough for your thoughts, prayers, and continued support for Carter!!</p>
        <p>#letsdothis</p>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex>
        <v-form ref="form" v-model="formIsValid">
          <v-text-field 
              v-model="fName"
              label="Name"
              disabled
              required
              :rules="[rules.required]"></v-text-field>
          <v-text-field 
              v-model="fEmail"
              label="Email"
              hint="Optional change email"
              required
              :rules="[rules.required]"></v-text-field>
          <!-- <v-label>Number of Bracelets</v-label> -->
          <v-slider class="mt-4"
              label="Number of Bracelets"
              v-model="numOfSliderVal"
              thumb-label="always"
              thumb-size="24"
              ticks="always"
              tick-size="2"
              min="0"
              max="20"
              color="red darken-1"
              track-color="black"
              persistent-hint
              :hint="totalForNumberOfBracelets"
              @input="updateTotal"></v-slider>
          <v-text-field 
              v-model="additionalDonationDollars"
              label="Additional Donation" 
              prefix="$"
              suffix=".00"
              hint="In dollar amount"
              @input="updateTotal"
              :rules="[rules.onlyNumbers]"></v-text-field>
          <v-select
              v-model="fPaymentMethod"
              :items="paymentSelectOptions"
              item-text="label"
              label="Payment Method"
              @change="paymentSelectChanged"></v-select>
          
          <div v-if="addressInfoIsVisable" class="grey lighten-4 pa-2">
            <p class="text-xs-center mb-0">
              <v-label>- Shipping Information -</v-label>
            </p>
            <v-text-field
                v-model="fAddress"
                label="Address"
                :rules="[rules.requiredIfAddress]"></v-text-field>
            <v-text-field
                v-model="fCity"
                label="City"
                :rules="[rules.requiredIfAddress]"></v-text-field>
            <v-text-field
                v-model="fState"
                label="State"
                :rules="[rules.requiredIfAddress]"></v-text-field>
            <v-text-field
                v-model="fZip"
                label="Zip Code"
                :rules="[rules.requiredIfAddress]"></v-text-field>
          </div>

          <v-textarea 
              v-model="fMessageForFamily"
              auto-grow
              counter="250"
              label="Message for the Family"></v-textarea>
          <v-switch 
              v-model="fShowMessageForFamily"
              label="It's okay to share my message on this site!" 
              color="red darken-1"></v-switch>
          <p class="text-xs-center"><strong>Total: {{ totalForAll }}</strong></p>

          <p v-if="errMessage" class="text-xs-center red--text text--darken-1 body-2">{{ errMessage }}</p>

          <v-btn 
              dark block 
              color="red darken-1"
              @click="formSubmit"
              :loading="submitInAction">Submit</v-btn>
          <p class="text-xs-center">
            * If you selected a payment method other than '{{ paymentSelectOptions[0].label }}',
            your bracelet(s) will be shipped after payment is received.
          </p>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      formIsValid: false,
      numOfSliderVal: 0,
      additionalDonationDollars: null,
      paymentSelectOptions: [
        { label: "Cash in Person", requireAddress: false },
        { label: "Check", requireAddress: true },
        { label: "PayPal", requireAddress: true },
        { label: "Venmo", requireAddress: true }
      ],
      totalForNumberOfBracelets: "$0.00 - (0 bracelets selected)",
      totalForAll: "$0.00",
      totalDonation: 0,
      addressInfoIsVisable: false,
      rules: {
        required: value => !!value || 'Required',
        requiredIfAddress: value => (!!value && this.addressInfoIsVisable) || 'Required based on Payment Method',
        onlyNumbers: value => (!value || (value.match(/^[0-9]+$/) != null)) || 'Only digits [0-9] allowed'
      },
      fName: 'a',
      fEmail: 'a',
      fPaymentMethod: '',
      fAddress: '',
      fState: '',
      fCity: '',
      fZip: '',
      fMessageForFamily: '',
      fShowMessageForFamily: false,
      errMessage: false,
      submitInAction: false
    }
  },

  methods: {
    updateTotal: function(){
      //console.log(this.additionalDonationDollars)
      this.totalForNumberOfBracelets = "$"+(this.numOfSliderVal * 5)+".00 - ("+this.numOfSliderVal+" bracelets selected)"

      this.totalDonation = (this.numOfSliderVal * 5) + (this.additionalDonationDollars ? parseInt(this.additionalDonationDollars) : 0)

      this.totalForAll = "$"+this.totalDonation+".00"
    },
    paymentSelectChanged: function(e){
      this.addressInfoIsVisable = (e != this.paymentSelectOptions[0].label)
      //console.log(this.addressInfoIsVisable)
    },
    atLeastOneDonation: function(){
      if (this.numOfSliderVal == 0 && ((this.additionalDonationDollars ? parseInt(this.additionalDonationDollars) : 0) == 0)){
        return 'No donation amount has been provided!'
      }
      return false
    },
    formSubmit: function(){
      const me = this
      if (this.$refs.form.validate()){
        me.errMessage = me.atLeastOneDonation()
        if (me.errMessage){
          return
        }

        me.submitInAction = true

        //console.log('form is valid!')
        axios.post('/letsdothis-api/donation', {
          name: this.fName,
          email: this.fEmail,
          numberOfBracelets: this.numOfSliderVal,
          additionalDonation: (this.additionalDonationDollars ? this.additionalDonationDollars : 0),
          paymentMethod: this.fPaymentMethod,
          address: this.fAddress,
          city: this.fCity,
          state: this.fState,
          zip: this.fZip,
          message: this.fMessageForFamily,
          showMessage: this.fShowMessageForFamily
        })
            .then(response => {
              if (response.data.status == 'ok'){
                me.$router.push({ name: 'showdonation' })
              }
            })
            .catch(err => {
              console.log(err)
            })
            .finally(()=>{
              me.submitInAction = false
            })
      }
    }
  }
}
</script>
