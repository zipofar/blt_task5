import VueRouter from 'vue-router';
import Page from './components/Page.vue';
import Page404 from './components/404.vue';
import LoginForm from './components/LoginForm.vue';
import RegistrationForm from './components/RegistrationForm.vue';

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Page,
      alias: '/pages/primary',
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
/*
router.beforeEach((to, from, next) => {
});
*/

export default router;
