<template>
  <div>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="tradingData"
        :loading="dataLoading"
        loading-text="Loading... Please wait"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Trade Management - Day</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.symbol="{ item }">
          <v-chip :color="getColor(item.totalProfit)" dark>
            {{ item.symbol }}
          </v-chip>
        </template>
        <template v-slot:item.trading="{ item }">
          <v-switch
            v-model="item.trading"
            inset
            :label="getSwitchLabel(item.trading)"
            @click="switchTrading(item)"
          ></v-switch>
        </template>
        <template v-slot:no-data>
          <!-- <v-btn color="primary" @click="initialize"> Reset </v-btn> -->
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
  name: "TradeManagementDay",
  props: {
    msg: String,
  },
  data() {
    return {
      dataLoading: true,
      tradingData: [],
      response: "",
      switchTradeResponse: "",
      search: "",
      snack: false,
      snackColor: "",
      snackText: "",
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/GetTradingDataDay")
      .then((response) => {
        this.tradingData = response.data;
        this.dataLoading = false;
      });
  },
  computed: {
    headers() {
      return [
        { text: "Symbol", value: "symbol" },
        { text: "Trading", value: "trading" },
        { text: "Current Qty", value: "currentQuantity" },
        { text: "Open Position Profit", value: "currentProfit" },
        { text: "Closed Position Profit", value: "archiveProfit" },
        { text: "Total Day Profit", value: "totalProfit" },
      ];
    },
  },
  methods: {
    getColor(profit) {
      if (profit === 0) return "blue";
      else if (profit > 0) return "green";
      else return "red";
    },
    getSwitchLabel(trading) {
      if (trading) return "On";
      else return "Off";
    },
    switchTrading(item) {
      var symbol = item.symbol;
      if (item.trading) {
        axios
          .post("http://localhost:8080/api/UpdateTradingStatus", {
            id: item.symbolId,
            name: item.symbol,
            trading: item.trading,
          })
          .then((response) => (this.updateSymbolResponse = response.data))
          .catch((err) => {
            if (err.response) {
              // Request made and server responded
              this.displaySnack(
                "error",
                "Error while updating symbol. " + err.response.data
              );
            } else if (err.request) {
              // The request was made but no response was received
              console.log(err.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", err.message);
            }
          });
      } else {
/*         axios
          .post("http://localhost:8080/api/CloseOpenPosition", null, {
            params: { symbol },
          })
          .then((response) => {
            this.switchTradeResponse = response.data; */
            axios
              .post("http://localhost:8080/api/UpdateTradingStatus", {
                id: item.symbolId,
                name: item.symbol,
                trading: item.trading,
              })
              .then((response) => (this.updateSymbolResponse = response.data))
              .catch((err) => {
                if (err.response) {
                  // Request made and server responded
                  this.displaySnack(
                    "error",
                    "Error while updating symbol. " + err.response.data
                  );
                } else if (err.request) {
                  // The request was made but no response was received
                  console.log(err.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", err.message);
                }
              });
/*           })
          .catch((err) => {
            if (err.response) {
              // Request made and server responded
              this.displaySnack(
                "error",
                "Error while closing orders and positions. " + err.response.data
              );
            } else if (err.request) {
              // The request was made but no response was received
              console.log(err.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", err.message);
            }
          }); */
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>