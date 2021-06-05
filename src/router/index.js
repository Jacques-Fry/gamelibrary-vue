import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决 Uncaught (in promise) 的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const Home = () =>
    import ('views/system/home/Home.vue')
const User = () =>
    import ('views/system/user/User.vue')

const Detail = () =>
    import ('views/system/detail/Detail.vue')
const UserDetailSetting = () =>
    import ('views/system/detail/childComps/UserDetailSetting.vue')
const UserSercuritySetting = () =>
    import ("views/system/detail/childComps/UserSercuritySetting.vue")

const Role = () =>
    import ('views/system/role/Role.vue')
const Permission = () =>
    import ('views/system/permission/Permission.vue')
const Log = () =>
    import ('views/system/log/Log.vue')
const Login = () =>
    import ('views/system/login/Login.vue')


const routes = [{
        path: '*', // 页面不存在的情况下会跳到404页面
        redirect: '/',
        name: 'notFound',
        hidden: true
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/user',
        name: 'User',
        component: User
    },
    {
        path: '/detail',
        redirect: "/detail/userdetailsetting",
        component: Detail,
        children: [{
            path: "userdetailsetting",
            name: 'Detail',
            component: UserDetailSetting
        }, {
            path: "usersercuritysetting",
            name: 'UserSercuritySetting',
            component: UserSercuritySetting
        }]
    },
    {
        path: '/role',
        name: 'Role',
        component: Role
    },
    {
        path: '/permission',
        name: 'Permission',
        component: Permission
    },
    {
        path: '/log',
        name: 'Log',
        component: Log
    },
]

const router = new VueRouter({
    routes
})

export default router