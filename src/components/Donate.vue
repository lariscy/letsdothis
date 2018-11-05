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
            :src="`https://via.placeholder.com/150.png?text=LetsDoThis`"
            max-width="300"
            class="mx-auto"></v-img>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae et esse in rerum ut voluptates fugiat iste repellat cum, facilis atque quisquam quia architecto id sapiente magni, porro incidunt vero aliquid inventore sequi ab. Ullam repellat sequi quas ab officia delectus quo in distinctio nemo animi qui labore vitae, exercitationem quis. Suscipit sint obcaecati doloribus eveniet magni porro unde molestiae! Ipsum impedit ad cupiditate mollitia dolores laboriosam quia ratione vitae quisquam, ab dolore dolorum natus tempora? Libero voluptatum, incidunt sunt fugiat suscipit ab repudiandae totam et, odit nihil quos nobis quisquam. Ipsam eligendi soluta iure accusantium, laborum ipsum. Quidem illo suscipit officia aspernatur aut alias, sint perspiciatis ab voluptate consectetur placeat eligendi perferendis quas ipsum repellendus aliquam eaque veniam sed eos incidunt dicta nihil. Quibusdam, ipsam recusandae. Ipsum, incidunt! Amet, fugit soluta tenetur quaerat iure ipsam quasi sequi expedita! Commodi rerum tempora minus, similique minima non, accusamus aliquam, natus praesentium sint doloremque! Soluta accusamus illum expedita inventore animi tempora dolor libero autem quaerat repellendus quas vitae distinctio cum nulla, porro deleniti esse excepturi! Vel impedit excepturi ipsa, temporibus non animi explicabo. Adipisci doloribus nam cupiditate aperiam, voluptate rem velit, ut iste maxime placeat ex deleniti mollitia molestiae voluptatem impedit sunt illo non alias est tempora eligendi asperiores sapiente? Et laborum nisi quis, odio dolores inventore quidem eos optio culpa reiciendis dolore ipsa voluptatibus qui iure aliquid mollitia vero, debitis accusantium vel nobis dolorum. Sunt eum doloremque facilis maiores non impedit ab quidem autem possimus ex, minima omnis repellendus enim harum aut aspernatur voluptatem suscipit, vel aliquid, molestias quis nostrum. Ad at neque molestiae, earum ratione repudiandae nobis quasi id, doloribus in, est modi? Laudantium autem exercitationem sit! Doloribus repellendus deleniti recusandae quam odio! Ipsam possimus laboriosam libero dolor velit ipsum. Laboriosam aliquam eaque natus sapiente similique culpa beatae! Mollitia, accusamus?</p>
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
          <v-label>Number of Bracelets</v-label>
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
              @click="formSubmit">Submit</v-btn>
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
      errMessage: false
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
      }
    }
  }
}
</script>
