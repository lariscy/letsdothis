<template>
  <div>
    <v-layout row>
      <v-flex>
        <h3 class="display-2 mb-3">#letsdothis <span class="headline grey--text">for Carter</span></h3>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae et esse in rerum ut voluptates fugiat iste repellat cum, facilis atque quisquam quia architecto id sapiente magni, porro incidunt vero aliquid inventore sequi ab. Ullam repellat sequi quas ab officia delectus quo in distinctio nemo animi qui labore vitae, exercitationem quis. Suscipit sint obcaecati doloribus eveniet magni porro unde molestiae! Ipsum impedit ad cupiditate mollitia dolores laboriosam quia ratione vitae quisquam, ab dolore dolorum natus tempora? Libero voluptatum, incidunt sunt fugiat suscipit ab repudiandae totam et, odit nihil quos nobis quisquam. Ipsam eligendi soluta iure accusantium, laborum ipsum. Quidem illo suscipit officia aspernatur aut alias, sint perspiciatis ab voluptate consectetur placeat eligendi perferendis quas ipsum repellendus aliquam eaque veniam sed eos incidunt dicta nihil. Quibusdam, ipsam recusandae. Ipsum, incidunt! Amet, fugit soluta tenetur quaerat iure ipsam quasi sequi expedita! Commodi rerum tempora minus, similique minima non, accusamus aliquam, natus praesentium sint doloremque! Soluta accusamus illum expedita inventore animi tempora dolor libero autem quaerat repellendus quas vitae distinctio cum nulla, porro deleniti esse excepturi! Vel impedit excepturi ipsa, temporibus non animi explicabo. Adipisci doloribus nam cupiditate aperiam, voluptate rem velit, ut iste maxime placeat ex deleniti mollitia molestiae voluptatem impedit sunt illo non alias est tempora eligendi asperiores sapiente? Et laborum nisi quis, odio dolores inventore quidem eos optio culpa reiciendis dolore ipsa voluptatibus qui iure aliquid mollitia vero, debitis accusantium vel nobis dolorum. Sunt eum doloremque facilis maiores non impedit ab quidem autem possimus ex, minima omnis repellendus enim harum aut aspernatur voluptatem suscipit, vel aliquid, molestias quis nostrum. Ad at neque molestiae, earum ratione repudiandae nobis quasi id, doloribus in, est modi? Laudantium autem exercitationem sit! Doloribus repellendus deleniti recusandae quam odio! Ipsam possimus laboriosam libero dolor velit ipsum. Laboriosam aliquam eaque natus sapiente similique culpa beatae! Mollitia, accusamus?</p>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex>
        <v-form>
          <v-text-field 
              label="Name"
              disabled></v-text-field>
          <v-text-field 
              label="Email"
              hint="Email is pulled from Facebook if you logged in with Facebook"></v-text-field>
          <v-select 
              :items="numberOfSelectOptions" 
              label="Number of bracelets"></v-select>
          <v-label>Number of bracelets</v-label>
          <v-slider class="mt-4"
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
              :hint="totalForBracelet"></v-slider>
          <v-text-field 
              label="Additional Donation" 
              prefix="$"
              hint="Format 00.00"></v-text-field>
          <v-select
              :items="paymentSelectOptions"
              label="Payment method"></v-select>
          <v-textarea 
              label="Message for the family"></v-textarea>
          <v-switch 
              label="It's okay to share my message on this site!" 
              color="red darken-1"></v-switch>
          <p class="text-xs-center"><strong>total goes here</strong></p>
          <!--
            cash - no need for address
            others - no address needed

            depends on method as to what information is shown
          -->
          <v-btn 
              dark block 
              color="red darken-1">Submit</v-btn>
          <p class="text-xs-center">* payment reminder</p>
        </v-form>
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
      paymentSelectOptions: ["Cash in Person","Check","PayPal","Venmo"],
      totalForBracelet: "$0.00"
    }
  },

  watch: {
    numOfSliderVal: function () {
      this.totalForBracelet = "$"+(this.numOfSliderVal * 5)+".00"
    }
  }
}
</script>
