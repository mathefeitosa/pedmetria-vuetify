import Vue from "vue";
import VueRouter from "vue-router";
import Ajustes from "../views/Ajustes.vue";
import Hidratacao from "../views/Hidratacao.vue";
import Vacinacao from "../views/Vacinacao.vue";
import Drogas from "../views/Drogas.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Ajustes",
    component: Ajustes,
  },
  {
    path: "/hidratacao",
    name: "Hidratação",
    component: Hidratacao,
  },
  {
    path: "/vacinacao",
    name: "Hidratação",
    component: Vacinacao,
  },
  {
    path: "/drogas",
    name: "Drogas",
    component: Drogas,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
