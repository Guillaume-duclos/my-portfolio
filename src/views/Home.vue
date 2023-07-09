<template>
  <section class="home">
    <main class="content">
      <h2>
        Guillaume <br />
        Duclos
      </h2>

      <h3>
        Développeur full-stack et <br />
        mobile typescript
      </h3>

      <ul>
        <li>
          <a href="">
            <img src="../assets/icons/github.svg" alt="Lien github" />
          </a>
        </li>
        <li>
          <a href="">
            <img src="../assets/icons/twitter.svg" alt="Lien twitter" />
          </a>
        </li>
        <li>
          <a href="">
            <img src="../assets/icons/linkedin.svg" alt="Lien linkedin" />
          </a>
        </li>
      </ul>
    </main>

    <aside class="picture">
      <img src="../assets/img/photo.jpg" alt="Moi" />
    </aside>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="sass">
.home
  display: flex
  justify-content: space-between

  .content
    display: flex
    flex-direction: column
    justify-content: center
    border: 1px solid black

    h2
      margin: 0
      font-size: 70px
      line-height: 70px
      text-transform: uppercase
      font-weight: 800

    h3
      margin: 10px 0 0 0
      font-size: 24px
      line-height: 28px

    ul
      margin: 18px 0 0 0
      padding: 0
      display: flex
      grid-gap: 8px

      li
        list-style-type: none

  .picture
    border: 1px solid black

    img
      display: block
      max-width: 500px
</style>
