<template>
    <div>
        <el-carousel trigger="click" style="height:777px">
            <el-carousel-item v-for="item in 4"
                              :key="item"
                              style="height:777px">
                <div style="width:100%;height:777px;min-width:1400px;background: url('../dist/banner_home_1.jpg') no-repeat center;
background-size:cover">
                </div>
            </el-carousel-item>
        </el-carousel>
        <div class="jianju"></div>
        <div class="part2__">
            <p class="h0">
                您是否会有这些烦恼？
            </p>
            <div class="part2__1">
                <!--灰色横线-->
            </div>
            <div class="jianju"></div>
            <div class="part2__2">
                <img src="../assets/img/img_home_1.png"
                     class="ap"
                     style="left: 317px;top: 76px;">
                <img src="../assets/img/img_home_1.png"
                     class="ap"
                     style="left: 286px;top: 191px;
                            transform:rotate(90deg);">
                <img src="../assets/img/img_home_1.png"
                     class="ap"
                     style="left: 217px;top: 304px;
                            transform:rotate(180deg);">
                <img src="../assets/img/img_home_1.png"
                     class="ap"
                     style="left: 639px;top: 78px;">
                <img src="../assets/img/img_home_1.png"
                     class="ap"
                     style="left: 678px;top: 184px;
                            transform:rotate(30deg);">
                <img src="../assets/img/img_home_1.png"
                     class="ap"
                     style="left:755px;top:307px;
                            transform:rotate(180deg);">
                <div class="part2__2-1 ap gray-block">
                    感觉很多事要做，<br>
                    却又无从下手？
                </div>
                <div class="part2__2-2 ap gray-block">
                    没有时间观念，<br>
                    事情总是做不完？
                </div>
                <div class="part2__2-3 ap gray-block">
                    计划赶不上变化，<br>
                    计划永远是空想？
                </div>
                <div class="part2__2-4 ap gray-block">
                    没人监督自己，<br>
                    自控力不足？
                </div>
                <div class="part2__2-5 ap gray-block">
                    打卡软件功能过于简单，<br>
                    没办法了解自己的工作量？
                </div>
                <div class="part2__2-6 ap gray-block">
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
            <i class="el-icon-arrow-down"
               style="margin-top:37px;font-size:33px;"></i>
        </div>
        <div class="part3__">
            <p class="h3"
               style="margin-bottom:55px">
                使用本站是什么样子？
            </p>
            <div class="part3__1">
                <!--这里的类名在样式写好后需要调整-->
                <div v-for="(a,index) in textInPart3"
                     class="part3__1-wrap">
                    <img :src="'../dist/home_3_'+(index+1)+'.png'"
                         class="part3__1-icon float-left">
                    <div class="part3__1-line float-left"></div>
                    <div :class="index==2||index==5?'part3__1-textarea__3lines':'part3__1-textarea__2lines'"
                         class="part3__1-textarea float-left">
                        <p class="part3__1-title">
                            {{a.title}}
                        </p>
                        <p class="part3__1-maintext">
                            {{a.mainText}}
                        </p>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="part4__">
            <p class="h0" style="color:white">
                本站适宜人群
            </p>
            <div class="part4__1-wrap">
                <div class="part4__1-item float-left">
                    <img src="../assets/img/home_4_1.png"
                         class="part4__1-img">
                    <p class="part4__1-name">
                        自学者
                    </p>
                </div>
                <div class="part4__1-item float-left">
                    <img src="../assets/img/home_4_2.png"
                         class="part4__1-img">
                    <p class="part4__1-name">
                        创业者
                    </p>
                </div>
                <div class="part4__1-item float-left">
                    <img src="../assets/img/home_4_3.png"
                         class="part4__1-img">
                    <p class="part4__1-name">
                        自由职业者
                    </p>
                </div>
                <div class="part4__1-item float-left">
                    <img src="../assets/img/home_4_4.png"
                         class="part4__1-img">
                    <p class="part4__1-name">
                        需要自我规<br>
                        划时间的人
                    </p>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="footer__">
            <div class="footer__1-wrap clear">
                <div class="footer__1-item float-left">
                    <p class="footer__1-title">
                        站长寄语
                    </p>
                    <div class="footer__1-textarea footer__1-shortlinehigh">
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
                <div class="footer__1-item float-left">
                    <p class="footer__1-title">
                        联系信息
                    </p>
                    <div>
                        <p class="footer__1-marginbottom">
                            站长：王佳星（William Wang）
                        </p>
                        <p class="footer__1-marginbottom">
                            站长qq：417783514
                        </p>
                        <p class="footer__1-marginbottom">
                            邮箱：417783514@qq.com
                        </p>
                        <p class="footer__1-marginbottom">
                            qq群：697705641
                        </p>
                        <p>
                            微信群：
                            <img src="../assets/img/wechat_group_qrcode.png"
                                 style="vertical-align:top;">
                        </p>
                    </div>
                </div>
                <div class="footer__1-item float-left"
                     style="width:327px;">
                    <p class="footer__1-title">
                        友情链接
                    </p>
                    <p>
                        <a v-for="a in links"
                           class="footer__1-marginbottom footer__1-links float-left"
                           :href="a.href">
                            {{a.name}}
                        </a>
                    </p>
                </div>
                <div class="clear"></div>
                <p style="text-align:center;margin-top:56px;">
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
        }
    }
