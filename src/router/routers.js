import Home from '@/views/Home.vue'
// import Main from '@/views/Main.vue'
import Main from '@/components/main'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import LoadPage from '@/views/LoadPage.vue'

// 每一个菜单的name属性很重要，且必须保证不为空且唯一
export const asyncRouters = [
  {
    path: '/example',
    component: 'Main',
    name: 'Example',
    meta: {
      title: '案例',
      icon: 'ios-book'
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: 'table/index',
        meta: {
          title: '表格',
          icon: 'ios-hammer'
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: 'tree/index',
        meta: {
          title: '树形菜单',
          icon: 'ios-hammer'
        }
      }
    ]
  },
  {
    path: '/form',
    component: 'Main',
    name: 'form',
    meta: {
      showAlways: true,
      title: '表单演示',
      icon: 'ios-hammer'
    },
    children: [
      {
        path: 'index',
        name: 'formInput',
        component: 'form/index',
        meta: {
          title: '表单',
          showAlways: true,
          icon: '_qq'
        },
        children: [
          {
            path: 'level3',
            name: 'level3',
            component: 'form/test/index',
            meta: {
              title: '三级菜单测试',
              icon: '_qq'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: 'Main',
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: 'multilevel/level-2-1'
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: 'multilevel/parent-view',
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级一'
            },
            component: 'multilevel/level-2-2/level-2-2-1'
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            meta: {
              icon: 'md-funnel',
              title: '三级二'
            },
            component: 'multilevel/level-2-2/level-2-2-2'
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: 'multilevel/level-2-3'
      }
    ]
  }
]
export const tagRouters = []
export default [
  {
    path: '/',
    name: 'main',
    meta: {
      title: ''
    },
    component: Main,
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        title: '首页',
        icon: 'md-home'
      },
      component: Home
    }]
  },
  ...tagRouters,
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: Login
  }, {
    path: '/loading/: token/: id',
    name: 'loading',
    meta: {
      title: '登录授权'
    },
    component: LoadPage
  }, {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: '管理平台'
    },
    component: Dashboard
  }, {
    path: '/error_404',
    name: 'error_404',
    meta: {
      title: '访问错误'
    },
    component: () => import('@/views/Error404.vue')
  }
]
