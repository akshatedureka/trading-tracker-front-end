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
        <v-col>
          <!--           <v-btn elevation="2" color="primary" @click="createInitialBlocks"
            >Populate Blocks</v-btn
          > -->
          <v-data-table
            :headers="headersBlocks"
            :items="blocks"
            item-key="index"
            :item-class="itemRowBackground"
            :loading="dataLoading"
            loading-text="Loading... Please wait"
          >
            <template v-slot:item.buyOrderCreated="{ item }">
              <v-simple-checkbox
                v-model="item.buyOrderCreated"
                @click="buyOrderCreated(item.blockId, item.buyOrderCreated)"
              ></v-simple-checkbox>
            </template>
            <template v-slot:item.executedBuyPrice="props">
              <v-edit-dialog
                :return-value.sync="props.item.executedBuyPrice"
                large
                persistent
                @save="
                  buyOrderExecuted(
                    props.item.blockId,
                    props.item.executedBuyPrice
                  )
                "
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                <div>{{ props.item.executedBuyPrice }}</div>
                <template v-slot:input>
                  <div class="mt-4 text-h6">Update Executed Buy Price</div>
                  <v-text-field
                    v-model="props.item.executedBuyPrice"
                    :rules="[max25chars]"
                    label="Edit"
                    single-line
                    counter
                    autofocus
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:item.buyOrderExecuted="{ item }">
              <v-simple-checkbox
                v-model="item.buyOrderExecuted"
              ></v-simple-checkbox>
            </template>
            <template v-slot:item.sellOrderCreated="{ item }">
              <v-simple-checkbox
                v-model="item.sellOrderCreated"
                @click="sellOrderCreated(item.blockId, item.sellOrderCreated)"
              ></v-simple-checkbox>
            </template>
            <template v-slot:item.sellOrderExecuted="{ item }">
              <v-simple-checkbox
                v-model="item.sellOrderExecuted"
              ></v-simple-checkbox>
            </template>
            <!--             <template v-slot:item="{ item }">
              <tr :class="'cyan'">
                <td> {{item.buyOrderCreated}} </td>
              </tr>
               </template> -->
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
  name: "OrderBlocks",
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
    this.getActiveBlocks();
  },
  computed: {
    headers() {
      return [
        { text: "Buy Price", value: "buyPrice" },
        { text: "Sell Price", value: "sellPrice" },
        { text: "Populate Block", value: "PopulateBlock" },
      ];
    },
    headersBlocks() {
      return [
        { text: "Num Shares", value: "numShares" },
        { text: "Buy Order", value: "buyOrderCreated" },
        { text: "Buy Order Price", value: "buyOrderPrice" },
        { text: "Buy Order Executed", value: "buyOrderExecuted" },
        { text: "Executed Buy Price", value: "executedBuyPrice" },
        { text: "Sell Order", value: "sellOrderCreated" },
        { text: "Sell Order Price", value: "sellOrderPrice" },
        { text: "Sell Order Executed", value: "sellOrderExecuted" },
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
    getActiveBlocks() {
      axios
        .get("http://localhost:8080/api/blocks/getactiveblocks")
        .then((response) => {
          if (!response.status.HasError) {
            this.blocks = response.data;
          } else {
            alert("test");
          }
        });
    },
    buyOrderCreated(blockId, buyOrderCreated) {
      // Implement PUT on block backend for buy order created (pass block id, and buy price) use popup to ask for actual buy price
      axios
        .put(
          "http://localhost:8080/api/blocks/UpdateBuyOrderCreated/" +
            blockId +
            "/" +
            buyOrderCreated
        )
        .then((response) => {
          //this.saveCommentProgress = false;
          if (response.status === 204) {
            this.snackColor = "info";
            this.snackText = "Successfully updated block.";
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
          this.snackText = "Error while updating block. " + err;
          this.snack = true;
        });
    },
    buyOrderExecuted(blockId, executedBuyPrice) {
      // Implement PUT on block backend for buy order created (pass block id, and buy price) use popup to ask for actual buy price
      axios
        .put(
          "http://localhost:8080/api/blocks/UpdateBuyOrderExecutedAndPrice/" +
            blockId +
            "/" +
            executedBuyPrice
        )
        .then((response) => {
          //this.saveCommentProgress = false;
          if (response.status === 200) {
            this.refreshList();
            this.snackColor = "info";
            this.snackText = "Successfully updated block.";
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
    sellOrderCreated(blockId, sellOrderCreated) {
      axios
        .put(
          "http://localhost:8080/api/blocks/UpdateSellOrderCreated/" +
            blockId +
            "/" +
            sellOrderCreated
        )
        .then((response) => {
          //this.saveCommentProgress = false;
          if (response.status === 204) {
            this.snackColor = "info";
            this.snackText = "Successfully updated block.";
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
          this.snackText = "Error while updating block. " + err;
          this.snack = true;
        });
    },
    itemRowBackground: function (item) {
      if (item.sellOrderCreated) {
        return "red";
      } else if (item.buyOrderExecuted) {
        return "green";
      } else if (item.buyOrderCreated) {
        return "blue";
      }
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