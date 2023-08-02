<template>
  <section class="home">
    <aside v-if="showTitle" class="title" ref="container">
      <div>
        <div>
          <h3 ref="h3Title">
            <span>Hello <span>👋</span>, je m'appelle</span>
          </h3>

          <h2 ref="h2Title">
            <span class="title-container">
              <span class="words-container">Guillaume</span>
            </span>
            <span class="title-container">
              <span class="words-container">Duclos</span>
            </span>
          </h2>

          <p class="title-description" ref="titleDescription">
            <span>
              <span>Je suis développeur <strong>full-stack</strong></span>
            </span>
            <span>
              <span> et mobile <strong>JavaScript</strong></span>
            </span>
          </p>
        </div>

        <div class="rs-links">
          <ul ref="rsLinks">
            <li>
              <a href="https://github.com/guillaume-duclos" target="_blank">Github</a>
            </li>
            <li>
              <a href="https://twitter.com/GuillaumeDcl" target="_blank">Twitter</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/duclos-guillaume" target="_blank">Linkedin</a>
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <main class="content">
      <div class="content-lists-container" ref="content">
        <ul v-for="(link, index) in Links" :key="`link-${index}`">
          <li class="item">
            <a v-if="link.externalLink" :href="link.route" target="_blank">
              <div>
                <h4>{{ link.title }}</h4>
                <h5 v-html="link.subTitle" />
              </div>

              <div class="header-buttons">
                <button>
                  <img src="../assets/icons/arrow-right.svg" alt="Ouvrir" />
                </button>
              </div>
            </a>

            <router-link v-else :to="link.route">
              <div>
                <h4>{{ link.title }}</h4>
                <h5 v-html="link.subTitle" />
              </div>

              <div class="header-buttons">
                <button>
                  <img src="../assets/icons/arrow-right.svg" alt="Ouvrir" />
                </button>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import Links from '../data/links.json';

const props = defineProps({
  pageLoaded: Array<String>,
});

const emit = defineEmits(['updatePageLoaded']);

const showTitle = useMediaQuery('(min-width: 760px)');
const route = useRoute();

const h2Title = ref();
const h3Title = ref();
const titleDescription = ref();
const rsLinks = ref();

onMounted(() => {
  gsap.registerPlugin(CustomEase);

  if (showTitle.value && !props.pageLoaded.includes(route.name)) {
    // Initialisation du ease
    CustomEase.create('appearEase', '.56, .08, .24, 1');

    // Initialisation de la timeline
    const timeline = gsap.timeline({});

    timeline.set(h3Title.value.children[0], {
      marginTop: 22,
    });

    for (let i = 0; i < 2; i++) {
      timeline.set(h2Title.value.children[i].children[0], {
        marginTop: 64,
      });
    }

    for (let i = 0; i < 2; i++) {
      timeline.set(titleDescription.value.children[i].children[0], {
        marginTop: 24,
      });
    }

    for (let i = 0; i < 3; i++) {
      timeline.set(rsLinks.value.children[i].children[0], {
        marginTop: 26,
      });
    }

    // Animation du 1er titre
    timeline.to(h3Title.value.children[0], {
      marginTop: 0,
      duration: 0.8,
      ease: 'appearEase',
    });

    // Animation du 2ème titre
    for (let i = 0; i < 2; i++) {
      timeline.to(
        h2Title.value.children[i].children[0],
        {
          marginTop: 0,
          duration: 0.8,
          ease: 'appearEase',
        },
        '>-0.6'
      );
    }

    // Animation du 3ème titre
    for (let i = 0; i < 2; i++) {
      timeline.to(
        titleDescription.value.children[i].children[0],
        {
          marginTop: 0,
          duration: 0.8,
          ease: 'appearEase',
        },
        '>-0.6'
      );
    }

    // Animation de liens rs
    for (let i = 0; i < 3; i++) {
      timeline.to(
        rsLinks.value.children[i].children[0],
        {
          marginTop: 0,
          duration: 0.8,
          ease: 'appearEase',
        },
        '>-0.6'
      );
    }

    // On indique que la page a été chargée
    emit('updatePageLoaded', { name: route.name });
  }
});
</script>

<style scoped lang="postcss">
.home {
  display: flex;
  justify-content: space-between;
  padding: calc(80px + 24px) 24px 0 24px;

  @media (min-width: 1100px) {
    padding: calc(80px + 24px) 54px 24px 54px;
  }

  .title {
    width: 50%;
    margin-left: 0;
    padding-bottom: 30px;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      h2 {
        margin: 0;
        display: block;
        font-size: 58px;
        font-weight: 800;
        line-height: 48px;
        text-transform: uppercase;
        overflow: hidden;
        white-space: pre-wrap;
        word-wrap: break-word;

        @media (min-width: 1030px) {
          font-size: 80px;
          line-height: 64px;
        }

        .title-container {
          position: relative;
          display: block;
          height: 48px;
          overflow: hidden;

          @media (min-width: 1030px) {
            height: 64px;
          }

          &:not(:first-of-type) {
            margin-top: 8px;
          }

          .words-container {
            display: block;
            height: 100%;

            &:not(:first-of-type) {
              margin-top: 8px;
            }
          }
        }
      }

      h3 {
        margin: 0 0 8px 0;
        height: 22px;
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;
        text-transform: uppercase;
        color: rgb(0, 0, 0, 0.3);
        overflow: hidden;

        > span {
          display: block;
          height: 100%;

          span {
            color: rgb(0, 0, 0, 1);
          }
        }
      }

      .title-description {
        font-size: 16px;
        font-weight: 600;
        color: rgb(0, 0, 0, 0.3);

        > span {
          display: block;
          height: 24px;
          overflow: hidden;
          border: 0px solid;

          span {
            display: block;
            height: 100%;

            strong {
              color: rgb(0, 0, 0, 0.8);
              font-weight: 800;
            }
          }
        }
      }

      .rs-links {
        z-index: 2;

        ul {
          margin: 0;
          padding: 0;

          li {
            height: 26px;
            list-style-type: none;
            overflow: hidden;
            border: 0px solid;

            a {
              display: inline-block;
              height: 100%;
              line-height: 28px;
              color: #000000;
              text-decoration: none;
              font-weight: 600;
              text-transform: uppercase;
              border: 0px solid red;
            }
          }
        }
      }
    }
  }

  .content {
    flex: 1;

    @media (min-width: 760px) {
      flex: 1;
      max-width: 450px;
    }

    .content-lists-container {
      ul {
        margin: 0;
        padding: 0;

        .item {
          position: relative;
          list-style-type: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);

          a {
            display: flex;
            grid-gap: 32px;
            justify-content: space-between;
            padding: 30px 0;
            color: #000000;
            text-decoration: none;
            cursor: pointer;

            h4,
            h5 {
              margin: 0;
            }

            h4 {
              font-size: 18px;
            }

            h5 {
              margin-top: 4px;
              font-weight: 600;
              color: rgba(0, 0, 0, 0.5);

              &:deep span {
                color: rgba(0, 0, 0, 1);
                font-size: 16px;
              }
            }

            .header-buttons {
              display: flex;
              align-items: center;
              grid-gap: 14px;
              opacity: 1;

              button {
                padding: 0;
                height: 16px;
                border: none;
                background: transparent;
                cursor: pointer;

                img {
                  display: block;
                  height: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
