import {createRouter,createWebHistory,RouteRecordRaw} from "vue-router/dist/vue-router";

export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect:'/home',
        component:()=>import('../components/AppMain.vue'),
        children:[
            {path: '/home',
                meta:{isAuth:true},
                component:()=>import('../views/Home.vue')  },
            {path: '/interface/:id(\\d+)',
                meta:{isAuth:true},
                component:()=>import('../views/InterfaceInfoDetail.vue')},
            {path: '/manager',
                meta:{isAuth:true,roles:"admin"},
                component:()=>import('../views/InterfaceManager.vue')},
            {path: '/analysis',
                meta:{isAuth:true,roles:"admin"},
                component:()=>import('../views/Analysis.vue')}
        ]
    },
    {path: '/login',
        component:()=>import('../views/login.vue')},
    {path: '/:pathMatch(.*)',
        component:()=>import('../views/404.vue')}
]
//
// export const asyncRoutes: RouteRecordRaw[] =[
//     {
//         path:'/system',
//         component:()=>import('../components/AppMain.vue'),
//         name:'manager',
//         meta:{isAuth:true,roles:"admin"},
//         children:[
//             {path: '/system/manager',
//                 meta:{isAuth:true,roles:"admin"},
//                 component:()=>import('../views/InterfaceManager.vue')}
//         ]
//     }
// ]
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes:constantRoutes, // `routes: routes` 的缩写
})

export default router
