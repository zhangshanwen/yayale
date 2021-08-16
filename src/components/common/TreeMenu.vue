<template>
    <div>
        <template v-for="(item, index) in menus">
            <el-submenu v-if="item.subs && item.subs.length" :index="item.index" :key="item.index">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{$t('title.'+item.title)}}</span>
                </template>
                <tree-menu :menus="item.subs"></tree-menu>
            </el-submenu>
            <el-menu-item v-else :index="item.index" :key="item.index">
                <i :class="item.icon"></i>
                <span slot="title">{{$t('title.'+item.title)}}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'treeMenu',
        props: ['menus'],
        computed: {}
    };
</script>

<style scoped>

</style>
