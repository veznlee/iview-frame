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
    // getUserInfo
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const { roles, name, avatar, introduction } = data

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // getPermission
    getPermission({ commit }) {
      return new Promise((resolve, reject) => {
        getPermission().then(response => {
          const data = response.data
          commit('SET_ROLES', data.xxx)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // loginOut
    loginOut({ commit }) {
      return new Promise((resolve, reject) => {
        loginOut().then(response => {
          const data = response.data
          commit('SET_ROLES', data.xxx)
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
