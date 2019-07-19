<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import '@/assets/app.scss'
export default {
  name: 'hahah'
}
</script>
<style lang="scss">
html,
body {
  margin: 0;
}
#app {
  font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.ivu-table-cell .ivu-btn + .ivu-btn {
  margin-left: 10px;
}
.ivu-table .ivu-table-tip {
  overflow-x: hidden;
}
.ivu-form.font-16-form {
  .ivu-input,
  .ivu-form-item-label,
  .ivu-radio-wrapper,
  .ivu-checkbox-wrapper,
  .ivu-radio-group .ivu-radio-wrapper,
  .ivu-checkbox-group .ivu-checkbox-wrapper,
  .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
  .ivu-select-single .ivu-select-selection .ivu-select-selected-value,
  .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
  .ivu-select-single .ivu-select-selection .ivu-select-selected-value,
  textarea.ivu-input {
    font-size: 16px;
  }
  .ivu-radio-wrapper,
  .ivu-checkbox-wrapper {
    margin-right: 14px;
  }
}
</style>
