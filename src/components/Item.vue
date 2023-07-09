<template>
  <li>
    <header @click="open">
      <div>
        <h4>{{ props.data.name }}</h4>
        <h5>{{ props.data.scope }}</h5>
      </div>

      <img v-if="visible" src="../assets/icons/close.svg" alt="Fermer" />
      <img v-else src="../assets/icons/open.svg" alt="Ouvrir" />
    </header>

    <transition name="item" v-on:enter="enter" v-on:leave="leave">
      <div class="content" v-show="visible">
        <p class="description">{{ props.data.description }}</p>
      </div>
    </transition>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

const emit = defineEmits(['open']);

const props = defineProps({
  data: Object,
});

const visible = ref(false);

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
    ease: 'power3.inOut',
    onComplete: () => emit('open'),
  });

  // Opacité du contenu
  timeline.to(element, {
    duration: 0.4,
    opacity: 1,
    ease: 'power3.inOut',
  });
};

const leave = (element: any, done: any) => {
  // Opacité du contenu
  gsap.to(element, {
    duration: 0.4,
    height: 0,
    opacity: 0,
    ease: 'power3.inOut',
    onComplete: () => emit('open'),
  });
};

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
