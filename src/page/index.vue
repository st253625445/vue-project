<template>
  <div>
    <Header/>
    <navSolid/>
    <div class="article_list">
    <router-view/>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header.vue'
import navSolid from '@/components/navSolid.vue'

export default {
  components: { Header, navSolid },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('topics', null, r => {
        this.list = r.data
      })
    }
  }
}
</script>