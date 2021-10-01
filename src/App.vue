<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <router-link to="/" class="app-bar-link">
        <v-toolbar-title>Trade Management System (TMS)</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
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
        <!--         <v-list-item color="primary" to="/price-ladder">
          <v-list-item-icon>
            <v-icon>mdi-ladder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Price Ladder</v-list-item-title>
        </v-list-item>
        <v-list-item color="primary" to="/order-blocks">
          <v-list-item-icon>
            <v-icon>mdi-layers-triple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Order Blocks</v-list-item-title>
        </v-list-item> -->
        <v-list-item color="primary" to="/symbol-management">
          <v-list-item-icon>
            <v-icon>mdi-layers-triple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Symbol Management</v-list-item-title>
        </v-list-item>
        <v-list-item color="primary" to="/block-management">
          <v-list-item-icon>
            <v-icon>mdi-layers-triple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Block Management</v-list-item-title>
        </v-list-item>
        <v-list-item color="primary" to="/trade-management-swing">
          <v-list-item-icon>
            <v-icon>mdi-layers-triple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Trade Management - Swing</v-list-item-title>
        </v-list-item>
        <v-list-item color="primary" to="/trade-management-day">
          <v-list-item-icon>
            <v-icon>mdi-layers-triple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Trade Management - Day</v-list-item-title>
        </v-list-item>
        <v-list-item color="primary" to="/block-archive">
          <v-list-item-icon>
            <v-icon>mdi-layers-triple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Block Archive</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="grey lighten-3">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {
      isInit: false,
      isSignIn: false,
      drawer: false,
      group: null,
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
        const userId = googleUser.ya;
        const token = googleUser.$b.id_token;
        console.log("user", googleUser);
        //this.isSignIn = this.$gAuth.isAuthorized;
        this.$store.commit("setAuthentication", this.$gAuth.isAuthorized);
        this.$store.commit("setUser", {userId, token});
        //googleUser.$b.id_token
        console.log(this.$store.state.user);
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
      } catch (error) {
        // On fail do something
      }
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