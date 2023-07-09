<template>
  <div class="app">
    <Header />

    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<style scoped lang="sass">
.app
  position: relative
  display: flex
  flex-direction: column
  height: 100%

  .scale-enter-active, .scale-leave-active
    transition: all .35s ease

  .scale-enter-from, .scale-leave-to
    opacity: 0
    transform: scale(.95)
</style>
