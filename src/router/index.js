import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    //主页index
    {
        path: '/',
        component: Home,
        children: [{
            path: '',
            name: 'index',
            component: () =>
                import ('../views/control/index/Index')
        }]
    },
    //已发布table
    {
        path: '/table',
        component: Home,
        children: [{
            path: '',
            name: 'table',
            component: () =>
                import ('../views/control/table/Table')
        }]
    },
    //标签页
    {
        path: '/tag',
        component: Home,
        children: [{
            path: '',
            name: 'tag',
            component: () =>
                import ('../views/control/tag/Tag')
        }]
    },
    //图片上传
    {
        path: '/upload',
        component: Home,
        children: [{
            path: '',
            name: 'upload',
            component: () =>
                import ('../views/control/upload/Upload')
        }]
    },
    //已发布
    {
        path: '/publish',
        component: Home,
        children: [{
                path: '',
                name: 'publish',
                component: () =>
                    import ('../views/control/publish/Publish')
            },
            {
                path: 'detail',
                name: 'detail',
                component: () =>
                    import ('../views/control/publish/detail/Detail')
            }, {
                path: 'check',
                name: 'check',
                component: () =>
                    import ('../views/control/publish/check/Check')
            }
        ]
    },
    //发布文章
    {
        path: '/markdown',
        component: Home,
        children: [{
            path: '',
            name: 'markdown',
            component: () =>
                import ('../views/control/markdown/Markdown')
        }]
    },
    //统计
    {
        path: '/stat',
        component: Home,
        children: [{
            path: '',
            name: 'stat',
            component: () =>
                import ('../views/control/stat/Stat')
        }]
    },
    //导出
    {
        path: '/query',
        component: Home,
        children: [{
            path: '',
            name: 'query',
            component: () =>
                import ('../views/control/query/Query')
        }]
    },
    //退出
    {
        path: '/logout',
        component: Home,
        children: [{
            path: '',
            name: 'logout',
            component: () =>
                import ('../views/control/logout/Logout')
        }]
    },
    //登录
    {
        path: '/login',
        component: () =>
            import ('../views/user/user.vue'),
        children: [{
            path: '',
            name: 'login',
            component: () =>
                import ('../views/user/login/Login')
        }]
    },
    //注册
    {
        path: '/register',
        component: () =>
            import ('../views/user/user.vue'),
        children: [{
            path: '',
            name: 'register',
            component: () =>
                import ('../views/user/register/Register')
        }]
    },
    //404
    {
        path: '*',
        name: 'error',
        component: () =>
            import ('../views/404/error')
    }



]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === "/login" || to.path === "/register" || localStorage.getItem('username')) {
        next()
    } else {
        next("/login")
    }
})
export default router