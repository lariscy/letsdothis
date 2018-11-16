<template>
    <div>
        <v-dialog
                v-model="showLoadingDialog"
                hide-overlay
                persistent
                max-width="300">
            <v-card color="red darken-1" dark>
                <v-card-text>
                    Loading information...
                    <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-layout row>
            <v-flex>
                <h3 class="display-2 mb-3">Thank you <span class="headline grey--text">{{ donateName }}</span></h3>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex>
                <h3 class="display-2 mb-3"><span class="headline grey--text">for your</span> {{ donateAmount }} <span class="headline grey--text">donation</span></h3>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex v-if="showFacebookProfilePicture">
                <p class="text-xs-center">
                    <v-avatar size="150" class="elevation-5">
                        <v-img :src="fbProfilePicture"></v-img>
                    </v-avatar>
                </p>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex>
                We just want to thank you for you donation!
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex>
                <v-btn v-if="showShowAllDonationsBtn" color="red darken-1" block dark @click="gotoPastDonations">Show All Donations</v-btn>
                <v-btn color="red darken-1" block dark to="/donate">Donate Again</v-btn>
                <v-btn color="black" block dark @click="doLogout">Logout</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex>
                <p class="text-xs-center">
                    You will receive a confirmation email from 
                    <a href="mailto:letdothisforcarter@gmail.com">letdothisforcarter@gmail.com</a> 
                    once your order has been reviewed.
                </p>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            showLoadingDialog: true,
            showShowAllDonationsBtn: true,
            showFacebookProfilePicture: false,
            fbProfilePicture: 'https://via.placeholder.com/150C',
            donateName: '',
            donateAmount: ''
        }
    },

    mounted: function(){
        const me = this
        axios.get('/letsdothis-api/donation/last')
                .then(response => {
                    if (response.data.status == 'ok'){
                        const numberOfBracelets = parseInt(response.data.data.numberOfBracelets)
                        const additionalDonation = parseInt(response.data.data.additionalDonation)

                        me.donateName = response.data.data.name
                        me.donateAmount = "$"+((numberOfBracelets * 5) + additionalDonation)+".00"

                        me.showLoadingDialog = false
                    } else {
                        me.$router.push({ name: 'donate' })
                    }
                })
                .catch(err => {
                    me.$router.push({ name: 'donate' })
                })
        axios.get('/letsdothis-api/fbUserPicture')
                .then(response => {
                    me.fbProfilePicture = response.data.data.url
                })
    },

    methods: {
        doLogout: function(){
            const me = this
            axios.get('/letsdothis-api/killsession')
                    .then(response => { console.log(response) })
                    .catch(err => console.log(err))
                    .finally(() => {
                        me.$router.push({ name: 'login' })
                    })
        },
        gotoPastDonations: function(){
            this.$router.push({ name: 'pastdonations' })
        }
    }
}
</script>
