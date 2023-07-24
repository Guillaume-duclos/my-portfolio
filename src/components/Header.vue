<template>
  <header>
    <div class="header-container">
      <div class="header-sub-container">
        <h1>
          <router-link to="Home">Guillaume D.</router-link>
        </h1>

        <nav class="header-menu-desktop">
          <ul>
            <li>
              <router-link to="professional-projects" active-class="active">
                Projets pro
              </router-link>
            </li>
            <li>
              <router-link to="personal-projects" active-class="active">Projets perso</router-link>
            </li>
            <li>
              <router-link to="Stack" active-class="active">Stack</router-link>
            </li>
            <li>
              <router-link to="Contact" active-class="active">Me contacter</router-link>
            </li>
            <li>
              <a class="external-link" href="../assets/documents/cv.pdf" target="_blank">Mon CV</a>
            </li>
          </ul>
        </nav>

        <button class="header-menu-button" @click="showMenu">
          <img v-if="menuOpened" src="../assets/icons/exit.svg" alt="Quitter" />
          <img v-else src="../assets/icons/burger.svg" alt="Menu" />
        </button>

        <nav v-if="menuOpened" class="header-menu-mobile">
          <ul>
            <li>
              <router-link to="professional-projects" active-class="active">
                Projets pro
              </router-link>
            </li>
            <li>
              <router-link to="personal-projects" active-class="active">Projets perso</router-link>
            </li>
            <li>
              <router-link to="stack" active-class="active">Stack</router-link>
            </li>
            <li>
              <router-link to="contact" active-class="active">Me contacter</router-link>
            </li>
            <li>
              <a class="external-link" href="../assets/documents/cv.pdf" target="_blank">Mon CV</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const menuOpened = ref(false);

watch(
  () => route.name,
  () => {
    if (menuOpened.value) {
      showMenu();
    }
  }
);

// Affiche / cache le menu sur mobile
const showMenu = () => {
  menuOpened.value = !menuOpened.value;
};
</script>

<style scoped lang="sass">
header
  position: fixed
  top: 0
  left: 0
  right: 0
  backdrop-filter: blur(16px)
  z-index: 1
  border: 0px solid red

  .header-container
    display: flex
    margin: 0 auto
    max-width: 1200px
    border: 0px solid green

    .header-sub-container
      display: flex
      align-items: center
      justify-content: space-between
      padding: 0 24px
      width: 100%
      height: 80px
      border: 0px solid blue

      @media (min-width: 1100px)
        padding: 0 54px

      h1
        font-size: 29px
        margin: 0

        a
          color: #000000
          text-decoration: none

      .header-menu-desktop
        display: none
        border: 0px solid black

        @media (min-width: 760px)
          display: block

        ul
          margin: 0
          padding: 0
          display: flex
          grid-gap: 24px
          border: 0px solid black

          @media (min-width: 1100px)
            grid-gap: 32px

          li
            list-style-type: none
            border: 0px solid black

            a
              position: relative
              color: #000000
              font-size: 14px
              font-weight: 500
              text-decoration: none

              &.active::after
                content: ''
                position: absolute
                display: block
                width: 100%
                height: 2px
                margin-top: 5px
                background-color: #000000

              &.external-link

                &:after
                  content: url('../assets/icons/arrow-link.svg')
                  height: 6px
                  position: absolute
                  right: -14px
                  top: -5px
                  visibility: hidden

                &:hover:after
                  visibility: visible

      .header-menu-button
        display: flex
        align-items: center
        justify-content: center
        padding: 0
        width: 32px
        height: 32px
        background: transparent
        cursor: pointer
        border: none
        z-index: 1

        @media (min-width: 760px)
          display: none

      .header-menu-mobile
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        position: absolute
        inset: 0
        height: 100vh
        background-color: #FFFFFF

        ul
          display: flex
          flex-direction: column
          align-items: center
          justify-content: space-evenly
          height: 100%
          margin: 0
          padding: 0

          li
            list-style-type: none

            a
              color: #000000
              text-decoration: none
              font-size: 40px
              font-weight: 800
              line-height: 40px
              text-transform: uppercase
</style>
