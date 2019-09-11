import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Paginate from 'vuejs-paginate';
import App from './App.vue';
import router from './routes';

Vue.config.productionTip = false;
Vue.component('paginate', Paginate);
Vue.use(Vuex);
Vue.use(VueRouter);

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

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
