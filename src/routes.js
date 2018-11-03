import Home from './views/Home.vue'
import Login from './views/Login.vue'
import PastDonations from './views/PastDonations.vue'

export default [
    { name: 'home', path: '/', component: Home, meta: { requiresAuth: true } },
    { name: 'login', path: '/login', component: Login },
    { name: 'pastdonations', path: '/pastdonations', component: PastDonations, meta: { requiresAuth: true } },
    { path: '*', component: Login }
]
