<template>
    <div>
        <h3>选择要分配的时间类型</h3>
        <router-link to="/allocate_time?time_type=study">学习</router-link>
        <router-link to="/allocate_time?time_type=work">工作</router-link>
        <router-link to="/allocate_time?time_type=health">健康调养</router-link>
        <router-link to="/allocate_time?time_type=other">其他</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueRouter from "vue-router";
    import allocate_time from './page/allocate_time.vue'
    import tracking_time from './page/tracking_time.vue'


    const routes = [
        { path: '/allocate_time', component: allocate_time ,meta: { requiresId: 1 }},
        { path: '/tracking_time', component: tracking_time ,meta: { requiresId: 1 }}
    ]

    const router = new VueRouter({
        routes
    })


    export default {router}

</script>

<style src="./css/common.css"></style>
<style>

</style>