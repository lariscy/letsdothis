import Donate from './views/Donate.vue'
import Login from './views/Login.vue'
import PastDonations from './views/PastDonations.vue'
import PrivacyPolicy from './views/PrivacyPolicy.vue'
import ShowDonation from './views/ShowDonation.vue'

export default [
    { name: 'login', path: '/login', component: Login },
    //{ name: 'donate', path: '/', component: Donate, meta: { requiresAuth: true } },
    { name: 'donate', path: '/donate', component: Donate },
    //{ name: 'showdonation', path: '/showdonation', component: ShowDonation, meta: { requiresAuth: true } },
    { name: 'showdonation', path: '/showdonation', component: ShowDonation },
    { name: 'privacypolicy', path: '/privacypolicy', component: PrivacyPolicy },
    { name: 'pastdonations', path: '/pastdonations', component: PastDonations, meta: { requiresAuth: true } },
    { path: '*', component: Login }
]
