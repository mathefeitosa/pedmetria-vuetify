<template>
  <div>
    <v-list-item>
      <v-list-item-title class="text-h6 text-center"
        >Pedmetria</v-list-item-title
      >
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item
      color="grey"
      v-for="(item, index) in navItems"
      :key="index"
      :to="item.link"
    >
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ item.title }} </v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navItems: [
          {
            title: "Ajustes",
            icon: "mdi-cog",
            link: "/",
          },
          {
            title: "Hidratação",
            icon: "mdi-water-outline",
            link: "/hidratacao",
          },
          {
            title: "Vacinação",
            icon: "mdi-needle",
            link: "/vacinacao",
          },
        ],
      };
    },
  };
</script>

<style></style>
