// Composables
import { createRouter, createWebHistory } from 'vue-router'

import store from '@/data/Store'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta : {
          authenticationRequired: false,
        }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
        meta : {
          authenticationRequired: true,
        }
      },
      {
        path: 'hunt',
        name: 'Hunt',
        component: () => import(/* webpackChunkName: "hunt" */ '@/views/Hunt.vue'),
        meta : {
          authenticationRequired: true,
        }
      },
      {
        path: 'hint',
        name: 'Hint',
        component: () => import(/* webpackChunkName: "hint" */ '@/views/Hint.vue'),
        meta : {
          authenticationRequired: true,
        }
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  if (to.meta.authenticationRequired && !store.state.user) {
    return { name: 'Home' }
  }

  if (to.name === "Home" && store.state.user) {
    return { name: 'Dashboard' }
  }
})

export default router
