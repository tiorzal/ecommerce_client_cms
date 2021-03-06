import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import DashBoard from '../views/Dashboard.vue'
import ListProduct from '../views/List.vue'
import AddProduct from '../views/Addproduct.vue'
import EditProduct from '../views/Editproduct.vue'
import NotFound from '../views/Notfound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: Login
  },
  {
    path: '/',
    name: 'DashBoard',
    component: DashBoard,
    children: [
      {
        path: '',
        name: 'ListProduct',
        component: ListProduct
      },
      {
        path: 'add',
        name: 'AddProduct',
        component: AddProduct
      },
      {
        path: 'edit/:id',
        name: 'EditProduct',
        component: EditProduct
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token')
  if (to.name !== 'LoginPage' && !isAuthenticated) next({ name: 'LoginPage' })
  else if (to.name === 'LoginPage' && isAuthenticated) next({ name: 'ListProduct' })
  else next()
})

export default router
