import { getUserInfo, getPermission, loginOut } from '@/api/user'

const user = {
  namespaced: true,
  state: {
    user: {},
    permission: [],
    firstRoute: '',
    token: ''
  },
  mutations: {
    addUser(state, user) {
      state.user = user
    },
    addPermission(state, permission) {
      state.permission = permission
    },
    addToken(state, token) {
      state.token = token
    },
    addFirstRoute(state, route) {
      state.firstRoute = route
    }
  },
  actions: {
    setUser({ commit }, payload) {
      commit('addUser', payload)
    },
    setPermission({ commit }, payload) {
      commit('addPermission', payload)
    },
    setToken({ commit }, payload) {
      commit('addToken', payload)
    },
    setFirstRoute({ commit }, payload) {
      commit('addFirstRoute', payload)
    },
    // 获取用户信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(data => {
          if(data.code !== 0){
            reject(data.msg)
          }
          commit('addUser', data.data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取菜单权限
    getPermission({ commit }) {
      return new Promise((resolve, reject) => {
        getPermission().then(data => {
          if(data.code !== 0){
            reject(data.msg)
          }
          commit('addPermission', data.data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出登录
    loginOut() {
      return new Promise((resolve, reject) => {
        loginOut().then(data => {
          if(data.code !== 0){
            reject(data.msg)
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getPermission(state) {
      return state.user
    },
    getToken(state) {
      return state.token
    }
  }
}

export default user
