<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <router-link to="/" class="app-bar-link">
        <v-toolbar-title>Trade Management System (TMS)</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-chip v-if="$store.state.authenticated" class="mr-5" color="blue">
        {{ $store.state.user.email }}</v-chip
      >
      <v-btn
        color="blue darken-1"
        @click="handleClickSignIn"
        v-if="!$store.state.authenticated"
        :disabled="!isInit"
      >
        <v-icon left>mdi-google</v-icon>
        Sign in with Google
      </v-btn>
      <v-btn
        color="blue darken-1"
        @click="handleClickSignOut"
        v-if="$store.state.authenticated"
        :disabled="!isInit"
      >
        <v-icon left>mdi-google</v-icon>
        Sign out
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item color="primary" to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item color="primary" to="/account-management">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Account Management</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="
            $store.state.hasEnteredKeys &&
            ($store.state.accountType === 1 || $store.state.accountType === 2)
          "
          color="primary"
          to="/symbol-management-swing"
        >
          <v-list-item-icon>
            <v-icon>mdi-playlist-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Symbol Management</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="
            ($store.state.hasEnteredKeys && $store.state.accountType === 3) ||
            $store.state.accountType === 4
          "
          color="primary"
          to="/symbol-management-day"
        >
          <v-list-item-icon>
            <v-icon>mdi-playlist-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Symbol Management</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="
            $store.state.hasEnteredKeys &&
            ($store.state.accountType === 1 || $store.state.accountType === 2)
          "
          color="primary"
          to="/block-management"
        >
          <v-list-item-icon>
            <v-icon>mdi-layers-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Block Management</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="
            ($store.state.hasEnteredKeys && $store.state.accountType === 1) ||
            $store.state.accountType === 2
          "
          color="primary"
          to="/trade-management-swing"
        >
          <v-list-item-icon>
            <v-icon>mdi-finance</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Trade Management - Swing</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="
            ($store.state.hasEnteredKeys && $store.state.accountType === 3) ||
            $store.state.accountType === 4
          "
          color="primary"
          to="/trade-management-day"
        >
          <v-list-item-icon>
            <v-icon>mdi-finance</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Trade Management - Day</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="$store.state.hasEnteredKeys"
          color="primary"
          to="/block-archive"
        >
          <v-list-item-icon>
            <v-icon>mdi-layers-search</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Block Archive</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="$store.state.hasEnteredKeys"
          color="primary"
          to="/block-comparison"
        >
          <v-list-item-icon>
            <v-icon>mdi-layers-search</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Block Comparison</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="grey lighten-3">
      <router-view></router-view>
    </v-main>
    <v-footer color="primary lighten-1" padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Trade Management System (TMS)</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  components: {},

  data() {
    return {
      isInit: false,
      isSignIn: false,
      drawer: false,
      group: null,
      accountInformation: null,
      items: [
        {
          action: "mdi-wrench",
          active: true,
          title: "Price Ladder",
          to: "/price-ladder",
        },
        {
          action: "mdi-school",
          items: [
            { title: "Create Lot" },
            { title: "Edit Lot" },
            { title: "Search Lot" },
          ],
          title: "Lots",
        },
      ],
    };
  },
  methods: {
    async handleClickGetAuth() {
      try {
        const authCode = await this.$gAuth.getAuthCode();
        const response = await this.$http.post(
          "http://your-backend-server.com/auth/google",
          { code: authCode, redirect_uri: "postmessage" }
        );
      } catch (error) {
        // On fail do something
      }
    },
    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        const userId = googleUser.getId();
        const email = googleUser.getBasicProfile().getEmail();
        const token = googleUser.getAuthResponse().access_token;
        console.log("user", googleUser);
        //this.isSignIn = this.$gAuth.isAuthorized;
        this.$store.commit("setAuthentication", this.$gAuth.isAuthorized);
        this.$store.commit("setUser", { userId, email, token });
        //googleUser.$b.id_token
        console.log(this.$store.state.user);

        axios
          .get(process.env.VUE_APP_API_ENDPOINT_URL + "/GetAccountInformation")
          .then((response) => {
            this.accountInformation = response.data;
            this.$store.commit(
              "setAccountType",
              this.accountInformation.accountType
            );
            this.$store.commit(
              "setHasEnteredKeys",
              this.accountInformation.hasEnteredKeys
            );
            this.displaySnack(
              "success",
              "Successfully retrieved account information."
            );
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
          });
      } catch (error) {
        // On fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        //this.isSignIn = this.$gAuth.isAuthorized;
        console.log(this.$gAuth.isAuthorized);
        this.$store.commit("setAuthentication", this.$gAuth.isAuthorized);
        const userId = "";
        const email = "";
        const token = "";
        this.$store.commit("setUser", { userId, email, token });
        this.$router.push("/");
      } catch (error) {
        // On fail do something
      }
    },
    displaySnack(color, text) {
      this.snackColor = color;
      this.snackText = text;
      this.snack = true;
      this.overlay = false;
    },
  },
  mounted() {
    let that = this;
    let checkGauthLoad = setInterval(function () {
      that.isInit = that.$gAuth.isInit;
      //that.isSignIn = $store.state.authenticated;
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 1000);
  },
};
</script>

<style scoped>
.app-bar-link {
  color: white;
  text-decoration: none;
}
</style>