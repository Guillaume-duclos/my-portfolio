<template>
  <div class="app">
    <Header v-if="route.name !== 'Home'" />

    <router-view v-slot="{ Component }">
      <transition v-on:enter="enter" v-on:leave="leave" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { useTitle } from '@vueuse/core';
import { CustomEase } from 'gsap/CustomEase';
import Header from './components/Header.vue';

const route = useRoute();
const title = useTitle();
const enableTransition = ref(false);

watch(
  () => route.name,
  () => {
    title.value = `Portfolio de Guillaume Duclos - ${route.meta.name}`;
  }
);

onMounted(() => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create('opacityEase', '0.25, 0.1, 0.25, 1');
});

// Animation d'ouverture de l'item
const enter = (element: any, done: any) => {
  if (enableTransition.value) {
    // Affichage de la page
    gsap.fromTo(
      element,
      {
        scale: 0.96,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 0.2,
        onComplete: done,
        clearProps: 'scale',
      }
    );
  } else {
    enableTransition.value = true;
  }
};

// Animation de fermeture de l'item
const leave = (element: any, done: any) => {
  // On cache la page
  gsap.fromTo(
    element,
    {
      scale: 1,
      autoAlpha: 1,
    },
    {
      scale: 0.96,
      autoAlpha: 0,
      duration: 0.2,
      onComplete: done,
    }
  );
};
</script>

<style lang="sass">
.app
  display: flex
  position: relative
  flex-direction: column
  border: 0px solid black
</style>
