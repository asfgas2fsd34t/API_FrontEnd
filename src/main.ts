import { createApp } from "vue";
import App from "./App.vue";
// @ts-ignore
import router from "./router"
// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import 'uno.css'

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss"
import 'element-plus/es/components/message/style/css'
import {ElMessage} from "element-plus";
import * as echarts from 'echarts'

const app = createApp(App);
app.config.globalProperties.$echarts = echarts
app.use(router)

router.beforeEach((to,from,next)=>{
    // @ts-ignore
    let user= JSON.parse(localStorage.getItem('userInfo'))
    if(to.meta.isAuth){
        if(localStorage.getItem('userInfo')!=null){
            if(to.meta.roles){
                // @ts-ignore
                if(to.meta.roles.includes(user.userRole)){
                    next()
                }else{
                    ElMessage.error("你没有权限")
                    next(from.fullPath)
                }
            }else{
                next()
            }
        }else{
            next('/login?redirect='+from.fullPath)
        }
    }else{
        next()
    }
})
app.mount("#app");
