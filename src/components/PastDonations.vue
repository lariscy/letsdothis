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
            :pagination.sync="pagination"
            :loading="tableLoading">
          <template slot="items" slot-scope="props">
            <tr>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.amount }}</td>
              <td>{{ props.item.date }}</td>
              <td v-if="props.item.message" class="text-xs-center">
                <v-btn dark fab small 
                    @click="props.expanded = !props.expanded"
                    color="red darken-1"><v-icon>pageview</v-icon>
                </v-btn>
              </td>
              <td v-else></td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-card flat style="border-left: 1px solid red; border-right: 1px solid red;">
              <v-card-title primary-title>
                <h3 class="headline mb-0">Message</h3>
              </v-card-title>
              <v-card-text>{{ props.item.message }}</v-card-text>
            </v-card>
          </template>
          <template slot="no-data">
            There was a problem loading the past donations
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      tableLoading: "red darken-1",
      tableHeaders: [
        { text: 'Name', value: 'name', sortable: false },
        { text: 'Amount', value: 'amount', sortable: false },
        { text: 'Date', value: 'date', sortable: false },
        { text: 'Message', value: 'message', align: 'center', sortable: false },
      ],
      tableItems: [
        { id: 1, name: 'Steven Lariscy', amount: '$100.00', date: '10/27/2018', message: "hey buddy" },
        { id: 2, name: 'Kate Ingram', amount: '$100.00', date: '10/26/2018', message: false },
        { id: 3, name: 'Steven Lariscy', amount: '$100.00', date: '10/26/2018', message: "hiya" },
        { id: 4, name: 'Kate Ingram', amount: '$100.00', date: '10/26/2018', message: "here is a message" },
        { id: 5, name: 'Steven Lariscy', amount: '$100.00', date: '10/26/2018', message: false },
        { id: 6, name: 'Kate Ingram', amount: '$100.00', date: '10/26/2018', message: false },
        { id: 7, name: 'Steven Lariscy', amount: '$150.00', date: '10/28/2018', message: false },
        { id: 8, name: 'Kate Ingram', amount: '$100.00', date: '10/26/2018', message: false },
        { id: 9, name: 'Steven Lariscy', amount: '$100.00', date: '10/26/2018', message: false },
        { id: 10, name: 'Kate Ingram', amount: '$100.00', date: '10/26/2018', message: false },
        { id: 11, name: 'Steven Lariscy', amount: '$100.00', date: '10/26/2018', message: "message for you" },
        { id: 12, name: 'Kate Ingram', amount: '$100.00', date: '10/26/2018', message: "another message for you" },
        { id: 13, name: 'Steven Lariscy', amount: '$100.00', date: '10/26/2018', message: false },
        { id: 14, name: 'Kate Ingram', amount: '$100.00', date: '10/26/2018', message: false },
      ],
      pagination: {
        //sortBy: 'date',
        rowsPerPage: 10
      }
    }
  },

  mounted: function(){
    const me = this
    axios.get('/letsdothis-api/donation/past')
        .then(response => {
          if (response.data.status == 'ok'){
            me.tableItems = []
            response.data.data.forEach(donation => {
              me.tableItems.push({
                id: donation.id,
                name: donation.name,
                amount: "$"+((donation.numberOfBracelets * 5) + donation.additionalDonation)+".00",
                date: donation.date,
                message: donation.message
              })
            })
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          me.tableLoading = false
        })
  }
}
</script>
