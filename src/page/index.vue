<template>
  <div>
    <Header/>
    <navSlide/>
    <div class="container">
    <router-view/>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header.vue'
import navSlide from '@/components/navSlide.vue'

export default {
  components: { Header, navSlide }
}
</script>

<style lang="scss" scoped>
@import "../style/scss/_index.scss";
</style>
