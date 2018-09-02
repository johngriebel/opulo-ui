import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/components/Login').default,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: require('@/components/SignUp').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
