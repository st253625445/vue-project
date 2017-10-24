import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Page404 from '@/page/page404'
import loginPage from '@/page/login'
import overView from '@/page/overView'
import assets from '@/page/assets'
import debt from '@/page/debt'
import balAndPay from '@/page/balAndPay'
import project from '@/page/project'
import enterprise from '@/page/enterprise'
import user from '@/page/user'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Index,
    children: [{
      path: '/overView',
      component: overView
    }, {
      path: '/assets',
      component: assets
    }, {
      path: '/debt',
      component: debt
    }, {
      path: '/balAndPay',
      component: balAndPay
    }, {
      path: '/project',
      component: project
    }, {
      path: '/enterprise',
      component: enterprise
    }, {
      path: '/user',
      component: user
    }]
  }, {
    path: '/404',
    component: Page404
  }, {
    path: '/login',
    component: loginPage
  }]
})
