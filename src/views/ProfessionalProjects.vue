<template>
  <section class="page projects">
    <aside>
      <div>
        <h2>Front<br />End</h2>
        <p>
          01<span>/{{ companyCount }}</span>
        </p>
      </div>
    </aside>

    <main>
      <ul v-for="(company, index) in ProfessionalProjects" :key="`company-${index}`">
        <li v-for="(projet, index) in company.projects" :key="`project-${index}`">
          <Item :data="projet" />
        </li>
      </ul>

      <Navigation
        :previousPage="{ label: 'Home', name: 'Home' }"
        :nextPage="{ label: 'Projets perso', name: 'PersonalProjects' }" />
    </main>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Item from '../components/Item.vue';
import ProfessionalProjects from '../data/professional-projects.json';
import Navigation from '../components/Navigation.vue';

// Compte le nombre de listes affichés
const companyCount = computed(() => {
  return ('0' + ProfessionalProjects.length).slice(-2);
});
</script>

<style scoped lang="sass">
.page
  display: flex
  justify-content: space-between
  flex: 1
  height: calc(100vh - 80px - 24px * 2)
  padding: calc(80px + 24px) 24px 24px 24px
  border: 0px solid black

  aside
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

      span
        line-height: 30px
        font-size: 30px

  main
    flex: 1
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
