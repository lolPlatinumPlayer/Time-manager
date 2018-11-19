<template>
    <div>
        <div id="nav"
             style="top:0;position:fixed;width:100%;z-index:999;">
            <el-menu v-if="windowWidth>600" mode="horizontal"
                     class="nav__"
                     :class="should_navbg_transparent?'nav____transparent':'nav____whitebg'"
                     >
                <div class="float-left
                            logo-and-name__"
                     style="cursor:pointer;"
                     @click="$goRoute('/')">
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
                <!--<el-menu-item index="3">
                    <router-link to="/get_money">
                        领红包
                    </router-link>
                </el-menu-item>-->
                <el-menu-item index="4">
                    <router-link to="/guide">
                        教程
                    </router-link>
                </el-menu-item>
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
            <!--手机版nav-->
            <div v-if="windowWidth<=600"
                 style="background-color: white;
                        line-height:0;
                        position:relative;
                        z-index:2;"
                 class="clear"
                 :class="!dropDownSubmenu?'box_shadow':null"
            >
                <div class="logo-and-name__
                            logo-and-name____small
                            float-left"
                     @click="$goRoute('/')"
                     style="margin: 10px 0 10px 22px;cursor:pointer;"
                >
                    <i class="float-left
                              logo-and-name__logo
                              logo-and-name__logo__lightbg"
                    >
                    </i>
                    <span class="float-left logo-and-name__name"
                          style="color:black;">
                            时间规划助手
                        </span>
                </div>
                <el-button type="text"
                           @click="dropDownSubmenu?
                                       dropDownSubmenu=false:
                                       dropDownSubmenu=true"
                           style="padding:13px 15px;
                                  position:absolute;
                                  right:0;
                                  top:0;
                                  "
                >
                    <i :class="dropDownSubmenu?
                                   'el-icon-caret-top':
                                   'el-icon-caret-bottom'"
                       style="color:#585858;
                              font-size:22px;"
                    ></i>
                </el-button>
            </div>
            <transition enter-active-class="animated fadeIn3Quarter">
                <div v-show="dropDownSubmenu &&
                             windowWidth<=600"
                     @click="dropDownSubmenu=false"
                     style="position:fixed;
                            height:100%;
                            width: 100%;
                            background-color:#393939;
                            opacity:.75;
                            "
                ></div>
            </transition>
            <transition
                    enter-active-class="animated fadeInDownBig"
                    leave-active-class="animated fadeOutUpBig"
            >
                <el-menu v-show="dropDownSubmenu &&
                                 windowWidth<=600"
                         default-active="1"
                         class="el-menu-vertical-demo "
                         :class="dropDownSubmenu?'box_shadow':null"
                         style="position:absolute;width: 100%;">
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
                    <template v-if='isLogin'>
                        <el-menu-item index="5">
                            <a @click="Logout">
                                登出
                            </a>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <router-link to="/personal_page"
                                         style="max-width:111px;overflow:hidden;letter-spacing:normal;">
                                {{username}}
                            </router-link>
                        </el-menu-item>
                    </template>
                    <template v-else>
                        <el-menu-item index="5">
                            <router-link to="/register_account">
                                注册
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <router-link to="/login">
                                登录
                            </router-link>
                        </el-menu-item>
                    </template>
                </el-menu>
            </transition>
        </div>
        <div v-if="nav_auto_fill"
             style="transition:height .4s"
             :style="{height:navHeight+'px'}">
        </div>
        <transition
                :enter-active-class="transitionClass.enter[transitionName]"
                :leave-active-class="transitionClass.leave[transitionName]"
        >
            <router-view
                    style="position:absolute;
                           width:100%"
                    :style="nav_auto_fill?{marginBottom:45+'px'}:null"
            ></router-view>
        </transition>
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
        { path: '/', component: home ,meta: { pageIndex: 1 }},
        { path: '/allocate_time', component: allocate_time ,meta: { pageIndex: 2 }},
        { path: '/tracking_time', component: tracking_time ,meta: { pageIndex: 3 }},
        { path: '/finish_tracking', component: finish_tracking ,meta: { pageIndex: 4 }},
        { path: '/get_money', component: get_money ,meta: { pageIndex: 5 }},
        { path: '/guide', component: guide ,meta: { pageIndex: 6 }},
        { path: '/register_account', component: register_account ,meta: { pageIndex: 8 }},
        { path: '/login', component: login ,meta: { pageIndex: 7 }},
        { path: '/personal_page', component: personal_page ,meta: { pageIndex: 8 }}
    ]

    const router = new VueRouter({
        //mode: 'history',
        routes,
        scrollBehavior (to, from, savedPosition) {
            return { x: 0, y: 0 }
        }
    })


    export default {
        router,
        data(){
            return{
                should_navbg_transparent:true,
                nav_auto_fill:false,
                first_loop_about_nav:null,
                windowWidth:document.body.clientWidth,
                navHeight:104,
                transitionName:null,
                transitionClass:{
                    enter:{
                        goLeft:'animated fadeInRight',
                        goRight:'animated fadeInLeft',
                        fade:'animated fadeIn'
                    },
                    leave:{
                        goLeft:'animated fadeOutLeft',
                        goRight:'animated fadeOutRight',
                        fade:'animated fadeOut'
                    }
                },
                dropDownSubmenu:false
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
                    //进入主页时“滚动滚动条的”附带的函数
                    $(window).scroll(function(){
                        wrapThis.IfTouchLimitScroll(111)?
                            wrapThis.should_navbg_transparent=false:
                            wrapThis.should_navbg_transparent=true
                    });
                }
                else {
                    //进入其它页面时取消掉“滚动滚动条的”附带的函数
                    $(window).unbind('scroll')
                    wrapThis.should_navbg_transparent=false
                    wrapThis.nav_auto_fill=true
                }
                //跳到任何页面都要收起下拉nav
                wrapThis.dropDownSubmenu=false
                /*

                //跳到任何页面都重新计算导航条填充
                setTimeout(function () {
                    wrapThis.navHeight=$('#nav').height()
                },1000)*/
            },
            '$route' (to, from) {
                const toIndex = to.meta.pageIndex
                const fromIndex = from.meta.pageIndex
                this.transitionName = (()=>{
                    if(toIndex < fromIndex )
                        return 'goRight'
                    else if(toIndex > fromIndex)
                        return 'goLeft'
                    else
                        return 'fade'
                })()
            }
        },/*
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus()
                }
            }
        },*/
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
            //访问网站，还未使用路由跳转时需要下面这个循环
            //用每秒循环做一个假的“按滚动条高度决定nav样式”
            //跳转路由后取消掉这个循环，做真正的上面这个效果
            wrapThis.first_loop_about_nav=setInterval(function () {
                wrapThis.IfTouchLimitScroll(111)?
                    wrapThis.should_navbg_transparent=false:
                    wrapThis.should_navbg_transparent=true
            },1000)
            //给navHeight赋初始值
            wrapThis.navHeight=$('#nav').height()
            //每次窗口宽度变化都更新一些数据
            window.onresize = () => {
                return (() => {
                    //更新data子项————windowWidth
                    //window.screenWidth = document.body.clientWidth
                    wrapThis.windowWidth = window.innerWidth
                    //修改代替nav高度的div的高度
                    wrapThis.navHeight=$('#nav').height()
                    setTimeout(function () {
                        wrapThis.navHeight=$('#nav').height()
                    },500)
                })()
            }
			
			//用控制台打广告
			console.log('备用空间速度较慢，请大家谅解')
			console.log('欢迎大家加入讨论群（697705641），目前还没什么人，任何相关话题都欢迎加群讨论')
			console.log('微信群也可以加入，入群二维码在首页底部')
			
        }
    }


</script>

<style src="./css/common.css"></style>
<style src="./css/style.less" lang="less"></style>
<style src="./css/animate.css"></style>
<style>
</style>