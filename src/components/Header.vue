<template>
  <header class="header">
    <span>政府财政地图</span>
    <userIcon/>
    <div class="header-data-box">
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "../style/scss/_header.scss";
</style>

<script>
import userIcon from '@/components/user/userIcon.vue'

export default {
  components: { userIcon }
}
</script>

