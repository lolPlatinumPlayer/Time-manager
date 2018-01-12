<template>
    <div id="box">
        <div style="float:left">
            总时间条宽度：
            <input type="number" v-model="dragBarWrapWidth">
        </div>
        <p class="title" style=" width: 100%;display: table;">
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
                    :style="{width:100*(timeStampNow-beginTrackingTime.timeStamp)/timeLength + '%'}"
                    style="background-color:#585858;height:4px;position:absolute;top:31px;left:0">
            </div>
            <div
                    :style="{left:100*(timeStampNow-beginTrackingTime.timeStamp)/timeLength + '%'}"
                    style="background-color:#585858;height:35px;width:4px;position:absolute;">
            </div>
        </div>
        <div class="table-wrap">
            <table class="table">
                <tr>
                    <td>该段时间名称</td>
                    <td v-for="(a,index) in dragBar" :key="index" v-if="a.show">
                        {{a.name}}
                    </td>
                </tr>
                <tr>
                    <td>开始时间</td>
                    <td v-for="(a,index) in dragBarP1" :key="index" v-if="a.show">
                        {{a.trackingDayBegin_clockTime}}
                    </td>
                </tr>
                <tr>
                    <td>结束时间</td>
                    <td v-for="(a,index) in dragBarP1" :key="index" v-if="a.show">
                        {{a.trackingDayEnd_clockTime}}
                    </td>
                </tr>
                <tr>
                    <td>时间长度</td>
                    <td v-for="(a,index) in dragBarP1" :key="index" v-if="a.show">
                        {{a.timeLength_dailyFormat}}
                    </td>
                </tr>
                <tr>
                    <td>完成状态</td>
                    <td v-for="(a,index) in dragBarP1" :key="index" v-if="a.show">
                        （未完成）
                    </td>
                </tr>
            </table>
        </div>
        <a>全部取消</a>
        <a>突发事件暂停</a>
        <a>全部完成</a>
    </div>
</template>

<script>
    import dragbar__filling from '../components/dragbarfilling_vuex.vue'
    import drag_directive from '../directives/drag'
    import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'
    import Vue from 'vue'




    export default {
        computed:{
            ...mapState([
                'dragBar',//:'strip_getter.dragBar'
                'timeLength',
                'dragBarWrapWidth',
                'timeStampNow',
                'beginTrackingTime'
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
                'GetTimeStampNow',
                'SetDragBarWrapWidth'
            ])
        },
        directives: {
            ...drag_directive
        },
        mounted(){
            this.GetTimeStampNow()
        }
    }




</script>

<style src="../css/allocate_and_tracking_time.less"></style>
<style lang="less">
    .drag-bar__{
        margin:41px auto 23px;
    }

</style>
