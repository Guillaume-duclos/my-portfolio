<template>
  <section class="page home">
    <main class="content">
      <h2>
        Guillaume <br />
        Duclos
      </h2>

      <h3>
        Développeur full-stack et <br />
        mobile TypeScript
      </h3>

      <ul>
        <li>
          <a href="https://github.com/guillaume-duclos" target="_blank">
            <img src="../assets/icons/github.svg" alt="Lien github" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/GuillaumeDcl" target="_blank">
            <img src="../assets/icons/twitter.svg" alt="Lien twitter" />
          </a>
        </li>
        <li>
          <a href="https://github.com/guillaume-duclos" target="_blank">
            <img src="../assets/icons/linkedin.svg" alt="Lien linkedin" />
          </a>
        </li>
      </ul>
    </main>

    <aside class="picture">
      <Tilt>
        <img src="../assets/img/photo.jpg" alt="Moi" />
      </Tilt>
    </aside>
  </section>
</template>

<script setup lang="ts">
import Tilt from '../components/Tilt.vue';
</script>

<style scoped lang="sass">
.home
  flex: none !important
  display: flex
  grid-gap: 50px
  justify-content: space-between

  .content
    display: flex
    flex-direction: column
    justify-content: center
    border: 0px solid black

    h2
      margin: 0
      font-size: 80px
      line-height: 80px

      font-weight: 800

    h3
      margin: 10px 0 0 0
      font-size: 24px
      line-height: 30px

    ul
      margin: 18px 0 0 0
      padding: 0
      display: flex
      grid-gap: 10px

      li
        list-style-type: none

  .picture
    display: flex
    align-items: center
    perspective: 1200px
    padding: 20px 0
</style>
