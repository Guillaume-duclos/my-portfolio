<template>
  <section class="page">
    <aside v-if="showTitle" class="title" ref="titleContainer">
      <div>
        <h2>{{ titlePage }}</h2>
        <p v-if="companyCount">
          <span>{{ activeListIndex }}</span>
          <span>/{{ companyCount }}</span>
        </p>
      </div>
    </aside>

    <main class="content" ref="contentContainer">
      <div class="content-lists-container" ref="content">
        <div v-for="(company, index) in data" :key="`company-${index}`">
          <p v-if="!showTitle" class="content-title">{{ company.title }}</p>
          <ul @mouseleave="updateBackgroundColor">
            <Item
              v-for="(project, index) in company.list"
              :key="`project-${index}`"
              :data="project"
              :index="index"
              :isViewExtended="itemViewExtended"
              :enableViewExtend="showTitle"
              @extendView="extendItemView"
              @updateActivesItem="updateActivesItem"
              @refreshScrollTrigger="refreshScrollTrigger">
              <div class="content-container">
                <h6>Le projet :</h6>
                <p class="content-text" v-html="project.content?.description" />
              </div>

              <div class="content-container">
                <h6>Mes missions :</h6>
                <ul>
                  <li
                    v-for="(mission, index) in project.content?.missions"
                    :key="`mission-${index}`"
                    class="content-text missions"
                    v-html="mission" />
                </ul>
              </div>

              <div class="content-container">
                <h6>Stack :</h6>
                <ul>
                  <li v-for="(stack, index) in project.content?.stack" :key="`stack-${index}`">
                    <span class="content-list-title">{{ stack.name }} : </span>
                    <span class="content-list-text">{{ stack.technos }}</span>
                  </li>
                </ul>
              </div>

              <div class="content-container">
                <h6>Liens :</h6>
                <ul>
                  <li v-for="(link, index) in project.content?.links" :key="`stack-${index}`">
                    <a class="content-list-link" :href="link.link" target="_blank">{{
                      link.name
                    }}</a>
                  </li>
                </ul>
              </div>
            </Item>
          </ul>
        </div>
      </div>

      <Navigation
        :previousPage="{ label: 'Accueil', name: 'Home' }"
        :nextPage="{ label: 'Projets perso', name: 'PersonalProjects' }" />
    </main>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './Navigation.vue';
import Item from './Item.vue';

const titleContainer = ref();
const contentContainer = ref();
const content = ref();
const activeList = ref(0);
const activesItem = ref([]);
const itemViewExtended = ref(false);

const showTitle = useMediaQuery('(min-width: 760px)');
let root = document.documentElement;

const props = defineProps({
  data: Object,
});

onMounted(() => {
  gsap.registerPlugin(CustomEase);
  gsap.registerPlugin(ScrollTrigger);
  CustomEase.create('expendEase', '0.56, 0.14, 0.27, 0.97');

  for (let i = 0; i < content.value.children.length; i++) {
    ScrollTrigger.create({
      trigger: content.value.children[i],
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      markers: false,
      scroller: contentContainer.value,
      onUpdate: () => updateActiveList(i),
    });
  }
});

onUnmounted(() => {
  if (activesItem.value.length) {
    root.style.setProperty('--bg-color', '#FFFFFF');
  }
});

watch(showTitle, (value) => {
  if (value) {
    itemViewExtended.value = !itemViewExtended.value;
    gsap.set(contentContainer.value, { width: '50%', paddingLeft: '50%' });
  } else {
    gsap.set(contentContainer.value, { width: '100%', paddingLeft: 0 });
  }
});

// Retourne le numéro de la liste courente
const activeListIndex = computed(() => {
  return ('0' + (activeList.value + 1)).slice(-2);
});

// Compte le nombre de listes affichés
const companyCount = computed(() => {
  return ('0' + props.data?.length).slice(-2);
});

// Retourne le titre de la liste courente
const titlePage = computed(() => {
  return props.data?.[activeList.value].title;
});

// Set l'index de la liste active
const updateActiveList = (index) => {
  activeList.value = index;
};

// On met à jour la liste des items actifs
const updateActivesItem = (value) => {
  if (value.active) {
    activesItem.value.push(value.index);
  } else {
    activesItem.value = activesItem.value.filter((item) => item !== value.index);
  }
};

// Refresh le scrollTrigger lors de l'ouverture de la fermeture d'un item
const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

// On met à jour la couleur de fond
const updateBackgroundColor = () => {
  if (!activesItem.value.length) {
    root.style.setProperty('--bg-color', '#FFFFFF');
  } else {
    root.style.setProperty('--bg-color', activesItem.value[activesItem.value.length - 1]);
  }
};

// On étend la vue des items
const extendItemView = () => {
  gsap.set(contentContainer.value, { width: itemViewExtended.value ? '100%' : '50%' });

  gsap.to(titleContainer.value, {
    duration: 0.6,
    marginLeft: itemViewExtended.value ? 0 : '-50%',
    ease: 'expendEase',
  });

  gsap.to(contentContainer.value, {
    duration: 0.6,
    paddingLeft: itemViewExtended.value ? '50%' : 0,
    width: itemViewExtended.value ? '50%' : '100%',
    ease: 'expendEase',
  });

  itemViewExtended.value = !itemViewExtended.value;
};
</script>

<style scoped lang="sass">
.page
  display: flex
  position: relative
  justify-content: space-between
  height: calc(100vh - 80px - 48px)
  border: 0px solid black

  .title
    width: 50%
    height: 100%
    border: 0px solid black

    div
      display: flex
      flex-direction: column
      justify-content: space-between
      height: calc(100vh - 80px - 24px * 2)

      h2, p
        margin: 0
        line-height: 70px
        font-size: 80px
        font-weight: 800
        text-transform: uppercase

      h2
        white-space: pre-wrap
        word-wrap: break-word

      p

        span:first-of-type
          letter-spacing: -4px
          font-variant-numeric: tabular-nums

        span:last-of-type
          line-height: 30px
          font-size: 30px

  .content
    display: flex
    position: absolute
    flex-direction: column
    margin-top: calc(-80px - 24px)
    padding-top: 80px
    padding-left: 0
    width: 100%
    height: calc(100vh - 80px)
    overflow: auto
    -ms-overflow-style: none
    scrollbar-width: none
    border: 0px solid black

    &::-webkit-scrollbar
      width: 0
      background: transparent

    @media (min-width: 760px)
      width: 50%
      padding-left: 50%

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
