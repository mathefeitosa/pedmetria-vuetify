<template>
  <v-col cols="12" xm="12" sm="9" md="7" lg="5">
    <v-card color="grey lighten-3" elevation="1">
      <v-card-title class="font-weight-bold text">
        Calendário vacinal
      </v-card-title>
      <v-card-text>
        <p><b>Legenda:</b></p>
        <v-row class="text-center" align="center">
          <v-col>Deveria ter tomado</v-col>
          <v-col class="green lighten-2">Tomar agora</v-col>
          <v-col class="yellow lighten-2">Não tomar</v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-data-iterator
          :items="dadosTabela"
          items-per-page="100"
          hide-default-footer
        >
          <template v-slot:header>
            <v-row class="font-weight-bold text-center">
              <v-col>Quando tomar</v-col>
              <v-col>Vacina</v-col>
              <v-col>Dose</v-col>
            </v-row>
          </template>
          <template v-slot:default="props">
            <v-row
              v-for="(item, index) in props.items"
              :key="index"
              :class="item._classes"
            >
              <v-col>{{ item.quandoTomar }}</v-col>
              <v-col>{{ item.vacina }}</v-col>
              <v-col>{{ item.dose }}</v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-card-text>
      <v-divider class="mt-3 mb-3"></v-divider>
      <v-card-text>
        <p><b>Situações especiais:</b></p>
        <v-sheet rounded elevation="2" class="pa-2 ma-2">
          <b>Hepatite B:</b> adolescentes não vacinados deverão receber 3 doses.
        </v-sheet>
        <v-sheet rounded elevation="2" class="pa-2 ma-2">
          <b>Meningocócica B recombinante:</b> adolescentes não vacinados
          deverão receber 2 doses.
        </v-sheet>
        <v-sheet rounded elevation="2" class="pa-2 ma-2">
          <b>SCR/Varicela/SCRV:</b> adolescentes não vacinados deverão receber 2
          doses de ambas as vacinas.
        </v-sheet>
        <v-sheet rounded elevation="2" class="pa-2 ma-2">
          <b>Hepatite A:</b> adolescentes não vacinados deverão receber 2 doses.
        </v-sheet>
        <v-sheet rounded elevation="2" class="pa-2 ma-2">
          <b>Febre Amarela:</b> 1 dose para não vacinados previamente.
        </v-sheet>
        <v-sheet rounded elevation="2" class="pa-2 ma-2">
          <b>Dengue:</b> crianças e adolescentes a partir dos 9 anos de idade
          com infecção prévia comprovada.
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
  export default {
    name: "CalendarioVacinal",
    components: {},
    data() {
      return {};
    },
    computed: {
      idadeAnos() {
        return this.$store.state.idadeAnos;
      },
      idadeMeses() {
        return this.$store.state.idadeMeses;
      },
      dadosTabela() {
        return [
          {
            quandoTomar: "Ao nascer",
            vacina: "BCG ID",
            dose: "Única",
            _classes: this.colorizeItem(0, 0),
          },
          {
            vacina: "Hepatite B",
            quandoTomar: "Ao nascer",
            dose: "1ª dose",
            _classes: this.colorizeItem(0, 0),
          },
          //2º mẽs
          {
            vacina: "Hepatite B",
            quandoTomar: "2 meses",
            dose: "2ª dose",
            _classes: this.colorizeItem(2, 2),
          },
          {
            vacina: "Rotavírus",
            quandoTomar: "2 meses",
            dose: "1ª dose",
            _classes: this.colorizeItem(2, 2),
          },
          {
            vacina: "DTP/DTPa",
            quandoTomar: "2 meses",
            dose: "1ª dose",
            _classes: this.colorizeItem(2, 2),
          },
          {
            vacina: "Hib",
            quandoTomar: "2 meses",
            dose: "1ª dose",
            _classes: this.colorizeItem(2, 2),
          },
          {
            vacina: "VOP/VIP",
            quandoTomar: "2 meses",
            dose: "1ª dose",
            _classes: this.colorizeItem(2, 2),
          },
          {
            vacina: "Pneumocócica conjulgada",
            quandoTomar: "2 meses",
            dose: "1ª dose",
            _classes: this.colorizeItem(2, 2),
          },
          //3º mẽs
          {
            vacina: "Meningocócica conjulgada C e ACWY",
            quandoTomar: "3 meses",
            dose: "1ª dose",
            _classes: this.colorizeItem(3, 3),
          },
          {
            vacina: "Meningocócica B recombinante",
            quandoTomar: "3 meses",
            dose: "1ª dose",
            _classes: this.colorizeItem(3, 3),
          },
          //4º mẽs
          {
            vacina: "Hepatite B",
            quandoTomar: "4 meses",
            dose: "3ª dose",
            _classes: this.colorizeItem(4, 4),
          },
          {
            vacina: "Rotavírus",
            quandoTomar: "4 meses",
            dose: "2ª dose",
            _classes: this.colorizeItem(4, 4),
          },
          {
            vacina: "DTP/DTPa",
            quandoTomar: "4 meses",
            dose: "2ª dose",
            _classes: this.colorizeItem(4, 4),
          },
          {
            vacina: "Hib",
            quandoTomar: "4 meses",
            dose: "2ª dose",
            _classes: this.colorizeItem(4, 4),
          },
          {
            vacina: "VOP/VIP",
            quandoTomar: "4 meses",
            dose: "2ª dose",
            _classes: this.colorizeItem(4, 4),
          },
          {
            vacina: "Pneumocócica conjulgada",
            quandoTomar: "4 meses",
            dose: "2ª dose",
            _classes: this.colorizeItem(4, 4),
          },
          //5º mẽs
          {
            vacina: "Meningocócica conjulgada C e ACWY",
            quandoTomar: "5 meses",
            dose: "2ª dose",
            _classes: this.colorizeItem(5, 5),
          },
          {
            vacina: "Meningocócica B recombinante",
            quandoTomar: "5 meses",
            dose: "2ª dose",
            _classes: this.colorizeItem(5, 5),
          },
          //6º mês
          {
            vacina: "Hepatite B",
            quandoTomar: "6 meses",
            dose: "4ª dose",
            _classes: this.colorizeItem(6, 6),
          },
          {
            vacina: "DTP/DTPa",
            quandoTomar: "6 meses",
            dose: "3ª dose",
            _classes: this.colorizeItem(6, 6),
          },
          {
            vacina: "Hib",
            quandoTomar: "6 meses",
            dose: "3ª dose",
            _classes: this.colorizeItem(6, 6),
          },
          {
            vacina: "VOP/VIP",
            quandoTomar: "6 meses",
            dose: "3ª dose",
            _classes: this.colorizeItem(6, 6),
          },
          {
            vacina: "Pneumocócica conjulgada",
            quandoTomar: "6 meses",
            dose: "3ª dose",
            _classes: this.colorizeItem(6, 6),
          },
          {
            vacina: "Influenza",
            quandoTomar: "A partir de 6 meses",
            dose: "Anual",
            _classes: this.colorizeItem(6, 1200),
          },
          //9º mês
          {
            vacina: "Febre Amarela",
            quandoTomar: "a partir dos 9 meses",
            dose: "1ª dose",
            _classes: this.colorizeItem(9, 48),
          },
          //12º mês
          {
            vacina: "Pneumocócica conjulgada",
            quandoTomar: "12 meses",
            dose: "4ª dose",
            _classes: this.colorizeItem(12, 12),
          },
          {
            vacina: "Meningocócica conjulgada C e ACWY",
            quandoTomar: "12 meses",
            dose: "3ª dose",
            _classes: this.colorizeItem(12, 12),
          },
          {
            vacina: "Meningocócica B recombinante",
            quandoTomar: "12 meses",
            dose: "3ª dose",
            _classes: this.colorizeItem(12, 12),
          },
          {
            vacina: "SCR/Varicela/SCRV",
            quandoTomar: "12 meses",
            dose: "1ª dose",
            _classes: this.colorizeItem(12, 12),
          },
          {
            vacina: "Hepatite A",
            quandoTomar: "12 meses",
            dose: "1ª dose",
            _classes: this.colorizeItem(12, 12),
          },
          //15º mês
          {
            vacina: "DTP/DTPa",
            quandoTomar: "1 ano e 3 meses",
            dose: "4ª dose",
            _classes: this.colorizeItem(15, 15),
          },
          {
            vacina: "Hib",
            quandoTomar: "1 ano e 3 meses",
            dose: "4ª dose",
            _classes: this.colorizeItem(15, 15),
          },
          {
            vacina: "VOP/VIP",
            quandoTomar: "1 ano e 3 meses",
            dose: "4ª dose",
            _classes: this.colorizeItem(15, 15),
          },
          {
            vacina: "SRC/Varicela/SCRV",
            quandoTomar: "1 ano e 3 meses à 4 anos",
            dose: "Reforço",
            _classes: this.colorizeItem(15, 48),
          },
          //18º mês
          {
            vacina: "Hepatite A",
            quandoTomar: "1 ano e 6 meses",
            dose: "2ª dose",
            _classes: this.colorizeItem(18, 18),
          },
          //4º ano
          {
            vacina: "Febre Amarela",
            quandoTomar: "4 anos",
            dose: "Reforço",
            _classes: this.colorizeItem(48, 48),
          },
          //4º-6º ano
          {
            vacina: "DTP/DTPa",
            quandoTomar: "4 a 6 anos",
            dose: "5ª dose",
            _classes: this.colorizeItem(4 * 12, 6 * 12),
          },
          {
            vacina: "VOP/VIP",
            quandoTomar: "4 a 6 anos",
            dose: "5ª dose",
            _classes: this.colorizeItem(4 * 12, 6 * 12),
          },
          {
            vacina: "Meningocócica conjulgada C e ACWY",
            quandoTomar: "4 a 6 anos",
            dose: "4ª dose",
            _classes: this.colorizeItem(4 * 12, 6 * 12),
          },
          //9º ano
          {
            vacina: "HPV",
            quandoTomar: "a partir de 9 anos",
            dose: "3 doses",
            _classes: this.colorizeItem(9 * 12, 26 * 12),
          },
        ];
      },
    },
    methods: {
      /**
       * Retorna a cor do item da table de acordo com período vacinal dado
       * em mêses.
       * - tempoMin: tempo mínimo em mêses
       * - tempoMax: tempo mínimo em mêses
       */
      colorizeItem(tempoMin, tempoMax) {
        let idade = this.idadeMeses + this.idadeAnos * 12;

        if (idade >= tempoMin && idade <= tempoMax)
          return "green lighten-3 text-center";
        else if (tempoMin > idade) return "yellow lighten-3 text-center";
        else return "text-center";
      },
    },
  };
</script>

<style></style>
