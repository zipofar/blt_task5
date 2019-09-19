import Vue from 'vue';
import VueRouter from 'vue-router';
import Page from './components/Page.vue';
import MainPage from './components/MainPage.vue';
import Page404 from './components/404.vue';
import LoginForm from './components/LoginForm.vue';
import RegistrationForm from './components/RegistrationForm.vue';
import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'root',
      component: MainPage,
    },
    {
      path: '/pages/:id',
      name: 'pages',
      component: Page,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm,
      meta: { guest: true },
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationForm,
      meta: { guest: true },
    },
    {
      path: '/*',
      name: '404',
      component: Page404,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.guest)) {
    const { userIsAuth } = store.state.user;
    if (userIsAuth) {
      next({
        name: 'root',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
