<template>
  <header>
    <h1>
      <router-link to="Home">Portfolio</router-link>
    </h1>

    <nav>
      <ul>
        <li>
          <router-link to="ProfessionalProjects" active-class="active">Projets pro</router-link>
        </li>
        <li>
          <router-link to="PersonalProjects" active-class="active">Projets perso</router-link>
        </li>
        <li>
          <router-link to="Stack" active-class="active">Stack</router-link>
        </li>
        <li>
          <router-link to="Contact" active-class="active">Me contacter</router-link>
        </li>
        <li>
          <router-link to="">Mon CV</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="sass">
header
  position: fixed
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 24px
  max-width: 1400px
  height: 80px
  left: 24px
  right: 24px
  backdrop-filter: blur(12px)
  z-index: 1

  @media (min-width: 1100px)
    left: 54px
    right: 54px
    padding: 0 54px

  h1
    font-size: 30px
    margin: 0

    a
      color: #000000
      text-decoration: none

  nav
    border: 0px solid black

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
</style>
