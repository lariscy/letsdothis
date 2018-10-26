<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6>
      <v-card class="elevation-12">
        <v-toolbar dark color="black">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
            <v-text-field prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>

            <v-btn block dark color="red darken-1">Login</v-btn>
            <div class="text-xs-center">OR</div>
            <v-btn block dark color="blue darken-4">
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
  export default {
    data: () => ({
      //
    })
  }
</script>
