<template>
  <v-col cols="6" xm="12" sm="6" md="5" lg="4">
    <v-card @click="snackbar = true" class="deep-orange lighten-3 mx-auto ">
      <v-card-title class="text-body-1">
        <v-icon size="15" class="mr-2">mdi-fire</v-icon>
        Aporte calórico
      </v-card-title>
      <v-card-subtitle class="ml-8">
        {{ (volTotal($store.state.peso) / 1).toFixed(0) }} kcal/dia
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
        Cálculo baseado na regra de Holliday-Segar.
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
  import hollidaySegar from "../../mixins/hollidaySegar.js";
  export default {
    mixins: [hollidaySegar],
    data() {
      return {
        snackbar: false,
      };
    },
  };
</script>

<style></style>
