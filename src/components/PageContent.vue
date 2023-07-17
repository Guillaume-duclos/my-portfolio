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
  border: 0px solid black

  .content
    display: flex
    position: absolute
    flex-direction: column
    margin-top: calc(-80px - 24px)
    padding-top: 80px
    padding-left: 0
    width: 100%
    height: calc(100vh - 80px)
    overflow: auto
    -ms-overflow-style: none
    scrollbar-width: none
    border: 0px solid black

    &::-webkit-scrollbar
      width: 0
      background: transparent

    @media (min-width: 760px)
      width: 50%
      padding-left: 50%

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
