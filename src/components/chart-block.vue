<template>
  <div class="_chart_el_wrap">
    <div class="_chart_el_wrap" ref="chartEl"></div>
  </div>
</template>
<script>
/* eslint-disable */
import echarts from "echarts"
var ChartBlock = {
  name: "ChartBlock",
  data() {
    return {
      chart: null
    };
  },
  props: {
    option: {
      type: Object,
      default: function() {
        return {}
      }
    },
    autoUpdate: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    option: {
      handler(newValue, oldValue) {
        if (this.autoUpdate && this.chart) {
          this.autoUpdate && this.chart.setOption(newValue)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    setOption(option) {
      this.chart && this.chart.setOption(option)
    },
    resize() {
      this.chart && this.chart.resize()
    },
    returnChartToParent() {
      this.$emit('chartReady', this.chart)
    }
  },
  mounted() {
    // 节流处理
    function throttle(func, wait, options) {
      let time, context, args, result
      let previous = 0
      if (!options) options = {}

      let later = function() {
        previous = options.leading === false ? 0 : new Date().getTime()
        time = null
        func.apply(context, args)
        if (!time) context = args = null
      }

      let throttled = function() {
        let now = new Date().getTime()
        if (!previous && options.leading === false) previous = now
        let remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
          if (time) {
            clearTimeout(time)
            time = null
          }
          previous = now
          func.apply(context, args)
          if (!time) context = args = null
        } else if (!time && options.trailing !== false) {
          time = setTimeout(later, remaining)
        }
      }
      return throttled
    }

    this.chart = echarts.init(this.$refs.chartEl)
    this.chart.setOption(this.option)
    let _chart = this.chart
    this.chart.__resize = throttle(function() {
      _chart.resize()
    }, 200)
    window.addEventListener('resize', this.chart.__resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chart.__resize)
  }
}
/* 组件注册 */
ChartBlock.install = function(Vue) {
  Vue.component(ChartBlock.name, ChartBlock)
}
export default ChartBlock
</script>

<style lang="scss" scoped>
._chart_el_wrap {
  position: relative;
  height: 100%;
}
</style>