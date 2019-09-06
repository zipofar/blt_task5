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
  state: {
    user: {},
    userIsAuth: false,
  },
  mutations: {
    setUserAuth(state) {
      state.userIsAuth = true;
    },
    setUserInfo(state, userInfo) {
      state.user = { ...userInfo };
    },
  },
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
