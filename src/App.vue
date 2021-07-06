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
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.to"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
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
        items: [
          { title: "Create Part", to: "/create-part" },
          { title: "Edit Part" },
          { title: "Search Part", to: "/search-part" },
        ],
        title: "Parts",
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