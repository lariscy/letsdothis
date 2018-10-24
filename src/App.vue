<template>
  <v-app>
    <v-toolbar app dark color="red">
      <v-toolbar-title class="headline">
        <span>#letsdothis</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="mr-2">for Cater</span>
    </v-toolbar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
