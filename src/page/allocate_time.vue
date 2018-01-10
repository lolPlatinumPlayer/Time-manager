<template>
    <div id="box">
        <p class="title">分配时间</p>
        <div class="drag-bar__">
            <div class="drag-bar__wrap-bg"></div>
            <drag-bar__filling  v-for="(a,index) in dragBar" :key="index" v-if="a.show" v-drag="index" :style="{left:a.left+'px',width:a.right-a.left+'px'}" :left="a.left" :right="a.right">
                {{a.name}}
            </drag-bar__filling>
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
                        {{a.beginTime_timeLength}}
                    </td>
                </tr>
                <tr>
                    <td>结束时间</td>
                    <td v-for="(a,index) in dragBarP1" :key="index" v-if="a.show">
                        {{a.endTime_timeLength}}
                    </td>
                </tr>
                <tr>
                    <td>删除时间</td>
                    <td v-for="(a,index) in dragBar" :key="index" v-if="a.show" @click="deleteDragBar(index)">
                        X
                    </td>
                </tr>
            </table>
            <button class="table-wrap-add" @click="addDragBar">+</button>
        </div>
        <a @click="$goRoute('/tracking_time'),SetBeginTrackingTime(),LetTimeLengthEndAutofit()">分配完毕</a>
    </div>
</template>

<script>
    import dragbar__filling from '../components/dragbarfilling_vuex.vue'
    import drag_directive from '../directives/drag'
    import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'
    import Vue from 'vue'
    import VueRouter from "vue-router";
    Vue.use(VueRouter);



    export default {
        computed:{
            ...mapState([
                'dragBar',//:'strip_getter.dragBar'
                'timeLength'
            ]),
            ...mapGetters([
                'dragBarP1'
            ])
        },
        components: {
            'drag-bar__filling':dragbar__filling
        },
        methods:{
            ...mapMutations([
                'addDragBar',
                'deleteDragBar',
                'InputTimeLength',
                'SetTimeType',
                'SetBeginTrackingTime',
                'LetTimeLengthEndAutofit'
            ])
        },
        directives: {
            ...drag_directive
        },
        mounted(){
            this.InputTimeLength()
            this.SetTimeType(this.$route.query.time_type)
        }
    }



</script>
<!-- lang="less"-->
<style>
    .drag-bar__{
        margin:41px auto 12px;
        width: 777px;
        height: 28px;
        position: relative;
    }
    .drag-bar__wrap-bg{
        width:100%;
        background-color:white;
        height:10px;
        top:7px;
        position:absolute;
        border-radius:6px;
        border:2px #bfbfbf solid;
    }
    .table-wrap{position:relative;margin:auto; display: table;}
    .table-wrap-add{position:absolute;width:22px;right:-22px; top: 3px;}
    .table{text-align:center;margin:auto}
    .table tr:nth-child(1) td{background:rgb(214, 231, 251)}
    .table tr:nth-child(4) td:not(:nth-child(1)):hover{background:rgb(251, 31, 18);color:white;cursor:pointer}
    .table td:nth-child(1){background:rgb(214, 231, 251)}
    .table td {width:111px;}
    .table td:nth-child(2n) {background:rgba(180, 176, 177, 0.2) }
    .table tr:nth-child(2n) {background:rgba(180, 176, 177, 0.2) }
    .title{    text-align: center;
        font-size: 33px;
        color: #585858;
        font-weight: bold;
        margin-top: 160px;}
</style>
