<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroller',
  props: {
    handleToPullUp: {
      type: Function,
      default: function(){}
    }
  },
  mounted () {
    var bscroll = new BScroll(this.$refs.wrapper,{
      tap: true,
      probeType: 1,
      pullUpLoad: {
        threshold: 0
      },
      scrollBar: {
        fade: false
      }
    })

    this.scroll = bscroll

    bscroll.on('pullingUp', () => {
      this.handleToPullUp()
      // console.log(1)
      bscroll.finishPullUp()
    })
  },
  methods: {
    toScrollTop (y) {
      this.scroll.scrollTo(0,y)
    }
  }
}
</script>

<style scoped>
.wrapper{
  height: 100%
}
</style>