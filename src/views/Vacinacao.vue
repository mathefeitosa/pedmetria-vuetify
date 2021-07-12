<template>
  <v-container class="mt-3">
    <v-row>
      <calendario-vacinal></calendario-vacinal>
    </v-row>
  </v-container>
</template>

<script>
  import CalendarioVacinal from "../components/CalendarioVacinal.vue";
  export default {
    components: { CalendarioVacinal },
    data() {
      return {};
    },
  };
</script>

<style></style>
