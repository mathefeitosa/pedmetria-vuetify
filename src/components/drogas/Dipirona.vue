<template>
  <v-col cols="12" xm="12" sm="6" md="5" lg="4">
    <v-card :color="cardColor" elevation="1">
      <v-card-title>
        <p class="text-overline">Dipirona</p>
      </v-card-title>
      <v-card-text>
        {{ prescricao }}
        <p v-if="naoAplicavel">
          Essa criança ainda não pode usar formas injetáveis deste medicamento.
        </p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data() {
      return {};
    },
    computed: {
      peso() {
        return this.$store.state.peso;
      },
      naoAplicavel() {
        if (this.peso < 5) {
          return true;
        } else {
          return false;
        }
      },
      cardColor() {
        if (this.naoAplicavel) {
          return "red";
        } else return "grey lighten-3";
      },
      prescricao() {
        if (!this.naoAplicavel) {
          return `Dose: ${this.dose.min.toFixed(1)} - ${this.dose.max.toFixed(
            1
          )} via ${this.dose.administracao}`;
        } else return "";
      },
      dose() {
        let peso = Math.floor(this.peso);
        if (peso >= 5 && peso <= 8) {
          return {
            min: peso * 0.1,
            max: peso * 0.2,
            administracao: "IM",
            unidade: "ml",
          };
        }
        if (peso >= 9 && peso <= 15) {
          return {
            min: peso * 0.2,
            max: peso * 0.5,
            administracao: "IM/EV",
            unidade: "ml",
          };
        }
        if (peso >= 16 && peso <= 23) {
          return {
            min: peso * 0.3,
            max: peso * 0.8,
            administracao: "IM/EV",
            unidade: "ml",
          };
        }
        if (peso >= 24 && peso <= 30) {
          return {
            min: peso * 0.4,
            max: peso * 1,
            administracao: "IM/EV",
            unidade: "ml",
          };
        }
        if (peso >= 31 && peso <= 45) {
          return {
            min: peso * 0.5,
            max: peso * 1.5,
            administracao: "IM/EV",
            unidade: "ml",
          };
        }
        if (peso >= 46 && peso <= 53) {
          return {
            min: peso * 0.8,
            max: peso * 1.8,
            administracao: "IM/EV",
            unidade: "ml",
          };
        } else {
          return {
            min: "erro",
            max: "erro",
            administracao: "erro",
            unidade: "erro",
          };
        }
      },
    },
  };
</script>

<style></style>
