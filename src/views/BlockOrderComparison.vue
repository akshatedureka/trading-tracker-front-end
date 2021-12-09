<template>
  <div>
    <v-container>
      <v-row>
        <!--         <v-col>
          <v-data-table
            :headers="headers"
            :items="ladder"
            item-key="index"
            :loading="dataLoading"
            loading-text="Loading... Please wait"
          >
          </v-data-table>
        </v-col> -->
        <v-col>
          <!--           <v-btn elevation="2" color="primary" @click="createInitialBlocks"
            >Populate Blocks</v-btn
          > -->
          <v-card>
            <v-data-table
              :headers="headers"
              :items="blocks"
              item-key="index"
              :item-class="itemRowBackground"
              :loading="dataLoading"
              loading-text="Loading... Please wait"
            >
              <template v-slot:item.buyOrderCreated="{ item }">
                <v-simple-checkbox
                  v-model="item.buyOrderCreated"
                  disabled
                ></v-simple-checkbox>
              </template>
              <template v-slot:item.buyOrderFilled="{ item }">
                <v-simple-checkbox
                  v-model="item.buyOrderFilled"
                  disabled
                ></v-simple-checkbox>
              </template>
              <template v-slot:item.sellOrderCreated="{ item }">
                <v-simple-checkbox
                  v-model="item.sellOrderCreated"
                  disabled
                ></v-simple-checkbox>
              </template>
              <template v-slot:item.sellOrderFilled="{ item }">
                <v-simple-checkbox
                  v-model="item.sellOrderFilled"
                  disabled
                ></v-simple-checkbox>
              </template>
              <!--             <template v-slot:item="{ item }">
              <tr :class="'cyan'">
                <td> {{item.buyOrderCreated}} </td>
              </tr>
               </template> -->
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
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
import store from '@/store';

export default {
  name: "BlockOrderComparison",
  data() {
    return {
      response: "",
      blocks: [],
      dataLoading: true,
      snack: false,
      snackColor: "",
      snackText: "",
    };
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_API_ENDPOINT_URL + "/GetComparisonData")
      .then((response) => {
        this.blocks = response.data;
        this.dataLoading = false;
      })
      .catch((err) => {
        this.displaySnack("error", "Error while getting comparison data. " + err);
      });
  },
  computed: {
    headers() {
      if (store.state.accountType === 1)
      {
        return [
          { text: "Symbol", value: "symbol" },
          { text: "Block Id", value: "blockId" },
          { text: "Buy Order Created", value: "buyOrderCreated" },
          { text: "Buy Order Price", value: "buyOrderPrice" },
          { text: "Buy Order Id", value: "externalBuyOrderId" },
          { text: "Buy Order Filled", value: "buyOrderFilled" },
          { text: "Buy Order Filled Price", value: "buyOrderFilledPrice" },
          { text: "Sell Order Created", value: "sellOrderCreated" },
          { text: "Sell Order Price", value: "sellOrderPrice" },
          { text: "Sell Order Id", value: "externalSellOrderId" }
        ];
      }
      else
      {
        return [
          { text: "Symbol", value: "symbol" },
          { text: "Block Id", value: "blockId" },
          { text: "Buy Order Created", value: "buyOrderCreated" },
          { text: "Buy Order Price", value: "buyOrderPrice" },
          { text: "Buy Order Id", value: "externalBuyOrderId" },
          { text: "Sell Order Created", value: "sellOrderCreated" },
          { text: "Sell Order Price", value: "sellOrderPrice" },
          { text: "Sell Order Id", value: "externalSellOrderId" },
          { text: "Sell Order Filled", value: "sellOrderFilled" },
          { text: "Sell Order Filled Price", value: "sellOrderFilledPrice" }
        ];
      }
    },
  },
  methods: {
    itemRowBackground: function (item) {
      if (item.hasDiscrepancy) {
        return "yellow";
      }
    },
    displaySnack(color, text) {
      this.snackColor = color;
      this.snackText = text;
      this.snack = true;
      this.overlay = false;
    },
    refreshList() {
      this.getActiveBlocks(); // todo: get all active blocks
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>