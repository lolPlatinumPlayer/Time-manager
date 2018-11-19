<template>
    <div>
        <el-carousel trigger="click"
                     class="home-banner__height">
            <el-carousel-item v-for="item in 4"
                              :key="item"
                              class="home-banner__height"
            >
                <div class="home-banner__1
                            home-banner
                            home-banner__height">
                </div>
            </el-carousel-item>
        </el-carousel>
        <div class="jianju"></div>
        <div class="home-part2__">
            <p class="h0">
                您是否会有这些烦恼？
            </p>
            <div class="home-part2__1">
                <!--灰色横线-->
            </div>
            <div class="jianju"></div>
            <div class="home-part2__2">
                <img src="../assets/img/img_home_1.png"
                     class="ap home-part2__2-triangle"
                     style="left: 312px;top: 76px;">
                <img src="../assets/img/img_home_1.png"
                     class="ap home-part2__2-triangle"
                     style="left: 286px;top: 191px;
                            transform:rotate(90deg);">
                <img src="../assets/img/img_home_1.png"
                     class="ap home-part2__2-triangle"
                     style="left: 217px;top: 304px;
                            transform:rotate(180deg);">
                <img src="../assets/img/img_home_1.png"
                     class="ap home-part2__2-triangle"
                     style="left: 639px;top: 76px;">
                <img src="../assets/img/img_home_1.png"
                     class="ap home-part2__2-triangle"
                     style="left: 678px;top: 184px;
                            transform:rotate(30deg);">
                <img src="../assets/img/img_home_1.png"
                     class="ap home-part2__2-triangle"
                     style="left:755px;top:306px;
                            transform:rotate(180deg);">
                <div class="home-part2__2-1 ap gray-block">
                    感觉很多事要做，<br>
                    却又无从下手？
                </div>
                <div class="home-part2__2-2 ap gray-block">
                    没有时间观念，<br>
                    事情总是做不完？
                </div>
                <div class="home-part2__2-3 ap gray-block">
                    计划赶不上变化，<br>
                    计划永远是空想？
                </div>
                <div class="home-part2__2-4 ap gray-block">
                    没人监督自己，<br>
                    自控力不足？
                </div>
                <div class="home-part2__2-5 ap gray-block">
                    打卡软件功能过于简单，<br>
                    没办法了解自己的工作量？
                </div>
                <div class="home-part2__2-6 ap gray-block">
                    自学几个月，<br>
                    越学越迷茫，<br>
                    找不到方向？
                </div>
            </div>
            <p class="h5"
               style="margin-top:19px;color:#8a8a8a;">
                如果想解决这些烦恼
            </p>
            <p class="h1">
                推荐您使用本站
            </p>
            <i class="el-icon-arrow-down home-part2__3-arrow"
               style="margin-top:37px;font-size:33px;"></i>
        </div>
        <div class="home-part3__">
            <p class="h3"
               style="margin-bottom:55px">
                使用本站是什么样子？
            </p>
            <div class="home-part3__1">
                <!--这里的类名在样式写好后需要调整-->
                <div v-for="(a,index) in textInPart3"
                     class="home-part3__1-wrap">
                    <img :src="'../dist/home_3_'+(index+1)+'.png'"
                         class="home-part3__1-icon float-left">
                    <div class="home-part3__1-line float-left"></div>
                    <div :class="index==2||index==5?'home-part3__1-textarea__3lines':'home-part3__1-textarea__2lines'"
                         class="home-part3__1-textarea float-left">
                        <p class="home-part3__1-title">
                            {{a.title}}
                        </p>
                        <p class="home-part3__1-maintext">
                            {{a.mainText}}
                        </p>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="home-part4__">
            <p class="h0" style="color:white">
                本站适宜人群
            </p>
            <div class="home-part4__1-wrap">
                <div class="home-part4__1-item float-left">
                    <img src="../assets/img/home_4_1.png"
                         class="home-part4__1-img">
                    <p class="home-part4__1-name">
                        自学者
                    </p>
                </div>
                <div class="home-part4__1-item float-left">
                    <img src="../assets/img/home_4_2.png"
                         class="home-part4__1-img">
                    <p class="home-part4__1-name">
                        创业者
                    </p>
                </div>
                <div class="home-part4__1-item float-left">
                    <img src="../assets/img/home_4_3.png"
                         class="home-part4__1-img">
                    <p class="home-part4__1-name">
                        自由职业者
                    </p>
                </div>
                <div class="home-part4__1-item float-left">
                    <img src="../assets/img/home_4_4.png"
                         class="home-part4__1-img">
                    <p class="home-part4__1-name">
                        需要自我规<br>
                        划时间的人
                    </p>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="home-footer__">
            <div class="home-footer__1-wrap clear">
                <div class="home-footer__1-item float-left">
                    <p class="home-footer__1-title">
                        站长寄语
                    </p>
                    <div class="home-footer__1-textarea home-footer__1-shortlinehigh">
                        <ul>
                            <li>
                                若对本站有任何建议或意见，欢迎联系站长。
                            </li>
                            <li>
                                或者打算洽谈商务合作，也欢迎联系站长。
                            </li>
                        </ul>
                        <p >
                            （添加站长qq时请务必在验证信息里说明添加原由，否则一律拒绝。）
                        </p>
                        <p style="margin-top:24px;text-indent:2.4em;">
                            本站使用者可以添加qq群和微信群进行讨论与交流。
                        </p>
                    </div>
                </div>
                <div class="home-footer__1-item float-left">
                    <p class="home-footer__1-title">
                        联系信息
                    </p>
                    <div>
                        <p class="home-footer__1-marginbottom">
                            站长：王佳星（William Wang）
                        </p>
                        <p class="home-footer__1-marginbottom">
                            站长qq：417783514
                        </p>
                        <p class="home-footer__1-marginbottom">
                            邮箱：417783514@qq.com
                        </p>
                        <p class="home-footer__1-marginbottom">
                            qq群：697705641
                        </p>
                        <p>
                            微信群：
                            <img src="../assets/img/wechat_group_qrcode.png"
                                 style="vertical-align:top;">
                        </p>
                    </div>
                </div>
                <div class="home-footer__1-item float-left"
                     style="width:312px;">
                    <p class="home-footer__1-title">
                        友情链接
                    </p>
                    <p>
                        <a v-for="a in links"
                           class="home-footer__1-marginbottom home-footer__1-links float-left"
                           :href="a.href">
                            {{a.name}}
                        </a>
                    </p>
                </div>
                <div class="clear"></div>
                <p style="text-align:center;margin-top:56px;padding:0 47px;">
                    本站所有图像设计、视频、代码等均为站长所有，若未经站长同意盗用本站内容，一经发现将追究相关责任。
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'
    export default {
        data(){
            return {
                //第三部分的文本
                textInPart3:[
                    {
                        title:'清晰',
                        mainText:'条理清晰，万千事尽掌中握。'
                    },
                    {
                        title:'一天',
                        mainText:'别人刚起床，你就已经规划到了就寝前。'
                    },
                    {
                        title:'无惧',
                        mainText:'无惧任何突发事件，“突发事件暂停”功能帮你做好后续准备。'
                    },
                    {
                        title:'精英',
                        mainText:'加入组织，各界精英与你共同进步。'
                    },
                    {
                        title:'精确',
                        mainText:'让你对时间的把控，精确到秒。'
                    },
                    {
                        title:'判断',
                        mainText:'分析每天的时间，用数据作出准确判断以及准确规划。'
                    }
                ],
                //友情链接
                links:[
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    },
                    {
                        name:'虚位以待',
                        hred:''
                    }
                ]
            }
        },
        methods:{
            ...mapActions([
                'AddDragBar'
            ])
        }
    }
</script>

<style lang="less" scoped>
    //重置common.css样式
    .h0{text-indent: 1.1em;}


</style>
