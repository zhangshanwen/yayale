import Vue from 'vue';
import Router from 'vue-router';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
Vue.use(Router);


export default new Router({
    routes: [
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: 'home' },
            children: [
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/servers',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Servers'),
                    meta: { title: 'servers' }
                },
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Dashboard'),
                    meta: { title: 'dashboard' }
                }, {
                    path: '/images',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Image'),
                    meta: { title: 'images' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login'),
            meta: { title: 'login' }
        },
        { path: '*', redirect: '/404' }

    ]
});
