<template>
  <div>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="symbols"
        :loading="dataLoading"
        loading-text="Loading... Please wait"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Trade Management</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.name="{ item }">
          <v-chip :color="getColor(item.totalProfit)" dark>
            {{ item.name }}
          </v-chip>
        </template>
        <template v-slot:item.trading="{ item }">
          <v-switch
            v-model="item.trading"
            inset
            :label="`${item.trading.toString()}`"
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
      symbols: [],
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
    axios.get("http://localhost:8080/api/GetTradingData").then((response) => {
      this.symbols = response.data;
      this.dataLoading = false;
    });
  },
  computed: {
    headers() {
      return [
        { text: "Name", value: "name" },
        { text: "Trading", value: "trading", sortable: false },
        { text: "Current Qty", value: "currentQuantity", sortable: false },
        {
          text: "Open Position Profit",
          value: "currentProfit",
          sortable: false,
        },
        {
          text: "Closed Position Profit",
          value: "archiveProfit",
          sortable: false,
        },
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
    switchTrading(item) {
      if (item.trading) {
        var symbol = item.name;
        axios
          .post("http://localhost:8080/api/CreateBlocksFromSymbol", null, {
            params: { symbol },
          })
          .then((response) => {
            this.switchTradeResponse = response.data;
            axios
              .post(
                "http://localhost:8080/api/CreateInitialBuyOrdersFromSymbol",
                null,
                {
                  params: { symbol },
                }
              )
              .then((response) => {
                this.switchTradeResponse = response.data;
                axios
                  .post("http://localhost:8080/api/UpdateTradingSymbol", {
                    id: item.id,
                    name: item.name,
                    active: item.active,
                    trading: item.trading,
                  })
                  .then(
                    (response) => (this.updateSymbolResponse = response.data)
                  )
                  .catch((err) => {
                    this.snackColor = "error";
                    this.snackText = "Error while editing symbol. " + err;
                    this.snack = true;
                  });
              })
              .catch((err) => {
                this.snackColor = "error";
                this.snackText =
                  "Error while creating initial buy orders for symbol. " + err;
                this.snack = true;
              });
          })
          .catch((err) => {
            this.snackColor = "error";
            this.snackText =
              "Error while creating creating blocks for symbol. " + err;
            this.snack = true;
          });
      } else {
        axios
          .post("http://localhost:5860/api/CloseOpenPosition", null, {
            params: { symbol },
          })
          .then((response) => {
            this.addSymbolResponse = response.data;
            axios
              .post("http://localhost:8080/api/UpdateTradingSymbol", {
                id: item.id,
                name: item.name,
                active: item.active,
                trading: item.trading,
              })
              .then((response) => (this.updateSymbolResponse = response.data))
              .catch((err) => {
                this.snackColor = "error";
                this.snackText = "Error while editing symbol. " + err;
                this.snack = true;
              });
          })
          .catch((err) => {
            this.snackColor = "error";
            this.snackText = "Error while closing open position. " + err;
            this.snack = true;
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>