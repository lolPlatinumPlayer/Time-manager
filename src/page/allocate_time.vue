<template>
    <div id="box">
        <div style="float:left">
            总时间条宽度：
            <input type="number" v-model="dragBarWrapWidth">
        </div>
        <p class="title" style=" width: 100%;display: table;">
            分配时间
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
                    <td>多久后开始</td>
                    <td v-for="(a,index) in dragBarP1" :key="index">
                        {{a.begin_timeLength}}
                    </td>
                </tr>
                <tr>
                    <td>多久后结束</td>
                    <td v-for="(a,index) in dragBarP1" :key="index">
                        {{a.end_timeLength}}
                    </td>
                </tr>
                <tr>
                    <td>时间长度</td>
                    <td v-for="(a,index) in dragBarP1" :key="index" v-if="index!=(dragBarP1.length-1)">
                        {{a.timeLength_dailyFormat}}
                    </td>
                    <td v-for="(a,index) in dragBarP1"
                        :key="index"
                        v-if="index==(dragBarP1.length-1)">
                        <input type="text"
                               v-model.lazy="lastDragbarTimeLength"
                               v-focus
                               class="u_can_input"
                               style="font: inherit;background:none;width:100%;">
                    </td>
                </tr>
                <tr>
                    <td>开始时间</td>
                    <td v-for="(a,index) in dragBarP1" :key="index">
                        {{a.trackingDayBegin_clockTime}}
                    </td>
                </tr>
                <tr>
                    <td>结束时间</td>
                    <td v-for="(a,index) in dragBarP1" :key="index">
                        {{a.trackingDayEnd_clockTime}}
                    </td>
                </tr>
                <tr class="delet_time">
                    <td>删除时间</td>
                    <td v-for="(a,index) in dragBar"
                        :key="index" v-if="a.show"
                        @click="deleteDragBar(index)">
                        X
                    </td>
                </tr>
            </table>
            <button class="table-wrap-add" @click="addDragBar(),SetLastDragbarTimeLength()">+</button>
        </div>
        <a @click="TotalSubmissionAddAllocateTimePage(),
                   $goRoute('/tracking_time'),
                   SetBeginTrackingTime(),
                   LetTimeLengthEndAutofit(),
                   StopUpdateBeginTimeEveryS()">
            分配完毕
        </a>
    </div>
</template>

<script>
    import dragbar__filling from '../components/dragbarfilling_vuex.vue'
    import drag_directive from '../directives/drag'
    import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'
    import Vue from 'vue'
    import VueRouter from "vue-router";
    Vue.use(VueRouter);
    import {lastDragbarTimeLength_computed,GetTimeNow_s} from '../functions.js'



    export default {
        data () {
            return {
                //该参数后面用来代表每30秒更新s.beginTrackingTime.timeInOneDay的setInterval
                updateBeginTimeEveryS:null
            }
        },
        computed:{
            ...mapState([
                'dragBar',
                'timeLength',
                'dragBarWrapWidth',
                'totalSubmission'
            ]),
            ...mapGetters([
                'dragBarP1'
            ]),
            lastDragbarTimeLength:lastDragbarTimeLength_computed,
            //与mapState中的dragBarWrapWidth同名，不知道会不会有问题
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
                'addDragBar',
                'deleteDragBar',
                'InputTimeLength',
                'SetBeginTrackingTime',
                'LetTimeLengthEndAutofit',
                'SetLastDragbarTimeLength',
                'SetDragBarWrapWidth',
                'TotalSubmissionAddAllocateTimePage'
            ]),
            //停止mounted钩子中的一个setInterval
            StopUpdateBeginTimeEveryS(){
                clearInterval(this.updateBeginTimeEveryS)
            }
        },
        directives: {
            ...drag_directive,
            focus:{
                inserted:function (el) {
                    el.focus()
                }
            }
        },
        mounted(){

            const wrapThis=this

            this.InputTimeLength();

            //每隔半分钟（非正式）更新一次s.beginTrackingTime.timeInOneDay
            (function () {
                wrapThis.$store.state.beginTrackingTime.timeInOneDay=GetTimeNow_s()
                wrapThis.updateBeginTimeEveryS=setInterval(function () {
                    const now=new Date(),
                        seconds=now.getSeconds();
                    if(seconds==0||seconds==30){
                        wrapThis.$store.state.beginTrackingTime.timeInOneDay=GetTimeNow_s()
                    }
                },1000)
            }())

        }
    }



</script>
<!-- lang="less"-->
<style>

</style>
