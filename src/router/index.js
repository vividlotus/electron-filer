import Vue from 'vue'
import VueRouter from 'vue-router'
import DrivePage from '@/components/pages/DrivePage'
import EntryPage from '@/components/pages/EntryPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DrivePage',
    component: DrivePage
  },
  {
    path: '/entries/:path',
    name: 'EntryPage',
    component: EntryPage
  },
]

export default new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
