import * as types from './types'

const mutations = {
  [types.UPDATE_USER_INFO](state, name) {
    state.nickName = name
  },
  [types.INIT_CART_COUNT](state, number) {
    state.cartCount = number
  },
  [types.UPDATE_CART_COUNT](state, number) {
    state.cartCount += number
  },
}
export default mutations
