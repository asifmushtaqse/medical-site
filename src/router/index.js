import Vue from 'vue'
import VueRouter from 'vue-router'
// import Dashboard from "@/pages/Dashboard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
  },

  {
    path: '/dashboard',
    component: () => import('../pages/MainSection.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('../pages/Dashboard.vue'),
      },
      {
        path: 'users',
        name: 'AllUsers',
        component: () => import('../pages/Users/AllUsers.vue'),
      },
      {
        path: 'users/add',
        name: 'AddUser',
        component: () => import('../pages/Users/Add.vue'),
      },
      {
        path: 'users/:id',
        name: 'UserDetail',
        component: () => import('../pages/Users/UserDetail.vue'),
      },
      {
        path: 'users/:id/edit',
        name: 'EditUser',
        component: () => import('../pages/Users/Edit.vue'),
      },
      {
        path: 'users/:id/tests',
        name: 'AllTests',
        component: () => import('../pages/Tests/AllTests.vue'),
      },
      {
        path: 'users/:id/tests/blood-pressure',
        name: 'AllBloodPressureTests',
        component: () => import('../pages/Tests/BloodPressure/All.vue'),
      },
      {
        path: 'users/:id/tests/blood-pressure/add',
        name: 'AddBloodPressureTest',
        component: () => import('../pages/Tests/BloodPressure/Add.vue'),
      },
      {
        path: 'users/:id/tests/cholesterol',
        name: 'AllCholesterolTests',
        component: () => import('../pages/Tests/Cholesterol/All.vue'),
      },
      {
        path: 'users/:id/tests/cholesterol/add',
        name: 'AddCholesterolTest',
        component: () => import('../pages/Tests/Cholesterol/Add.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
