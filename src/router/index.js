import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import EditPassword from '../views/EditPassword.vue'
import AddUser from '../views/AddUser.vue'
import ActivateUser from '../views/ActivateUser.vue'
import ChangeCenter from '../views/ChangeCenter.vue'

import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/editPassword/:mail',
    name: 'EditPassword',
    component: EditPassword
  },
  {
    path: '/addUser',
    name: 'AddUser',
    component: AddUser
  },
  {
    path: '/changeCenter/:mail',
    name: 'ChangeCenter',
    component: ChangeCenter
  },
  {
    path: '/activateUser/:mail',
    name: 'ActivateUser',
    component: ActivateUser
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
