import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breadcrumbList: {
      type: Array,
      default () {
        return []
      }
    },
    user: {
      type: Object,
      default () {
        return {}
      }
    },
    token: {
      type: String,
      default() {
        return ''
      }
    }
  },
  getters: {
    getBreadcrumbList(state) {
      return state.breadcrumbList
    },
    isLogin(state) {
      return state.token != undefined && typeof state.token === "string" && state.token != "";
    },
    getToken(state) {
      return state.token
    },
    getUser(state) {
      return state.user
    },
  },
  mutations: {
    setBreadcrumbList(state, payLoad) {
      state.breadcrumbList = payLoad
    },
    setToken(state, payLoad) {
      state.token = payLoad
    },
    setUser(state,payLoad) {
      state.user = payLoad
    },
  },
  actions: {},
  modules: {}
})