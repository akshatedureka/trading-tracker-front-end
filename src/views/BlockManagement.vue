<template>
  <div>
    <v-container>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-data-table
        :headers="headers"
        :items="ladders"
        :loading="dataLoading"
        loading-text="Loading... Please wait"
        no-data-text="No ladders have been created yet. Click Create Ladder to create your first ladder."
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Block Management</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Create Ladder
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="4" md="4">
                        <v-select
                          v-model="editedItem.symbol"
                          :items="availableSymbols"
                          item-text="name"
                          item-value="name"
                          label="Symbol"
                          ref="symbolName"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.initialNumShares"
                          label="Number Of Shares"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.buyPercentage"
                          label="Buy Percentage"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.sellPercentage"
                          label="Sell Percentage"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.stopLossPercentage"
                          label="Stop Loss Percentage"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="650px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete ladder
                  {{ editedItem.symbol }}?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:item.CreateBlocks="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="item.blocksCreated"
                color="success"
                fab
                x-small
                dark
                @click="createBlocks(item)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-layers-plus</v-icon>
              </v-btn>
            </template>
            <span>Create Blocks</span>
          </v-tooltip>
        </template>
        <template v-slot:item.DeleteBlocks="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="!item.blocksCreated"
                color="error"
                fab
                x-small
                dark
                @click="deleteBlocks(item)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-layers-minus</v-icon>
              </v-btn>
            </template>
            <span>Delete Blocks</span>
          </v-tooltip>
        </template>
        <template v-slot:item.ViewBlocks="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="!item.blocksCreated"
                color="info"
                fab
                x-small
                dark
                @click="
                  $router.push({
                    name: 'BlockDetails',
                    params: { symbol: item.symbol },
                  })
                "
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-layers</v-icon>
              </v-btn>
            </template>
            <span>View Blocks</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <!-- <v-btn color="primary" @click="initialize"> Reset </v-btn> -->
        </template>
      </v-data-table>
      <v-snackbar v-model="snack" :timeout="8000" :color="snackColor">
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
  name: "BlockManagement",
  data() {
    return {
      dataLoading: true,
      overlay: false,
      symbols: [],
      ladders: [],
      response: "",
      search: "",
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        symbol: "",
        initialNumShares: "",
        buyPercentage: "",
        sellPercentage: "",
        stopLossPercentage: "",
      },
      defaultItem: {
        symbol: "",
        initialNumShares: "",
        buyPercentage: "",
        sellPercentage: "",
        stopLossPercentage: "",
      },
      snack: false,
      snackColor: "",
      snackText: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/GetTradingSymbols")
      .then((response) => {
        this.symbols = response.data;
        this.dataLoading = false;
      })
      .catch((err) => {
        this.displaySnack("error", "Error while getting symbols. " + err);
      });
    axios
      .get("http://localhost:8080/api/GetLadders")
      .then((response) => {
        if (response.data.length > 0) {
          this.ladders = response.data;
        }
        this.dataLoading = false;
      })
      .catch((err) => {
        this.displaySnack("error", "Error while getting ladders. " + err);
      });
  },
  watch: {
    dialog(val) {
      val || this.close();
      if (this.editedIndex < 0) {
        this.editedItem.active = true; // default active to true for new symbol creation dialog
        if (val) {
          setTimeout(() => {
            this.$refs.symbolName.focus();
          });
        }
      }
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
    headers() {
      return [
        { text: "Symbol", value: "symbol" },
        { text: "Initial Num Shares", value: "initialNumShares" },
        { text: "Buy Percentage", value: "buyPercentage" },
        { text: "Sell Percentage", value: "sellPercentage" },
        { text: "Stop Loss Percentage", value: "stopLossPercentage" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "Create Blocks", value: "CreateBlocks", align: "center" },
        { text: "Delete Blocks", value: "DeleteBlocks", align: "center" },
        { text: "View Blocks", value: "ViewBlocks", align: "center" },
      ];
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Ladder" : "Edit Ladder";
    },
    availableSymbols() {
      return this.symbols.filter(
        (ar) => !this.ladders.find((rm) => rm.symbol === ar.name)
      );
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.ladders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.ladders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.overlay = true;
      var symbol = this.editedItem.symbol;
      axios
        .delete("http://localhost:8080/api/DeleteLadder", {
          params: { symbol },
        })
        .then((response) => {
          this.ladders = response.data.ladders;
          this.displaySnack(
            "success",
            "Successfully deleted ladder for symbol " + symbol + "."
          );
        })
        .catch((err) => {
          if (err.response) {
            // Request made and server responded
            this.displaySnack(
              "error",
              "Error while deleting ladder. " + err.response.data
            );
          } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", err.message);
          }
        });
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      this.overlay = true;
      var ladderSymbol = this.editedItem.symbol;
      if (this.editedIndex > -1) {
        // edit
        axios
          .post("http://localhost:8080/api/UpdateLadder", {
            id: this.editedItem.id,
            symbol: ladderSymbol,
            initialNumShares: this.editedItem.initialNumShares,
            buyPercentage: this.editedItem.buyPercentage,
            sellPercentage: this.editedItem.sellPercentage,
            stopLossPercentage: this.editedItem.stopLossPercentage,
          })
          .then((response) => {
            var ladder = response.data;
            this.ladders = response.data.ladders;
            this.displaySnack(
              "success",
              "Successfully updated ladder for symbol " + ladderSymbol + "."
            );
          })
          .catch((err) => {
            if (err.response) {
              // Request made and server responded
              this.displaySnack(
                "error",
                "Error while editing new ladder. " + err.response.data
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
        // create new
        axios
          .post("http://localhost:8080/api/CreateLadder", {
            symbol: ladderSymbol,
            initialNumShares: this.editedItem.initialNumShares,
            buyPercentage: this.editedItem.buyPercentage,
            sellPercentage: this.editedItem.sellPercentage,
            stopLossPercentage: this.editedItem.stopLossPercentage,
          })
          .then((response) => {
            this.ladders = response.data.ladders;
            this.displaySnack(
              "success",
              "Successfully added ladder for symbol " + ladderSymbol + "."
            );
          })
          .catch((err) => {
            if (err.response) {
              // Request made and server responded
              this.displaySnack(
                "error",
                "Error while creating new ladder. " + err.response.data
              );
            } else if (err.request) {
              // The request was made but no response was received
              console.log(err.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", err.message);
            }
          });
      }
      this.close();
    },
    displaySnack(color, text) {
      this.snackColor = color;
      this.snackText = text;
      this.snack = true;
      this.overlay = false;
    },
    createBlocks(item) {
      this.overlay = true;
      var symbol = item.symbol;
      var ladderIndex = this.ladders.indexOf(item);

      axios
        .post("http://localhost:8080/api/CreateBlocksFromLadder", {
          id: item.id,
          symbol: symbol,
          initialNumShares: item.initialNumShares,
          buyPercentage: item.buyPercentage,
          sellPercentage: item.sellPercentage,
          stopLossPercentage: item.stopLossPercentage,
        })
        .then((response) => {
          this.ladders = response.data.ladders;
          this.displaySnack(
            "success",
            "Successfully created blocks for symbol " + symbol + "."
          );
        })
        .catch((err) => {
          if (err.response) {
            // Request made and server responded
            //console.log(err.response.data);
            //console.log(err.response.status);
            //console.log(err.response.headers);
            this.displaySnack(
              "error",
              "Error while creating blocks: " + err.response.data
            );
          } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", err.message);
          }
        });
    },
    deleteBlocks(item) {
      this.overlay = true;
      var symbol = item.symbol;
      var ladderIndex = this.ladders.indexOf(item);

      axios
        .delete("http://localhost:8080/api/DeleteBlocksFromLadder", {
          data: {
            id: item.id,
            symbol: symbol,
          },
        })
        .then((response) => {
          this.ladders = response.data.ladders;
          this.displaySnack(
            "success",
            "Successfully deleted blocks for symbol " + symbol + "."
          );
        })
        .catch((err) => {
          if (err.response) {
            // Request made and server responded
            //console.log(err.response.data);
            //console.log(err.response.status);
            //console.log(err.response.headers);
            this.displaySnack(
              "error",
              "Error while deleting blocks: " + err.response.data
            );
          } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", err.message);
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>