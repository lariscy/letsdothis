import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes.js'
import axios from 'axios'

Vue.use(Router)

const router = new Router({
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    axios.post('/letsdothis-api/issessionvalid')
        .then(function(res){
          //console.log(res)
          if (res.data.status == 'ok' && res.data.data){
            next()
          } else {
            //console.log('what what')
            router.push({ name: "login"})
          }
        })
        .catch(function(err){
          console.log(err)
          router.push({ name: "login"})
        })
  } else {
    next()
  }
})

export default router
