export default {
  methods: {
    volTotal(peso) {
      //Calculando o volume de acordo com o peso da criança
      if (peso < 10) {
        return peso * 100;
      }
      if (peso >= 10 && peso <= 20) {
        return 1000 + (peso - 10) * 50;
      }
      if (peso > 20) {
        return 1500 + (peso - 20) * 20;
      }
    },
  },
};
