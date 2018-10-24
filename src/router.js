import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes.js'

Vue.use(Router)

const router = new Router({
  routes: routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
