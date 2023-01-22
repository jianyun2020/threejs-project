<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useStore } from "./stores";

const store = useStore()

</script>

<template>
  <header>
    <div class="wrapper">
      <nav :class="[store.navState ? '' : 'hide-nav']">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/indoorroaming">IndoorRoaming</RouterLink>
        <RouterLink to="/indoorroaming2">IndoorRoaming2</RouterLink>
        <RouterLink to="/cube2048">Cube2048</RouterLink>
        <RouterLink to="/smartcity">SmartCity</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;;
}

.wrapper nav {
  display: flex;
  justify-content: space-evenly;
}

.hide-nav {
  display: none !important;
}
</style>
