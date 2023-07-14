<template>
  <div class="app">
    <Header />

    <router-view v-slot="{ Component }">
      <transition v-on:enter="enter" v-on:leave="leave" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { useRoute } from 'vue-router';
import { onMounted, watch } from 'vue';
import { useTitle } from '@vueuse/core';
import { CustomEase } from 'gsap/CustomEase';
import Header from './components/Header.vue';

const route = useRoute();
const title = useTitle();

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
  position: relative
  display: flex
  flex-direction: column
  padding: calc(80px + 24px) 24px 0 24px
  border: 0px solid black

  @media (min-width: 1100px)
    padding: calc(80px + 24px) 54px 24px 54px

  .page
    display: flex
    justify-content: space-between
    height: calc(100vh - 80px - 48px)
    border: 0px solid black

    .content
      display: flex
      flex-direction: column
      margin-top: calc(-80px - 24px)
      padding-top: 80px
      width: 50%
      height: calc(100vh - 80px)
      overflow: auto
      -ms-overflow-style: none
      scrollbar-width: none
      border: 0px solid black

      &::-webkit-scrollbar
        width: 0
        background: transparent

      @media (min-width: 760px)
        // max-width: 600px

      .content-lists-container
        border: 0px solid red

        .content-title
          margin: 0
          font-size: 32px
          font-weight: 700

        > div
          margin-bottom: 80px

          ul
            margin: 0
            padding: 0
            width: 100%

            li
              list-style-type: none

          &:last-of-type
            margin-bottom: 80px

          @media (min-width: 760px)
            margin-bottom: 120px
</style>
