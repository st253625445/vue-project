<template>
  <div class="slide-nav">
    <ul>
      <router-link tag="li" v-for="nav in navs" :to="{ path: nav.path,activeClass: '' }"><span>{{nav.text}}</span></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navs: [
        { text: '总览', path: 'overView' },
        { text: '资产', path: 'assets' },
        { text: '负债', path: 'debt' },
        { text: '收支', path: 'balAndPay' },
        { text: '项目', path: 'project' },
        { text: '国企', path: 'enterprise' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/scss/_navslide.scss";
</style>
