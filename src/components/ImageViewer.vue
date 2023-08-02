<template>
  <div class="medias-viewer">
    <button @click="exit" class="exit-button">
      <img src="../assets/icons/exit.svg" alt="Quitter" />
    </button>

    <div class="medias-container">
      <img
        v-for="(media, index) in props.medias"
        :key="`image-${index}`"
        :alt="media.description"
        :src="`./assets/img/${media.path}.png`"
        :class="{ 'website-image': media.type === ImageType.WEBSITE }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageType from '../enums/image-type.enum.ts';

const emit = defineEmits(['exit']);
const props = defineProps({
  medias: Array,
});

const exit = () => {
  emit('exit');
};
</script>

<style scoped lang="postcss">
.medias-viewer {
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  backdrop-filter: blur(16px);

  .exit-button {
    position: absolute;
    top: 20px;
    right: 10px;
    border: none;
    cursor: pointer;
    background: transparent;

    @media (min-width: 640px) {
      top: 30px;
      right: 30px;
    }
  }

  .medias-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 24px;
    overflow: auto;
    padding: 60px 24px;
    -ms-overflow-style: none;
    scrollbar-width: thin;
    scrollbar-color: #000000 #000000;

    @media (min-width: 640px) {
      display: flex;
      flex-direction: row;
      height: 75%;
      padding: 24px 50px;
    }

    &::-webkit-scrollbar {
      width: 2px;
      background: transparent;

      @media (min-width: 640px) {
        height: 2px;
      }
    }

    &::-webkit-scrollbar-track {
      margin: 0 50px;
      background: rgba(0, 0, 0, 0.2);
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.6);
    }

    &:hover::-webkit-scrollbar-thumb {
      margin: 0 50px;
      background: rgba(0, 0, 0, 1);
    }

    img {
      height: 85%;

      @media (min-width: 640px) {
        display: flex;
        height: 100%;
      }
    }
  }
}
</style>
