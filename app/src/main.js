import Vue from 'vue';
import Paginate from 'vuejs-paginate';
import VueRouter from 'vue-router';
import App from './App.vue';
import Page from './components/Page.vue';

Vue.config.productionTip = false;
Vue.component('paginate', Paginate);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Page, alias: '/pages/primary' },
    { path: '/pages/:id', component: Page },
  ],
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
