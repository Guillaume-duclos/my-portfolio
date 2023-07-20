<template>
  <section class="page">
    <slot />
  </section>
</template>

<style lang="sass">
.page
  display: flex
  position: relative
  justify-content: space-between
  height: calc(100vh - 80px - 48px)
  padding: calc(80px + 24px) 24px 0 24px

  @media (min-width: 1100px)
    padding: calc(80px + 24px) 54px 24px 54px

  .content
    display: flex
    position: absolute
    flex-direction: column
    margin-top: calc(-80px - 24px)
    padding-top: 80px
    padding-left: 0
    width: calc(100% - 24px * 2)
    height: calc(100vh - 80px)
    overflow: auto
    -ms-overflow-style: none
    scrollbar-width: none
    border: 0px solid black

    &::-webkit-scrollbar
      width: 0
      background: transparent

    @media (min-width: 760px)
      padding-left: 50%
      width: calc(50% - 24px * 2)

    @media (min-width: 1100px)
      width: calc(50% - 54px * 2)

    .content-lists-container
      border: 0px solid red

      .content-title
        margin: 0
        font-size: 32px
        font-weight: 700

      > div
        margin-bottom: 80px

        ul
          margin: 0
          padding: 0
          width: 100%

          li
            list-style-type: none

        &:last-of-type
          margin-bottom: 80px

        @media (min-width: 760px)
          margin-bottom: 120px
</style>
