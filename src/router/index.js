import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import signup from '@/components/signup'
import home from '@/components/home'
import navigation from './navigation'
import post from '@/components/post'
import search from '@/components/search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'loginPage',
      component: login,
      beforeEnter: navigation.globalNavigation
    },
    {
      path: '/signup',
      name: 'signupPage',
      component: signup,
      beforeEnter: navigation.globalNavigation
    },
    {
      path:'/home',
      name: 'homePage',
      component: home,
      beforeEnter: navigation.authNavigation
    },
    {
      path:'/post',
      name: 'postPage',
      component: post,
      beforeEnter: navigation.authNavigation
    },
    {
      path:'/search',
      name: 'searchPage',
      component: search,
      beforeEnter: navigation.authNavigation
    }
  ]
})
