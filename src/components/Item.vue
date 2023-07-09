<template>
  <li>
    <header @click="open">
      <div>
        <h4>{{ props.data.name }}</h4>
        <h5>{{ props.data.scope }}</h5>
      </div>

      <img v-if="visible" src="../assets/icons/close.svg" alt="Fermer" />
      <img v-else src="../assets/icons/open.svg" alt="Ouvrir" />
    </header>

    <transition
      name="item"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end">
      <div class="content" v-show="visible">
        <p class="description">{{ props.data.description }}</p>
      </div>
    </transition>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  data: Object,
});

const visible = ref(false);

const open = () => {
  visible.value = !visible.value;
};

const start = (element) => {
  element.style.height = `${element.scrollHeight}px`;
};

const end = (element) => {
  element.style.height = '';
};
</script>

<style scoped lang="sass">
li
  position: relative
  padding: 30px 0
  cursor: pointer
  border-bottom: 1px solid rgba(0, 0, 0, .08)

  header
    display: flex
    justify-content: space-between

    h4, h5
      margin: 0

    h4
      font-size: 18px

    h5
      margin-top: 4px
      font-weight: 600
      opacity: .4

  .content

    .description
      margin: 20px 0 0 0
      font-size: 14px
      opacity: .4
      font-weight: 500

  .item-enter-active, .item-leave-active
    will-change: height, opacity
    transition: height .4s cubic-bezier(.76, .07, .53, .89), opacity .6s ease .4s
    overflow: hidden

  .item-enter-from, .item-leave-to
    height: 0 !important
    opacity: 0
</style>
