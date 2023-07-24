<template>
  <PageContent>
    <aside v-if="showTitle" class="title" ref="container">
      <div>
        <div>
          <h3>Hello <span>👋</span>, je m'appelle</h3>

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

        <div class="rs-links">
          <ul>
            <li>
              <a href="https://github.com/guillaume-duclos" target="_blank">Github</a>
            </li>
            <li>
              <a href="https://twitter.com/GuillaumeDcl" target="_blank">Twitter</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/duclos-guillaume" target="_blank">Linkedin</a>
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <main class="content" ref="contentContainer">
      <div class="content-lists-container" ref="content">
        <ul v-for="(link, index) in Links" :key="`link-${index}`">
          <li class="item">
            <a v-if="link.externalLink" :href="link.route" target="_blank">
              <div>
                <h4>{{ link.title }}</h4>
                <h5 v-html="link.subTitle" />
              </div>

              <div class="header-buttons">
                <button>
                  <img src="../assets/icons/arrow-right.svg" alt="Ouvrir" />
                </button>
              </div>
            </a>
            <RouterLink v-else :to="link.route">
              <div>
                <h4>{{ link.title }}</h4>
                <h5 v-html="link.subTitle" />
              </div>

              <div class="header-buttons">
                <button>
                  <img src="../assets/icons/arrow-right.svg" alt="Ouvrir" />
                </button>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </main>
  </PageContent>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProfessionalProjects from '../data/professional-projects.json';
import Links from '../data/links.json';
import PageContent from '../components/PageContent.vue';

const contentContainer = ref();
const content = ref();
const activeList = ref(0);
const activesItem = ref<number[]>([]);
const itemViewExtended = ref(false);
const titles = ref([
  ['Guillaume', '', ''],
  ['Duclos', '', ''],
  ['', '', ''],
]);

const showTitle = useMediaQuery('(min-width: 760px)');

onMounted(() => {
  gsap.registerPlugin(CustomEase);
  gsap.registerPlugin(ScrollTrigger);
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
      marginTop: `-${(62 + 3 * i) * newValue}px`,
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
</script>

<style scoped lang="sass">
.rs-links
  z-index: 2

  ul
    margin: 0
    padding: 0

    li
      list-style-type: none

      a
        color: #000000
        text-decoration: none
        font-weight: 600
        text-transform: uppercase

.content

  .content-lists-container

    ul
      margin: 0
      padding: 0

    .item
      position: relative
      list-style-type: none
      border-bottom: 1px solid rgba(0, 0, 0, .08)

      a
        display: flex
        grid-gap: 20px
        justify-content: space-between
        padding: 30px 0
        color: #000000
        text-decoration: none
        cursor: pointer

        h4, h5
          margin: 0

        h4
          font-size: 18px

        h5
          margin-top: 4px
          font-weight: 600
          color: rgba(0, 0, 0, .5)

          span
            color: rgba(0, 0, 0, 1)

        .header-buttons
          display: flex
          align-items: center
          grid-gap: 14px
          opacity: 1
          border: 0px solid black

          button
            padding: 0
            height: 16px
            border: none
            background: transparent
            cursor: pointer

            img
              display: block
              height: 100%
</style>
