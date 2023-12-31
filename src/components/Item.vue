<template>
  <li class="item">
    <header :class="{ 'header-clickable': enableViewOpen }" @click="enableViewOpen ? open() : null">
      <div>
        <h4>{{ props.data?.title || props.title }}</h4>
        <h5 v-if="props.data?.subTitle || props.subTitle">
          {{ props.data?.subTitle || props.subTitle }}
        </h5>
      </div>

      <div class="header-buttons" :class="{ 'header-buttons-enabled': enableViewOpen }">
        <!--        <button v-if="enableViewExtend" class="extend-button" @click.stop="extendItemView">-->
        <!--          <img v-if="isViewExtended" src="../assets/icons/arrow-down.svg" alt="Flèche" />-->
        <!--          <img v-else src="../assets/icons/arrow-up.svg" alt="Flèche" />-->
        <!--        </button>-->
        <button>
          <img v-if="isVisible" src="../assets/icons/close.svg" alt="Fermer" />
          <img v-else src="../assets/icons/open.svg" alt="Ouvrir" />
        </button>
      </div>
    </header>

    <transition v-on:enter="enter" v-on:leave="leave">
      <div class="item-content" v-show="isVisible">
        <slot />
      </div>
    </transition>
  </li>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

const isVisible = ref(false);
const isFirstOpen = ref(false);
const emit = defineEmits([
  'refreshScrollTrigger',
  'updateActivesItem',
  'extendView',
  'updateBackgroundColor',
]);

const props = defineProps({
  data: Object,
  index: Number,
  title: String,
  subTitle: String,
  isViewExtended: Boolean,
  isOpen: Boolean,
  enableViewOpen: {
    type: Boolean,
    required: false,
    default: true,
  },
  enableViewExtend: {
    type: Boolean,
    required: false,
    default: true,
  },
});

onMounted(() => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create('heightEase', '0.76, 0.07, 0.53, 0.89');
  CustomEase.create('opacityEase', '0.25, 0.1, 0.25, 1');

  if (props.isOpen) {
    isFirstOpen.value = true;
    isVisible.value = true;
  }
});

// Animation d'ouverture de l'item
const enter = (element: any, done: any) => {
  updateBackgroundColor();
  emit('updateActivesItem', { active: true, index: props.data?.color });

  if (isFirstOpen.value) {
    element.style.height = element.scrollHeight;
    element.style.opacity = 1;
    isFirstOpen.value = false;
    emit('refreshScrollTrigger', { index: props.index });
  } else {
    // On créer la timeline
    let timeline = gsap.timeline({ onComplete: done });

    // On set l'opacité du contenu à 0
    timeline.set(element, {
      opacity: 0,
      height: 0,
    });

    // Ouverture de l'item
    timeline.to(element, {
      duration: 0.4,
      height: element.scrollHeight,
      ease: 'heightEase',
      onComplete: () => emit('refreshScrollTrigger', { index: props.index }),
    });

    // Opacité du contenu
    timeline.to(element, {
      duration: 0.2,
      opacity: 1,
      ease: 'opacityEase',
    });
  }
};

// Animation de fermeture de l'item
const leave = (element: any, done: any) => {
  emit('updateActivesItem', { active: false, index: props.data?.color });

  // Opacité du contenu
  gsap.to(element, {
    duration: 0.4,
    opacity: 0,
    height: 0,
    ease: 'heightEase',
    onComplete: () => {
      emit('refreshScrollTrigger', { index: props.index });
      emit('updateBackgroundColor');
      done();
    },
  });
};

// On set l'affichage ou non de l'item
const open = () => {
  isVisible.value = !isVisible.value;
};

// On met à jour la couleur de fond
const updateBackgroundColor = () => {
  if (props.data?.color) {
    gsap.to('html', { '--bg-color': props.data?.color, duration: 0.2 });
  }
};

// On étend la vue des items
// const extendItemView = () => {
//   emit('extendView');
// };
</script>

<style lang="postcss">
.item {
  position: relative;
  list-style-type: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  header {
    display: flex;
    grid-gap: 20px;
    justify-content: space-between;
    padding: 30px 0;

    &.header-clickable {
      cursor: pointer;
    }

    h4,
    h5 {
      margin: 0;
    }

    h4 {
      font-size: 18px;
    }

    h5 {
      margin-top: 4px;
      font-weight: 600;
      opacity: 0.5;
    }

    .header-buttons {
      display: flex;
      align-items: center;
      grid-gap: 14px;
      visibility: hidden;

      &.header-buttons-enabled {
        visibility: visible;
      }

      button {
        padding: 0;
        height: 16px;
        border: none;
        background: transparent;
        cursor: pointer;

        &.extend-button {
          visibility: hidden;
        }

        img {
          display: block;
          height: 100%;
        }
      }
    }

    &:hover .header-buttons .extend-button {
      visibility: visible;
    }
  }

  .item-content {
    overflow: hidden;

    p,
    h6,
    li {
      opacity: 0.6;
    }

    .content-container {
      margin-top: 28px;
      padding-bottom: 28px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.04);

      &:first-of-type {
        margin-top: 0;
      }

      &:last-of-type {
        margin-bottom: 40px;
        border-bottom: none;
        padding-bottom: 0;
      }

      h6 {
        margin: 0 0 10px 0;
        font-size: 14px;

        &:first-of-type {
          margin-top: 0;
        }
      }

      .content-text {
        margin: 10px 0 0 0;
        font-size: 14px;
      }

      .content-media {
        display: flex;
        grid-gap: 8px;
        padding-bottom: 12px;
        overflow-x: auto;
        scrollbar-width: thin;
        scrollbar-color: #000000 #000000;

        &:hover::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 1);
        }

        &::-webkit-scrollbar {
          height: 2px;
          background: transparent;
        }

        &::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        &::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.6);
        }

        img {
          width: 120px;
          cursor: pointer;

          &.website-image {
            width: 320px;
          }
        }

        iframe {
          width: 320px;
          height: 168px;
          border: none;
          border-radius: 10px;
        }
      }

      p,
      li {
        padding: 5px 0;
        font-size: 14px;
      }

      ul {
        li {
          &.missions {
            position: relative;
            padding: 0 0 0 14px;

            &::before {
              content: '';
              position: absolute;
              top: 7px;
              left: 0;
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background-color: #000000;
            }
          }

          .content-list-title {
            font-weight: 600;
          }

          .content-list-link {
            position: relative;
            color: #000000;
            text-decoration: none;

            &:after {
              content: url('../assets/icons/arrow-link.svg');
              height: 6px;
              position: absolute;
              right: -14px;
              top: -5px;
              visibility: hidden;
            }

            &:hover {
              text-decoration: underline;

              &:after {
                visibility: visible;
              }
            }
          }
        }
      }
    }
  }
}
</style>
