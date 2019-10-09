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
    userLoginRequest(state) {
      state.UILogin.makeLogin = 'request';
    },
    userLoginSuccess(state) {
      state.UILogin.makeLogin = 'success';
    },
    userLoginFailure(state, { msg }) {
      state.UILogin.makeLogin = 'failure';
      state.UILogin.errMsg = msg;
    },
    userRegistrationRequest(state) {
      state.UIRegistration.makeRegistration = 'request';
    },
    userRegistrationSuccess(state) {
      state.UIRegistration.makeRegistration = 'success';
    },
    userRegistrationFailure(state, { msg }) {
      state.UIRegistration.makeRegistration = 'failure';
      state.UIRegistration.errMsg = msg;
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
          'x-csrf-token': Vue.cookie.get('csrf'),
        },
      })
        .then(({ data }) => {
          ctx.commit('updateState', data);
        })
        .catch((err) => {
          errorHandler(err);
        });
    },
    login(ctx, { username, password, router }) {
      ctx.commit('userLoginRequest');
      axios({
        method: 'post',
        baseURL: apiBaseUrl,
        url: '/v1/auth/login',
        headers: {
          'x-csrf-token': Vue.cookie.get('csrf'),
        },
        data: { username, password },
      })
        .then(({ data }) => {
          ctx.commit('updateUser', data);
          ctx.commit('userLoginSuccess');
          router.push({ name: 'root' });
        })
        .catch((err) => {
          const msg = errorHandler(err);
          ctx.commit('userLoginFailure', { msg });
        });
    },
    makeRegistration(ctx, { username, password, router }) {
      ctx.commit('userRegistrationRequest');
      axios({
        method: 'post',
        baseURL: apiBaseUrl,
        url: '/v1/registration',
        headers: {
          'x-csrf-token': Vue.cookie.get('csrf'),
        },
        data: { username, password },
      })
        .then(({ data }) => {
          ctx.commit('updateUser', data);
          ctx.commit('userRegistrationSuccess');
          router.push({ name: 'root' });
        })
        .catch((err) => {
          const msg = errorHandler(err);
          ctx.commit('userRegistrationFailure', { msg });
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
