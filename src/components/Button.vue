<template>
  <router-link :to="props.route">
    {{ props.label }}
    <img src="../assets/icons/arrow-right.svg" alt="Flèche" />
  </router-link>
</template>

<script setup lang="ts">
const props = defineProps({
  label: String,
  route: String,
});
</script>

<style scoped lang="sass">
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
