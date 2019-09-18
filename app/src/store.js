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
});

export default store;
