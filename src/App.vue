<template>
  <div class="hero-container">
    <header>
      <img class="hero-avatar" src="assets/img/avatar-hello.png" alt="Avatar" />
      <nav class="hero-menu">
        <ul>
          <li>
            <a href="">Projets pro</a>
          </li>
          <li>
            <a href="">Projets perso</a>
          </li>
          <li>
            <a href="">Me contacter</a>
          </li>
          <li>
            <a href="">Voir mon CV</a>
          </li>
        </ul>

        <ul>
          <li>
            <a href="">
              <img src="assets/icons/github.svg" alt="Lien github" />
            </a>
          </li>
          <li>
            <a href="">
              <img src="assets/icons/twitter.svg" alt="Lien twitter" />
            </a>
          </li>
          <li>
            <a href="">
              <img src="assets/icons/linkedin.svg" alt="Lien linkedin" />
            </a>
          </li>
        </ul>
      </nav>
    </header>

    <main class="hero-content-container">
      <div class="hero-content-text">
        <p>Hello world 👋,</p>
        <h1>Guillaume<br />Duclos</h1>
        <h2>Développeur front-end<br />et mobile Javascript</h2>
        <p>
          Je suis développeur web front-end depuis plus de 5 ans,<br />jetez un oeil à mes projets !
        </p>
        <button>
          Continuer
          <img class="hero-avatar" src="assets/icons/arrow-down.svg" alt="Flèche" />
        </button>
      </div>

      <div class="hero-content-illustration">
        <img src="assets/img/avatar-computer.png" alt="Avatar" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {});
</script>

<style scoped lang="sass">
.hero-container
  display: flex
  flex-direction: column
  border: 0px solid red
  height: 100vh

  header
    display: flex
    justify-content: space-between
    padding: 12px 0

    .hero-avatar
      width: 60px

    .hero-menu
      display: flex
      grid-gap: 22px
      align-items: center

      ul
        display: flex
        grid-gap: 22px
        align-items: center
        justify-content: space-between
        margin: 0
        padding: 0

        &:not(:last-child)

          &:after
            content: ''
            height: 30px
            width: 1px
            background-color: #47474C

        li
          display: flex
          align-items: center
          list-style-type: none

          a
            color: inherit
            text-decoration: none
            font-weight: 500
            opacity: .6

          img
            display: block
            width: 24px

  .hero-content-container
    flex: 1
    display: flex
    align-items: center
    justify-content: space-between
    border: 0px solid white

    .hero-content-text
      border: 0px solid white

      > *
        margin: 0

      p:first-of-type
        font-size: 24px
        text-transform: uppercase
        font-weight: 500

      h1
        margin: 12px 0
        line-height: 62px
        font-weight: 900
        font-size: 62px

      h2
        text-transform: uppercase
        font-weight: 800
        font-size: 22px
        line-height: 26px
        color: #1DD1A1

      p:last-of-type
        margin-top: 8px
        font-weight: 500

      button
        display: flex
        align-items: center
        grid-gap: 6px
        margin-top: 20px
        padding: 0 24px
        height: 40px
        border: none
        border-radius: 20px
        font-size: 14px
        background: linear-gradient(90deg, #159473 0%, #1DD1A1 100%)
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .50)
        text-transform: uppercase
        font-weight: 700

        img
          width: 12px

    .hero-content-illustration
      display: flex
      margin: auto
      align-items: flex-end
      justify-content: center
      height: 100%

      img
        display: block
        margin: 0
        width: 75%
</style>
