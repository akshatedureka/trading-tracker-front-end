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
            <v-toolbar-title>Symbols</v-toolbar-title>
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
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-checkbox
                          v-model="editedItem.active"
                          label="Active"
                        ></v-checkbox>
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
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
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
        <template v-slot:item.trading="{ item }">
          <v-switch
            v-model="item.trading"
            inset
            :label="`${item.trading.toString()}`"
            @click="switchTrading(item)"
          ></v-switch>
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
      addSymbolResponse: "",
      switchTradeResponse: "",
      updateSymbolResponse: "",
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
      .get("http://localhost:8080/api/GetTradingSymbols")
      .then((response) => {
        this.symbols = response.data;
        this.dataLoading = false;
      });
  },
  computed: {
    headers() {
      return [
        { text: "Name", value: "name" },
        { text: "Current Qty", value: "currentQuantity", sortable: false },
        { text: "Current Profit", value: "currentProfit", sortable: false },
        { text: "Archive Profit", value: "archiveProfit", sortable: false },
        { text: "Trade", value: "trading", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
        { text: "Active", value: "active" },
      ];
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  methods: {
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
                  .then((response) => (this.updateSymbolResponse = response.data))
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
      this.symbols.splice(this.editedIndex, 1); // ToDo: Update this to remove from array after successful response
      axios
        .delete(
          "https://gatewayweb20210323144005.azurewebsites.net/rfidservice/deletereader/" +
            this.editedItem.id
        )
        .then((response) => (this.addSymbolResponse = response.data));
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
      if (this.editedIndex > -1) {
        Object.assign(this.symbols[this.editedIndex], this.editedItem);
        axios
          .post("http://localhost:8080/api/UpdateTradingSymbol", {
            id: this.editedItem.id,
            name: this.editedItem.name,
            active: this.editedItem.active,
          })
          .then((response) => (this.addSymbolResponse = response.data))
          .catch((err) => {
            this.snackColor = "error";
            this.snackText = "Error while editing symbol. " + err;
            this.snack = true;
          });
      } else {
        this.symbols.push(this.editedItem); // ToDo: Update this to add to array after response
        var symbol = this.editedItem.name;
        axios
          .post("http://localhost:8080/api/CreateTradingSymbol", null, {
            params: { symbol },
          })
          .then((response) => (this.addSymbolResponse = response.data))
          .catch((err) => {
            this.snackColor = "error";
            this.snackText = "Error while creating new symbol. " + err;
            this.snack = true;
          });
      }
      this.close();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>