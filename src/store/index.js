import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    peso: 3.4,
    sexo: null,
    idadeMeses: 3,
    idadeAnos: 1,
    isRN: false,
  },
  mutations: {
    set(state, [variable, value]) {
      state[variable] = value;
    },
  },
  actions: {},
  modules: {},
});
