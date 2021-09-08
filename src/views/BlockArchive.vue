<template>
  <div>
    {{symbolBlockSummary}}
    <v-container>
      <v-data-table
        :headers="headers"
        :items="filteredBlocksByDateWithProfit"
        :loading="dataLoading"
        loading-text="Loading... Please wait"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Archive Blocks</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFormatted"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-toolbar>
        </template>
      </v-data-table>
      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text @click="snack = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BlockArchive",
  data() {
    return {
      dataLoading: true,
      blocks: [],
      response: "",
      search: "",
      snack: false,
      snackColor: "",
      snackText: "",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateFormatted: this.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
      menu1: false,
    };
  },
  mounted() {
    axios.get("http://localhost:8080/api/GetBlockArchives").then((response) => {
      this.blocks = response.data;
      this.dataLoading = false;
    });
  },
  computed: {
    headers() {
      return [
        { text: "Symbol", value: "symbol" },
        { text: "NumShares", value: "numShares" },
        { text: "Ex Buy Price", value: "executedBuyPrice", sortable: false },
        { text: "Ex Sell Price", value: "executedSellPrice", sortable: false },
        {
          text: "Ex Buy Order Id",
          value: "externalBuyOrderId",
          sortable: false,
        },
        {
          text: "Ex Sell Order Id",
          value: "externalSellOrderId",
          sortable: false,
        },
      ];
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    filteredBlocksByDateWithProfit() {
      var filteredBlocks = this.blocks.filter((entry) => {
        var dateFromBlock = new Date(entry.dateCreated)
          .toISOString()
          .substr(0, 10);
        return dateFromBlock === this.date;
      });

      // Get profit for each block here
      filteredBlocks.map(function(obj){
        obj.profit = (obj.numShares * obj.executedSellPrice) - (obj.numShares * obj.executedBuyPrice);
      });
      return filteredBlocks;
    },
    symbolBlockSummary() {
      return Array.from(
        this.filteredBlocksByDateWithProfit.reduce(
          (m, { symbol, profit }) => m.set(symbol, (m.get(symbol) || 0) + profit),
          new Map()
        ),
        ([symbol, profit]) => ({ symbol, profit })
      );
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>