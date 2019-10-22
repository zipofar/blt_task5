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
    updatePages(state, payload) {
      state.pages = payload;
    },
    updateCountPagination(state, payload) {
      state.UIPages.countPagination = payload;
    },
    updateNumCurrentPagination(state, payload) {
      state.UIPages.numCurrentPagination = payload;
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
    fetchPagesRequest(state) {
      state.UIPages.stateFetch = 'request';
    },
    fetchPagesSuccess(state) {
      state.UIPages.stateFetch = 'success';
    },
    fetchPagesFailure(state) {
      state.UIPages.stateFetch = 'failure';
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
    async loadState(ctx) {
      try {
        const res = await axios({
          method: 'get',
          baseURL: apiBaseUrl,
          url: '/v1/service/app_state',
        });
        ctx.commit('updateState', res.data);
      } catch (err) {
        errorHandler(err);
      }
    },
    async logout(ctx) {
      try {
        const res = await axios({
          method: 'post',
          baseURL: apiBaseUrl,
          url: '/v1/auth/logout',
          headers: {
            'x-csrf-token': Vue.cookie.get('csrf'),
          },
        });
        ctx.commit('updateState', res.data);
      } catch (err) {
        errorHandler(err);
      }
    },
    async login(ctx, { username, password, router }) {
      ctx.commit('userLoginRequest');
      try {
        const res = await axios({
          method: 'post',
          baseURL: apiBaseUrl,
          url: '/v1/auth/login',
          headers: {
            'x-csrf-token': Vue.cookie.get('csrf'),
          },
          data: { username, password },
        });

        ctx.commit('updateUser', res.data);
        ctx.commit('userLoginSuccess');
        router.push({ name: 'root' });
      } catch (err) {
        const msg = errorHandler(err);
        ctx.commit('userLoginFailure', { msg });
      }
    },
    async makeRegistration(ctx, { username, password, router }) {
      ctx.commit('userRegistrationRequest');
      try {
        const res = await axios({
          method: 'post',
          baseURL: apiBaseUrl,
          url: '/v1/registration',
          headers: {
            'x-csrf-token': Vue.cookie.get('csrf'),
          },
          data: { username, password },
        });
        ctx.commit('updateUser', res.data);
        ctx.commit('userRegistrationSuccess');
        router.push({ name: 'root' });
      } catch (err) {
        const msg = errorHandler(err);
        ctx.commit('userRegistrationFailure', { msg });
      }
    },
    async fetchPages(ctx, page) {
      ctx.commit('fetchPagesRequest');
      try {
        const res = await axios({
          method: 'get',
          baseURL: apiBaseUrl,
          url: '/v1/pages',
          params: { page },
        });
        ctx.commit('fetchPagesSuccess');

        const { data } = res;
        const pages = data.pages.map(e => (
          { ...e, url: `#/pages/${e.id}` }
        ));
        ctx.commit('updatePages', pages);

        const countPagination = parseInt(data.countPagination, 10);
        ctx.commit('updateCountPagination', countPagination);
      } catch (err) {
        ctx.commit('fetchPagesFailure');
        errorHandler(err);
      }
    },
  },
  getters: {
    userIsAuth: state => (state.user.userIsAuth),
    userIsAdmin: state => (state.user.role === 'admin'),
  },
});

export default store;
