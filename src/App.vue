<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :hide-overlay="true"
      temporary
      dark
      app
    >
      <nav-drawer-items></nav-drawer-items>
    </v-navigation-drawer>

    <v-app-bar
      app
      dense
      elevation="20"
      elevate-on-scroll
      :color="navColor"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>PedMetria</v-toolbar-title>

      <template v-slot:extension>
        <sub-app-bar></sub-app-bar>
      </template>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import NavDrawerItems from "./components/NavDrawerItems.vue";
  import SubAppBar from "./components/SubAppBar.vue";
  export default {
    components: { SubAppBar, NavDrawerItems },
    data() {
      return {
        drawer: false,
      };
    },
    computed: {
      navColor() {
        switch (this.$store.state.sexo) {
          case "F":
            return "pink darken-3";
          case "M":
            return "light-blue darken-4";
          default:
            return "black";
        }
      },
    },
  };
</script>
