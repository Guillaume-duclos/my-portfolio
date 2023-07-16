<template>
  <PageContent :data="PersonalProjects" />
</template>

<script setup lang="ts">
import PageContent from '../components/PageContent.vue';
import PersonalProjects from '../data/personal-projects.json';
</script>
