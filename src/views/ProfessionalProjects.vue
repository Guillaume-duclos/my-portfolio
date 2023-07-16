<template>
  <PageContent :data="ProfessionalProjects" />
</template>

<script setup lang="ts">
import PageContent from '../components/PageContent.vue';
import ProfessionalProjects from '../data/professional-projects.json';
</script>
