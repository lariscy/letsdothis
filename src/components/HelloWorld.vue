<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 class="mt-5">
        <v-card class="elevation-12">
          <v-toolbar dark color="red">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
              <v-text-field prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
              <v-btn block dark color="black">Login</v-btn>
              <div class="text-xs-center">OR</div>
              <v-btn block dark color="blue darken-4"><v-icon>face</v-icon> Login with Facebook</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      //
    })
  }
</script>

<style>

</style>
