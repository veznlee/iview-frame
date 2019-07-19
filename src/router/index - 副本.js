import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
import storage from '@/libs/local'
import appConfig from '@/config'
import Main from '@/views/Main' // Layout 是架构组件，不在后台返回，在文件里单独引入

import store from '@/store'
import { setToken, getToken } from '@/libs/appUtil'
const _import = require('./_import_' + process.env.NODE_ENV) // 获取组件的方法
const { HOME_PAGE_NAME, LOGIN_PAGE_NAME, NOFOUND_PAGE_NAME } = { ...appConfig }
import { asyncRouters } from './routers' // 异步组件

let requestRouter // 远程请求过来的路由

Vue.use(Router)
const router = new Router({
  routes,
  // mode: 'history',
  base: process.env.BASE_URL
})

function routerGo(to, next) {
  let componentRouter = filterAsyncRouter(requestRouter) // 过滤路由
  componentRouter.push({
    path: '*',
    name: 'not_found',
    meta: {
      title: '页面不存在'
    },
    redirect: '/error_404'
  })
  router.addRoutes(componentRouter) // 动态添加路由
  global.antRouter = requestRouter // 将路由数据传递给全局变量，做侧边栏菜单渲染工作，
  next({ ...to, replace: true })
}

function filterAsyncRouter(asyncRouterMap) { // 遍历后台传来的路由字符串，转换为组件对象
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
    }
    return true
  })
  return accessedRouters
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  // 不需要token和权限即可访问的界面
  if (appConfig.NO_NEED_TOKEN_PAGES.indexOf(to.name) > -1) {
    next()
  } else {
    const token = storage.getLocal(appConfig.appTokenName)
    if (!token && to.name !== LOGIN_PAGE_NAME) { // 未登录且要跳转的页面不是登录页
      next({
        name: LOGIN_PAGE_NAME, // 跳转到登录页
        query: {
          redirect: to.name
        }
      })
    } else {
      if (!requestRouter) { // 如果没有获取路由
        if (!storage.getLocalObj(appConfig.appSPName)) { // 如果本地缓存没有
          // axios.get('https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter').then(res => {
          //   requestRouter = res.data.data.router // 后台拿到路由
          //   storage.setLocalObj('router', requestRouter) // 存储路由到localStorage
          //   routerGo(to, next) // 执行路由跳转方法
          // })
          setTimeout(() => { // 模拟后台拿到路由
            requestRouter = asyncRouters
            storage.setLocalObj(appConfig.appSPName, requestRouter) // 存储路由到localStorage
            routerGo(to, next) // 执行路由跳转方法
          },50)
        } else {
          requestRouter = storage.getLocalObj(appConfig.appSPName)
          routerGo(to, next)
        }
      } else {
        next()
      }
    }


    // const token = storage.getLocal(appConfig.appTokenName)
    // if (!token && to.name !== LOGIN_PAGE_NAME) { // 未登录且要跳转的页面不是登录页
    //   next({
    //     name: LOGIN_PAGE_NAME // 跳转到登录页
    //   })
    // } else if (token) {
    //   if(appConfig.NO_NEED_PERMISSION_PAGES.indexOf(to.name) > -1){ // 不在权限配置里的页面，直接进入
    //     next()
    //   }else{
    //     const menus = storage.getLocalObj(appConfig.appSPName)
    //     if(menus && menus.length){
    //       let route = findRouterByName(menus, to.name)
    //       if(route){
    //         next()
    //       }else{
    //         next({ replace: true, name: NOFOUND_PAGE_NAME })
    //       }
    //     }else{
    //       next({
    //         name: LOGIN_PAGE_NAME // 跳转到登录页
    //       })
    //     }
    //   }
    // }
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
