<template>
  <PageContent>
    <aside v-if="showTitle" class="title" ref="container">
      <div>
        <div>
          <h2>{{ titlePage }}</h2>
          <h3>
            <span>Période</span>
            {{ period }}
          </h3>
        </div>

        <p class="active-company-index-container" v-if="companyCount">
          <span class="active-company-index">
            <span v-for="index in ProfessionalProjects.length" :key="`company-${index}`">0</span>
          </span>
          <span class="active-company-index">
            <span v-for="index in ProfessionalProjects.length" :key="`company-${index}`">
              {{ index }}
            </span>
          </span>
          <span class="company-count">/{{ companyCount }}</span>
        </p>
      </div>
    </aside>

    <main class="content" ref="contentContainer">
      <div class="content-lists-container" ref="content">
        <div v-for="(company, index) in ProfessionalProjects" :key="`company-${index}`">
          <p v-if="!showTitle" class="content-title">{{ company.title }}</p>
          <ul>
            <Item
              v-for="(project, index) in company.list"
              :key="`project-${index}`"
              :data="project"
              :index="index"
              :isViewExtended="itemViewExtended"
              :enableViewExtend="showTitle"
              @extendView="extendItemView"
              @updateActivesItem="updateActivesItem"
              @refreshScrollTrigger="refreshScrollTrigger"
              @updateBackgroundColor="updateBackgroundColor">
              <div v-if="project.content?.description" class="content-container">
                <h6>Le projet</h6>
                <p class="content-text" v-html="project.content?.description" />
              </div>

              <div
                v-if="
                  project.content.medias.length &&
                  project.content.medias[0].type !== ImageType.VIDEO
                "
                class="content-container">
                <h6>Images</h6>
                <div class="content-media">
                  <img
                    v-for="(media, index) in project.content.medias"
                    :key="`image-${index}`"
                    :src="`../assets/img/${media.path}.png`"
                    :alt="media.description"
                    :class="{ 'website-image': media.type === ImageType.WEBSITE }" />
                </div>
              </div>

              <div
                v-else-if="
                  project.content.medias.length &&
                  project.content.medias[0].type === ImageType.VIDEO
                "
                class="content-container">
                <h6>Vidéos</h6>
                <div class="content-media">
                  <iframe
                    v-for="(media, index) in project.content.medias"
                    :key="`image-${index}`"
                    :src="media.path"
                    title="Déballage d&#39;un vélo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen />
                </div>
              </div>

              <div v-else-if="project.content?.role" class="content-container">
                <h6>Role occupé</h6>
                <p class="content-text" v-html="project.content?.role" />
              </div>

              <div
                v-if="project.content?.missions && project.content?.missions.length"
                class="content-container">
                <h6>Mes missions</h6>
                <ul>
                  <li
                    v-for="(mission, index) in project.content?.missions"
                    :key="`mission-${index}`"
                    class="content-text missions"
                    v-html="mission" />
                </ul>
              </div>

              <div
                v-if="project.content?.stack && project.content?.stack.length"
                class="content-container">
                <h6>Stack</h6>
                <ul>
                  <li v-for="(stack, index) in project.content?.stack" :key="`stack-${index}`">
                    <span class="content-list-title">{{ stack.name }} : </span>
                    <span class="content-list-text">{{ stack.technos }}</span>
                  </li>
                </ul>
              </div>

              <div
                v-if="project.content?.links && project.content?.links.length"
                class="content-container">
                <h6>Liens</h6>
                <ul>
                  <li v-for="(link, index) in project.content?.links" :key="`stack-${index}`">
                    <a class="content-list-link" :href="link.link" target="_blank">
                      {{ link.name }}
                    </a>
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
  </PageContent>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageType from '../enums/image-type.enum.ts';
import ProfessionalProjects from '../data/professional-projects.json';
import Navigation from '../components/Navigation.vue';
import Item from '../components/Item.vue';
import PageContent from '../components/PageContent.vue';
import PageTitle from '../components/PageTitle.vue';

const pageTitle = ref();
const contentContainer = ref();
const content = ref();
const activeList = ref(0);
const activesItem = ref<number[]>([]);
const itemViewExtended = ref(false);
const timeLine = gsap.timeline();

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

watch(showTitle, (value: any) => {
  if (value && itemViewExtended.value) {
    itemViewExtended.value = false;
    gsap.set(contentContainer.value, { width: '50%', paddingLeft: '50%' });
  } else if (itemViewExtended.value) {
    gsap.set(contentContainer.value, { width: '100%', paddingLeft: 0 });
  }
});

watch(activeList, (newValue, oldValue) => {
  updateActiveListIndex(newValue, oldValue);
});

// Retourne le numéro de la liste courente
const activeListIndex = computed(() => {
  return ('0' + (activeList.value + 1)).slice(-2);
});

const updateActiveListIndex = (newValue: number, oldValue: number) => {
  console.log('updateActiveListIndex');
  console.log('newValue : ', newValue);
  console.log('oldValue : ', oldValue);

  timeLine.to('.active-company-index:first-of-type', {
    top: `-${72 * newValue}px`,
    duration: 0.5,
  });

  timeLine.to(
    '.active-company-index:not(:first-of-type)',
    {
      top: `-${72 * newValue}px`,
      duration: 0.5,
    },
    '-=0.42'
  );
};

// Compte le nombre de listes affichés
const companyCount = computed(() => {
  return ('0' + ProfessionalProjects?.length).slice(-2);
});

// Retourne le titre de la liste courente
const titlePage = computed(() => {
  return ProfessionalProjects?.[activeList.value].title;
});

// Retourne la période de la liste courente
const period = computed(() => {
  return ProfessionalProjects?.[activeList.value].period;
});

// Set l'index de la liste active
const updateActiveList = (index: number) => {
  activeList.value = index;
};

// On met à jour la liste des items actifs
const updateActivesItem = (value: any) => {
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
    gsap.to('html', { '--bg-color': '#FFFFFF', duration: 0.2 });
  } else {
    gsap.to('html', {
      '--bg-color': activesItem.value[activesItem.value.length - 1],
      duration: 0.2,
    });
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
