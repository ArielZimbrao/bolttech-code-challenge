import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login/LoginView.vue'
import RegisterView from '../views/Register/RegisterView.vue'
import HomeView from '../views/Home/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Registro',
    component: RegisterView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  { path: '/:pathMatch(.*)*', component: LoginView },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
