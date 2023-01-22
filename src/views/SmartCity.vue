<template>
  <div class="smartcity">
    <Scene />
    <BigScreen></BigScreen>
  </div>
</template>

<script setup>
  import Scene from '@/components/Scene.vue'
  import BigScreen from '@/components/BigScreen.vue'
</script>

<style scoped>
.smartcity {
  position: relative;
}
</style>