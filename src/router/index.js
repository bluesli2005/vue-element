import Vue from 'vue'
import Router from 'vue-router'
import activePublic from '../pages/activePublic/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/activePublic',
      name: 'activePublic',
      component: activePublic
    }
  ]
})
