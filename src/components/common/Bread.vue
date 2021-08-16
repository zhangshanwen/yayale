<template>
    <div class="crumbs">
        <el-breadcrumb class="app-breadcrumb" separator="/">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.path">
                    {{$t(item.meta.title)}}
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script>
    import bus from '../common/bus';

    export default {
        data() {
            return {
                levelList: [],
            }
        },
        methods: {
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
                matched.shift();
                this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
            },
        },
        watch: {
            $route(route) {
                if (route.path.startsWith('/redirect/')) {
                    return
                }
                this.getBreadcrumb()
            }
        },
        created() {
            this.getBreadcrumb()
        }
    }

</script>

