<template>
  <section class="page">
    <slot />
  </section>
</template>

<style lang="postcss">
.page {
  display: flex;
  position: relative;
  justify-content: space-between;
  height: calc(100vh - 80px - 48px);
  padding: calc(80px + 24px) 24px 0 24px;

  @media (min-width: 1100px) {
    padding: calc(80px + 24px) 54px 24px 54px;
  }

  .title {
    width: 50%;
    height: 100%;
    margin-left: 0;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: calc(100vh - 80px - 24px * 2);

      h2,
      p {
        margin: 0;
        font-size: 80px;
        font-weight: 800;
        text-transform: uppercase;
      }

      h2 {
        display: block;
        overflow: hidden;
        line-height: 64px;
        white-space: pre-wrap;
        word-wrap: break-word;
      }

      .titles-container {
        position: relative;
        display: block;
        height: 64px;
        overflow: hidden;

        &:not(:first-of-type) {
          margin-top: 4px;
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

      .active-company-index-container {
        position: relative;
        height: 72px;
        line-height: 77px;
        overflow: hidden;

        .active-company-index {
          position: absolute;
          height: 100%;
          width: 54px;

          &:not(:first-of-type) {
            left: 54px;
          }

          span {
            display: block;
            height: 100%;
            font-variant-numeric: tabular-nums;
          }
        }

        .company-count {
          position: absolute;
          left: calc(54px * 2);
          bottom: 0;
          line-height: 30px;
          font-size: 30px;
        }
      }
    }
  }

  .content {
    display: flex;
    position: absolute;
    flex-direction: column;
    margin-top: calc(-80px - 24px);
    padding-top: 80px;
    padding-left: 0;
    width: calc(100% - 24px * 2);
    height: calc(100vh - 80px);
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }

    @media (min-width: 760px) {
      padding-left: 50%;
      width: calc(50% - 24px * 2);
    }

    @media (min-width: 1100px) {
      width: calc(50% - 54px * 2);
    }

    .content-lists-container {
      .content-title {
        margin: 0;
        font-size: 32px;
        font-weight: 700;
      }

      > div {
        margin-bottom: 80px;

        a {
          color: #000000;
        }

        ul {
          margin: 0;
          padding: 0;
          width: 100%;

          li {
            list-style-type: none;
          }
        }

        &:last-of-type {
          margin-bottom: 80px;
        }

        @media (min-width: 760px) {
          margin-bottom: 120px;
        }
      }
    }
  }
}
</style>
