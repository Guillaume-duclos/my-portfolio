<template>
  <section class="page projects">
    <aside class="title">
      <div>
        <h2>{{ titlePage }}</h2>
        <p>
          <span>{{ activeListIndex }}</span>
          <span>/{{ companyCount }}</span>
        </p>
      </div>
    </aside>

    <main class="content">
      <div class="content-lists-container" ref="content">
        <ul v-for="(company, index) in ProfessionalProjects" :key="`company-${index}`">
          <Item
            v-for="(projet, index) in company.projects"
            :key="`project-${index}`"
            :data="projet"
            @open="refreshScrollTrigger" />
        </ul>
      </div>

      <Navigation
        :previousPage="{ label: 'Home', name: 'Home' }"
        :nextPage="{ label: 'Projets perso', name: 'PersonalProjects' }" />
    </main>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Item from '../components/Item.vue';
import ProfessionalProjects from '../data/professional-projects.json';
import Navigation from '../components/Navigation.vue';

const content = ref();
const activeList = ref(0);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  for (let i = 0; i < content.value.children.length; i++) {
    ScrollTrigger.create({
      trigger: content.value.children[i],
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      markers: true,
      onUpdate: () => updateActiveList(i),
    });
  }
});

// Retourne le numéro de la liste courente
const activeListIndex = computed(() => {
  return ('0' + (activeList.value + 1)).slice(-2);
});

// Compte le nombre de listes affichés
const companyCount = computed(() => {
  return ('0' + ProfessionalProjects.length).slice(-2);
});

// Retourne le titre de la liste courente
const titlePage = computed(() => {
  return ProfessionalProjects[activeList.value].company;
});

// Set l'index de la liste active
const updateActiveList = (index) => {
  activeList.value = index;
};

// Refresh le scrollTrigger lors de l'ouverture de la fermeture d'un item
const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};
</script>

<style scoped lang="sass">
.page
  flex: 1
  display: flex
  justify-content: space-between
  height: calc(100vh - 80px - 48px)
  padding: calc(80px + 24px) 24px 24px 24px
  border: 0px solid red

  .title
    flex: 1
    position: relative
    display: flex
    flex-direction: column
    justify-content: space-between
    height: 100%
    border: 0px solid black

    div
      position: fixed
      display: flex
      flex-direction: column
      justify-content: space-between
      height: calc(100% - 80px - 24px * 2)

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
    flex: 1
    max-width: 500px
    border: 0px solid black

    .content-lists-container
      border: 1px solid black

      ul
        margin: 0
        padding: 0
        width: 100%
        max-width: 500px
        border: 1px solid red

        &:not(:last-of-type)
          margin-bottom: 130px

        li
          list-style-type: none

      &::-webkit-scrollbar
        display: none
</style>
