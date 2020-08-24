const state = {
  name: window.localStorage.getItem('nowName') || '武汉',
  id: window.localStorage.getItem('nowId') || 420100
}

const mutations = {
  checkoutCity (state, payload) {
    state.name = payload.name
    state.id = payload.id
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}