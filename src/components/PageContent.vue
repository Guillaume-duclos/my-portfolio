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

  .title
    width: 50%
    height: 100%
    margin-left: 0
    border: 0px solid black
    // z-index: 10

    > div
      display: flex
      flex-direction: column
      justify-content: space-between
      height: calc(100vh - 80px - 24px * 2)

      h2, p
        margin: 0
        font-size: 80px
        font-weight: 800
        text-transform: uppercase
        border: 0px solid red

      h2
        display: block
        line-height: 60px
        overflow: hidden
        white-space: pre-wrap
        word-wrap: break-word

        //.titles-container
        //  position: relative
        //  display: flex
        //  height: 72px
        //  line-height: 72px
        //  overflow: hidden
        //  border: 1px solid black
        //
        //  &:not(:first-of-type)
        //    margin-top: 5px
        //
        //  .words-container
        //    height: 100%
        //    border: 0px solid blue
        //
        //    .letters-container
        //      display: block
        //      height: 100%
        //      // text-align: center
        //      border: 1px solid red

      .titles-container
        position: relative
        display: block
        height: 60px
        overflow: hidden
        border: 0px solid black

        &:not(:first-of-type)
          margin-top: 8px

        .titles-sub-container
          display: block
          height: 100%
          border: 0px solid red

          .words-container
            display: block
            height: 100%
            border: 0px solid blue

            &:not(:first-of-type)
              margin-top: 8px

      h3
        margin: 8px 0 0 0
        font-size: 24px
        font-weight: 700
        line-height: 22px
        color: rgb(0, 0, 0, .3)

        span
          display: block
          font-size: 12px
          font-weight: 600
          text-transform: uppercase

      .active-company-index-container
        position: relative
        height: 72px
        line-height: 77px
        overflow: hidden
        border: 0px solid black

        .active-company-index
          position: absolute
          height: 100%
          width: 54px
          border: 0px solid blue

          &:not(:first-of-type)
            left: 54px

          span
            display: block
            height: 100%
            font-variant-numeric: tabular-nums
            border: 0px solid red

        .company-count
          position: absolute
          left: calc(54px * 2)
          bottom: 0
          line-height: 30px
          font-size: 30px

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
