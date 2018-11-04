<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6>
      <v-card class="elevation-12">
        <v-toolbar dark color="black">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <div v-if="showNormalLogin">
              <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
              <v-text-field prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>

              <v-btn block dark color="red darken-1">Login</v-btn>
              <div class="text-xs-center">OR</div>
            </div>
            <v-btn block dark color="blue darken-4" @click="loginWithFacebook">
              <v-icon left>fab fa-facebook</v-icon> 
              Login with Facebook
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      showNormalLogin: false
    }
  },

  mounted: function(){
    window.fbAsyncInit = function() {
      FB.init({
        appId: '250860632207383',
        autoLogAppEvents: true,
        status: true,
        xfbml: true,
        cookie: true,
        version: 'v3.2'
      });

      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          this.$router.push({ name: 'donate' })
        }
      })
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },

  methods: {
    loginWithFacebook: function(){
      const me = this
      FB.login(function(response) {
        if (response.authResponse) {
          //console.log(response)
          axios.post('/letsdothis-api/fblogin')
              .then((axResponse) => {
                //console.log(axResponse)
                if (axResponse.data.status == 'ok'){
                  me.$router.push({ name: 'donate' })
                }
              })
              .catch((err) => {
                console.log(err)
              })
          // Now you can redirect the user or do an AJAX request to
          // a PHP script me grabs the signed request from the cookie.
        } else {
          alert('User cancelled login or did not fully authorize.');
        }
      }, {scope: 'email'});
      return false;
    }
  }
}
</script>
