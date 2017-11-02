<template>
  <div class="v-box-dev">
    <h2 class="v-box-hd">
      地方综合评价
    </h2>
    <div class="v-box-bd cityMapBox">
      <img src="../../assets/mapBgimg.png" alt="" class="mapBgimg">
      <div class="mapList">
        <ul>
          <li class="mapList1">
            <span class="mapNum">5.0</span>
            <span class="mapLine"></span>
            <span class="mapText">优秀</span>
          </li>
          <li class="mapList2">
            <span class="mapNum">3.5</span>
            <span class="mapLine"></span>
            <span class="mapText">良好</span>
          </li>
          <li class="mapList3">
            <span class="mapNum">2.5</span>
            <span class="mapLine"></span>
            <span class="mapText">一般</span>
          </li>
          <li class="mapList4">
            <span class="mapNum">1.5</span>
            <span class="mapNumLast">0.0</span>
            <span class="mapLine"></span>
            <span class="mapText">较差</span>
          </li>
        </ul>
      </div>
      <div class="mapIndication">
        <span>参考指标：经济实力，财政实力，政府债务，政府运营</span>
      </div>
      <div class="riskChinaMap" id="riskChinaMap"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
require('echarts/map/js/china')

export default {
  created () {
    this.getCityData()
  },
  data () {
    return {
      myChart: {},
      geoCoordMap: {},
      name: '热力图',
      layoutSize: 7 / 19.2 * document.documentElement.clientWidth
    }
  },
  methods: {
    init (options) {
      this.myChart = echarts.init(document.querySelector('.riskChinaMap'))
      this.myChart.setOption(options)
    },
    getCityData () {
      axios.get('static/data/cityData.json').then(res => {
        this.geoCoordMap = res.data
      })
    },
    convertData (data) {
      let res = []
      if (data.referenceCity) {
        for (let i = 0; i < data.referenceCity.length; i++) {
          let geoCoord = this.geoCoordMap[data.referenceCity[i].cityName]
          if (geoCoord) {
            res.push({
              name: data.referenceCity[i].cityName,
              value: geoCoord.concat(
                data.referenceCity[i].totalScore,
                data.referenceCity[i].financeSelfRate,
                data.referenceCity[i].financeGrowthRate,
                data.referenceCity[i].investGrowthRate,
                data.referenceCity[i].taxRevenueRate,
                data.referenceCity[i].cityScore
              )
            })
          }
        }
      }
      return res
    },
    randomStyle () {
      let randomItem = Math.floor(Math.random() * 10)
      let randomItem2 = Math.floor(Math.random() * 4)
      let arrColor = [
        '#6b8f9d',
        '#516673',
        '#435563',
        '#4d4d4d',
        '#38475f',
        '#4d4d4d',
        '#38475f',
        '$516673',
        '#436663',
        '#6d8f9d'
      ]
      let arrBorderColor = ['#0082d2', '#00aae1', '#00d2aa', '00d7e1']
      let _style = {
        normal: {
          color: arrColor[randomItem],
          borderColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: arrBorderColor[randomItem2]
              },
              {
                offset: 1,
                color: '#00d7e1'
              }
            ],
            globalCoord: false
          }
        }
      }
      return _style
    },
    provinceBgColor () {
      let procvice = [
        '江苏',
        '青海',
        '四川',
        '海南',
        '陕西',
        '甘肃',
        '云南',
        '湖南',
        '湖北',
        '黑龙江',
        '贵州',
        '山东',
        '江西',
        '河南',
        '河北',
        '山西',
        '安徽',
        '福建',
        '浙江',
        '广东',
        '吉林',
        '辽宁',
        '台湾',
        '新疆',
        '广西',
        '宁夏',
        '内蒙古',
        '西藏',
        '北京',
        '天津',
        '上海',
        '重庆',
        '香港',
        '澳门'
      ]
      let _provinceBgColor = []
      for (let item of procvice) {
        _provinceBgColor.push({
          name: item,
          itemStyle: this.randomStyle()
        })
      }
      return _provinceBgColor
    }
  },
  mounted () {
    axios.get('static/data/overView/chinaMap.json').then(res => {
      let options = {
        visualMap: {
          show: false,
          min: 0,
          max: 1000,
          seriesIndex: [0],
          inRange: {
            color: ['#435563', '#324652']
          }
        },
        geo: {
          map: 'china',
          roam: false,
          silent: true,
          label: {
            emphasis: {
              show: false
            }
          },
          layoutCenter: ['50%', '50%'],
          layoutSize: this.layoutSize,
          itemStyle: {
            normal: {
              areaColor: '#435361',
              borderColor: '#0082d2'
            },
            emphasis: {}
          }
        },
        tooltip: {
          borderColor: '#777',
          borderWidth: 1
        },
        series: [
          {
            name: 'mapbg',
            type: 'map',
            geoIndex: 0,
            tooltip: {
              show: true
            },
            label: {
              normal: {},
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#435361'
              },
              emphasis: {
                areaColor: '#607e91',
                borderColor: '#0ba2a8'
              }
            },
            data: this.provinceBgColor
          },
          {
            name: 'city',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              brushType: 'stroke'
            },
            symbolSize: function (val) {
              if (val[1] === 23.1152) return 20
              else return 10
            },
            data: this.convertData(res.data)
          }
        ]
      }
      window.onresize = this.myChart.resize
      this.init(options)
    })
  }
}
</script>

<style lang="scss" scoped>
.mapBgimg {
  width: 6rem;
  height: 6rem;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -3rem;
  margin-top: -3rem;
}
.mapList {
  position: absolute;
  width: 0.09rem;
  height: 1.52rem;
  left: 0.6rem;
  bottom: 0.2rem;
  ul {
    width: 100%;
    height: 100%;
    li {
      width: 100%;
      height: 25%;
      font-size: 0.12rem;
      position: relative;
      .mapNum {
        width: 0.4rem;
        position: absolute;
        left: -0.45rem;
        top: -0.1rem;
        color: #00fcff;
        text-align: right;
      }
      .mapText {
        width: 0.7rem;
        position: absolute;
        left: 0.4rem;
        top: 50%;
        margin-top: -0.08rem;
        color: #fff;
        font-size: 0.16rem;
        line-height: 0.16rem;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .mapLine {
        width: 0.1rem;
        height: 100%;
        display: block;
        position: absolute;
        left: 0.15rem;
        top: 0;
        border-right: 1px solid #979797;
        border-top: 1px solid #979797;
      }
      .mapNumLast {
        width: 0.4rem;
        position: absolute;
        left: -0.45rem;
        top: 0.3rem;
        color: #00fcff;
        text-align: right;
      }
    }
    .mapList1 {
      background: #7ed321;
    }
    .mapList2 {
      background: #ff8ee6;
    }
    .mapList3 {
      background: #ffda2b;
    }
    .mapList4 {
      background: #aedeff;
      .mapLine {
        border-bottom: 1px solid #979797;
      }
    }
  }
}
.mapIndication {
  position: absolute;
  width: 100%;
  bottom: 0.2rem;
  text-align: center;
  box-sizing: border-box;
  font-size: 0.12rem;
  padding: 0 0.5rem;
  span {
    display: inline-block;
    color: #979797;
    border: 1px dashed #979797;
    line-height: 2;
    padding: 0 0.05rem;
  }
}
.riskChinaMap {
  position: relative;
  width: 100%;
  height: 100%;
  span {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: #fff;
    line-height: 3.8rem;
    text-align: center;
    background: #182328;
  }
}
</style>
