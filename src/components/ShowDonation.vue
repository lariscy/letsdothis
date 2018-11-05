<template>
    <div>
        <v-layout row>
            <v-flex>
                <h3 class="display-2 mb-3">Thank you <span class="headline grey--text">{{ donateName }}</span></h3>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex>
                <h3 class="display-2 mb-3"><span class="headline grey--text">for your donation of </span>{{ donateAmount }}</h3>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis omnis incidunt accusamus expedita voluptatibus animi, in veniam sed id, labore repellat aspernatur cum, itaque repellendus odit quos praesentium maiores! Repellendus harum, aliquid quia odit, et, id aspernatur maiores aliquam porro delectus doloremque error modi. Tempora optio minima et consequatur temporibus!
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex>
                <v-btn v-if="showShowAllDonationsBtn" color="red darken-1" block dark>Show All Donations</v-btn>
                <v-btn color="red darken-1" block dark to="/donate">Donate Again</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    data () {
        return {
            showShowAllDonationsBtn: false,
            donateName: '{donateName}',
            donateAmount: '{donateAmount}'
        }
    }
}
</script>
