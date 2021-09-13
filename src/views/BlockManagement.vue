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
                      <v-col cols="12" sm="3" md="3">
                        <v-select
                          v-model="editedItem.symbol"
                          :items="symbols"
                          item-text="name"
                          item-value="name"
                          label="Symbol"
                          ref="symbolName"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        <v-text-field
                          v-model="editedItem.initialNumShares"
                          label="Number Of Shares"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        <v-text-field
                          v-model="editedItem.buyPercentage"
                          label="Buy Percentage"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3" md="3">
                        <v-text-field
                          v-model="editedItem.sellPercentage"
                          label="Sell Percentage"
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
                  >Are you sure you want to delete symbol
                  {{ editedItem.name }}?</v-card-title
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
                v-if="!item.blocksCreated"
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
                v-if="item.blocksCreated"
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
                v-if="item.blocksCreated"
                color="info"
                fab
                x-small
                dark
                @click="
                  $router.push({
                    name: 'BlockDetails',
                    params: { symbol: 'CRCT' },
                  })
                "
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-layers</v-icon>
              </v-btn>
            </template>
            <span>Delete Blocks</span>
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
        name: "",
        active: "",
      },
      defaultItem: {
        name: "",
        active: "",
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
        { text: "Actions", value: "actions", sortable: false },
        { text: "Create Blocks", value: "CreateBlocks", align: "center" },
        { text: "Delete Blocks", value: "DeleteBlocks", align: "center" },
        { text: "View Blocks", value: "ViewBlocks", align: "center" },
      ];
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.symbols.indexOf(item);
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
      var symbolName = this.editedItem.symbol;
      var ladderId = this.editedItem.id;
      var ladderIndex = this.editedIndex;
      axios
        .delete("http://localhost:8080/api/DeleteLadder", {
          data: {
            id: ladderId,
            symbol: symbolName,
          },
        })
        .then((response) => {
          this.response = response.data;
          this.ladders.splice(ladderIndex, 1);
          this.displaySnack(
            "success",
            "Successfully deleted ladder for symbol " + symbolName + "."
          );
        })
        .catch((err) => {
          this.displaySnack(
            "error",
            "Error while deleting ladder for symbol " + symbolName + ". " + err
          );
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
      var ladderIndex = this.editedIndex;
      var newLadder = this.editedItem;
      var symbol = this.editedItem.symbol;
      var initialNumShares = this.editedItem.initialNumShares;
      var buyPercentage = this.editedItem.buyPercentage;
      var sellPercentage = this.editedItem.sellPercentage;

      if (this.editedIndex > -1) {
        // edit
        /*         axios
          .post("http://localhost:8080/api/UpdateTradingSymbol", {
            id: this.editedItem.id,
            oldName: this.symbols[symbolIndex].name,
            name: this.editedItem.name,
            active: this.editedItem.active,
          })
          .then((response) => {
            this.response = response.data;
            Object.assign(this.symbols[symbolIndex], newSymbol);
            this.displaySnack(
              "success",
              "Successfully updated symbol " + newSymbol.name + "."
            );
          })
          .catch((err) => {
            this.displaySnack("error", "Error while editing symbol. " + err);
          }); */
      } else {
        // create new
        axios
          .post("http://localhost:8080/api/CreateLadder", {
            symbol: symbol,
            initialNumShares: initialNumShares,
            buyPercentage: buyPercentage,
            sellPercentage: sellPercentage,
          })
          .then((response) => {
            this.response = response.data;
            newLadder.id = this.response.id;
            this.ladders.push(newLadder);
            this.displaySnack(
              "success",
              "Successfully added ladder for symbol " + newLadder.symbol + "."
            );
          })
          .catch((err) => {
            this.displaySnack(
              "error",
              "Error while creating new ladder. " + err
            );
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
      var initialNumShares = item.initialNumShares;
      var buyPercentage = item.buyPercentage;
      var sellPercentage = item.sellPercentage;
      axios
        .post("http://localhost:8080/api/CreateBlocksFromLadder", {
          id: item.id,
          symbol: symbol,
          initialNumShares: initialNumShares,
          buyPercentage: buyPercentage,
          sellPercentage: sellPercentage,
        })
        .then((response) => {
          this.response = response.data;
          this.displaySnack(
            "success",
            "Successfully created blocks for symbol " + symbol + "."
          );
        })
        .catch((err) => {
          this.displaySnack("error", "Error while creating blocks. " + err);
        });
    },
    deleteBlocks(item) {
      this.overlay = true;
      var symbol = item.symbol;

      axios
        .delete("http://localhost:8080/api/DeleteBlocksFromLadder", {
          data: {
            id: item.id,
            symbol: symbol,
          },
        })
        .then((response) => {
          this.response = response.data;
          this.displaySnack(
            "success",
            "Successfully deleted blocks for symbol " + symbol + "."
          );
        })
        .catch((err) => {
          this.displaySnack("error", "Error while deleting blocks. " + err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>