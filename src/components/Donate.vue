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
        <h4 class="display-1" style="font-family: Shadows Into Light !important;">#letsdothis</h4>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex>
        <v-form ref="form" v-model="formIsValid">
          <v-text-field 
              v-model="fName"
              label="Name"
              disabled
              :loading="fNameLoading"
              required
              :rules="[rules.required]"></v-text-field>
          <v-text-field 
              v-model="fEmail"
              label="Email"
              :loading="fEmailLoading"
              :disabled="fEmailDisabled"
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
              @input="updateTotal"
              @change="paymentSelectChanged"></v-slider>
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
              :rules="[rules.required]"
              @change="paymentSelectChanged"></v-select>

          <div v-if="cashInfoIsVisable" class="grey lighten-4 pa-2">
            <p class="text-xs-center mb-0">
              <v-label>- Note -</v-label>
            </p>
            <p class="text-xs-center mb-0">
              Cash in Person is available if you plan to see Kate Ingram or Steven Lariscy in person.
            </p>
          </div>

          <div v-if="checkInfoIsVisable" class="grey lighten-4 pa-2">
            <p class="text-xs-center mb-0">
              <v-label>- Note -</v-label>
            </p>
            <p class="text-xs-center mb-0">
              We will send you an email with the address to mail your check once your order has been reviewed.
            </p>
          </div>

          <div v-if="paypalInfoIsVisable" class="grey lighten-4 pa-2">
            <p class="text-xs-center mb-0">
              <v-label>- Note -</v-label>
            </p>
            <p class="text-xs-center mb-0">
              Payments should be sent to: <a href="https://www.paypal.me/katecingram" target="_blank">katecingram</a>
            </p>
          </div>

          <div v-if="venmoInfoIsVisable" class="grey lighten-4 pa-2">
            <p class="text-xs-center mb-0">
              <v-label>- Note -</v-label>
            </p>
            <p class="text-xs-center mb-0">
              Payments should be sent to: @katecingram
            </p>
          </div>
          
          <div v-if="addressInfoIsVisable" class="grey lighten-4 pa-2">
            <p class="text-xs-center mb-0">
              <v-label>- Shipping Information -</v-label>
            </p>
            <p class="text-xs-center mb-0">
              Shipping information is required to mail your bracelet{{ numOfSliderVal != 1 ? 's': '' }}. It will not be shared on this site.
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
              :counter="maxLengthMessage"
              label="Message for the Family"
              :rules="[rules.noMoreThanMax]"></v-textarea>
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
            your bracelet{{ numOfSliderVal != 1 ? 's': '' }} will be shipped after payment is received.
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
      fNameLoading: true,
      fEmailLoading: true,
      fEmailDisabled: true,
      numOfSliderVal: 0,
      additionalDonationDollars: null,
      paymentSelectOptions: [
        { label: "Cash in Person", requireAddress: false },
        { label: "Check", requireAddress: true },
        { label: "PayPal", requireAddress: true },
        { label: "Venmo", requireAddress: true }
      ],
      maxLengthMessage: 250,
      totalForNumberOfBracelets: "$0.00 - (0 bracelets selected)",
      totalForAll: "$0.00",
      totalDonation: 0,
      cashInfoIsVisable: false,
      checkInfoIsVisable: false,
      paypalInfoIsVisable: false,
      venmoInfoIsVisable: false,
      addressInfoIsVisable: false,
      rules: {
        required: value => !!value || 'Required',
        requiredIfAddress: value => (!!value && this.addressInfoIsVisable) || 'Required based on Payment Method',
        onlyNumbers: value => (!value || (value.match(/^[0-9]+$/) != null)) || 'Only digits [0-9] allowed',
        noMoreThanMax: value => (value.length <= this.maxLengthMessage) || 'Max of '+this.maxLengthMessage+' characters'
      },
      fName: '',
      fEmail: '',
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

  mounted: function(){
    const me = this
    axios.post('/letsdothis-api/visit').catch(err => { console.log(err) })
    axios.get('/letsdothis-api/getuserinfo')
        .then(response => {
          if (response.data.status == 'ok'){
            me.fName = response.data.data.name
            me.fEmail = response.data.data.email

            me.fNameLoading = me.fEmailLoading = me.fEmailDisabled = false
          }
        })
        .catch(err => {
          console.log(err)
        })
  },

  methods: {
    updateTotal: function(){
      this.totalForNumberOfBracelets = "$"+(this.numOfSliderVal * 5)+".00 - ("+this.numOfSliderVal+" bracelet"+(this.numOfSliderVal != 1 ? "s" : "")+" selected)"

      this.totalDonation = (this.numOfSliderVal * 5) + (this.additionalDonationDollars ? parseInt(this.additionalDonationDollars) : 0)

      this.totalForAll = "$"+this.totalDonation+".00"
    },
    paymentSelectChanged: function(){
      if (this.fPaymentMethod){
        this.cashInfoIsVisable = (this.fPaymentMethod == this.paymentSelectOptions[0].label)
        this.checkInfoIsVisable = (this.fPaymentMethod == this.paymentSelectOptions[1].label)
        this.paypalInfoIsVisable = (this.fPaymentMethod == this.paymentSelectOptions[2].label)
        this.venmoInfoIsVisable = (this.fPaymentMethod == this.paymentSelectOptions[3].label)
        this.addressInfoIsVisable = (this.fPaymentMethod != this.paymentSelectOptions[0].label && this.numOfSliderVal > 0)
      }
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
