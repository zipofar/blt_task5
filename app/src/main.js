import Vue from 'vue';
import Paginate from 'vuejs-paginate';
import VueCookie from 'vue-cookie';
import App from './App.vue';
import router from './routes';
import store from './store';

Vue.config.productionTip = false;
Vue.component('paginate', Paginate);
Vue.use(VueCookie);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
