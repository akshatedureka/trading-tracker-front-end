<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/PlantImage.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Trading Tracker
        </h1>

        <p class="subheading font-weight-regular">
          Please refer to the links below or the navigation sidebar
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Links
        </h2>

        <v-row justify="center">
          <router-link
            v-for="(next, i) in links"
            :key="i"
            :to="next.to"
            class="subheading mx-3"
          >
            {{ next.text }}
          </router-link>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HomePage',

    data: () => ({
      links: [
        {
          text: 'Price Ladder',
          to: '/price-ladder',
        },
        {
          text: 'Order Blocks',
          to: '/order-blocks',
        },
      ],
    }),
  }
</script>