</script>

<style lang="less" scoped>
    //重置common.css样式
    .h0{text-indent: 1.1em;}


    //本页面独有样式
    .part2__{
        width:1000px;
        padding-bottom:25px;
        &1{
            height:2px;width:90px;
            height:2px;background-color:#dcdcdc;
            margin-top:9px;
        }
        &2{
            height:444px;
            background:url(../assets/img/home_2_1.png) no-repeat bottom;
            position:relative;
            &-1{
                width:193px;height:94px;left:149px;top:19px;
            }
            &-2{
                width:190px;height:89px;left:111px;top:164px;
            }
            &-3{
                width:200px;height:88px;left:46px;top:304px;
            }
            &-4{
                width:166px;height:86px;left:655px;top:29px;
            }
            &-5{
                width:271px;height:90px;left:695px;top:163px;
            }
            &-6{
                width:160px;height:119px;left:771px;top:306px;
            }
            & .gray-block{
                background-color:#e5e5e5; border-radius:14px;font-size:18px;line-height:34px;text-align:left;box-sizing:border-box;padding:9px 0 0 28px;
            }
        }
    }
    .part3__{
        background-color:#eee;
        padding-top:51px;
        padding-bottom:86px;
        &1{
            width: 1000px;
        @media (max-width: 1000px){
            width: 350px;
        }
        &-wrap{
            width:350px;
            height:148px;
            float:left;
            margin:23px 0 23px 100px;
            background-color:white;
            overflow:hidden;
            @media (max-width: 1000px){
                margin:23px 0;
            }
            transition:.3s ease-in;
            &:hover{
                transform:translateY(-2px);
                box-shadow: 3px 5px 18px #afafaf;
            }
        }
        &-icon{
            margin-top:31px;
            margin-left:16px;
        }
        &-line{
            width:2px;
            height:102px;
            margin-top:22px;
            margin-left:16px;
            background-color:#c9c9c9;
        }
        &-textarea{
            width:178px;
            margin-left:26px;
            text-align:left;
            &__2lines{
                margin-top:28px;
            }
            &__3lines{
                margin-top:19px;
            }
        }
        &-title{
            font-size:20px;
            margin-bottom:16px;
        }
            &-maintext{}
        }
    }
    .part4__{
        background-color:#00a0e9;
        padding:79px 0 33px;
        &1-wrap{
            width:944px;
            margin-top:69px;
            @media(max-width:944px){
                width:502px;
            }
            @media(max-width:723px){
                width:281px;
            }
        }
        &1-item{
            margin-left:60px;
            margin-bottom:46px;
        }
        &1-name{
            color:white;
            font-size:24px;
            margin-top:10px;
        }
    }
    .footer__{
        background-color:#191c1c;
        color:white;
        padding:90px 0;
        text-align:left;
        &1-wrap{
            width:989px;
        }
        &1-item{
            letter-spacing:.2em;
            width:237px;
            margin-left:47px;
            & li{
                list-style:disc inside;
                margin-bottom:11px;
            }
        }
        &1-title{
            letter-spacing:.2em;
            font-size:22px;
            font-weight:bold;
            margin-bottom:31px;
        }
        &1-marginbottom{
            margin-bottom:11px;
        }
        &1-links{
            margin-right:27px;
            color:white;
            cursor:pointer;
        }
    }
    .fixed-container{
        width:1000px;
        position:relative;
        margin:auto;
    }
</style>
