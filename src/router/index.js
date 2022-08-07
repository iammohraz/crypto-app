import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SearchView from '../views/SearchView.vue'
import ProfileView from '../views/ProfileView.vue'
import CoinsView from '../views/CoinsView.vue'
import SingleCoinView from '../views/SingleCoinView.vue'
import ExchangeView from '../views/ExchangeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/coins',
    name: 'coins',
    component: CoinsView
  },
  {
    path: '/coins/:id',
    name: 'singleCoin',
    component: SingleCoinView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/exchange',
    name: 'exchange',
    component: ExchangeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
