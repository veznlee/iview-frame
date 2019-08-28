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
