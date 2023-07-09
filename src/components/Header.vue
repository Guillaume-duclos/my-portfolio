<template>
  <header>
    <h1>
      <router-link to="Home">Portfolio</router-link>
    </h1>

    <nav>
      <ul>
        <li>
          <router-link to="ProfessionalProjects">Projets pro</router-link>
        </li>
        <li>
          <router-link to="PersonalProjects">Projets perso</router-link>
        </li>
        <li>
          <router-link to="Stack">Stack</router-link>
        </li>
        <li>
          <router-link to="Contact">Me contacter</router-link>
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
  width: calc(100% - 24px * 2)
  height: 80px
  border: 0px solid black
  backdrop-filter: blur(10px)
  z-index: 1

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

      li
        list-style-type: none
        border: 0px solid black

        a
          color: #000000
          font-size: 14px
          font-weight: 500
          text-decoration: none
</style>
