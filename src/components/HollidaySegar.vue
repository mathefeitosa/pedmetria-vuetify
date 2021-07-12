<template>
  <v-col cols="12" xm="12" sm="6" md="5" lg="4" v-if="!$store.state.isRN">
    <v-card color="grey lighten-3" elevation="1">
      <v-card-title class="font-weight-bold text">
        Regra de Holliday-Segar
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="tipoSodio"
          label="Tipo do Sódio"
          :items="['10%', '20%']"
        ></v-select>
        <v-select
          v-model="tipoPotassio"
          label="Tipo do Potássio"
          :items="['10%', '19,1%']"
        ></v-select>
        <v-select
          :error="alertaPrescricao"
          v-model="tipoTomada"
          label="Tomadas"
          :items="['6/6h', '8/8h', '12/12h']"
        >
        </v-select>
      </v-card-text>
      <v-card-text>
        <v-data-iterator :items="volumesTabela" hide-default-footer>
          <template v-slot:header>
            <v-row class="font-weight-bold text-center">
              <v-col class="text-right">Item</v-col>
              <v-col class="text-left">Volume</v-col>
            </v-row>
          </template>
          <template v-slot:default="props">
            <v-row v-for="(item, index) in props.items" v-bind:key="index">
              <v-col class="text-right">
                {{ item.tipo }}
              </v-col>
              <v-col class="text-left">
                {{ item.volume }} {{ item.unidade }}
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-card-text>
      <v-card-text>
        <v-alert v-show="alertaPrescricao" color="deep-orange accent-1">
          <p>O volume do SG 5% passou de 500 ml por tomada!</p>
          <p>Verifique a disponibilidade de recipientes grandes!</p>
        </v-alert>
      </v-card-text>
      <v-card-text class="grey lighten-1">
        <p class="text-overline"><b>Prescrição:</b></p>
        <p>{{ prescricao }}</p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    name: "HollidaySegar",
    data() {
      return {
        peso: this.$store.state.peso,
        tipoSodio: "10%",
        tipoPotassio: "19,1%",
        tipoTomada: "6/6h",
      };
    },
    computed: {
      alertaPrescricao() {
        switch (this.tipoTomada) {
          case "6/6h":
            if (this.volumes.volGlicosado / 4 > 500) {
              return true;
            } else {
              return false;
            }
          case "8/8h":
            if (this.volumes.volGlicosado / 3 > 500) {
              return true;
            } else {
              return false;
            }
          case "12/12h":
            if (this.volumes.volGlicosado / 2 > 500) {
              return true;
            } else {
              return false;
            }

          default:
            break;
        }
        if (this.volumes.volGlicosado > 500) {
          return true;
        } else {
          return false;
        }
      },
      volumes() {
        let peso = this.peso;

        let volGlicosado;
        let volSodio;
        let volPotassio;

        //Calculando o volume de acordo com o peso da criança
        if (peso < 10) {
          volGlicosado = peso * 100;
        }
        if (peso >= 10 && peso <= 20) {
          volGlicosado = 1000 + (peso - 10) * 50;
        }
        if (peso > 20) {
          volGlicosado = 1500 + (peso - 20) * 20;
        }

        //Calculando o volume do sódio de acordo com a opção
        switch (this.tipoSodio) {
          case "10%":
            volSodio = (80 * volGlicosado) / 1000;
            break;
          case "20%":
            volSodio = (40 * volGlicosado) / 1000;
            break;

          default:
            volSodio = 0;
            break;
        }

        //Calculando o volume do potássio de acordo com opção
        switch (this.tipoPotassio) {
          case "10%":
            volPotassio = (17.85 * volGlicosado) / 1000;
            break;
          case "19,1%":
            volPotassio = (10 * volGlicosado) / 1000;
            break;

          default:
            volPotassio = 0;
            break;
        }

        return {
          volGlicosado: volGlicosado.toFixed(1),
          volSodio: volSodio.toFixed(1),
          volPotassio: volPotassio.toFixed(1),
        };
      },
      volumesTabela() {
        return [
          {
            tipo: "Soro Glicosado 5%",
            volume: this.volumes.volGlicosado,
            unidade: "ml/dia",
          },
          {
            tipo: "Sódio à " + this.tipoSodio,
            volume: this.volumes.volSodio,
            unidade: "ml/dia",
          },
          {
            tipo: "Potássio à " + this.tipoPotassio,
            volume: this.volumes.volPotassio,
            unidade: "ml/dia",
          },
        ];
      },
      prescricao() {
        let volGlicosado = this.volumes.volGlicosado;
        let volSodio = this.volumes.volSodio;
        let volPotassio = this.volumes.volPotassio;
        let tipoSodio = this.tipoSodio;
        let tipoPotassio = this.tipoPotassio;

        switch (this.tipoTomada) {
          case "6/6h":
            return (
              (volGlicosado / 4).toFixed(1) +
              " ml de SG 5% + " +
              (volSodio / 4).toFixed(1) +
              " ml de NaCl à " +
              tipoSodio +
              " + " +
              (volPotassio / 4).toFixed(1) +
              " ml de KCl à " +
              tipoPotassio +
              ", EV, de 6/6h."
            );
          case "8/8h":
            return (
              (volGlicosado / 3).toFixed(1) +
              " ml de SG 5% + " +
              (volSodio / 3).toFixed(1) +
              " ml de NaCl à " +
              tipoSodio +
              " + " +
              (volPotassio / 3).toFixed(1) +
              " ml de KCl à " +
              tipoPotassio +
              ", EV, de 6/6h."
            );
          case "12/12h":
            return (
              (volGlicosado / 2).toFixed(1) +
              " ml de SG 5% + " +
              (volSodio / 2).toFixed(1) +
              " ml de NaCl à " +
              tipoSodio +
              " + " +
              (volPotassio / 2).toFixed(1) +
              " ml de KCl à " +
              tipoPotassio +
              ", EV, de 6/6h."
            );
          default:
            return "Opção de tomada não disponível!";
        }
      },
    },
  };
</script>

<style></style>
