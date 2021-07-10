<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col>
          <v-form class="mr-5">
            <v-card class="pa-5">
              <v-card-title> Inputs </v-card-title>
              <v-text-field label="Starting price" v-model="newStartPrice">
              </v-text-field>
              <v-text-field label="Number of blocks" v-model="numBlocks">
              </v-text-field>
              <v-text-field label="Buy percentage" v-model="buyPercentage">
              </v-text-field>
              <v-text-field label="Sell percentage" v-model="sellPercentage">
              </v-text-field>
              <v-btn @click="saveLadder" color=primary>Save Ladder</v-btn>
            </v-card>
          </v-form>
        </v-col>
        <!--         <v-col>
          <v-card>
            <v-card-title> Current Ladder </v-card-title>
            <v-data-table
              :headers="headersCurrent"
              :items="ladderCurrent"
              item-key="index"
              :loading="dataLoading"
              loading-text="Loading... Please wait"
            >
            </v-data-table>
          </v-card>
        </v-col> -->
        <v-col :cols=1>
          <v-divider class="pl-15" vertical></v-divider>
        </v-col>
        <v-col>
          <v-card class="pa-5">
            <v-card-title> New Ladder </v-card-title>
            <v-data-table
              :headers="headersNew"
              :items="ladderNew"
              item-key="index"
              :sort-by="['buyPrice']"
              :loading="dataLoading"
              loading-text="Loading... Please wait"
            >
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

export default {
  name: "PriceLadder",
  data() {
    return {
      response: "",
      ladderCurrent: [],
      blockArray: [],
      newStartPrice: 0.0,
      numBlocks: 10,
      buyPercentage: 0.0,
      sellPercentage: 0.0,
      blocks: [],
      dataLoading: true,
      snack: false,
      snackColor: "",
      snackText: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/ladders/getactiveladder")
      .then((response) => {
        this.ladderCurrent = response.data.ladderPrices;
        this.dataLoading = false;
      });
  },
  computed: {
    headersCurrent() {
      return [
        { text: "Buy Price", value: "buyPrice" },
        { text: "Sell Price", value: "sellPrice" },
      ];
    },
    headersNew() {
      return [
        { text: "Buy Price", value: "buyPrice" },
        { text: "Sell Price", value: "sellPrice" },
      ];
    },
    ladderNew() {
      var blockArray = [];
      var buyPrice = 0.0;
      var sellPrice = 0.0;
      var offset = 1;

      if(this.numBlocks % 2) {
        offset = 0;
      }

      // Calculate range up
      for (let i = 0; i < this.numBlocks / 2; i++) {
        buyPrice = parseFloat(this.newStartPrice) + i * this.buyPercentage;
        sellPrice = buyPrice + buyPrice * (this.sellPercentage / 100);
        var ladderItemUp = {
          buyPrice: buyPrice.toFixed(2),
          sellPrice: sellPrice.toFixed(2),
        };
        blockArray.push(ladderItemUp);
      }

      // Calulate range down
      for (let i = 1; i < (this.numBlocks / 2) + offset; i++) {
        buyPrice = parseFloat(this.newStartPrice) - i * this.buyPercentage;
        sellPrice = buyPrice + buyPrice * (this.sellPercentage / 100);
        var ladderItemDown = {
          buyPrice: buyPrice.toFixed(2),
          sellPrice: sellPrice.toFixed(2),
        };
        blockArray.push(ladderItemDown);
      }

      return blockArray;
    },
  },
  methods: {
    createInitialBlocks() {
      //this.saveCommentProgress = true;
      axios
        .post(
          "http://localhost:8080/api/blocks/createinitialblocksbyactiveladder"
        )
        .then((response) => {
          //this.saveCommentProgress = false;
          if (!response.status.HasError) {
            this.blocks = response.data;
            this.snackColor = "info";
            this.snackText = "Block population successful.";
          } else {
            /*             item.PalletComment = this.oldComment;
            this.snackColor = "error";
            this.snackText =
              "Error while saving comment. " + response.data.Error; */
          }
          this.snack = true;
        })
        .catch((err) => {
          //this.saveCommentProgress = false;
          //item.PalletComment = this.oldComment;
          this.snackColor = "error";
          this.snackText = "Error while populating blocks. " + err;
          this.snack = true;
        });
    },
    saveLader() {

    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>