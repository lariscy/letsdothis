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
        { text: 'Message', value: 'message', align: 'center', sortable: false },
      ],
      tableItems: [],
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
                amount: "$"+((parseInt(donation.numberOfBracelets) * 5) + parseInt(donation.additionalDonation))+".00",
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
