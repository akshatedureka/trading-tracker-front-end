<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <router-link to="/" class="app-bar-link">
        <v-toolbar-title>Trading Tracker</v-toolbar-title>
      </router-link>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item color="primary" to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item color="primary" to="/price-ladder">
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

  data: () => ({
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
  }),
};
</script>

<style scoped>
.app-bar-link {
  color: white;
  text-decoration: none;
}
</style>