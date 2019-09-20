import Vue from 'vue';
import VueRouter from 'vue-router';
import Page from './components/Page.vue';
import Page404 from './components/404.vue';
import LoginForm from './components/LoginForm.vue';
import RegistrationForm from './components/RegistrationForm.vue';
import ListUsers from './components/ListUsers.vue';
import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Page,
    },
    {
      path: '/pages/:id',
      name: 'pages',
      component: Page,
    },
    {
      path: '/users',
      name: 'users',
      component: ListUsers,
      meta: { admin: true },
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
  const { userIsAuth, userIsAdmin } = store.getters;
  if (to.matched.some(rec => rec.meta.guest)) {
    if (userIsAuth) {
      next({ name: 'root' });
    } else {
      next();
    }
  } else if (to.matched.some(rec => rec.meta.admin)) {
    if (!userIsAdmin) {
      next({ name: 'root' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
