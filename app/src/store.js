import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: { user: {} },
  mutations: {
    updateState(state, payload) {
      Object.assign(state, payload);
    },
    updateUser(state, payload) {
      state.user = { ...payload };
    },
  },
  getters: {
    userIsAuth: state => (state.user.userIsAuth),
    userIsAdmin: state => (state.user.role === 'admin'),
  },
});

export default store;
