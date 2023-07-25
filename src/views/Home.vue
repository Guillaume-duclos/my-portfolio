<template>
  <section class="home">
    <aside v-if="showTitle" class="title" ref="container">
      <div>
        <div>
          <h3>Hello <span>👋</span>, je m'appelle</h3>

          <h2>
            <span v-for="(title, index) in titles" :key="`title-${index}`" class="titles-container">
              <span class="titles-sub-container">
                <span v-for="(word, index) in title" :key="`word-${index}`" class="words-container">
                  {{ word }}
                </span>
              </span>
            </span>
          </h2>
        </div>

        <div class="rs-links">
          <ul>
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
            <RouterLink v-else :to="link.route">
              <div>
                <h4>{{ link.title }}</h4>
                <h5 v-html="link.subTitle" />
              </div>

              <div class="header-buttons">
                <button>
                  <img src="../assets/icons/arrow-right.svg" alt="Ouvrir" />
                </button>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import Links from '../data/links.json';

const titles = ref([
  ['Guillaume', '', ''],
  ['Duclos', '', ''],
  ['', '', ''],
]);

const showTitle = useMediaQuery('(min-width: 760px)');
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

      h2,
      p {
        margin: 0;
        font-size: 80px;
        font-weight: 800;
        text-transform: uppercase;
      }

      h2 {
        display: block;
        line-height: 64px;
        overflow: hidden;
        white-space: pre-wrap;
        word-wrap: break-word;

        .titles-container {
          position: relative;
          display: block;
          height: 64px;
          overflow: hidden;

          &:not(:first-of-type) {
            margin-top: 8px;
          }

          .titles-sub-container {
            display: block;
            height: 100%;

            .words-container {
              display: block;
              height: 100%;

              &:not(:first-of-type) {
                margin-top: 8px;
              }
            }
          }
        }
      }

      h3 {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;
        text-transform: uppercase;
        color: rgb(0, 0, 0, 0.3);

        span {
          color: rgb(0, 0, 0, 1);
        }
      }

      .rs-links {
        z-index: 2;

        ul {
          margin: 0;
          padding: 0;

          li {
            list-style-type: none;

            a {
              color: #000000;
              text-decoration: none;
              font-weight: 600;
              text-transform: uppercase;
            }
          }
        }
      }
    }
  }

  .content {
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
            grid-gap: 20px;
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
