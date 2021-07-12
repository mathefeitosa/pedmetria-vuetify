<template>
  <v-col cols="12" xm="12" sm="6" md="5" lg="4" v-if="$store.state.isRN">
    <v-card color="grey lighten-3" elevation="1">
      <v-card-title class="font-weight-bold text">
        Recém-nascido
      </v-card-title>
      <v-card-text>
        <p>Volume (ml/kg)</p>
        <v-slider
          dense
          max="180"
          min="130"
          step="1"
          tick-size="3"
          v-model="volPorKg"
        >
          <template v-slot:append>
            <v-text-field
              dense
              step="1"
              min="130"
              max="180"
              v-model="volPorKg"
              class="mt-0 pt-0"
              type="number"
              style="width: 60px"
            >
            </v-text-field>
          </template>
        </v-slider>

        <p>Velocidade de Infusão de Glicose - VIG (mg/kg/min)</p>
        <v-slider dense max="12" min="3" step="1" tick-size="3" v-model="vig">
          <template v-slot:append>
            <v-text-field
              dense
              max="12"
              min="3"
              step="1"
              v-model="vig"
              class="mt-0 pt-0"
              type="number"
              style="width: 60px"
            >
            </v-text-field>
          </template>
        </v-slider>
        <v-divider class="mt-3 mb-3" />
        <v-data-iterator :items="volumesTabela" hide-default-footer>
          <template v-slot:header>
            <v-row class="font-weight-bold">
              <v-col>Item</v-col>
              <v-col>Volume</v-col>
            </v-row>
          </template>
          <template v-slot:default="props">
            <v-row
              v-for="(item, index) in props.items"
              v-bind:key="index"
              :class="item._classes"
            >
              <v-col>
                {{ item.item }}
              </v-col>
              <v-col> {{ item.quantidade }} {{ item.unidade }} </v-col>
            </v-row>
          </template>
        </v-data-iterator>
        <v-divider class="mt-3 mb-3" />
        <v-select
          v-model="tipoTomada"
          label="Tomadas"
          :items="['Bomba de Infusão', '6/6h', '8/8h', '12/12h']"
        ></v-select>
      </v-card-text>
      <v-card-text class="grey lighten-1">
        <p><b>Prescrição:</b></p>
        <p>{{ prescricao }}</p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    name: "HidratacaoRN",
    data() {
      return {
        peso: this.$store.state.peso,
        vig: 7,
        volPorKg: 140,
        tipoTomada: "Bomba de Infusão",
        alertaPrescricao: false,
        constantes: {
          NACL20: 0.88235, // NaCl a 20%: 1 ml = 3,4 mEq/L | 3 mEq/kg/dia (peso*3/3,4)
          KCL19: 0.8, // KCl a 19,1%: 1 ml = 2,5 mEq/L | 2 mEq/kg/dia (peso*2/2,5)
          MGSO4: 0.375, //MgSO4 a 10%:1 ml = 0,8 mEq/L | 0,3 mEq/kg/dia (peso*0,3/0,8)
        },
      };
    },
    computed: {
      gramasDeGlicose() {
        return this.vig * this.peso * 1.44;
      },
      volumes() {
        let volTotal = this.peso * this.volPorKg;
        let volNACL = this.peso * this.constantes.NACL20;
        let volKCL = this.peso * this.constantes.KCL19;
        let volMGSO4 = this.peso * this.constantes.MGSO4;
        let volGlucCalc = this.peso;
        let volEletrolitos = volNACL + volKCL + volMGSO4 + volGlucCalc;

        let volGlic50 =
          (this.gramasDeGlicose * 20 - (volTotal - volEletrolitos)) / 9;
        let volGlic05 = volTotal - volGlic50 - volEletrolitos;

        return {
          volTotal: volTotal,
          volNACL: volNACL,
          volKCL: volKCL,
          volMGSO4: volMGSO4,
          volGlic50: volGlic50,
          volGlic05: volGlic05,
          volGlucCalc: volGlucCalc,
        };
      },
      volumesTabela() {
        return [
          {
            item: "Gramas de Glicose",
            quantidade: this.gramasDeGlicose.toFixed(2),
            unidade: "g/dia",
            _classes: "",
          },
          {
            item: "Soro Glicosado 5%",
            quantidade: this.volumes.volGlic05.toFixed(1),
            unidade: "ml/dia",
            _classes: "",
          },
          {
            item: "Glicose à 50%",
            quantidade: this.volumes.volGlic50.toFixed(1),
            unidade: "ml/dia",
            _classes: "",
          },
          {
            item: "NaCl à 20%",
            quantidade: this.volumes.volNACL.toFixed(1),
            unidade: "ml/dia",
            _classes: "",
          },
          {
            item: "KCl à 19,1%",
            quantidade: this.volumes.volKCL.toFixed(1),
            unidade: "ml/dia",
            _classes: "",
          },
          {
            item: "Magnésio à 10%",
            quantidade: this.volumes.volMGSO4.toFixed(1),
            unidade: "ml/dia",
            _classes: "",
          },
          {
            item: "Gluconato de Cálcio à 10%",
            quantidade: this.volumes.volGlucCalc.toFixed(1),
            unidade: "ml/dia",
            _classes: "",
          },
          {
            item: "Volume Total",
            quantidade: this.volumes.volTotal.toFixed(1),
            unidade: "ml/dia",
            _classes: "font-weight-bold green lighten-2",
          },
        ];
      },
      prescricao() {
        let v = this.volumes;
        let string;
        switch (this.tipoTomada) {
          case "Bomba de Infusão":
            string = `
            ${v.volGlic05.toFixed(1)} ml SG5% +
            ${v.volGlic50.toFixed(1)} ml G50% +
            ${v.volNACL.toFixed(1)} ml NaCl 20% +
            ${v.volKCL.toFixed(1)} ml KCl 19,1% +
            ${v.volMGSO4.toFixed(1)} ml MgSO4 10% +
            ${v.volGlucCalc.toFixed(
              1
            )} ml Gluc. de Cálcio 10%, EV, em 24h na BIC à
            ${(v.volTotal / 24).toFixed(1)} ml/h.
             `;
            return string;
          case "6/6h":
            string = `
            ${(v.volGlic05 / 4).toFixed(1)} ml SG5% +
            ${(v.volGlic50 / 4).toFixed(1)} ml G50% +
            ${(v.volNACL / 4).toFixed(1)} ml NaCl 20% +
            ${(v.volKCL / 4).toFixed(1)} ml KCl 19,1% +
            ${(v.volMGSO4 / 4).toFixed(1)} ml MgSO4 10% +
            ${(v.volGlucCalc / 4).toFixed(
              1
            )} ml Gluc. de Cálcio 10%, EV, de 6/6h.`;
            return string;
          case "8/8h":
            string = `
            ${(v.volGlic05 / 3).toFixed(1)} ml SG5% +
            ${(v.volGlic50 / 3).toFixed(1)} ml G50% +
            ${(v.volNACL / 3).toFixed(1)} ml NaCl 20% +
            ${(v.volKCL / 3).toFixed(1)} ml KCl 19,1% +
            ${(v.volMGSO4 / 3).toFixed(1)} ml MgSO4 10% +
            ${(v.volGlucCalc / 3).toFixed(
              1
            )} ml Gluc. de Cálcio 10%, EV, de 8/8h.`;
            return string;
          case "12/12h":
            string = `
            ${(v.volGlic05 / 2).toFixed(1)} ml SG5% +
            ${(v.volGlic50 / 2).toFixed(1)} ml G50% +
            ${(v.volNACL / 2).toFixed(1)} ml NaCl 20% +
            ${(v.volKCL / 2).toFixed(1)} ml KCl 19,1% +
            ${(v.volMGSO4 / 2).toFixed(1)} ml MgSO4 10% +
            ${(v.volGlucCalc / 2).toFixed(
              1
            )} ml Gluc. de Cálcio 10%, EV, de 8/8h.`;
            return string;
          default:
            return "Opção não encontrada.";
        }
      },
    },
  };
</script>

<style></style>
