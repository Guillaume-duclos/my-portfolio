<template>
  <section class="page projects">
    <aside class="title">
      <div>
        <h2>{{ titlePage }}</h2>
        <p>
          {{ activeListIndex }}<span>/{{ companyCount }}</span>
        </p>
      </div>
    </aside>

    <main class="content" ref="content">
      <ul
        v-for="(company, index) in ProfessionalProjects"
        :key="`company-${index}`"
        :ref="`list-${index}`">
        <Item
          v-for="(projet, index) in company.projects"
          :key="`project-${index}`"
          :data="projet" />
      </ul>

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
const list = ref();
const activeList = ref(0);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  console.log(content.value.children);
  console.log(content.value.children.length);

  // Object.keys(list.value).forEach((el) => {
  //   console.log(list.value[el][0]);
  // });

  for (let i = 0; i < content.value.children.length; i++) {
    console.log(content.value.children[i]);

    gsap.to(content.value.children[i], {
      scrollTrigger: {
        trigger: content.value.children[i],
        start: 'top center',
        end: '20% center',
        scrub: true,
        markers: true,
      },
      onStart: () => updateActiveList(i),
    });
  }

  //   content.value.children.forEach((element) => {
  //     console.log(element);
  //
  //     gsap.to(element, {
  //       scrollTrigger: {
  //         trigger: element,
  //         start: 'top center',
  //         end: '20% center',
  //         scrub: true,
  //       },
  //       duration: 0.8,
  //       opacity: 1,
  //     });
  //   });
  // }
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

const updateActiveList = (index) => {
  activeList.value = index;
};
</script>

<style scoped lang="sass">
.page
  flex: 1
  display: flex
  justify-content: space-between
  height: calc(100vh - 80px - 24px * 2)
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

      span
        line-height: 30px
        font-size: 30px

  .content
    flex: 1
    height: 100%
    max-width: 500px
    border: 0px solid black

    ul
      margin: 0
      padding: 0
      width: 100%
      max-width: 500px
      overflow: auto
      border: 0px solid red

      &:not(:last-of-type)
        margin-bottom: 130px

      li
        list-style-type: none

    &::-webkit-scrollbar
      display: none
</style>
