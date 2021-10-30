<template>
  <div>
    <v-container>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-data-table
        :headers="headers"
        :items="symbols"
        :loading="dataLoading"
        loading-text="Loading... Please wait"
        no-data-text="No symbols have been added yet. Click Add Symbol to add your first symbol."
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Symbol Management</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Add Symbol
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Name"
                          ref="symbolName"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-checkbox
                          v-model="editedItem.active"
                          label="Active"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.numShares"
                          label="Number of Shares"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.takeProfitOffset"
                          label="Take Profit Offset"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.stopLossOffset"
                          label="Stop Loss Offset"
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
        <template v-slot:item.active="{ item }">
          <v-simple-checkbox v-model="item.active" disabled></v-simple-checkbox>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
  name: "SymbolManagement",
  data() {
    return {
      dataLoading: true,
      overlay: false,
      symbols: [],
      response: "",
      search: "",
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        active: "",
        numShares: "",
        takeProfitOffset: "",
        stopLossOffset: "",
      },
      defaultItem: {
        name: "",
        active: "",
        numShares: "",
        takeProfitOffset: "",
        stopLossOffset: "",
      },
      snack: false,
      snackColor: "",
      snackText: "",
    };
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_API_ENDPOINT_URL + "/GetTradingSymbolsDay")
      .then((response) => {
        this.symbols = response.data;
        this.dataLoading = false;
      })
      .catch((err) => {
        if (err.response) {
          // Request made and server responded
          this.displaySnack(
            "error",
            "Error while getting symbols. " + err.response.data
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
        { text: "Name", value: "name" },
        { text: "Active", value: "active" },
        { text: "Number of Shares", value: "numShares" },
        { text: "TakeProfitOffset", value: "takeProfitOffset" },
        { text: "StopLossOffset", value: "stopLossOffset" },
        { text: "Actions", value: "actions", sortable: false },
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
      this.editedIndex = this.symbols.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.overlay = true;
      var symbol = this.editedItem.name;
      axios
        .delete("http://localhost:8080/api/DeleteTradingSymbolDay", {
          params: { symbol },
        })
        .then((response) => {
          this.response = response.data;
          this.symbols = response.data.symbols;
          this.displaySnack(
            "success",
            "Successfully deleted symbol " + symbol + "."
          );
        })
        .catch((err) => {
          if (err.response) {
            // Request made and server responded
            this.displaySnack(
              "error",
              "Error while deleting symbol " + err.response.data
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
      var symbolIndex = this.editedIndex;
      var newSymbol = this.editedItem;
      var symbol = this.editedItem.name;
      if (this.editedIndex > -1) {
        // edit
        axios
          .post("http://localhost:8080/api/UpdateTradingSymbolDay", {
            id: this.editedItem.id,
            active: this.editedItem.active,
            name: this.editedItem.name,
            numShares: this.editedItem.numShares,
            takeProfitOffset: this.editedItem.takeProfitOffset,
            stopLossOffset: this.editedItem.stopLossOffset,
          })
          .then((response) => {
            this.response = response.data;
            this.symbols = response.data.symbols;
            this.displaySnack(
              "success",
              "Successfully updated symbol " + newSymbol.name + "."
            );
          })
          .catch((err) => {
            if (err.response) {
              // Request made and server responded
              this.displaySnack(
                "error",
                "Error while editing symbol. " + err.response.data
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
          .post("http://localhost:8080/api/CreateTradingSymbolDay", {
            name: this.editedItem.name,
            active: this.editedItem.active,
            numShares: this.editedItem.numShares,
            takeProfitOffset: this.editedItem.takeProfitOffset,
            stopLossOffset: this.editedItem.stopLossOffset,
          })
          .then((response) => {
            this.response = response.data;
            this.symbols = response.data.symbols;
            this.displaySnack(
              "success",
              "Successfully added symbol " + newSymbol.name + "."
            );
          })
          .catch((err) => {
            if (err.response) {
              // Request made and server responded
              this.displaySnack(
                "error",
                "Error while creating new symbol. " + err.response.data
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>