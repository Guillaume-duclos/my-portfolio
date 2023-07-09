<template>
  <details>
    <summary>
      <h4>{{ data.name }}</h4>
      <h5>{{ data.scope }}</h5>
    </summary>

    <div class="content">
      <p class="description">{{ data.description }}</p>
    </div>
  </details>
</template>

<script setup lang="ts">
import { Data } from '../interface/Data.ts';

const props = defineProps({
  data: Object,
});
</script>

<style scoped lang="sass">
details
  padding: 30px 0
  cursor: pointer
  border-bottom: 1px solid rgba(0, 0, 0, .08)
  transition: height 1s ease

  summary
    position: relative
    list-style-type: none

    &::marker
      content: none

    &::-webkit-details-marker
      display: none

    &::after
      content: url('../assets/icons/open.svg')
      position: absolute
      top: calc(50% - 10px)
      right: 0

    h4, h5
      margin: 0

    h4
      font-size: 18px

    h5
      opacity: .4
      font-weight: 600

  &[open] summary::after
    content: url('../assets/icons/close.svg')

  .content

    .description
      margin: 20px 0 0 0
      font-size: 14px
      opacity: .4
      font-weight: 500
</style>
