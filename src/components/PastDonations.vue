<template>
  <div>
    <v-layout row>
      <v-flex>
        <h3 class="display-2 mb-3">Past Donations</h3>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex>
        <v-data-table
            :headers="tableHeaders"
            :items="tableItems"
            hide-actions>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.amount }}</td>
            <td>{{ props.item.date }}</td>
            <td v-if="props.item.message" class="text-xs-center">
              <v-btn dark fab color="red darken-1"><v-icon>pageview</v-icon></v-btn>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableHeaders: [
        { text: 'Name', value: 'name', sortable: false },
        { text: 'Amount', value: 'amount', sortable: false },
        { text: 'Date', value: 'date', sortable: false },
        { text: 'Message', value: 'message', align: 'center', sortable: false },
      ],
      tableItems: [
        { name: 'Steven Lariscy', amount: '$100.00', date: new Date(), message: true },
        { name: 'Kate Ingram', amount: '$100.00', date: new Date(), message: false },
      ]
    }
  }
}
</script>
