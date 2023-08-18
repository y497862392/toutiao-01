import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const TONKEY_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user:null
  },
  getters: {

  },
  mutations: {
    setUser(state, data) {
      state.user = data

      window.localStorage.setItem(TONKEY_KEY, JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
