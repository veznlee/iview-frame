import Vue from 'vue'
import Router from 'vue-router'
import routes, { asyncRouters } from './routers'
import iView from 'iview'
import storage from '@/libs/local'
import appConfig from '@/config'
import Main from '_c/main' // Layout 是架构组件，不在后台返回，在文件里单独引入

import store from '@/store'
import { getToken, getMenuByRouter, getFirstRoute } from '@/libs/appUtil'
const _import = require('./_import_' + process.env.NODE_ENV) // 获取组件的方法
const { LOGIN_PAGE_NAME, homeName, hasHomePage } = { ...appConfig }
let notCanTunToRoute = ['main'] // 不能跳转的页面，指的是那些从后台获取的且含有children的菜单

Vue.use(Router)
const router = new Router({
  routes,
  // mode: 'history',
  base: process.env.BASE_URL
})

// 遍历后台传来的路由字符串，将组件名转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Main') { // Layout组件特殊处理
        route.component = Main
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
      // if (route.meta && route.meta.canTurnTo) {} else {
      //   notCanTunToRoute.push(route.name)
      // }
      if (!route.meta || (route.meta && (typeof route.meta.canTurnTo === 'undefined' || route.meta.canTurnTo === false))) {
        notCanTunToRoute.push(route.name)
      }
    }
    return true
  })
  return accessedRouters
}

// 第一次加载菜单
function routerGo(list, to, next) {
  let componentRouter = filterAsyncRouter(list) // 过滤路由
  componentRouter.push({
    path: '*',
    name: 'not_found',
    meta: {
      title: '页面不存在'
    },
    redirect: '/error_404'
  })
  router.addRoutes(componentRouter) // 动态添加路由
  // 如果直接输入了类似localhost:8080这样的情况，那to.fullPath = '/',直接让它跳转到首页
  if(to.fullPath === '/'){
    if(hasHomePage){
      next({ name: homeName, replace: true })
    }else{
      next({ name: store.state.user.firstRoute, replace: true })
    }
  }else{
    next({ ...to, replace: true })
  }
}

// 跳转路径，对有children的路径进行拦截
const turnTo = (to, next) => {
  if (to.name ===  LOGIN_PAGE_NAME) {
    if (hasHomePage) {
      next({
        name: homeName
      })
    } else {
      next({
        name: store.state.user.firstRoute
      })
    }
  }
  let route = notCanTunToRoute.filter(item => {
    return to.name === item
  })
  if (route.length) next({ replace: true, name: 'error_404' }) // 无权限，重定向到401页面
  else next() // 有权限，可访问
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  // 不需要token和权限即可访问的界面
  if (appConfig.NO_NEED_TOKEN_PAGES.indexOf(to.name) > -1) {
    next()
  } else {
    const token = getToken(appConfig.appTokenName)
    if (!token && to.name !== LOGIN_PAGE_NAME) { // 未登录且要跳转的页面不是登录页
      let query = { ...to.query }
      query.redirect = to.fullPath // 因为路由还没加进去，所以不能获取to.name
      next({
        name: LOGIN_PAGE_NAME, // 跳转到登录页
        query: query
      })
    } else {
      if (!store.getters.permission.length) { // 如果没有获取路由
        const localPermission = storage.getLocalObj(appConfig.appSPName)
        if (!localPermission) { // 如果本地缓存没有
          setTimeout(() => { // 模拟后台拿到路由
            const requestRouter = asyncRouters
            store.dispatch('user/setPermission', getMenuByRouter(requestRouter))
            store.dispatch('user/setFirstRoute', getFirstRoute(requestRouter[0])) //设置第一个可以跳转的路由
            storage.setLocalObj(appConfig.appSPName, requestRouter) // 存储路由到localStorage
            routerGo(requestRouter, to, next) // 执行路由跳转方法
          }, 50)
        } else {
          store.dispatch('user/setPermission', getMenuByRouter(localPermission))
          store.dispatch('user/setFirstRoute', getFirstRoute(localPermission[0]))
          routerGo(localPermission, to, next)
        }
      } else {
        turnTo(to, next)
      }
    }
  }
})

router.afterEach(to => {
  let meta = { ...to.meta }
  if (meta.title) {
    if (to.name !== 'dashboard') {
      document.title = appConfig.appTitle + '-' + meta.title
    } else {
      document.title = meta.title
    }
  }
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
