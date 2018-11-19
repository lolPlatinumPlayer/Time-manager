<template>
    <div id="box">
        <div class="ap"
             style="right:21px;top:21px;">
            总时间条宽度：
            <el-input-number :step="10"
                             v-model="dragBarWrapWidth">
            </el-input-number>
        </div>
        <div class="jianju" style="height:75px"></div>
        <p class="title">
            追踪时间
        </p>
        <div class="drag-bar__" :style="{width:dragBarWrapWidth+'px'}">
            <div class="drag-bar__wrap-bg"></div>
            <drag-bar__filling
                    v-for="(a,index) in dragBar"
                    :key="index"
                    v-if="a.show"
                    v-drag="index"
                    :style="{left:a.begin*dragBarWrapWidth/timeLength+'px',
                    width:(a.end-a.begin)*dragBarWrapWidth/timeLength+'px'}"
                    :left="a.begin*dragBarWrapWidth/timeLength"
                    :right="a.end*dragBarWrapWidth/timeLength">
                {{a.name}}
            </drag-bar__filling>
            <div
                    :style="{width:100*(timeNow.timeInOneDay-beginTrackingTime.timeInOneDay)/timeLength + '%'}"
                    style="background-color:#585858;height:4px;position:absolute;top:31px;left:0">
            </div>
            <div
                    :style="{left:100*(timeNow.timeInOneDay-beginTrackingTime.timeInOneDay)/timeLength + '%'}"
                    style="background-color:#585858;height:35px;width:4px;position:absolute;">
            </div>
        </div>
        <div class="table-wrap">
            <table class="table">
                <tr>
                    <td>时间段名称</td>
                    <td v-for="(a,index) in dragBarP1" :key="index">
                        {{a.name}}
                    </td>
                </tr>
                <tr>
                    <td>开始时间</td>
                    <td v-for="(a,index) in dragBarP1"
                        :key="index"
                        style="white-space:nowrap;padding:0 .7em;"
                        :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null">
                        {{a.trackingDayBegin_clockTime}}
                    </td>
                </tr>
                <tr>
                    <td>结束时间</td>
                    <td v-for="(a,index) in dragBarP1"
                        :key="index"
                        :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null">
                        {{a.trackingDayEnd_clockTime}}
                    </td>
                </tr>
                <tr>
                    <td>持续时长</td>
                    <td v-for="(a,index) in dragBarP1"
                        :key="index"
                        :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null">
                        {{a.timeLength_dailyFormat}}
                    </td>
                </tr>
                <tr>
                    <td>完成状态</td>
                    <td v-for="(a,index) in dragBarP1"
                        :key="index"
                        :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null">
                        {{a.status}}
                    </td>
                </tr>
                <tr>
                    <td>操作</td>
                    <td v-for="(a,index) in dragBar"
                        v-if="a.show===true"
                        :key="index"
                        :class="a.status==='进行中'||
                        a.status==='延迟完成'?'td_ongoing':null" >
                        <el-button-group style="width:136px;"
                                         v-if="a.timeSlotId!='突发事件暂停'">
                            <el-button plain
                                       type="info"
                                       class="control-button"
                                       @click="FinishTimeSlot(index)"
                                       v-if="a.status!=='完成'">
                                完成
                            </el-button>
                            <el-button plain
                                       type="info"
                                       class="control-button"
                                       @click="DelayEnd(index)"
                                       v-if="a.status!=='完成'">
                                {{a.status==='延迟完成'?'取消延迟':'延迟完成'}}
                            </el-button>
                        </el-button-group>
                    </td>
                </tr>
            </table>
        </div>
        <el-button plain
                   style="margin-top:22px;"
                   @click="Stop(timeNow.timeInOneDay)">
            {{stopButtonValue.ifStop?stopButtonValue.true:stopButtonValue.false}}
        </el-button>
    </div>
</template>

