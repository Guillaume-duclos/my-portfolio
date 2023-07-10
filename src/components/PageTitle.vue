<template>
  <aside class="title">
    <div>
      <h2>{{ props.titlePage }}</h2>
      <p v-if="props.companyCount">
        <span>{{ props.activeListIndex }}</span>
        <span>/{{ props.companyCount }}</span>
      </p>
    </div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps({
  titlePage: String,
  activeListIndex: String,
  companyCount: String,
});
</script>

<style scoped lang="sass">
.title
  flex: 1
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

    h2
      white-space: pre-wrap
      word-wrap: break-word

    p

      span:first-of-type
        letter-spacing: -4px
        font-variant-numeric: tabular-nums

      span:last-of-type
        line-height: 30px
        font-size: 30px
</style>
