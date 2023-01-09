<script setup>
import { RouterLink, RouterView } from "vue-router";

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/indoorroaming">IndoorRoaming</RouterLink>
        <RouterLink to="/indoorroaming2">IndoorRoaming2</RouterLink>
        <RouterLink to="/cube2048">cube2048</RouterLink>
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
</style>
