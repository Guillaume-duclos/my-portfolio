<template>
  <PageContent>
    <PageTitle
      ref="pageTitle"
      :titlePage="titlePage"
      :activeListIndex="activeListIndex"
      :companyCount="companyCount"
      :hide="itemViewExtended" />

    <main class="content" ref="contentContainer">
      <div class="content-lists-container" ref="content">
        <div v-for="(company, index) in PersonalProjects" :key="`company-${index}`">
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
        :previousPage="{ label: 'Projets Pro', name: 'ProfessionalProjects' }"
        :nextPage="{ label: 'Stack', name: 'Stack' }" />
    </main>
  </PageContent>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PersonalProjects from '../data/professional-projects.json';
import Navigation from '../components/Navigation.vue';
import Item from '../components/Item.vue';
import PageContent from '../components/PageContent.vue';
import PageTitle from '../components/PageTitle.vue';

const pageTitle = ref();
const contentContainer = ref();
const content = ref();
const activeList = ref(0);
const activesItem = ref([]);
const itemViewExtended = ref(false);

const showTitle = useMediaQuery('(min-width: 760px)');
let root = document.documentElement;

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
  return ('0' + PersonalProjects?.length).slice(-2);
});

// Retourne le titre de la liste courente
const titlePage = computed(() => {
  return PersonalProjects?.[activeList.value].title;
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

  gsap.to(pageTitle.value.container, {
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
