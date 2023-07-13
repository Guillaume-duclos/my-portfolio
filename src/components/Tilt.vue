<template>
  <div class="container" ref="container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VanillaTilt from 'vanilla-tilt';

const container = ref();

onMounted(() => {
  VanillaTilt.init(container.value, { max: 4, glare: true, 'max-glare': 0.3 });
});
</script>

<style lang="sass">
.container
  display: flex
  align-items: center
  height: 100%
  will-change: transform
  transform-style: preserve-3d

  img
    display: block
    max-width: 100%
    max-height: 100%
    backface-visibility: hidden
</style>
