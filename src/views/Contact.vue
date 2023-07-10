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
                <a href="https://github.com/guillaume-duclos" target="_blank">
                  github.com/guillaume-duclos
                </a>
              </li>
              <li>
                <img src="../assets/icons/twitter.svg" alt="Lien twitter" />
                <a href="https://twitter.com/GuillaumeDcl" target="_blank">
                  twitter.com/GuillaumeDcl
                </a>
              </li>
              <li>
                <img src="../assets/icons/linkedin.svg" alt="Lien linkedin" />
                <a href="https://linkedin.com/in/duclos-guillaume" target="_blank">
                  linkedin.com/in/duclos-guillaume
                </a>
              </li>
            </ul>
          </Item>
          <Item title="M'écrire" subTitle="Laissez moi un message que je pourrais lire plus tard">
            <form class="content-form">
              <div class="content-input-container">
                <label>Email : *</label>
                <input type="email" required placeholder="john.doe@mail.com" />
              </div>

              <div class="content-input-container">
                <label>Célulaire :</label>
                <input type="tel" placeholder="+1 (000)-000-0000" />
              </div>

              <div class="content-input-container">
                <label>Objet : *</label>
                <input type="text" required placeholder="Que me vaut ce plaisir ?" />
              </div>

              <div class="content-input-container">
                <label>Message : *</label>
                <textarea required placeholder="Votre message ici..." />
              </div>

              <input type="submit" value="Envoyer" />
            </form>
          </Item>
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
import PageTitle from '../components/PageTitle.vue';
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

    a
      color: #000000
      text-decoration: none

.content-form

  .content-input-container
    display: flex
    flex-direction: column

    &:not(:first-of-type) label
      margin-top: 20px

    label
      display: flex
      flex-direction: column
      font-size: 14px
      font-weight: 500

    input, textarea
      padding: 0 10px 0 0
      background: transparent
      color: #000000
      border: 0
      outline: none
      font-size: 18px
      border-bottom: 1px solid rgba(0, 0, 0, .08)

      &::placeholder
        color:  rgba(0, 0, 0, .2)

    input[required] + label:after
      content: ' *'
      display: contents

    input
      height: 40px

    textarea
      padding: 8px 0
      height: 150px
      resize: none
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif

  input[type=submit]
    margin-top: 40px
    width: 100%
    height: 40px
    border: none
    font-size: 16px
    font-weight: 600
    line-height: 1
    cursor: pointer
    color: #FFFFFF
    text-transform: uppercase
    background-color: #000000
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif
</style>
