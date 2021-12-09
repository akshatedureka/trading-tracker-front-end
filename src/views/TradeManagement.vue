<template>
  <div>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="tradingData"
        :loading="dataLoading"
        loading-text="Loading... Please wait"
        no-data-text="No symbols or ladders have been created yet."
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Trade Management</v-toolbar-title>
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
            :loading="item.loading"
            :disabled="item.loading"
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
  name: "SymbolMaintenance",
  props: {
    msg: String,
  },
  data() {
    return {
      dataLoading: true,
      overlay: false,
      loading: false,
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
      .get(process.env.VUE_APP_API_ENDPOINT_URL + "/GetTradingData")
      .then((response) => {
        if (response.status !== 204) {
          this.tradingData = response.data;
        }

        this.dataLoading = !this.dataLoading;
      })
      .catch((err) => {
        if (err.response) {
          // Request made and server responded
          this.displaySnack(
            "error",
            "Error while getting trading data. " + err.response.data
          );
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
        }
        this.dataLoading = !this.dataLoading;
      });
  },
  computed: {
    headers() {
      return [
        { text: "Symbol", value: "symbol" },
        { text: "Trading", value: "trading" },
        { text: "Current Qty", value: "currentQuantity" },
        { text: "Open Position Profit", value: "openProfit" },
        { text: "Closed Position Profit", value: "closedProfit" },
        { text: "Condensed Profit", value: "condensedProfit" },
        { text: "Total Profit", value: "totalProfit" },
      ];
    },
  },
  methods: {
    displaySnack(color, text) {
      this.snackColor = color;
      this.snackText = text;
      this.snack = true;
      this.overlay = false;
    },
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
      item.loading = !item.loading;
      this.dataLoading = !this.dataLoading;

      if (item.trading) {
        axios
          .post(process.env.VUE_APP_API_ENDPOINT_URL + "/UpdateTradingSymbol", {
            id: item.symbolId,
            name: item.symbol,
            active: item.active,
            trading: item.trading,
          })
          .then((response) => {
            this.dataLoading = !this.dataLoading;
            item.loading = !item.loading;
            this.updateSymbolResponse = response.data;
            this.displaySnack(
              "success",
              "Successfully activated trading for " + symbol + "."
            );
          })
          .catch((err) => {
            if (err.response) {
              // Request made and server responded
              this.displaySnack(
                "error",
                "Error while activating trading. " + err.response.data
              );
            } else if (err.request) {
              // The request was made but no response was received
              console.log(err.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", err.message);
            }
            this.dataLoading = !this.dataLoading;
            item.loading = !item.loading;
          });
      } else {
        axios
          .post(process.env.VUE_APP_API_ENDPOINT_URL + "/StopTrading", null, {
            params: { symbol },
          })
          .then((response) => {
            this.dataLoading = !this.dataLoading;
            item.loading = !item.loading;
            this.updateSymbolResponse = response.data;
            this.displaySnack(
              "success",
              "Successfully deactivated trading for " + symbol + "."
            );
          })
          .catch((err) => {
            if (err.response) {
              // Request made and server responded
              this.displaySnack(
                "error",
                "Error while deactivating trading. " + err.response.data
              );
            } else if (err.request) {
              // The request was made but no response was received
              console.log(err.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", err.message);
            }
            this.dataLoading = !this.dataLoading;
            item.loading = !item.loading;
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>