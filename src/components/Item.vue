<template>
  <li>
    <header @click="open">
      <div>
        <h4>{{ props.data?.name || props.title }}</h4>
        <h5>{{ props.data?.scope || props.subTitle }}</h5>
      </div>

      <img v-if="visible" src="../assets/icons/close.svg" alt="Fermer" />
      <img v-else src="../assets/icons/open.svg" alt="Ouvrir" />
    </header>

    <transition name="item" v-on:enter="enter" v-on:leave="leave">
      <div class="content" v-show="visible">
        <p class="description">{{ props.data?.description }}</p>
        <slot />
      </div>
    </transition>
  </li>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

const emit = defineEmits(['open']);

const props = defineProps({
  data: Object,
  title: String,
  subTitle: String,
});

const visible = ref(false);

onMounted(() => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create('heightEase', '0.76, 0.07, 0.53, 0.89');
  CustomEase.create('opacityEase', '0.25, 0.1, 0.25, 1');
});

// Animation d'ouverture de l'item
const enter = (element: any, done: any) => {
  // On créer la timeline
  let timeline = gsap.timeline({ onComplete: done });

  // On set l'opacité du contenu à 0
  timeline.set(element, {
    opacity: 0,
    height: 0,
  });

  // Ouverture de l'item
  timeline.to(element, {
    duration: 0.4,
    height: element.scrollHeight,
    ease: 'heightEase',
    onComplete: () => emit('open'),
  });

  // Opacité du contenu
  timeline.to(element, {
    duration: 0.2,
    opacity: 1,
    ease: 'opacityEase',
  });
};

// Animation de fermeture de l'item
const leave = (element: any, done: any) => {
  // Opacité du contenu
  gsap.to(element, {
    duration: 0.4,
    opacity: 0,
    height: 0,
    ease: 'heightEase',
    onComplete: () => emit('open'),
  });
};

// On set l'affichage ou non de l'item
const open = () => {
  visible.value = !visible.value;
};
</script>

<style scoped lang="sass">
li
  position: relative
  padding: 30px 0
  cursor: pointer
  border-bottom: 1px solid rgba(0, 0, 0, .08)

  header
    display: flex
    justify-content: space-between

    h4, h5
      margin: 0

    h4
      font-size: 18px

    h5
      margin-top: 4px
      font-weight: 600
      opacity: .4

  .content
    overflow: hidden

    .description
      margin: 20px 0 0 0
      font-size: 14px
      opacity: .4
      font-weight: 500
</style>
