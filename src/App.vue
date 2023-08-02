<template>
  <div class="app">
    <Header />

    <router-view v-slot="{ Component }">
      <transition v-on:enter="enter" v-on:leave="leave" mode="out-in">
        <component
          :is="Component"
          :pageLoaded="pageLoaded"
          @updatePageLoaded="updatePageLoaded"
          @displayMediasViewer="displayMediasViewer" />
      </transition>
    </router-view>
  </div>

  <transition v-on:enter="enter" v-on:leave="leave" mode="out-in">
    <ImageViewer v-if="mediasViewerData" @exit="hideMediasViewer" :medias="mediasViewerData" />
  </transition>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTitle } from '@vueuse/core';
import Header from './components/Header.vue';
import ImageViewer from './components/ImageViewer.vue';

const route = useRoute();
const title = useTitle();
const enableTransition = ref(false);
const mediasViewerData = ref();
const pageLoaded = ref([]);

watch(
  () => route.name,
  () => {
    title.value = `Portfolio de Guillaume Duclos - ${route.meta.name}`;
  }
);

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

// On met à jour les pages déjà visitées une première fois
const updatePageLoaded = (page) => {
  pageLoaded.value.push(page.name);
};

// On affiche les médias
const displayMediasViewer = (medias) => {
  mediasViewerData.value = medias;
};

// On cache les médias
const hideMediasViewer = () => {
  mediasViewerData.value = null;
};
</script>

<style lang="postcss">
.app {
  display: flex;
  position: relative;
  flex-direction: column;
}
</style>
