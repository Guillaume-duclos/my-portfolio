<template>
  <section class="home">
    <main class="home-content">
      <div class="home-title" ref="homeTitle">
        <h2>Guillaume Duclos</h2>
        <h3>Développeur <span>full-stack</span><br />et <span>mobile</span> TypeScript</h3>
      </div>

      <ul class="home-menu">
        <!--        <li v-for="(title, index) in titles">-->
        <!--          <RouterLink to="ProfessionalProjects">-->
        <!--            <span v-for="(letter, index) in title">-->
        <!--              {{ letter }}-->
        <!--            </span>-->
        <!--          </RouterLink>-->
        <!--        </li>-->

        <li>
          <RouterLink to="ProfessionalProjects">
            <span>Projets <span>professionnels</span></span>
            <!--            <span>Projets Pro</span>-->
          </RouterLink>
        </li>
        <li>
          <RouterLink to="PersonalProjects">
            <span>Projets <span>personnels</span></span>
            <!--            <span>Projets Perso</span>-->
          </RouterLink>
        </li>
        <li>
          <RouterLink to="Stack">
            <span>Stack <span>technique</span></span>
            <!--            <span>Stack</span>-->
          </RouterLink>
        </li>
        <li>
          <RouterLink to="Contact">
            <span>Contactez <span>moi</span></span>
            <!--            <span>Contact</span>-->
          </RouterLink>
        </li>
      </ul>

      <ul class="home-rs">
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
      <div />
    </aside>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

const homeTitle = ref();
const titles = ref([]);

onMounted(() => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create('heightEase', '0.4, 0.11, 0.45, 0.97');

  const titlesList = ['Projets pro', 'Projets perso', 'Stack', 'Contact'];

  // Animation des titres
  titles.value = titlesList.map((title) => {
    return title.split('');
  });

  // Animation de la photo
  gsap.to('html', {
    '--photo-scale': 1,
    duration: 0.7,
    delay: 0.25,
    ease: 'heightEase',
  });
});
</script>

<style scoped lang="sass">
.home
  display: flex
  grid-gap: 20px
  height: 100vh
  padding: 0 24px 0 24px

  .home-content
    display: flex
    flex-direction: column
    justify-content: space-between
    padding: 30px 0
    width: 50%
    border: 0px solid black

    .home-title
      border: 0px solid black

      h2
        position: relative
        margin: 0
        font-size: 40px
        line-height: 40px
        font-weight: 800
        overflow: hidden
        color: rgba(0, 0, 0, .85)
        border: 0px solid black

      h3
        position: relative
        margin: 6px 0 0 0
        font-size: 20px
        line-height: 25px
        font-weight: 500
        overflow: hidden
        color: rgba(0, 0, 0, .3)

        span
          color: rgba(0, 0, 0, .75)
          font-weight: 700

          span
            display: block

    .home-menu
      display: flex
      flex-direction: column
      grid-gap: 20px
      margin: 18px 0 0 0
      padding: 0

      li
        list-style-type: none

        a
          position: relative
          display: inline-table
          font-size: 65px
          line-height: 65px
          font-weight: 900
          text-decoration: none
          text-transform: uppercase
          color: #000000
          height: 66px
          overflow: hidden
          border: 0px solid red

          span
            // position: absolute
            // transition: top .2s ease-in-out
            display: block
            color: rgba(0, 0, 0, .85)
            border: 0px solid black

            span
              font-size: 20px
              line-height: 20px
              font-weight: 600
              opacity: .3

            //&:first-of-type
            //  top: 0
            //  opacity: .3
            //  letter-spacing: -1px

              &:hover
                opacity: .85

            &:last-of-type
              top: 100%

          //&:hover span:first-of-type
          //  top: -100%
          //  transition: top .2s ease-in-out

          //&:hover span:last-of-type
          //  top: 0
          //  transition: top .2s ease-in-out

    .home-rs
      position: relative
      display: flex
      grid-gap: 12px
      margin: 18px 0 0 0
      padding: 50px 0 0 0

      &::before
        position: absolute
        content: ''
        height: 1px
        width: 120px
        top: 0
        left: 0
        background-color: rgba(0, 0, 0, .07)

      li
        list-style-type: none

        a
          font-weight: 800
          text-decoration: none
          text-transform: uppercase
          opacity: .85

  .picture
    width: 50%
    border: 0px solid red

    div
      position: relative
      height: 100%
      width: 50vw
      overflow: hidden
      background-image: url("../assets/img/photo.jpg")
      background-repeat: no-repeat
      background-position: bottom
      background-size: cover

      &::after
        content: ''
        position: absolute
        inset: 0
        background: inherit
        background-size: cover
        transform-origin: center
        transform: scale(var(--photo-scale))
</style>
