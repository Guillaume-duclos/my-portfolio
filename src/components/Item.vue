<template>
  <li>
    <header @click="open">
      <div>
        <h4>{{ data.name }}</h4>
        <h5>{{ data.scope }}</h5>
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
        <p class="description">{{ data.description }}</p>
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
  console.log('start');
  console.log('element.scrollHeight : ', element.scrollHeight);
  element.style.height = `${element.scrollHeight}px`;
};

const end = (element) => {
  console.log('end');
  console.log(element);
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
      opacity: .4
      font-weight: 600

  .content

    .description
      margin: 20px 0 0 0
      font-size: 14px
      opacity: .4
      font-weight: 500

  .item-enter-active, .item-leave-active
    will-change: height, opacity
    transition: height .3s ease, opacity .3s ease
    overflow: hidden

  .item-enter, .item-leave-to
    height: 0 !important
    opacity: 0
</style>
