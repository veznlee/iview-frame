<template>
  <i class="nav-icon" :class="type">测试图标</i>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='scss'>
.nav-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
}
</style>
