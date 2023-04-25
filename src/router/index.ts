import {createRouter,createWebHistory,RouteRecordRaw} from "vue-router/dist/vue-router";

export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect:'/analysis',
        component:()=>import('../components/AppMain.vue'),
        children:[
            {path: '/home',
                meta:{isAuth:true},
                component:()=>import('../views/Home.vue')  },
            {path: '/interface/:id(\\d+)',
                meta:{isAuth:true},
                component:()=>import('../views/InterfaceInfoDetail.vue')},
            {path: '/manager',
                meta:{isAuth:true,roles:"admin,test"},
                component:()=>import('../views/InterfaceManager.vue')},
            {path: '/userManager',
                meta:{isAuth:true,roles:"admin,test"},
                component:()=>import('../views/UserManager.vue')},
            {path: '/analysis',
                meta:{isAuth:true},
                component:()=>import('../views/Analysis.vue')},
            {path: '/user',
                meta:{isAuth:true},
                component:()=>import('../views/UserInterfaceInfo.vue')}
        ]
    },
    {path: '/login',
        component:()=>import('../views/login.vue')},
    {path: '/:pathMatch(.*)',
        component:()=>import('../views/404.vue')}
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes:constantRoutes, // `routes: routes` 的缩写
})

export default router
