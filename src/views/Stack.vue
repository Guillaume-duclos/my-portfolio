<template>
  <PageContent>
    <aside v-if="showTitle" class="title" ref="container">
      <div>
        <div>
          <h3>Domaine</h3>

          <h2>
            <span v-for="(title, index) in titles" :key="`title-${index}`" class="titles-container">
              <span class="titles-sub-container">
                <span v-for="(word, index) in title" :key="`word-${index}`" class="words-container">
                  {{ word }}
                </span>
              </span>
            </span>
          </h2>
        </div>

        <p class="active-company-index-container" v-if="companyCount">
          <span class="active-company-index">
            <span v-for="index in Stack.length" :key="`company-${index}`">0</span>
          </span>
          <span class="active-company-index">
            <span v-for="index in Stack.length" :key="`company-${index}`">
              {{ index }}
            </span>
          </span>
          <span class="company-count">/{{ companyCount }}</span>
        </p>
      </div>
    </aside>

    <main class="content" ref="contentContainer">
      <div class="content-lists-container" ref="content">
        <div v-for="(company, index) in Stack" :key="`company-${index}`">
          <p v-if="!showTitle" class="content-title">{{ company.title }}</p>
          <ul>
            <Item
              v-for="(project, index) in company.list"
              :key="`project-${index}`"
              :data="project"
              :index="index"
              :isViewExtended="itemViewExtended"
              :enableViewOpen="false"
              :enableViewExtend="showTitle"
              @extendView="extendItemView"
              @updateActivesItem="updateActivesItem"
              @refreshScrollTrigger="refreshScrollTrigger"
              @updateBackgroundColor="updateBackgroundColor">
              <div v-if="project.content?.description" class="content-container">
                <h6>Le projet</h6>
                <p class="content-text" v-html="project.content?.description" />
              </div>
            </Item>
          </ul>
        </div>
      </div>

      <Navigation
        :previousPage="{ label: 'Projets professionnels', name: 'ProfessionalProjects' }"
        :nextPage="{ label: 'Stack', name: 'Stack' }" />
    </main>
  </PageContent>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Stack from '../data/stack.json';
import Navigation from '../components/Navigation.vue';
import Item from '../components/Item.vue';
import PageContent from '../components/PageContent.vue';

const pageTitle = ref();
const contentContainer = ref();
const content = ref();
const activeList = ref(0);
const activesItem = ref<number[]>([]);
const itemViewExtended = ref(false);
const titles = ref([
  ['front', 'back', 'mobile'],
  ['end', 'end', ''],
  ['', '', ''],
]);

const props = defineProps({
  pageLoaded: Array<String>,
});

const emit = defineEmits(['updatePageLoaded']);
const route = useRoute();

const showTitle = useMediaQuery('(min-width: 760px)');
let root = document.documentElement;

onMounted(() => {
  gsap.registerPlugin(CustomEase);
  gsap.registerPlugin(ScrollTrigger);
  CustomEase.create('expendEase', '0.56, 0.14, 0.27, 0.97');
  CustomEase.create('countEase', '0.4, 0.11, 0.45, 0.97');

  if (!props.pageLoaded.includes(route.name)) {
    gsap.set(`.titles-sub-container`, {
      marginTop: 66 + 3,
    });

    gsap.to(`.titles-sub-container`, {
      marginTop: 0,
      duration: 0.8,
      ease: 'appearEase',
    });

    // On indique que la page a été chargée
    emit('updatePageLoaded', { name: route.name });
  }

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

watch(activeList, (newValue) => {
  updateActiveListTitle(newValue);
  updateActiveListIndex(newValue);
});

const updateActiveListTitle = (newValue: number) => {
  for (let i = 0; i < titles.value.length; i++) {
    gsap.to(`.titles-sub-container`, {
      marginTop: `-${(66 + 3 * i) * newValue}px`,
      duration: 0.5,
      ease: 'countEase',
    });
  }
};

const updateActiveListIndex = (newValue: number) => {
  const timeLine = gsap.timeline();

  timeLine.to('.active-company-index:first-of-type', {
    top: `-${72 * newValue}px`,
    duration: 0.5,
  });

  timeLine.to(
    '.active-company-index:not(:first-of-type)',
    {
      top: `-${72 * newValue}px`,
      duration: 0.5,
      ease: 'countEase',
    },
    '-=0.42'
  );
};

// Compte le nombre de listes affichés
const companyCount = computed(() => {
  return ('0' + Stack?.length).slice(-2);
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
