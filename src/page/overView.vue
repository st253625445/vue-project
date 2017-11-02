<template>
  <div class="v-box page-overView">
    <ovChinaMapBox/>
    <div class="v-box-gap"></div>
    <ovCityDebt/>
  </div>
</template>


<script>
import ovChinaMapBox from '@/components/overView/chinaMapEchart.vue'
import ovCityDebt from '@/components/overView/ovCityDebt.vue'

export default {
  components: { ovChinaMapBox, ovCityDebt }
}
</script>