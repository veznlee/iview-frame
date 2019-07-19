<template>
  <div @mouseenter="enter" @mouseleave="leave">
    <slot :show="show"></slot>
  </div>
</template>
<script>
var MouseFade = {
  name: 'MouseFade',
  data() {
    return {
      show: false,
    }
  },
  methods: {
    enter() {
      this.show = true
    },
    leave() {
      this.show = false
    },
  },
}

/* 组件注册 */
MouseFade.install = function(Vue) {
  Vue.component(MouseFade.name, MouseFade)
}
export default MouseFade
</script>
