<template>
  <v-col cols="12" xm="12" sm="6" md="5" lg="4">
    <v-card color="grey lighten-3" elevation="1">
      <v-card-title class="font-weight-bold">Dados da criança</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p>Peso em quilogramas</p>
        <v-slider
          dense
          max="50"
          min="0"
          step="0.1"
          tick-size="3"
          v-model="peso"
        >
          <template v-slot:append>
            <v-text-field
              dense
              label="Peso (kg)"
              step="0.1"
              v-model="peso"
              class="mt-0 pt-0"
              type="number"
              style="width: 60px"
            >
            </v-text-field>
          </template>
        </v-slider>
        <p>Idade</p>
        <v-switch label="Recém-nascido" v-model="isRN"></v-switch>
        <v-slider
          :disabled="isRN"
          dense
          max="19"
          min="0"
          step="1"
          ticks="always"
          tick-size="3"
          v-model="idadeAnos"
        >
          <template v-slot:append>
            <v-text-field
              :disabled="isRN"
              dense
              max="19"
              min="0"
              label="Anos"
              step="0.1"
              v-model="idadeAnos"
              class="mt-0 pt-0"
              type="number"
              style="width: 60px"
            >
            </v-text-field>
          </template>
        </v-slider>
        <v-slider
          :disabled="isRN"
          dense
          max="12"
          min="0"
          step="1"
          ticks="always"
          tick-size="3"
          v-model="idadeMeses"
        >
          <template v-slot:append>
            <v-text-field
              :disabled="isRN"
              dense
              max="12"
              min="0"
              label="Meses"
              step="0.1"
              v-model="idadeMeses"
              class="mt-0 pt-0"
              type="number"
              style="width: 60px"
            >
            </v-text-field>
          </template>
        </v-slider>
        <p>Sexo</p>
        <v-radio-group v-model="sexo" row>
          <v-radio value="F" label="Feminino"></v-radio>
          <v-radio value="M" label="Masculino"></v-radio>
        </v-radio-group>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data() {
      return {
        peso: this.$store.state.peso,
        idadeMeses: this.$store.state.idadeMeses,
        idadeAnos: this.$store.state.idadeAnos,
        isRN: this.$store.state.isRN,
        sexo: null,
      };
    },
    watch: {
      peso: function() {
        this.$store.commit("set", ["peso", this.peso]);
      },
      sexo: function() {
        this.$store.commit("set", ["sexo", this.sexo]);
      },
      idadeMeses: function() {
        this.$store.commit("set", ["idadeMeses", this.idadeMeses]);
      },
      idadeAnos: function() {
        this.$store.commit("set", ["idadeAnos", this.idadeAnos]);
      },
      isRN: function(old) {
        this.$store.commit("set", ["isRN", this.isRN]);

        //Erase age values
        if (old) {
          this.idadeMeses = 0;
          this.idadeAnos = 0;
        }
      },
    },
  };
</script>

<style></style>
