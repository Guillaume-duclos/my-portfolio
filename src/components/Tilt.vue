<template>
  <div class="container" ref="container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useEventListener } from '@vueuse/core';

const container = ref();

onMounted(() => {
  let root = document.documentElement;

  useEventListener(container.value, 'mousemove', (event) => {
    container.value.style.transition = 'transform 0s ease-in-out';

    const position = event as MouseEvent;
    let angleX;
    let angleY;
    let positionX = (position.offsetX / container.value.clientWidth) * 100;
    let positionY = (position.offsetY / container.value.clientHeight) * 100;

    root.style.setProperty('--positionX', `${positionX}%`);
    root.style.setProperty('--positionY', `${positionY}%`);

    if (position.offsetY > container.value.clientHeight / 2) {
      angleX =
        10 -
        ((container.value.clientHeight - position.offsetY) / (container.value.clientHeight / 2)) *
          10;
    } else {
      angleX =
        -10 -
        (1 - container.value.clientHeight / (container.value.clientHeight - position.offsetY)) * 10;
    }

    if (position.offsetX > container.value.clientWidth / 2) {
      angleY =
        -10 +
        ((container.value.clientWidth - position.offsetX) / (container.value.clientWidth / 2)) * 10;
    } else {
      angleY = Math.abs(
        10 -
          ((container.value.clientWidth - position.offsetX) / (container.value.clientWidth / 2)) *
            10
      );
    }

    container.value.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  });

  useEventListener(container.value, 'mouseout', () => {
    container.value.style.transition = 'transform .2s ease-in-out';
    container.value.style.transform = 'rotateX(0) rotateY(0)';
  });
});
</script>

<style lang="sass">
.container
  height: 100%
  will-change: transform
  transform-style: preserve-3d

  img
    display: block
    max-width: 100%
    max-height: 100%
    backface-visibility: hidden
</style>
