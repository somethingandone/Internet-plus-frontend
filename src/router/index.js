import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/view/login.vue";
import Register from "@/view/register.vue"
import Main from "@/view/main.vue"
import InRegulationList from "@/components/InRegulationList.vue";
import Matcher from "@/components/ExMatcher.vue";
import ShowContent from "@/components/ShowContent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/showContent',
      component: ShowContent,
      name: 'showContent',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children:[
        {
        path: "/in",
        component: InRegulationList
        },
        {
          path: "/match",
          component: Matcher
        },
        {
          path: "/Main",
          component: Matcher
        }
      ],
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from)=>{
  if(to.meta.requiresAuth){
    if(!localStorage.getItem("token")){
      ElMessage({
        message:"请先登录",
        type:"error"
      })
      return {
        name:'Login',
        redirect: {
          name: to.name
        }
      }
    }
  }
})
export default router
