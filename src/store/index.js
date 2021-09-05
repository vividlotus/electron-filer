import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headerText: null,
    footerText: null,
  },
  mutations: {
    setHeaderText (state, payload)
    {
      state.headerText = payload
    },
    setFooterText (state, payload)
    {
      state.footerText = payload
    },
  },
  actions: {
  },
  modules: {
  },
})
