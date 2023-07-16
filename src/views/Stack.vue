<template>
  <PageContent :data="Stack" />
</template>

<script setup lang="ts">
import PageContent from '../components/PageContent.vue';
import Stack from '../data/stack.json';
</script>
