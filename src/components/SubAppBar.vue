<template>
  <v-container>
    <router-link to="/" style="text-decoration: none; color: inherit;">
      <v-row justify="space-between" class="text-caption">
        <v-col><strong>Peso:</strong> {{ $store.state.peso }} kg</v-col>
        <v-col><strong>Idade:</strong> {{ idadeAnos }} </v-col>
        <v-col><strong>Sexo:</strong> {{ $store.state.sexo }}</v-col>
      </v-row>
    </router-link>
  </v-container>
</template>

<script>
  export default {
    computed: {
      idadeAnos() {
        if (!this.$store.state.isRN) {
          return `${this.$store.state.idadeAnos}a 
                  ${this.$store.state.idadeMeses}m`;
        } else {
          return "RN";
        }
      },
    },
  };
</script>

<style></style>
