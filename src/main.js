import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import './registerServiceWorker'

import appConfig from './config'
import urlConfig from './api'
import axios from 'axios'
import { tokenInstance, tokenFormInstance, downloadFile } from '@/libs/tokenHttp.js'
import domMethod from '@/libs/dom-method.js'
import storage from '@/libs/local.js'
import { DelayWarning, DelayError } from '@/libs/ivuMessage.js' // 自定义全局提示插件

import './assets/currency.scss'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
// import './theme/main.less'
import './assets/app.scss'

import importDirective from './directive'
import importFilter from './filter'

import ChartBlock from './components/chart-block.vue'
import MouseFade from './components/mouse-fade.vue'

/**
 * 使用iview
 */
Vue.use(iView)
Vue.config.productionTip = false

/**
 * Vue扩展
 */
Vue.prototype.$urlConfig = urlConfig
Vue.prototype.$appConfig = appConfig
Vue.prototype.$http = axios
Vue.prototype.$storage = storage
Vue.prototype.$thttp = tokenInstance
Vue.prototype.$tform = tokenFormInstance
Vue.prototype.$downFile = downloadFile
Vue.prototype.$DelayWarning = DelayWarning // 自定义全局提示
Vue.prototype.$DelayError = DelayError // 自定义全局提示
Vue.prototype.$dom = domMethod // 简单的dom操作方法
/**
 * 通用指令和过滤器注册
 */
Vue.use(importDirective)
Vue.use(importFilter)
/**
 * 通用组件
 */
Vue.use(ChartBlock)
Vue.use(MouseFade)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
