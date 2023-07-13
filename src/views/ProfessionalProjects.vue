<template>
  <section class="page projects">
    <PageTitle
      :titlePage="titlePage"
      :activeListIndex="activeListIndex"
      :companyCount="companyCount" />

    <main class="content">
      <div class="content-lists-container" ref="content">
        <div v-for="(company, index) in ProfessionalProjects" :key="`company-${index}`">
          <p v-if="showTitle" class="content-title">{{ company.title }}</p>
          <ul @mouseleave="updateBackgroundColor">
            <Item
              v-for="(project, index) in company.list"
              :key="`project-${index}`"
              :data="project"
              :index="index"
              @updateActivesItem="updateActivesItem"
              @refreshScrollTrigger="refreshScrollTrigger">
              <p class="content-text">{{ project.content.description }}</p>

              <div class="content-container">
                <h6>Missions :</h6>
                <p class="content-text missions">{{ project.content.missions }}</p>
              </div>

              <div class="content-container">
                <h6>Stack :</h6>
                <ul>
                  <li v-for="(stack, index) in project.content.stack" :key="`stack-${index}`">
                    <span class="content-list-title">{{ stack.name }} : </span>
                    <span class="content-list-text">{{ stack.technos }}</span>
                  </li>
                </ul>
              </div>

              <div class="content-container">
                <h6>Liens :</h6>
                <ul>
                  <li v-for="(link, index) in project.content.links" :key="`stack-${index}`">
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
        :previousPage="{ label: 'Home', name: 'Home' }"
        :nextPage="{ label: 'Projets perso', name: 'PersonalProjects' }" />
    </main>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Item from '../components/Item.vue';
import ProfessionalProjects from '../data/professional-projects.json';
import Navigation from '../components/Navigation.vue';
import PageTitle from '../components/PageTitle.vue';

const content = ref();
const activeList = ref(0);
const activeItemCount = ref(0);
const showTitle = useMediaQuery('(max-width: 760px)');
let root = document.documentElement;

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
  return ('0' + ProfessionalProjects.length).slice(-2);
});

// Retourne le titre de la liste courente
const titlePage = computed(() => {
  return ProfessionalProjects[activeList.value].title;
});

// Set l'index de la liste active
const updateActiveList = (index) => {
  activeList.value = index;
};

// On met à jour la liste des items actifs
const updateActivesItem = (value) => {
  if (value.active) {
    activeItemCount.value += 1;
  } else {
    activeItemCount.value -= 1;
  }
};

// Refresh le scrollTrigger lors de l'ouverture de la fermeture d'un item
const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

const updateBackgroundColor = () => {
  if (!activeItemCount.value) {
    root.style.setProperty('--bg-color', '#FFFFFF');
  }
};
</script>
