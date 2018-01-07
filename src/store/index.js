import Vue from 'vue'
import Vuex from 'vuex'
import createdLogger from 'vuex/dist/logger'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)
const debug = process.env.NODE_EVN !== 'production'
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createdLogger()] : []
})
