<template>
  <div class="c-scroll-outer-wrap">
    <div ref="out" class="w-s-container" @mouseenter="stop" @mouseleave="scrollJudge">
      <div
        ref="el"
        :style="{marginTop: mt + 'px',transition: 'margin-top '+animate+'s linear'}"
        class="s-container"
      >
        <div ref="source">
          <slot></slot>
        </div>
        <div ref="copy" :style="{display:display}">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setTimeout, clearTimeout, setInterval, clearInterval } from 'timers'
export default {
  props: {
    watchData: {
      type: null,
      default() {
        return []
      }
    },
    scrollPx: {
      type: Number,
      default: 1
    },
    splitTime: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      animate: 0.3,
      display: 'none',
      timer: null,
      mt: 0,
      wh: 0,
      ih: 0,
      sh: 0
    }
  },
  watch: {
    watchData: {
      handler() {
        /**
         * 此处有坑，如果子元素是table，在第一次渲染时，虽然监听到了数据变化，但table高度任然为0，
         * 导致子元素高度小于父容器高度，无法触发滚动，所以添加延时
         *  */
        setTimeout(() => {
          this.scrollJudge()
        }, 50)
      },
      deep: true
    }
  },
  methods: {
    stop() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    start() {
      this.stop();
      this.timer = setInterval(() => {
        this.scroll();
      }, this.splitTime);
    },
    scrollJudge() {
      this.wh = this.$refs.out.clientHeight;
      this.ih = this.$refs.el.clientHeight;
      this.fh = this.$refs.source.clientHeight;
      if (this.wh < this.ih) {
        this.display = 'block';
        this.start();
      } else {
        this.display = 'none';
        this.mt = 0;
      }
    },
    scroll() {
      let mtNew = this.mt - this.scrollPx;
      if (mtNew <= this.fh * -1) {
        mtNew += this.fh;
        this.animate = 0;
      } else {
        this.animate = 0;
      }
      this.mt = mtNew;
    }
  },
  mounted() {
    //节流处理
    function throttle(func, wait, options) {
      let time,
        context,
        args,
        result;
      let previous = 0;
      if (!options) options = {};

      let later = function () {
        previous = options.leading === false ? 0 : new Date().getTime();
        time = null;
        func.apply(context, args);
        if (!time) context = args = null;
      };

      let throttled = function () {
        let now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (time) {
            clearTimeout(time);
            time = null;
          }
          previous = now;
          func.apply(context, args);
          if (!time) context = args = null;
        } else if (!time && options.trailing !== false) {
          time = setTimeout(later, remaining);
        }
      };
      return throttled;
    };
    // 添加监听
    let _this = this;
    this.$refs.out.__resize = throttle(function () {
      _this.scrollJudge();
    }, 200);
    window.addEventListener('resize', this.$refs.out.__resize);
    this.scrollJudge();
  },
  beforeDestroy() {
    this.stop();
    window.removeEventListener('resize', this.$refs.out.__resize);
  }
}
</script>
<style lang="scss" scoped>
.c-scroll-outer-wrap {
  height: 100%;
  overflow: hidden;
  .w-s-container {
    position: relative;
    height: 100%;
    overflow: hidden;
    .s-container {
      transition: margin-top 0.3s linear;
    }
  }
}
</style>
