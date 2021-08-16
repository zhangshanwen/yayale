import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        ROUTE: '',
        PERMISSIONS_ROUTERS: [],
        PERMISSIONS_MENUS: [],
        PERMISSIONS_PATH: {}
    }
});

export default store;