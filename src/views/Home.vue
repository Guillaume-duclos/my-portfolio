<template>
  <section class="page home">
    <main class="content">
      <div class="home-title" ref="homeTitle">
        <h2><span>Guillaume</span></h2>
        <h2><span>Duclos</span></h2>
      </div>

      <div class="home-subtitle" ref="homeSubTitle">
        <h3><span>Développeur full-stack et</span></h3>
        <h3><span>mobile TypeScript</span></h3>
      </div>

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
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import Tilt from '../components/Tilt.vue';

const homeTitle = ref();
const homeSubTitle = ref();

onMounted(() => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create('heightEase', '0.56, 0.14, 0.32, 0.81');

  const timeLine = gsap.timeline();

  for (let i = 0; i < homeTitle.value.children.length; i++) {
    timeLine.to(
      homeTitle.value.children[i].children,
      {
        top: 0,
        duration: 0.7,
        ease: 'heightEase',
      },
      i === 0 ? 0 : 0.2
    );
  }

  for (let i = 0; i < homeSubTitle.value.children.length; i++) {
    timeLine.to(
      homeSubTitle.value.children[i].children,
      {
        top: 0,
        duration: 0.7,
        ease: 'heightEase',
      },
      0.5
    );
  }
});
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

    .home-title

      h2
        position: relative
        margin: 0
        height: 80px
        font-size: 80px
        line-height: 80px
        font-weight: 800
        overflow: hidden
        border: 0px solid black

        span
          top: 80px
          position: absolute
          border: 0px solid red

    .home-subtitle

      h3
        position: relative
        margin: 0
        height: 30px
        font-size: 24px
        overflow: hidden
        line-height: 30px

        &:first-of-type
          margin: 10px 0 0 0

        span
          top: 30px
          position: absolute
          border: 0px solid red

    ul
      margin: 18px 0 0 0
      padding: 0
      display: flex
      grid-gap: 10px

      li
        list-style-type: none

  .picture
    perspective: 1200px
    padding: 20px 0
</style>
