<template>
  <v-app>
    <v-container fluid pa-0>
      <v-layout row child-flex wrap>
        <div>
          <v-toolbar dark color="red darken-1">
            <v-toolbar-title style="font-family: Shadows Into Light;">#letsdothis</v-toolbar-title>
          </v-toolbar>
        </div>
        <div>
          <v-toolbar dark color="black">
            <v-spacer></v-spacer>
            <v-toolbar-title style="font-family: Shadows Into Light;">for Carter</v-toolbar-title>
          </v-toolbar>
        </div>
      </v-layout>
      <v-layout row wrap>
        <v-content>
          <v-container>
            <router-view></router-view>
          </v-container>
        </v-content>
      </v-layout>
    </v-container>
    <v-footer class="pa-3">
      <div>#letsdothis</div>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <v-btn flat
            href="mailto:letsdothisforcarter@gmail.com">letsdothisforcarter@gmail.com</v-btn>
      </div>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      //
    }
  }
}
</script>
