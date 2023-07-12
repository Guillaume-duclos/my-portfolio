<template>
  <li class="item">
    <header @click="open">
      <div>
        <h4>{{ props.data?.title || props.title }}</h4>
        <h5>{{ props.data?.subTitle || props.subTitle }}</h5>
      </div>

      <img v-if="visible" src="../assets/icons/close.svg" alt="Fermer" />
      <img v-else src="../assets/icons/open.svg" alt="Ouvrir" />
    </header>

    <transition v-on:enter="enter" v-on:leave="leave" class="content-transition">
      <div class="content" v-show="visible">
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

<style lang="sass">
.item
  position: relative
  padding: 30px 0
  border-bottom: 1px solid rgba(0, 0, 0, .08)

  header
    display: flex
    justify-content: space-between
    cursor: pointer

    h4, h5
      margin: 0

    h4
      font-size: 18px

    h5
      margin-top: 4px
      font-weight: 600
      opacity: .4

  .content-transition
    opacity: 0
    height: 0

  .content
    overflow: hidden

    .content-text
      margin: 20px 0 0 0
      font-size: 14px
      opacity: .6

    .content-container
      margin: 20px 0
      border: 0px solid black

      h6
        margin: 32px 0 10px 0
        font-size: 14px

      ul
        border: 0px solid black

        li
          padding: 5px 0
          font-size: 14px
          border: 0px solid black

          .content-list-title
            font-weight: 500

          .content-list-text
            opacity: .6

          .content-list-link
            position: relative
            opacity: .6
            color: #000000
            text-decoration: none

            &:after
              content: url('../assets/icons/arrow-link.svg')
              height: 6px
              transform: scale(.9)
              position: absolute
              right: -16px
              top: -4px
              visibility: hidden

            &:hover
              text-decoration: underline

              &:after
                visibility: visible
</style>
