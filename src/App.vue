<template>
  <div class="app">
    <Header />

    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<style lang="sass">
.app
  position: relative
  display: flex
  flex-direction: column
  height: 100%

  .page
    flex: 1
    display: flex
    justify-content: space-between
    height: calc(100vh - 80px - 48px)
    padding: calc(80px + 24px) 24px 24px 24px
    border: 0px solid red

    .content
      flex: 1
      max-width: 500px
      border: 0px solid black

      .content-lists-container
        border: 0px solid black

        ul
          margin: 0
          padding: 0
          width: 100%
          max-width: 500px

          &:not(:last-of-type)
            margin-bottom: 130px

          li
            list-style-type: none

  .scale-enter-active, .scale-leave-active
    transition: all .35s ease

  .scale-enter-from, .scale-leave-to
    opacity: 0
</style>
