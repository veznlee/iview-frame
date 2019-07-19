import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import message from './modules/message'
import dictDatas from './modules/dictDatas'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    frameBodyFull: false,
    serverAreaIndex: 0,
    serverAreaList: [],
    viewEmergency: {},
    noticeNum: 0
  },
  mutations: {
    changeFrameBodyFull(state, flag = false) {
      state.frameBodyFull = flag
    },
    toggleFrameBodyFull(state) {
      state.frameBodyFull = !state.frameBodyFull
    },
    setServerAreaIndex(state, index = 0) {
      state.serverAreaIndex = index
    },
    setServerAreaList(state, list = []) {
      state.serverAreaList = list
    },
    setViewEmergency(state, obj = {}) {
      state.viewEmergency = obj
    },
    setNoticeNum(state, num = 0) {
      state.noticeNum = num
    }
  },
  getters: {
    getFrameBodyState(state) {
      return state.frameBodyFull
    },
    getServerAreaIndex(state) {
      return state.serverAreaIndex
    },
    getServerAreaList(state) {
      return state.serverAreaList
    },
    getViewEmergency(state) {
      return state.viewEmergency
    },
    getNoticeNum(state) {
      return state.noticeNum
    },
    // 用户getters
    permission(state) {
      return state.user.permission
    },
    user(state) {
      return state.user.user
    },
    token(state) {
      return state.user.token
    }
  },
  actions: {},
  modules: {
    app,
    user,
    message,
    dictDatas
  }
})
