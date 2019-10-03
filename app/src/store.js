import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import errorHandler from './utils/errorHandler';
import initState from './server/initAppState';

Vue.use(Vuex);

const apiBaseUrl = process.env.VUE_APP_APIURL;

const store = new Vuex.Store({
  state: initState,
  mutations: {
    updateState(state, payload) {
      Object.assign(state, payload);
    },
    updateUser(state, payload) {
      state.user = { ...payload };
    },
  },
  actions: {
    loadState(ctx) {
      axios({
        method: 'get',
        baseURL: apiBaseUrl,
        url: '/v1/service/app_state',
      })
        .then(({ data }) => {
          ctx.commit('updateState', data);
        })
        .catch((err) => {
          errorHandler(err);
        });
    },
    logout(ctx) {
      axios({
        method: 'post',
        baseURL: apiBaseUrl,
        url: '/v1/auth/logout',
        headers: {
          'x-csrf-token': this.$cookie.get('csrf'),
        },
      })
        .then(({ data }) => {
          ctx.commit('updateState', data);
        })
        .catch((err) => {
          errorHandler(err);
        });
    },
  },
  getters: {
    userIsAuth: state => (state.user.userIsAuth),
    userIsAdmin: state => (state.user.role === 'admin'),
    numCurrentPagination: state => (state.numCurrentPagination),
  },
});

export default store;
