<template>
  <nav>
    <div>
      <router-link :to="previousPage.name">
        <img src="../assets/icons/arrow-left.svg" alt="Page précédente" />
        {{ previousPage.label }}
      </router-link>
    </div>

    <div>
      <router-link :to="nextPage.name">
        {{ nextPage.label }}
        <img src="../assets/icons/arrow-right.svg" alt="Page suivante" />
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps({
  previousPage: Object<String>,
  nextPage: Object<String>,
});
</script>

<style scoped lang="sass">
nav
  display: flex
  justify-content: space-between
  margin-top: 30px
  padding-bottom: 100px
  border: 0px solid black

  div
    border: 0px solid black

    a
      display: flex
      grid-gap: 10px
      align-items: center
      color: #000000
      font-size: 14px
      font-weight: 600
      text-decoration: none

      img
        height: 14px
</style>