<script>
    import dragbar__filling from '../components/dragbarfilling_vuex.vue'
    import drag_directive from '../directives/drag'
    import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'
    import Vue from 'vue'
    import VueRouter from "vue-router";
    Vue.use(VueRouter);
    //获取以秒为单位的当前时间（从今天零点到现在过了的秒数）
    import {GetTimeNow_s} from '../functions.js'
    //输入getters及timeSlotId返回带有这个timeSlotId的dragbarP1的序号
    import {GetDragbarGetterIndex} from '../functions.js'
    //输入时间指针和getters
    //返回指针上的拖拽条 的序号
    //如果指针上没有拖拽条，则返回 -999
    import {DragBarP1IndexOnPointer} from '../functions.js'




    export default {
        data(){
            return {
                loop_trackingTimePage:null
            }
        },
        computed:{
            ...mapState([
                'dragBar',
                'timeLength',
                'dragBarWrapWidth',
                'beginTrackingTime',
                'timeNow',
                'stopButtonValue'
            ]),
            ...mapGetters([
                'dragBarP1'
            ]),
            dragBarWrapWidth:{
                get() {
                    return this.$store.state.dragBarWrapWidth
                },
                set(value) {
                    this.SetDragBarWrapWidth(value)
                }
            }
        },
        components: {
            'drag-bar__filling':dragbar__filling
        },
        methods:{
            ...mapMutations([
                'SetDragBarWrapWidth',
                'FinishTimeSlot',
                'DelayEnd',
                'Stop',
                'TotalSubmissionAddTrackingTimePage',
                'ResetVuex'
            ])
        },
        directives: {
            ...drag_directive
        },
        mounted(){

            const wrapThis=this

            this.loop_trackingTimePage=setInterval(function () {
                console.log('loop_trackingTimePage正在运行');
                //把timeNow.timeInOneDay设置为 从今天零点到现在过了的秒数
                wrapThis.timeNow.timeInOneDay=GetTimeNow_s()

                const timeAfterBeginTracking=wrapThis.timeNow.timeInOneDay-wrapThis.beginTrackingTime.timeInOneDay
                //根据现在时间设置每个时间段的状态
                wrapThis.dragBar.forEach(function(currentValue,index) {
                    if(currentValue.show===true){

                        //实时更新状态（status）
                        //由'未完成'状态改为'进行中'状态
                        if (currentValue.status==='未完成'&&
                            currentValue.begin<timeAfterBeginTracking-1)
                        {
                            currentValue.status='进行中'
                        }
                        //由'进行中'状态改为'未确认'状态
                        else if (currentValue.status==='进行中'&&
                                 currentValue.end<=timeAfterBeginTracking)
                        {
                            currentValue.status='未确认'
                        }
                        //由'未确认'、'进行中'状态改为'未完成'状态
                        else if ((currentValue.status==='未确认'||
                                 currentValue.status==='进行中')&&
                                 currentValue.begin>=timeAfterBeginTracking-1)
                        {
                            currentValue.status='未完成'
                        }


                    }

                })

                //将最后一个拖拽条赋值给lastDragbar
                const lastDragbar=(function(){
                    for (let i=wrapThis.dragBar.length-1;i>=0;i--){
                        if (wrapThis.dragBar[i].show===true){
                            return wrapThis.dragBar[i]
                        }
                    }
                }())

                //如果过了最后一个时间段的时间并且没有点击完成
                //则最后一段时间自动进入延长状态
                if (timeAfterBeginTracking>lastDragbar.end&&
                    timeAfterBeginTracking>wrapThis.timeLength&&
                    (lastDragbar.status==='未确认'||
                    lastDragbar.status==='延迟完成'))
                    {
                    wrapThis.$store.state.timeLength=
                    lastDragbar.end=timeAfterBeginTracking
                    lastDragbar.status='延迟完成'
                }

                //如果所有任务都完成，则跳转到“已完成”页面，并向服务端发送数据
                if(IfAllFinish()){
                    //把分配页面所有要提交的东西放进完成后提交的总对象里
                    //如果有登录的话把总对象提交到服务端
                    wrapThis.TotalSubmissionAddTrackingTimePage()
                    //跳转到“已完成”页面
                    wrapThis.$goRoute('/finish_tracking')
                }
                //判断是否任务都已经完成
                function IfAllFinish() {
                    for (let i in wrapThis.dragBarP1){
                        if(wrapThis.dragBarP1[i].status!=='完成'){
                            return false
                        }
                    }
                    return true
                }


            },1000)

        },
        destroyed(){
            this.ResetVuex()
            clearInterval(this.loop_trackingTimePage)
        }
    }



</script>

<style lang="less">
    .drag-bar__{
        margin:41px auto 23px;
    }
    .special-button-blue{
        background-color: #0bf;
        border-color:#0bf;
        &:active{
             background-color:#00b1f1;
             border-color:#00b1f1;
        }
    }

</style>
