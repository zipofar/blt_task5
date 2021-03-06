import Vue from 'vue';
import Paginate from 'vuejs-paginate-z';
import VueCookie from 'vue-cookie';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import router from './routes';
import store from './store';

Vue.config.productionTip = false;
Vue.component('paginate', Paginate);
Vue.use(VueCookie);
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
