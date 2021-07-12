<template>
  <v-container>
    <v-row>
      <peso-seco></peso-seco>
      <necessidade-calorica></necessidade-calorica>
      <hidratacao-r-n></hidratacao-r-n>
      <holliday-segar></holliday-segar>
    </v-row>
  </v-container>
</template>

<script>
  import HollidaySegar from "../components/HollidaySegar.vue";
  import HidratacaoRN from "../components/HidratacaoRN.vue";
  import PesoSeco from "../components/widgets/PesoSeco.vue";
  import NecessidadeCalorica from "../components/widgets/NecessidadeCalorica.vue";

  export default {
    components: { HollidaySegar, HidratacaoRN, PesoSeco, NecessidadeCalorica },
    data() {
      return {};
    },
  };
</script>

<style></style>
