<template>
    <div class="sidebar">
        <el-menu
                class="sidebar-el-menu"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                :default-active="onRoutes"
                active-text-color="#20a0ff"
                router
                unique-opened>
            <tree-menu :menus="items"></tree-menu>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    import treeMenu from './TreeMenu';

    export default {
        components: { treeMenu },

        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-user',
                        index: 'users',
                        title: 'users'
                    },
                    {
                        icon: 'el-icon-goods',
                        index: 'goods',
                        title: 'goods'
                    },

                ]
            };

        },
        computed: {
            onRoutes() {
                this.$route.path.replace('/', '');
            }
        },
        created() {
            // this.items[2].subs = this.getRouter(groups, directoryTree)
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
        },
        methods: {}


    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
`
