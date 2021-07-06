<template>
  <div>
    <v-container class="grey lighten-5 mb-6">
      <v-row no-gutters>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="ladder"
            item-key="index"
            :loading="dataLoading"
            loading-text="Loading... Please wait"
          >
          </v-data-table>
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
      ladder: [],
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
        this.ladder = response.data.ladderPrices;
        this.dataLoading = false;
      });
  },
  computed: {
    headers() {
      return [
        { text: "Buy Price", value: "buyPrice" },
        { text: "Sell Price", value: "sellPrice" },
        { text: "Populate Block", value: "PopulateBlock" },
      ];
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>