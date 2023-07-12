<template>
  <section class="page projects">
    <PageTitle
      :titlePage="titlePage"
      :activeListIndex="activeListIndex"
      :companyCount="companyCount" />

    <main class="content">
      <div class="content-lists-container" ref="content">
        <div v-for="(company, index) in Stacks" :key="`company-${index}`">
          <p v-if="showTitle" class="content-title">{{ company.title }}</p>
          <ul>
            <Item
              v-for="(projet, index) in company.list"
              :key="`project-${index}`"
              :data="projet"
              @open="refreshScrollTrigger" />
          </ul>
        </div>
      </div>

      <Navigation
        :previousPage="{ label: 'Projets perso', name: 'PersonalProjects' }"
        :nextPage="{ label: 'Me contacter', name: 'Contact' }" />
    </main>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Item from '../components/Item.vue';
import Stacks from '../data/stack.json';
import Navigation from '../components/Navigation.vue';
import PageTitle from '../components/PageTitle.vue';

const content = ref();
const activeList = ref(0);
const showTitle = useMediaQuery('(max-width: 760px)');

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  for (let i = 0; i < content.value.children.length; i++) {
    ScrollTrigger.create({
      trigger: content.value.children[i],
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      markers: false,
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
  return ('0' + Stacks.length).slice(-2);
});

// Retourne le titre de la liste courente
const titlePage = computed(() => {
  return Stacks[activeList.value].title;
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
