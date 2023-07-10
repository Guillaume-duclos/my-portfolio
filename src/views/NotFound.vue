<template>
  <section class="page not-found">
    <main class="content">
      <h2>404</h2>
      <p>Rien par ici...</p>
      <router-link to="home">
        <img src="../assets/icons/arrow-left.svg" alt="Retour" />
        Retour à la home
      </router-link>
    </main>

    <aside class="picture">
      <img src="../assets/img/desert.jpg" alt="Désert" />
    </aside>
  </section>
</template>

<style scoped lang="sass">
.not-found
  flex: none !important
  display: flex
  grid-gap: 50px
  justify-content: space-between

  .content
    display: flex
    flex-direction: column
    justify-content: center

    h2
      margin: 0
      font-size: 120px
      line-height: 120px
      font-weight: 800

    p
      margin: 0
      font-size: 24px
      line-height: 30px
      font-weight: 700

    a
      display: flex
      grid-gap: 10px
      margin-top: 30px
      align-items: center
      color: #000000
      font-size: 14px
      font-weight: 600
      text-decoration: none

      img
        height: 14px

  .picture
    display: flex
    align-items: center

    img
      display: block
      max-width: 100%
      max-height: 100%
</style>
