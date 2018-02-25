<template>
    <div>
        <div class="button-group">
            <router-link to="/"
                         class="button button-primary">
                主页
            </router-link>
            <router-link to="/allocate_time"
                         class="button button-primary">
                分配时间
            </router-link>
            <template v-if='isLogin'>
                <router-link to="/personal_page"
                             class="button button-primary">
                    {{username}}
                </router-link>
                <button @click="Logout"
                        class="button button-primary">
                    登出
                </button>
            </template>
            <template v-else>
                <router-link to="/register_account"
                             class="button button-primary">
                    注册
                </router-link>
                <router-link to="/login"
                             class="button button-primary">
                    登录
                </router-link>
            </template>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueRouter from "vue-router";
    import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'
    import home from './page/home.vue'
    import register_account from './page/register_account.vue'
    import login from './page/login.vue'
    import personal_page from './page/personal_page.vue'
    import allocate_time from './page/allocate_time.vue'
    import tracking_time from './page/tracking_time.vue'
    import finish_tracking from './page/finish_tracking.vue'


    const routes = [
        { path: '/', component: home ,meta: { requiresId: 1 }},
        { path: '/register_account', component: register_account ,meta: { requiresId: 1 }},
        { path: '/login', component: login ,meta: { requiresId: 1 }},
        { path: '/personal_page', component: personal_page ,meta: { requiresId: 1 }},
        { path: '/allocate_time', component: allocate_time ,meta: { requiresId: 1 }},
        { path: '/tracking_time', component: tracking_time ,meta: { requiresId: 1 }},
        { path: '/finish_tracking', component: finish_tracking ,meta: { requiresId: 1 }}
    ]

    const router = new VueRouter({
        mode: 'history',
        routes
    })


    export default {
        router,
        computed:{
            ...mapState([
                'isLogin',
                'username',
                'SERVER_END_PREFIX'
            ])
        },
        methods:{
            ...mapMutations([
                'ChangeLoginInfo',
                'GetOriginalState'
            ]),
            Logout(){
                localStorage.removeItem('password')
                localStorage.removeItem('username')
                sessionStorage.removeItem('password')
                sessionStorage.removeItem('username')
                this.ChangeLoginInfo(false)
            }
        },
        mounted(){
            const wrapThis=this
            this.GetOriginalState()
            if(localStorage.username&&localStorage.password){
                //因为两个登录代码有差别，所以并没有整合成一个函数
                $.post(wrapThis.SERVER_END_PREFIX+"login.php",
                    {
                        password:localStorage.password,
                        username:localStorage.username
                    },
                    function(data){
                        if(data=='密码正确'){
                            wrapThis.ChangeLoginInfo({
                                isLogin:true,
                                username:localStorage.username
                            })
                        }else {
                            console.log('打开网页后根据本地存储帐号密码进行登录，登录失败后php返回信息如下：');
                            console.log(data);
                        }
                    }
                );
            }
        }
    }


</script>

<style src="./css/buttons.css"></style>
<style src="./css/common.css"></style>
<style src="./css/allocate_and_tracking_time.less"></style>
<style>

</style>