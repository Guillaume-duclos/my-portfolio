<template>
  <aside v-if="showTitle" class="title" ref="container">
    <div>
      <div>
        <h2>{{ props.titlePage }}</h2>
        <h3>
          <span>Période</span>
          {{ props.period }}
        </h3>
      </div>
      <p v-if="props.companyCount">
        <span v-for="index in companyCount" :key="`company-${index}`">
          {{ props.activeListIndex }}
        </span>
        <span>/{{ props.companyCount }}</span>
      </p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';

const props = defineProps({
  titlePage: String,
  period: String,
  activeListIndex: String,
  companyCount: String,
});

const container = ref();

defineExpose({
  container,
});

const showTitle = useMediaQuery('(min-width: 760px)');
</script>

<style scoped lang="sass">
.title
  width: 50%
  height: 100%
  margin-left: 0
  border: 0px solid black

  > div
    display: flex
    flex-direction: column
    justify-content: space-between
    height: calc(100vh - 80px - 24px * 2)

    h2, p
      margin: 0
      line-height: 70px
      font-size: 80px
      font-weight: 800
      text-transform: uppercase

    h2
      white-space: pre-wrap
      word-wrap: break-word

    h3
      margin: 8px 0 0 0
      font-size: 24px
      font-weight: 700
      line-height: 22px
      color: rgb(0, 0, 0, .3)

      span
        display: block
        font-size: 12px
        font-weight: 600
        text-transform: uppercase

    p

      span:first-of-type
        letter-spacing: -4px
        font-variant-numeric: tabular-nums

      span:last-of-type
        line-height: 30px
        font-size: 30px
</style>
