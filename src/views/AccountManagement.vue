<template>
  <div>
    <v-container>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-row align="center" justify="center">
        <v-col>
          <v-card
            class="mx-auto"
            max-width="374"
            elevation="3"
            :loading="waitingForAccountInfo"
          >
            <template slot="progress">
              <v-progress-linear color="info" indeterminate></v-progress-linear>
            </template>
            <v-card-title> Account Management </v-card-title>
            {{ returnUrl }}
            <v-row align="center">
              <v-col>
                <v-form ref="form" v-model="valid" lazy-validation class="pa-5">
                  <v-text-field
                    v-model="userId"
                    label="User Id:"
                    disabled
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    label="Email:"
                    disabled
                  ></v-text-field>
                  <v-text-field
                    v-model="alpacaKey"
                    label="Alpaca Key:"
                    required
                    :append-icon="showAlpacaKey ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showAlpacaKey ? 'text' : 'password'"
                    @click:append="showAlpacaKey = !showAlpacaKey"
                  ></v-text-field>
                  <v-text-field
                    v-model="alpacaSecret"
                    label="Alpaca Secret:"
                    required
                    :append-icon="showAlpacaSecret ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showAlpacaSecret ? 'text' : 'password'"
                    @click:append="showAlpacaSecret = !showAlpacaSecret"
                  ></v-text-field>
                  <v-card color="red">
                    <h4 class="pa-2" v-text=accountWarningText></h4>
                  </v-card>
                  <v-radio-group
                    v-model="accountType"
                    mandatory
                    label="Account Type:"
                    :disabled="hasEnteredKeys"
                  >
                    <v-radio label="Day" value="1"></v-radio>
                    <v-radio label="Swing" value="2"></v-radio>
                  </v-radio-group>
                  <v-btn
                    :disabled="!valid"
                    color="info"
                    class="mr-4"
                    @click="submit"
                  >
                    Submit
                  </v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
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
  name: "AccountManagement",
  data() {
    return {
      overlay: false,
      accountInformation: "",
      userId: "",
      email: "",
      alpacaKey: "",
      alpacaSecret: "",
      accountType: "",
      hasEnteredKeys: "",
      accountWarningText: "Please note that once you set your account type, it cannot be changed.",
      returnUrl: null,
      errorMessage: null,
      successMessage: null,
      waitingForAccountInfo: false,
      valid: true,
      showAlpacaKey: false,
      showAlpacaSecret: false,
      snack: false,
      snackColor: "",
      snackText: "",
    };
  },
  mounted() {
    this.waitingForAccountInfo = true;
    this.overlay = true;
    axios
      .get("http://localhost:8080/api/GetAccountInformation")
      .then((response) => {
        this.accountInformation = response.data;
        this.userId = this.accountInformation.userId;
        this.email = this.accountInformation.email;
        this.accountType = String(this.accountInformation.accountType);
        this.hasEnteredKeys = this.accountInformation.hasEnteredKeys;
        if (this.hasEnteredKeys)
        {
          this.alpacaKey = "HIDDEN";
          this.alpacaSecret = "HIDDEN";
        }

        this.overlay = false;
      })
      .catch((err) => {
        if (err.response) {
          // Request made and server responded
          this.displaySnack(
            "error",
            "Error while getting account information. " + err.response.data
          );
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
        }
        this.overlay = false;
      });

    this.waitingForAccountInfo = false;
  },
  computed: {},
  methods: {
    submit() {
      this.overlay = true;
      const headers = {
        alpacaKey: this.alpacaKey,
        alpacaSecret: this.alpacaSecret,
      };
      axios
        .post(
          "http://localhost:8080/api/UpdateAccountInformation",
          {
            accountType: this.accountType,
            alpacaKey: "testKey",
            alpacaSecret: "testSecret",
          },
          {
            headers: headers,
          }
        )
        .then((response) => {
          this.$store.commit("setAccountType", response.data.accountType);
          this.$store.commit("setHasEnteredKeys", response.data.hasEnteredKeys);
          this.overlay = false;
          this.displaySnack(
            "success",
            "Successfully updated account information."
          );
        })
        .catch((err) => {
          if (err.response) {
            // Request made and server responded
            this.displaySnack(
              "error",
              "Error while updating account information. " + err.response.data
            );
          } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", err.message);
          }
          this.overlay = false;
        });
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