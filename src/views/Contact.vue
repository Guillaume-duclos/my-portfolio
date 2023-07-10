<template>
  <section class="page contact">
    <PageTitle titlePage="Contact" />

    <main class="content">
      <div class="content-lists-container" ref="content">
        <ul>
          <Item
            title="Mes coordonnées"
            subTitle="Consultez mes coordonnées ainsi que mes liens Github, ...">
            <ul class="content-list">
              <li>Tel : (438)-529-2542</li>
              <li>Mail : guillaume-duclos@hotmail.fr</li>
              <li>Ville : Montréal, QC</li>
            </ul>

            <ul class="content-list">
              <li>
                <img src="../assets/icons/github.svg" alt="Lien github" />
                github.com/guillaume-duclos
              </li>
              <li>
                <img src="../assets/icons/twitter.svg" alt="Lien twitter" />
                twitter.com/GuillaumeDcl
              </li>
              <li>
                <img src="../assets/icons/linkedin.svg" alt="Lien linkedin" />
                linkedin.com/in/duclos-guillaume
              </li>
            </ul>
          </Item>
          <Item title="M'écrire" subTitle="Laissez moi un message que je pourrais lire plus tard" />
          <Item
            title="Me laisser un vocale"
            subTitle="Laissez moi un message que je pourrais écouter plus tard" />
        </ul>
      </div>

      <Navigation
        :previousPage="{ label: 'Stack', name: 'Stack' }"
        :nextPage="{ label: 'Home', name: 'Home' }" />
    </main>
  </section>
</template>

<script setup lang="ts">
import PageTitle from './PageTitle.vue';
import Item from '../components/Item.vue';
import Navigation from '../components/Navigation.vue';
</script>

<style scoped lang="sass">
.content-list
  margin: 0 !important

  &:not(:first-of-type)
    border-top: 1px solid rgba(0, 0, 0, .08)

  &:not(:last-of-type)
    li:last-of-type
      margin-bottom: 20px

  &:last-of-type

    li:first-of-type
      margin-top: 20px

    li:last-of-type
      margin-bottom: 0

  li
    display: flex
    grid-gap: 8px
    margin: 10px 0
    font-size: 14px

    img
      width: 18px
</style>
