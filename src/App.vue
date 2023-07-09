<template>
  <div class="app">
    <Header />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<style scoped lang="sass">
.app
  display: flex
  flex-direction: column
  height: 100%
  border: 0px solid red
</style>
