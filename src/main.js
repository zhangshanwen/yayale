import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import messages from './components/common/i18n/index';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import { getToken } from './utils/auth';
import { getPermissionRouters } from './utils/router';


Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

const staticRoute = ['/', '/home', '/login', '/403', '/404'];
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | manage-system`;
    if (to.path === '/login') {
        next();
        return;
    }
    const token = getToken();
    if (!token && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = `${i18n.t('title.' + to.meta.title)}`;
    }
    next();
});


new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app');

