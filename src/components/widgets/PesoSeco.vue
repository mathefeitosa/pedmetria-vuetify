<template>
  <v-col cols="6" xm="12" sm="6" md="5" lg="4">
    <v-card class="blue-grey lighten-3 mx-auto " @click="snackbar = true">
      <v-card-title class="text-body-1">
        <v-icon left size="15" class="mr-2">mdi-weight</v-icon>
        Peso seco est.
      </v-card-title>
      <v-card-subtitle class="ml-6">
        {{ ($store.state.peso * 0.7).toFixed(2) }} kg
      </v-card-subtitle>
    </v-card>
    <v-snackbar
      multi-line
      v-model="snackbar"
      :timeout="timeout"
      color="grey darken-3"
      elevation="20"
      rounded="lg"
      transition="scroll-y-reverse-transition"
    >
      <p class="text-center">
        Peso seco estimado (70% do peso da admissão).
      </p>
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </v-col>
</template>

<script>
  export default {
    data() {
      return {
        snackbar: false,
        timeout: 1000,
      };
    },
  };
</script>

<style></style>
