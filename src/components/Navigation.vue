<template>
  <nav>
    <div>
      <router-link :to="props.previousPage?.name">
        <img src="../assets/icons/arrow-left.svg" alt="Page précédente" />
        {{ props.previousPage.label }}
      </router-link>
    </div>

    <div>
      <router-link :to="props.nextPage?.name">
        {{ props.nextPage.label }}
        <img src="../assets/icons/arrow-right.svg" alt="Page suivante" />
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';

interface Path {
  name: RouteLocationRaw;
  label: String;
}

const props = defineProps({
  previousPage: {
    type: Object as PropType<Path>,
    required: true,
  },
  nextPage: {
    type: Object as PropType<Path>,
    required: true,
  },
});
</script>

<style scoped lang="postcss">
nav {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding-bottom: 100px;

  div a {
    display: flex;
    grid-gap: 10px;
    align-items: center;
    color: #000000;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;

    img {
      height: 14px;
    }
  }
}
</style>
