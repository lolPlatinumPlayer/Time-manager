<template>
    <div>
        <div style="top:0;position:fixed;width:100%;z-index:999;">
            <el-menu mode="horizontal"
                     class="nav__"
                     :class="should_navbg_transparent?'nav____transparent':'nav____whitebg'">
                <div class="float-left logo-and-name__">
                    <i class="float-left logo-and-name__logo">
                    </i>
                    <span class="float-left logo-and-name__name">
                        时间规划助手
                    </span>
                </div>
                <el-menu-item index="1">
                    <router-link to="/">
                        主页
                    </router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to="/allocate_time">
                        分配时间
                    </router-link>
                </el-menu-item>
                <el-menu-item index="3">
                    <router-link to="/get_money">
                        领红包
                    </router-link>
                </el-menu-item>
                <el-menu-item index="4">
                    <router-link to="/guide">
                        教程
                    </router-link>
                </el-menu-item>
                <div class="nav__right-margin-block"></div>
                <template v-if='isLogin'>
                    <el-menu-item index="5"
                                  class="float-right">
                        <a @click="Logout">
                            登出
                        </a>
                    </el-menu-item>
                    <el-menu-item index="6"
                                  class="float-right">
                        <router-link to="/personal_page"
                                     style="max-width:111px;overflow:hidden;letter-spacing:normal;">
                            {{username}}
                        </router-link>
                    </el-menu-item>
                </template>
                <template v-else>
                    <el-menu-item index="5"
                                  class="float-right">
                        <router-link to="/register_account">
                            注册
                        </router-link>
                    </el-menu-item>
                    <el-menu-item index="6"
                                  class="float-right">
                        <router-link to="/login">
                            登录
                        </router-link>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
        <div v-if="nav_auto_fill"
             style="height:104px;">
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
    import get_money from './page/get_money.vue'
    import guide from './page/guide.vue'


    const routes = [
        { path: '/', component: home ,meta: { requiresId: 1 }},
        { path: '/allocate_time', component: allocate_time ,meta: { requiresId: 1 }},
        { path: '/tracking_time', component: tracking_time ,meta: { requiresId: 1 }},
        { path: '/finish_tracking', component: finish_tracking ,meta: { requiresId: 1 }},
        { path: '/get_money', component: get_money ,meta: { requiresId: 1 }},
        { path: '/guide', component: guide ,meta: { requiresId: 1 }},
        { path: '/register_account', component: register_account ,meta: { requiresId: 1 }},
        { path: '/login', component: login ,meta: { requiresId: 1 }},
        { path: '/personal_page', component: personal_page ,meta: { requiresId: 1 }}
    ]

    const router = new VueRouter({
        mode: 'history',
        routes
    })


    export default {
        router,
        data(){
            return{
                should_navbg_transparent:true,
                nav_auto_fill:false,
                first_loop_about_nav:null
            }
        },
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
            },
            IfTouchLimitScroll(height_limit){
                let scrollTop=document.body.scrollTop || document.documentElement.scrollTop;//获取滚动条高度
                return(scrollTop>=height_limit)?true:false;//判断滚动距离是否超过限制高度
            }
        },
        watch: {
            //根据跳转的页面决定nav相关的样式
            '$route.path': function (path) {
                const wrapThis=this
                clearInterval(wrapThis.first_loop_about_nav);
                if(path==='/'){
                    wrapThis.should_navbg_transparent=true
                    wrapThis.nav_auto_fill=false
                    $(window).scroll(function(){
                        wrapThis.IfTouchLimitScroll(111)?
                            wrapThis.should_navbg_transparent=false:
                            wrapThis.should_navbg_transparent=true
                    });
                }
                else {
                    //【BUG】主页下拉后切换到登录，下面这行不会执行（有进入这个else分支）
                    wrapThis.should_navbg_transparent=false
                    wrapThis.nav_auto_fill=true
                }
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
            //用每秒循环做一个假的“按滚动条高度决定nav样式”
            //跳转路由后取消掉这个循环，做真正的上面这个效果
            wrapThis.first_loop_about_nav=setInterval(function () {
                wrapThis.IfTouchLimitScroll(111)?
                    wrapThis.should_navbg_transparent=false:
                    wrapThis.should_navbg_transparent=true
            },1000)
        }
    }


</script>

<style src="./css/buttons.css"></style>
<style src="./css/common.css"></style>
<style src="./css/style.less" lang="less"></style>
<style lang="less" scoped>
</style>