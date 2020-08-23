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
      }
    })
    bscroll.on('pullingUp', (pos) => {
      this.handleToPullUp(pos)
      console.log(1)
      bscroll.finishPullUp()
    })
  }
}
</script>

<style scoped>
.wrapper{
  height: 100%
}
</style>