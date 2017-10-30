<template>
  <div>
    <appHeader/>
    <navSlide/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template> 
<script>
import appHeader from '@/components/header.vue'
import navSlide from '@/components/navSlide.vue'

export default {
  components: { appHeader, navSlide },
  mounted () {
    this.$nextTick(function () {
      this._remResize()
      this._setContainerHeight()
    })
  },
  methods: {
    _remResize () {
      // 动态计算屏幕的宽度，从而得到网页的fontSize大小
      let docEl = document.documentElement
      let resizeEvt =
        'orientationchange' in window ? 'orientationchange' : 'resize'
      let recalc = (function () {
        let clientWidth = docEl.clientWidth
        if (!clientWidth) return
        clientWidth =
          clientWidth > 1920 ? 1920 : clientWidth < 1024 ? 1024 : clientWidth
        docEl.style.fontSize = clientWidth / 19.2 + 'px'
      })()

      if (!document.addEventListener) return
      window.addEventListener(resizeEvt, recalc, false)
      // document.addEventListener('DOMContentLoaded', recalc, false)
    },
    _setContainerHeight () {
      let headerDom = document.querySelector('.header')
      let containerDom = document.querySelector('.container')
      containerDom.style.height =
        document.documentElement.clientHeight - headerDom.clientHeight + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/scss/_index.scss';
</style>
